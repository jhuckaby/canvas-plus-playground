// Canvas-Plus Playground Filter Plugin

app.filters.border = Class.create({
	
	__name: 'border',
	__parent: app.filterBase,
	
	title: "Border",
	
	defaultParams: {
		size: 1,
		color: "#ff0000",
		mode: "inside"
	},
	
	alwaysShowParams: {
		size: true,
		color: true,
		mode: true
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		this.$lookup('size').val( this.params.size );
		this.$lookup('color').val( this.params.color );
		this.$lookup('mode').val( this.params.mode );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.border(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
});
