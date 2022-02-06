// Canvas-Plus Playground Filter Plugin

app.filters.resize = Class.create({
	
	__name: 'resize',
	__parent: app.filterBase,
	
	title: "Resize",
	
	defaultParams: {
		width: 640,
		height: 480,
		mode: "fit",
		background: "",
		direction: "both",
		gravity: "center",
		offsetX: 0,
		offsetY: 0,
		antialias: "good"
	},
	
	alwaysShowParams: {
		width: true,
		height: true,
		mode: true
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		this.$lookup('width').val( this.params.width );
		this.$lookup('height').val( this.params.height );
		
		this.$lookup('mode')
			.val( this.params.mode )
			.off('change.filter')
			.on('change.filter', function() {
				var value = $(this).val();
				
				if (value.match(/fitpad/i)) self.$group('background').show();
				else self.$group('background').hide();
				
				if (value.match(/fitpad|fitover/i)) self.$group('gravity').show();
				else self.$group('gravity').hide();
			})
			.trigger('change.filter');
		
		this.$lookup('background').val( this.params.background );
		this.$lookup('direction').val( this.params.direction );
		this.$lookup('gravity').val( this.params.gravity );
		this.$lookup('offsetX').val( this.params.offsetX );
		this.$lookup('offsetY').val( this.params.offsetY );
		this.$lookup('antialias').val( this.params.antialias );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		
		var params = this.params;
		var mode = this.params.mode;
		
		if (!mode.match(/fitpad/i)) {
			params.background = '';
		}
		if (!mode.match(/fitpad|fitover/i)) {
			params.gravity = 'center';
			params.offsetX = 0;
			params.offsetY = 0;
		}
		
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var params = copyHash(this.params);
		if (!params.mode.match(/fitpad/i)) {
			delete params.background;
		}
		
		var result = canvas.resize(params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		
		callback();
	}
	
}); 
