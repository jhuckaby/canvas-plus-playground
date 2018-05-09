// Canvas-Plus Playground Filter Plugin

app.filters.crop = Class.create({
	
	__name: 'crop',
	__parent: app.filterBase,
	
	title: "Crop",
	
	defaultParams: {
		x: 0,
		y: 0,
		width: 100,
		height: 100
	},
	
	alwaysShowParams: {
		x: true,
		y: true,
		width: true,
		height: true
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		this.$lookup('x').val( this.params.x );
		this.$lookup('y').val( this.params.y );
		this.$lookup('width').val( this.params.width );
		this.$lookup('height').val( this.params.height );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.crop(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
});
