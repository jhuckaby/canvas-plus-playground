// Canvas-Plus Playground Filter Plugin

app.filters.expand = Class.create({
	
	__name: 'expand',
	__parent: app.filterBase,
	
	title: "Expand",
	
	defaultParams: {
		width: 100,
		height: 100,
		background: "rgba(0, 0, 0, 0)",
		gravity: "center"
	},
	
	alwaysShowParams: {
		width: true,
		height: true,
		background: true,
		gravity: true
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		this.$lookup('width').val( this.params.width );
		this.$lookup('height').val( this.params.height );
		this.$lookup('background').val( this.params.background );
		this.$lookup('gravity').val( this.params.gravity );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.expand(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
});
