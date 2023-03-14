// Canvas-Plus Playground Filter Plugin

app.filters.lighting = Class.create({
	
	__name: 'lighting',
	__parent: app.filterBase,
	
	title: "Lighting",
	
	defaultParams: {
		highlights: 0,
		shadows: 0
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		this.$lookup('highlights').val( this.params.highlights );
		this.$lookup('shadows').val( this.params.shadows );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.lighting(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // lighting
