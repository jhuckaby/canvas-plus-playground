// Canvas-Plus Playground Filter Plugin

app.filters.convolve = Class.create({
	
	__name: 'convolve',
	__parent: app.filterBase,
	
	title: "Convolve",
	
	defaultParams: {
		matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0], // sharpen
		offset: 0,
		edges: 'repeat',
		channels: 'rgba'
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		var matrix = this.params.matrix || [0,0,0,0,0,0,0,0,0];
		for (var idx = 0; idx < 9; idx++) {
			this.$custom('k' + Math.floor(idx+1)).val( matrix[idx] );
		}
		
		this.$lookup('offset').val( this.params.offset );
		this.$lookup('edges').val( this.params.edges );
		
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
		
		this.params.matrix = [];
		for (var idx = 0; idx < 9; idx++) {
			this.params.matrix.push( parseFloat( this.$custom('k' + Math.floor(idx+1)).val() ) );
		}
		
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.convolve(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // convolve

app.filters.blur = Class.create({
	
	__name: 'blur',
	__parent: app.filterBase,
	
	title: "Blur",
	
	defaultParams: {
		amount: 2,
		edges: 'repeat',
		channels: 'rgba'
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		this.$lookup('amount').val( this.params.amount );
		this.$lookup('edges').val( this.params.edges );
		
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
		var result = canvas.blur(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // blur

app.filters.gaussianBlur = Class.create({
	
	__name: 'gaussianBlur',
	__parent: app.filterBase,
	
	title: "Gaussian Blur",
	
	defaultParams: {
		amount: 5,
		sigma: 2,
		edges: 'repeat',
		channels: 'rgba'
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		this.$lookup('amount').val( this.params.amount );
		this.$lookup('sigma').val( this.params.sigma );
		this.$lookup('edges').val( this.params.edges );
		
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
		var result = canvas.gaussianBlur(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // gaussianBlur

app.filters.sharpen = Class.create({
	
	__name: 'sharpen',
	__parent: app.filterBase,
	
	title: "Sharpen",
	
	defaultParams: {
		edges: 'repeat',
		channels: 'rgba'
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		this.$lookup('edges').val( this.params.edges );
		
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
		var result = canvas.sharpen(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // sharpen

app.filters.emboss = Class.create({
	
	__name: 'emboss',
	__parent: app.filterBase,
	
	title: "Emboss",
	
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
		var result = canvas.emboss(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // emboss

app.filters.findEdges = Class.create({
	
	__name: 'findEdges',
	__parent: app.filterBase,
	
	title: "Find Edges",
	
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
		var result = canvas.findEdges(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // find edges
