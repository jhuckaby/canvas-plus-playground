// Canvas-Plus Playground Filter Plugin

app.filters.flatten = Class.create({
	
	__name: 'flatten',
	__parent: app.filterBase,
	
	title: "Flatten",
	
	defaultParams: {
		background: ""
	},
	
	alwaysShowParams: {
		background: true
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		this.$lookup('background').val( this.params.background );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.flatten(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
});
