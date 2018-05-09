// Canvas-Plus Playground Filter Plugin

app.filters.trim = Class.create({
	
	__name: 'trim',
	__parent: app.filterBase,
	
	title: "Trim Edges",
	
	defaultParams: {
		color: "",
		tolerance: 10
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		this.$lookup('color').val( this.params.color );
		this.$lookup('tolerance').val( this.params.tolerance );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.trim(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
});
