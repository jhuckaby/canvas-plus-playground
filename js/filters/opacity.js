// Canvas-Plus Playground Filter Plugin

app.filters.opacity = Class.create({
	
	__name: 'opacity',
	__parent: app.filterBase,
	
	title: "Opacity",
	
	defaultParams: {
		opacity: 1.0,
		background: ""
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		this.$lookup('opacity').val( this.params.opacity );
		this.$lookup('background').val( this.params.background );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.opacity(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
});
