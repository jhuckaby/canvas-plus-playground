// Canvas-Plus Playground Filter Plugin

app.filters.exposure = Class.create({
	
	__name: 'exposure',
	__parent: app.filterBase,
	
	title: "Exposure",
	
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
		var result = canvas.exposure(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
}); // lighting
