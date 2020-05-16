// Canvas-Plus Playground Filter Plugin

app.filters.draw = Class.create({
	
	__name: 'draw',
	__parent: app.filterBase,
	
	title: "Draw",
	
	defaultParams: {
		mode: 'line',
		x1: 0, y1: 0, x2: 0, y2: 0,
		x: 0, y: 0, width: 0, height: 0,
		fill: '#888888',
		stroke: '#000000'
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		var mode = this.params.mode;
		
		this.$custom('mode')
			.val( mode )
			.off('change.filter')
			.on('change.filter', function() {
				var value = $(this).val();
				self.params.mode = value;
				
				if (value == 'line') self.$group('line').show();
				else self.$group('line').hide();
				
				if (value == 'rect') self.$group('rect').show();
				else self.$group('rect').hide();
			})
			.trigger('change.filter');
		
		this.$lookup('x1').val( this.params.x1 );
		this.$lookup('x2').val( this.params.x2 );
		this.$lookup('y1').val( this.params.y1 );
		this.$lookup('y2').val( this.params.y2 );
		
		this.$lookup('x').val( this.params.x );
		this.$lookup('y').val( this.params.y );
		this.$lookup('width').val( this.params.width );
		this.$lookup('height').val( this.params.height );
		
		this.$lookup('fill').val( this.params.fill );
		this.$lookup('stroke').val( this.params.stroke );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var opts = {};
		
		switch (this.params.mode) {
			case 'line':
				opts.line = [ this.params.x1, this.params.y1, this.params.x2, this.params.y2 ];
			break;
			
			case 'rect':
				opts.rect = [ this.params.x, this.params.y, this.params.width, this.params.height ];
			break;
		} // switch
		
		if (this.params.fill) opts.fill = this.params.fill;
		if (this.params.stroke) opts.stroke = this.params.stroke;
		
		var result = canvas.draw(opts);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	},
	
	getSampleCodeParams: function(show_all) {
		// return params for sample code dialog
		var opts = {};
		
		switch (this.params.mode) {
			case 'line':
				opts.line = [ this.params.x1, this.params.y1, this.params.x2, this.params.y2 ];
			break;
			
			case 'rect':
				opts.rect = [ this.params.x, this.params.y, this.params.width, this.params.height ];
			break;
		} // switch
		
		if (this.params.fill) opts.fill = this.params.fill;
		if (this.params.stroke) opts.stroke = this.params.stroke;
		
		return opts;
	}
	
});