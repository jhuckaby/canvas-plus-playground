// Canvas-Plus Playground Filter Plugin

app.filters.curves = Class.create({
	
	__name: 'curves',
	__parent: app.filterBase,
	
	title: "Curves",
	
	defaultParams: {
		points: [0, 63, 127, 191, 255],
		channels: 'rgb'
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		this.$custom('points').val( this.params.points.join(', ') );
		
		var channels = this.params.channels;
		this.$custom('red').prop( 'checked', !!channels.match(/r/i) );
		this.$custom('green').prop( 'checked', !!channels.match(/g/i) );
		this.$custom('blue').prop( 'checked', !!channels.match(/b/i) );
		this.$custom('alpha').prop( 'checked', !!channels.match(/a/i) );
		
		this.updateCurvePreview();
		
		// setup mouse handling on curve editor
		this.div.find('canvas').off()
			.on('mousedown', this.previewMouseDown.bind(this))
			.on('mousemove', this.previewMouseMove.bind(this))
			.on('mouseout', this.previewMouseOut.bind(this));
			
		this.div.find('div.ci_add').off().on('click', this.addCurvePoint.bind(this));
		this.div.find('div.ci_del').off().on('click', this.removeCurvePoint.bind(this));
	},
	
	update: function() {
		// update params from DOM
		var $points = this.$custom('points');
		var points_csv = $points.val();
		if (!points_csv.match(/^[\d\,\s]+$/)) {
			return this.badField( $points, "Curve Y Points must be a comma-separated list of integers." );
		}
		var points = points_csv.split(/\,\s*/).map( function(value) { return parseInt(value); } );
		if (points.length < 2) {
			return this.badField( $points, "You must provide at least 2 curve points." );
		}
		if (points.length > 256) {
			return this.badField( $points, "A maximum of 256 curve points is allowed." );
		}
		for (var idx = 0, len = points.length; idx < len; idx++) {
			if (points[idx] > 255) return this.badField( $points, "Curve Y Points must be between 0 - 255." );
		}
		this.params.points = points;
		
		var channels = '';
		if (this.$custom('red').is(':checked')) channels += 'r';
		if (this.$custom('green').is(':checked')) channels += 'g';
		if (this.$custom('blue').is(':checked')) channels += 'b';
		if (this.$custom('alpha').is(':checked')) channels += 'a';
		if (!channels) {
			return app.doError("You must select at least one channel to apply the curve to.");
		}
		this.params.channels = channels;
		
		this.updateCurvePreview();
		return true; // success
	},
	
	updateCurvePreview: function() {
		// draw preview of curve into canvas
		var c = this.div.find('canvas').get(0);
		var ctx = c.getContext('2d');
		
		// ugh, need to create temp canvas, for generateCurve
		// app.canvas may not be generated yet (i.e. if called from init())
		var temp_cplus = new CanvasPlus();
		var values = temp_cplus.generateCurve( this.params.points );
		temp_cplus = null;
		
		var width = c.width;
		var height = c.height;
		
		ctx.clearRect(0, 0, width, height);
		
		// grid lines
		ctx.save();
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
		ctx.setLineDash( [6, 3] );
		
		// horizontal lines
		[0.25, 0.5, 0.75].forEach( function(value) {
			ctx.beginPath();
			ctx.moveTo( 0, value * height );
			ctx.lineTo( width, value * height );
			ctx.stroke();
		} );
		
		// vertical lines
		[0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875].forEach( function(value) {
			ctx.beginPath();
			ctx.moveTo( value * width, 0 );
			ctx.lineTo( value * width, height );
			ctx.stroke();
		} );
		
		ctx.restore();
		
		// now draw the curve shape itself
		var xmax = width - 1;
		var ymax = height - 1;
		
		ctx.save();
		ctx.lineWidth = 2;
		ctx.lineJoin = 'round';
		ctx.lineCap = "butt";
		
		ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
		ctx.strokeStyle = 'rgba(0, 0, 0, 0.65)';
		
		ctx.beginPath();
		ctx.moveTo( 0, ymax );
		
		for (var idx = 0; idx < 256; idx++) {
			var x = (idx / 255) * xmax;
			var y = ymax - ((values[idx] / 255) * ymax);
			ctx.lineTo( x, y );
		}
		
		ctx.lineTo( xmax, ymax );
		ctx.lineTo( 0, ymax );
		ctx.fill();
		ctx.stroke();
		ctx.restore();
		
		// now draw control dots on all the key points
		ctx.save();
		ctx.lineWidth = 1;
		ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
		ctx.strokeStyle = 'rgba(0, 0, 0, 0.65)';
		
		for (var idx = 0, len = this.params.points.length; idx < len; idx++) {
			var value = this.params.points[idx];
			var x = (idx / (len - 1)) * xmax;
			var y = ymax - ((value / 255) * ymax);
			
			if (this.dragging && (this.dragging.pointIdx == idx)) ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
			else if (this.hovering && (this.hovering.pointIdx == idx)) ctx.fillStyle = '#3f7ed5';
			else ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
			
			ctx.beginPath(); 
			ctx.arc(x, y, 9, 0, Math.PI * 2, true);
			ctx.fill();
			ctx.stroke();
		};
		
		ctx.restore();
	},
	
	previewMouseMove: function(event) {
		// process canvas hover event (before drag start)
		// this just handles the control point hover highlight
		if (this.dragging) return;
		
		var $c = this.div.find('canvas');
		var c = $c.get(0);
		
		var width = c.width;
		var height = c.height;
		
		var px = event.offsetX * (width / $c.width());
		var py = event.offsetY * (height / $c.height());
		
		var xmax = width - 1;
		var ymax = height - 1;
		
		var hover = null;
		
		for (var idx = 0, len = this.params.points.length; idx < len; idx++) {
			var value = this.params.points[idx];
			var x = (idx / (len - 1)) * xmax;
			var y = ymax - ((value / 255) * ymax);
			
			if ((Math.abs(x - px) <= 16) && (Math.abs(y - py) <= 16)) {
				hover = { pointIdx: idx };
				idx = len;
			}
		}
		
		if (hover && !this.hovering) {
			// hover start
			this.hovering = hover;
			this.updateCurvePreview();
		}
		else if (!hover && this.hovering) {
			// hover stop
			delete this.hovering;
			this.updateCurvePreview();
		}
		else if (hover && this.hovering && (hover.pointIdx != this.hovering.pointIdx)) {
			// jump to diff point
			this.hovering = hover;
			this.updateCurvePreview();
		}
	},
	
	previewMouseOut: function(event) {
		// mouse has left canvas, cancel hover if active
		if (this.hovering) {
			delete this.hovering;
			this.updateCurvePreview();
		}
	},
	
	previewMouseDown: function(event) {
		// see if user clicked on a control point
		event.preventDefault();
		
		var $c = this.div.find('canvas');
		var c = $c.get(0);
		
		var width = c.width;
		var height = c.height;
		
		var px = event.offsetX * (width / $c.width());
		var py = event.offsetY * (height / $c.height());
		
		var xmax = width - 1;
		var ymax = height - 1;
		
		for (var idx = 0, len = this.params.points.length; idx < len; idx++) {
			var value = this.params.points[idx];
			var x = (idx / (len - 1)) * xmax;
			var y = ymax - ((value / 255) * ymax);
			
			if ((Math.abs(x - px) <= 16) && (Math.abs(y - py) <= 16)) {
				this.dragging = {
					pointIdx: idx,
					startValue: value,
					startY: event.clientY * (height / $c.height()),
					canvasHeight: height,
					domHeight: $c.height()
				};
				this.updateCurvePreview();
				
				// inform app we want drag and release events
				app.mouseHandler = this;
				
				idx = len;
			}
		}
	},
	
	mouseMove: function(event) {
		// move moved after clicking on a control point
		// called from app.mouseHandler
		if (this.dragging) {
			var drag = this.dragging;
			var py = event.clientY * (drag.canvasHeight / drag.domHeight);
			var delta = 0 - Math.floor( py - drag.startY );
			var value = drag.startValue + delta;
			
			this.params.points[ drag.pointIdx ] = Math.clamp( value, 0, 255 );
			
			this.$custom('points').val( this.params.points.join(', ') );
			this.updateCurvePreview();
		}
	},
	
	mouseUp: function(event) {
		// mouse released from canvas
		// called from app.mouseHandler
		event.preventDefault();
		
		if (this.dragging) {
			delete this.dragging;
			this.$custom('points').trigger('change');
		}
	},
	
	rebuildCurve: function(len) {
		// rebuild curve with new point count
		var values = app.canvas.generateCurve( this.params.points );
		var points = [];
		
		for (var idx = 0; idx < len; idx++) {
			var idy = Math.floor( idx * (255 / (len - 1)) );
			points.push( values[idy] );
		}
		
		this.params.points = points;
		this.$custom('points').val( this.params.points.join(', ') ).trigger('change');
	},
	
	addCurvePoint: function() {
		// add curve point and rebuild curve to fit
		if (this.params.points.length < 32) this.rebuildCurve( this.params.points.length + 1 );
	},
	
	removeCurvePoint: function() {
		// remove curve point and rebuild curve to fit
		if (this.params.points.length > 2) this.rebuildCurve( this.params.points.length - 1 );
	},
	
	run: function(canvas, callback) {
		// run filter async
		var params = this.getSampleCodeParams();
		
		var result = canvas.curves(params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	},
	
	getSampleCodeParams: function(show_all) {
		// return params for sample code dialog
		var params = {};
		var points = this.params.points;
		var channels = this.params.channels;
		
		if (channels.match(/rgb/i)) params.rgb = points;
		else {
			if (channels.match(/r/i)) params.red = points;
			if (channels.match(/g/i)) params.green = points;
			if (channels.match(/b/i)) params.blue = points;
		}
		if (channels.match(/a/i)) params.alpha = points;
		
		return params;
	}
	
}); // curves

app.filters.posterize = Class.create({
	
	__name: 'posterize',
	__parent: app.filterBase,
	
	title: "Posterize",
	
	defaultParams: {
		levels: 4,
		channels: 'rgb'
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		this.$lookup('levels').val( this.params.levels );
		
		var channels = this.params.channels;
		this.$custom('red').prop( 'checked', !!channels.match(/r/i) );
		this.$custom('green').prop( 'checked', !!channels.match(/g/i) );
		this.$custom('blue').prop( 'checked', !!channels.match(/b/i) );
		this.$custom('alpha').prop( 'checked', !!channels.match(/a/i) );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		
		var channels = '';
		if (this.$custom('red').is(':checked')) channels += 'r';
		if (this.$custom('green').is(':checked')) channels += 'g';
		if (this.$custom('blue').is(':checked')) channels += 'b';
		if (this.$custom('alpha').is(':checked')) channels += 'a';
		if (!channels) {
			return app.doError("You must select at least one channel to apply the filter to.");
		}
		this.params.channels = channels;
		
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.posterize(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // posterize

app.filters.solarize = Class.create({
	
	__name: 'solarize',
	__parent: app.filterBase,
	
	title: "Solarize",
	
	defaultParams: {
		channels: 'rgb'
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		var channels = this.params.channels;
		this.$custom('red').prop( 'checked', !!channels.match(/r/i) );
		this.$custom('green').prop( 'checked', !!channels.match(/g/i) );
		this.$custom('blue').prop( 'checked', !!channels.match(/b/i) );
		this.$custom('alpha').prop( 'checked', !!channels.match(/a/i) );
	},
	
	update: function() {
		// update params from DOM
		var channels = '';
		if (this.$custom('red').is(':checked')) channels += 'r';
		if (this.$custom('green').is(':checked')) channels += 'g';
		if (this.$custom('blue').is(':checked')) channels += 'b';
		if (this.$custom('alpha').is(':checked')) channels += 'a';
		if (!channels) {
			return app.doError("You must select at least one channel to apply the filter to.");
		}
		this.params.channels = channels;
		
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.solarize(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // solarize

app.filters.invert = Class.create({
	
	__name: 'invert',
	__parent: app.filterBase,
	
	title: "Invert",
	
	defaultParams: {
		channels: 'rgb'
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		var channels = this.params.channels;
		this.$custom('red').prop( 'checked', !!channels.match(/r/i) );
		this.$custom('green').prop( 'checked', !!channels.match(/g/i) );
		this.$custom('blue').prop( 'checked', !!channels.match(/b/i) );
		this.$custom('alpha').prop( 'checked', !!channels.match(/a/i) );
	},
	
	update: function() {
		// update params from DOM
		var channels = '';
		if (this.$custom('red').is(':checked')) channels += 'r';
		if (this.$custom('green').is(':checked')) channels += 'g';
		if (this.$custom('blue').is(':checked')) channels += 'b';
		if (this.$custom('alpha').is(':checked')) channels += 'a';
		if (!channels) {
			return app.doError("You must select at least one channel to apply the filter to.");
		}
		this.params.channels = channels;
		
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.invert(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // invert

app.filters.temperature = Class.create({
	
	__name: 'temperature',
	__parent: app.filterBase,
	
	title: "Color Temperature",
	
	defaultParams: {
		amount: 0
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		this.$lookup('amount').val( this.params.amount );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.temperature(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // ctemperature

app.filters.gamma = Class.create({
	
	__name: 'gamma',
	__parent: app.filterBase,
	
	title: "Gamma Adjust",
	
	defaultParams: {
		amount: 1,
		channels: 'rgb'
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		this.$lookup('amount').val( this.params.amount );
		
		var channels = this.params.channels;
		this.$custom('red').prop( 'checked', !!channels.match(/r/i) );
		this.$custom('green').prop( 'checked', !!channels.match(/g/i) );
		this.$custom('blue').prop( 'checked', !!channels.match(/b/i) );
		this.$custom('alpha').prop( 'checked', !!channels.match(/a/i) );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		
		var channels = '';
		if (this.$custom('red').is(':checked')) channels += 'r';
		if (this.$custom('green').is(':checked')) channels += 'g';
		if (this.$custom('blue').is(':checked')) channels += 'b';
		if (this.$custom('alpha').is(':checked')) channels += 'a';
		if (!channels) {
			return app.doError("You must select at least one channel to apply the filter to.");
		}
		this.params.channels = channels;
		
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.gamma(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // gamma

app.filters.sepia = Class.create({
	
	__name: 'sepia',
	__parent: app.filterBase,
	
	title: "Sepia Tone",
	
	init: function() {
		// populate DOM from params
		var self = this;
	},
	
	update: function() {
		// update params from DOM
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.sepia();
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // sepia

app.filters.normalize = Class.create({
	
	__name: 'normalize',
	__parent: app.filterBase,
	
	title: "Normalize",
	
	defaultParams: {
		channels: 'rgb'
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		var channels = this.params.channels;
		this.$custom('red').prop( 'checked', !!channels.match(/r/i) );
		this.$custom('green').prop( 'checked', !!channels.match(/g/i) );
		this.$custom('blue').prop( 'checked', !!channels.match(/b/i) );
		this.$custom('alpha').prop( 'checked', !!channels.match(/a/i) );
	},
	
	update: function() {
		// update params from DOM
		var channels = '';
		if (this.$custom('red').is(':checked')) channels += 'r';
		if (this.$custom('green').is(':checked')) channels += 'g';
		if (this.$custom('blue').is(':checked')) channels += 'b';
		if (this.$custom('alpha').is(':checked')) channels += 'a';
		if (!channels) {
			return app.doError("You must select at least one channel to apply the filter to.");
		}
		this.params.channels = channels;
		
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.normalize(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // normalize

app.filters.threshold = Class.create({
	
	__name: 'threshold',
	__parent: app.filterBase,
	
	title: "Threshold",
	
	defaultParams: {
		level: 128,
		channels: 'rgb'
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		this.$lookup('level').val( this.params.level );
		
		var channels = this.params.channels;
		this.$custom('red').prop( 'checked', !!channels.match(/r/i) );
		this.$custom('green').prop( 'checked', !!channels.match(/g/i) );
		this.$custom('blue').prop( 'checked', !!channels.match(/b/i) );
		this.$custom('alpha').prop( 'checked', !!channels.match(/a/i) );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		
		var channels = '';
		if (this.$custom('red').is(':checked')) channels += 'r';
		if (this.$custom('green').is(':checked')) channels += 'g';
		if (this.$custom('blue').is(':checked')) channels += 'b';
		if (this.$custom('alpha').is(':checked')) channels += 'a';
		if (!channels) {
			return app.doError("You must select at least one channel to apply the filter to.");
		}
		this.params.channels = channels;
		
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.threshold(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // threshold
