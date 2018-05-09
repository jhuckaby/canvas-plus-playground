// Canvas-Plus Playground Filter Plugin

app.filters.text = Class.create({
	
	__name: 'text',
	__parent: app.filterBase,
	
	title: "Text",
	
	defaultParams: {
		text: "Hello World!",
		font: "Arial",
		fontStyle: "normal",
		fontWeight: "normal",
		size: 48,
		color: "rgba(255, 0, 0, 1.0)",
		background: "",
		gravity: "center",
		overflow: "shrink",
		marginX: 0, 
		marginY: 0, 
		offsetX: 0, 
		offsetY: 0, 
		characterSpacing: 0, 
		lineSpacing: 0, 
		shadowColor: "", 
		shadowOffsetX: 0, 
		shadowOffsetY: 0, 
		shadowBlur: 0, 
		outlineColor: "", 
		outlineThickness: 1, 
		outlineStyle: "round", 
		opacity: 1, 
		autoCrop: "", 
		maxWidth: 0, 
		maxHeight: 0,
		mode: "source-over"
	},
	
	alwaysShowParams: {
		text: true,
		font: true,
		size: true,
		color: true,
		gravity: true
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		this.$lookup('text').val( this.params.text );
		this.$lookup('font').val( this.params.font );
		this.$lookup('size').val( this.params.size );
		this.$lookup('color').val( this.params.color );
		this.$lookup('background').val( this.params.background );
		this.$lookup('gravity').val( this.params.gravity );
		this.$lookup('overflow').val( this.params.overflow );
		this.$lookup('marginX').val( this.params.marginX );
		this.$lookup('marginY').val( this.params.marginY );
		this.$lookup('offsetX').val( this.params.offsetX );
		this.$lookup('offsetY').val( this.params.offsetY );
		this.$lookup('characterSpacing').val( this.params.characterSpacing );
		this.$lookup('lineSpacing').val( this.params.lineSpacing );
		this.$lookup('shadowColor').val( this.params.shadowColor );
		this.$lookup('shadowOffsetX').val( this.params.shadowOffsetX );
		this.$lookup('shadowOffsetY').val( this.params.shadowOffsetY );
		this.$lookup('shadowBlur').val( this.params.shadowBlur );
		this.$lookup('outlineColor').val( this.params.outlineColor );
		this.$lookup('outlineThickness').val( this.params.outlineThickness );
		this.$lookup('outlineStyle').val( this.params.outlineStyle );
		this.$lookup('opacity').val( this.params.opacity );
		this.$lookup('mode').val( this.params.mode );
		this.$lookup('autoCrop').val( this.params.autoCrop );
		this.$lookup('maxWidth').val( this.params.maxWidth );
		this.$lookup('maxHeight').val( this.params.maxHeight );
		
		this.$custom('bold').prop('checked', this.params.fontWeight.match(/bold/i) );
		this.$custom('italic').prop('checked', this.params.fontStyle.match(/italic/i) );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		
		// bold / italic
		this.params.fontWeight = this.$custom('bold').prop('checked') ? 'bold' : 'normal';
		this.params.fontStyle = this.$custom('italic').prop('checked') ? 'italic' : 'normal';
		
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.text(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	},
	
	getSampleCodeParams: function(show_all) {
		// return params for sample code dialog
		var params = this.copyRemoveDefaultParams(show_all);
		
		var font_path = "/path/to/fonts/" + params.font.replace(/\s+/g, '-');
		if (!this.params.fontWeight.match(/normal/i)) font_path += '-' + this.params.fontWeight;
		if (!this.params.fontStyle.match(/normal/i)) font_path += '-' + this.params.fontStyle;
		font_path += '.otf';
		
		params.font = font_path;
		delete params.fontWeight;
		delete params.fontStyle;
		
		params._before = [
			"// Note: Fonts are handled differently in the browser vs. Node.js.",
			"// Please see https://github.com/jhuckaby/canvas-plus#fonts for details."
		];
		
		return params;
	}
	
});
