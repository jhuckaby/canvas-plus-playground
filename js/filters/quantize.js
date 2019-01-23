// Canvas-Plus Playground Filter Plugin

app.filters.quantize = Class.create({
	
	__name: 'quantize',
	__parent: app.filterBase,
	
	title: "Quantize",
	
	defaultParams: {
		colors: 256,
		dither: true,
		ditherType: 'FloydSteinberg'
	},
	
	alwaysShowParams: {
		colors: true,
		dither: true
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		this.$lookup('colors').val( this.params.colors );
		this.$lookup('ditherType').val( this.params.ditherType );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		
		this.params.dither = !!this.params.ditherType;
		
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.quantize(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // quantize

app.filters.quantizeFast = Class.create({
	
	__name: 'quantizeFast',
	__parent: app.filterBase,
	
	title: "Quantize Fast",
	
	defaultParams: {
		colors: 256,
		crushRGB: 16,
		crushAlpha: 16,
		dither: true
	},
	
	alwaysShowParams: {
		colors: true,
		crushRGB: true,
		crushAlpha: true
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		this.$lookup('colors').val( this.params.colors );
		this.$lookup('crushRGB').val( this.params.crushRGB );
		this.$lookup('crushAlpha').val( this.params.crushAlpha );
		this.$lookup('dither').prop('checked', this.params.dither );
		this.$lookup('fallback').prop('checked', this.params.fallback );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.quantizeFast(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // quantizeFast
