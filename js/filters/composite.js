// Canvas-Plus Playground Filter Plugin

app.filters.composite = Class.create({
	
	__name: 'composite',
	__parent: app.filterBase,
	
	title: "Composite",
	
	defaultParams: {
		image: 'earth-ball.png',
		file: '',
		url: '',
		width: 0,
		height: 0,
		gravity: "center",
		marginX: 0,
		marginY: 0,
		offsetX: 0,
		offsetY: 0,
		opacity: 1,
		mode: "source-over",
		antialias: "good"
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		this.$lookup('image').val( this.params.image || '' );
		
		this.$custom('file')
			.off('change.filter')
			.on('change.filter', function() {
				self.$lookup('image').val('_file_');
				
				// grab ref to local file
				if (this.files && this.files.length) {
					self.params.file = this.files[0];
				}
			});
		
		this.$lookup('url')
			.val( this.params.url || '' )
			.off('change.filter')
			.on('change.filter', function() {
				self.$lookup('image').val('_url_');
			});
		
		this.$lookup('width').val( this.params.width );
		this.$lookup('height').val( this.params.height );
		this.$lookup('gravity').val( this.params.gravity );
		this.$lookup('marginX').val( this.params.marginX );
		this.$lookup('marginY').val( this.params.marginY );
		this.$lookup('offsetX').val( this.params.offsetX );
		this.$lookup('offsetY').val( this.params.offsetY );
		this.$lookup('opacity').val( this.params.opacity );
		this.$lookup('mode').val( this.params.mode );
		this.$lookup('antialias').val( this.params.antialias );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		
		if ((this.params.image == '_file_') && !this.params.file) return false;
		if ((this.params.image == '_url_') && !this.params.url) return false;
		
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var overlay = new CanvasPlus();
		overlay.set('debug', !!overlay.browser); // log to console.log
		
		var cparams = copyHashRemoveKeys(this.params, { file: 1, url: 1 });
		cparams.image = overlay;
		
		var loaded = function(err) {
			// overlay has loaded (or failed to load)
			if (err) return callback(err);
			
			var result = canvas.composite( cparams );
			if (result.isError) {
				return callback( canvas.getLastError() );
			}
			callback();
		}; // loaded()
		
		switch (this.params.image) {
			case '_file_':
				// load from local file
				overlay.load( this.params.file, loaded );
			break;
			
			case '_url_':
				// load from remote url
				overlay.loadRemote( this.params.url, loaded );
			break;
			
			default:
				// load sample image
				var uri = 'images/samples/' + this.params.image;
				overlay.load( uri, loaded );
			break;
		}
	},
	
	serialize: function() {
		// serialize for query
		if (this.params.image == '_file_') {
			// if using custom local file, we can't serialize
			return mergeHashes(
				copyHashRemoveKeys(this.params, { file: 1, url: 1 }), 
				{ image: "html5-logo.png" }
			);
		}
		
		return this.params;
	},
	
	getSampleCodeParams: function(show_all) {
		// return params for sample code dialog
		var params = this.copyRemoveDefaultParams(show_all);
		
		delete params.image;
		delete params.file;
		delete params.url;
		
		params.image = "_PLACEHOLDER_";
		params._before = [
			"// Note: You will have to load 'MY_OVERLAY_IMAGE' separately."
			// "// Please see: https://github.com/jhuckaby/canvas-plus#load"
		];
		params._match = /\"_PLACEHOLDER_\"/;
		params._replace = "MY_OVERLAY_IMAGE";
		
		return params;
	}
	
}); // composite

app.filters.mask = Class.create({
	
	__name: 'mask',
	__parent: app.filterBase,
	
	title: "Mask",
	
	defaultParams: {
		image: 'earth-ball.png',
		file: '',
		url: '',
		width: 0,
		height: 0,
		gravity: "center",
		marginX: 0,
		marginY: 0,
		offsetX: 0,
		offsetY: 0,
		opacity: 1,
		antialias: "good"
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		this.$lookup('image').val( this.params.image || '' );
		
		this.$custom('file')
			.off('change.filter')
			.on('change.filter', function() {
				self.$lookup('image').val('_file_');
				
				// grab ref to local file
				if (this.files && this.files.length) {
					self.params.file = this.files[0];
				}
			});
		
		this.$lookup('url')
			.val( this.params.url || '' )
			.off('change.filter')
			.on('change.filter', function() {
				self.$lookup('image').val('_url_');
			});
		
		this.$lookup('width').val( this.params.width );
		this.$lookup('height').val( this.params.height );
		this.$lookup('gravity').val( this.params.gravity );
		this.$lookup('marginX').val( this.params.marginX );
		this.$lookup('marginY').val( this.params.marginY );
		this.$lookup('offsetX').val( this.params.offsetX );
		this.$lookup('offsetY').val( this.params.offsetY );
		this.$lookup('opacity').val( this.params.opacity );
		this.$lookup('antialias').val( this.params.antialias );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		
		if ((this.params.image == '_file_') && !this.params.file) return false;
		if ((this.params.image == '_url_') && !this.params.url) return false;
		
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var overlay = new CanvasPlus();
		overlay.set('debug', !!overlay.browser); // log to console.log
		
		var cparams = copyHashRemoveKeys(this.params, { file: 1, url: 1 });
		cparams.image = overlay;
		
		var loaded = function(err) {
			// overlay has loaded (or failed to load)
			if (err) return callback(err);
			
			var result = canvas.mask( cparams );
			if (result.isError) {
				return callback( canvas.getLastError() );
			}
			callback();
		}; // loaded()
		
		switch (this.params.image) {
			case '_file_':
				// load from local file
				overlay.load( this.params.file, loaded );
			break;
			
			case '_url_':
				// load from remote url
				overlay.loadRemote( this.params.url, loaded );
			break;
			
			default:
				// load sample image
				var uri = 'images/samples/' + this.params.image;
				overlay.load( uri, loaded );
			break;
		}
	},
	
	serialize: function() {
		// serialize for query
		if (this.params.image == '_file_') {
			// if using custom local file, we can't serialize
			return mergeHashes(
				copyHashRemoveKeys(this.params, { file: 1, url: 1 }), 
				{ image: "html5-logo.png" }
			);
		}
		
		return this.params;
	},
	
	getSampleCodeParams: function(show_all) {
		// return params for sample code dialog
		var params = this.copyRemoveDefaultParams(show_all);
		
		delete params.image;
		delete params.file;
		delete params.url;
		
		params.image = "_PLACEHOLDER_";
		params._before = [
			"// Note: You will have to load 'MY_MASK_IMAGE' separately."
			// "// Please see: https://github.com/jhuckaby/canvas-plus#load"
		];
		params._match = /\"_PLACEHOLDER_\"/;
		params._replace = "MY_MASK_IMAGE";
		
		return params;
	}
	
}); // mask
