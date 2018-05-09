// Canvas-Plus Playground Filter Plugin

app.filters.adjust = Class.create({
	
	__name: 'adjust',
	__parent: app.filterBase,
	
	title: "Adjustments",
	
	defaultParams: {
		brightness: 0,
		contrast: 0,
		hue: 0,
		saturation: 0
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		this.$lookup('brightness').val( this.params.brightness );
		this.$lookup('contrast').val( this.params.contrast );
		this.$lookup('hue').val( this.params.hue );
		this.$lookup('saturation').val( this.params.saturation );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.adjust(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // adjust

app.filters.desaturate = Class.create({
	
	__name: 'desaturate',
	__parent: app.filterBase,
	
	title: "Desaturate",
	
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
		var result = canvas.desaturate();
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // desat
