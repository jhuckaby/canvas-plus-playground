// Canvas-Plus Playground Filter Plugin

app.filters.create = Class.create({
	
	__name: 'create',
	__parent: app.filterBase,
	
	title: "Create",
	
	defaultParams: {
		width: 640,
		height: 480,
		background: ""
	},
	
	alwaysShowParams: {
		width: true,
		height: true
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		this.$lookup('width').val( this.params.width );
		this.$lookup('height').val( this.params.height );
		this.$lookup('background').val( this.params.background );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.create(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
});
