// Canvas-Plus Playground Filter Plugin

app.filters.load = Class.create({
	
	__name: 'load',
	__parent: app.filterBase,
	
	title: "Load Image",
	
	defaultParams: {
		image: 'html5-logo.png',
		file: '',
		url: ''
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
		switch (this.params.image) {
			case '_file_':
				// load from local file
				canvas.load( this.params.file, callback );
			break;
			
			case '_url_':
				// load from remote url
				canvas.loadRemote( this.params.url, callback );
			break;
			
			default:
				// load sample image
				var uri = 'images/samples/' + this.params.image;
				canvas.load( uri, callback );
			break;
		}
	},
	
	serialize: function() {
		// serialize for query
		if (this.params.image == '_file_') {
			// if using custom local file, we can't serialize
			// TODO: try to get real filename from file object
			return { image: "html5-logo.png" };
		}
		
		return this.params;
	}
	
});
