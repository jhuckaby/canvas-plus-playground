// Canvas-Plus Playground Filter Plugin

app.filters.transform = Class.create({
	
	__name: 'transform',
	__parent: app.filterBase,
	
	title: "Transform",
	
	defaultParams: {
		rotate: 0,
		fliph: false,
		flipv: false,
		matrix: false,
		antialias: "best",
		background: "",
		fixed: false
	},
	
	init: function() {
		// populate DOM from params
		var self = this;
		
		var mode = 'rotate';
		if (this.params.fliph) mode = 'fliph';
		else if (this.params.flipv) mode = 'flipv';
		else if (this.params.matrix && (this.params.matrix.length == 6)) mode = 'matrix';
		
		this.$custom('mode')
			.val( mode )
			.off('change.filter')
			.on('change.filter', function() {
				var value = $(this).val();
				
				if (value == 'rotate') self.$group('rotate').show();
				else self.$group('rotate').hide();
				
				if (value == 'matrix') self.$group('matrix').show();
				else self.$group('matrix').hide();
			})
			.trigger('change.filter');
		
		this.$lookup('rotate').val( this.params.rotate );
		this.$lookup('fixed').prop('checked', this.params.fixed );
		
		var matrix = this.params.matrix || [1, 0, 0, 1, 0, 0];
		this.$custom('ma').val( matrix[0] );
		this.$custom('mb').val( matrix[1] );
		this.$custom('mc').val( matrix[2] );
		this.$custom('md').val( matrix[3] );
		this.$custom('me').val( matrix[4] );
		this.$custom('mf').val( matrix[5] );
		
		this.$lookup('antialias').val( this.params.antialias );
		this.$lookup('background').val( this.params.background );
	},
	
	update: function() {
		// update params from DOM
		if (!this.validate()) return false;
		
		var mode = this.$custom('mode').val();
		switch (mode) {
			case 'rotate':
				delete this.params.fliph;
				delete this.params.flipv;
				delete this.params.matrix;
			break;
			
			case 'fliph':
				this.params.fliph = true;
				delete this.params.rotate;
				delete this.params.flipv;
				delete this.params.matrix;
				delete this.params.background;
				delete this.params.fixed;
			break;
			
			case 'flipv':
				this.params.flipv = true;
				delete this.params.rotate;
				delete this.params.fliph;
				delete this.params.matrix;
				delete this.params.background;
				delete this.params.fixed;
			break;
			
			case 'matrix':
				this.params.matrix = [
					parseFloat( this.$custom('ma').val() ),
					parseFloat( this.$custom('mb').val() ),
					parseFloat( this.$custom('mc').val() ),
					parseFloat( this.$custom('md').val() ),
					parseFloat( this.$custom('me').val() ),
					parseFloat( this.$custom('mf').val() )
				];
				delete this.params.rotate;
				delete this.params.fliph;
				delete this.params.flipv;
				delete this.params.fixed;
			break;
		}
		
		return true; // success
	},
	
	run: function(canvas, callback) {
		// run filter async
		var result = canvas.transform(this.params);
		if (result.isError) {
			return callback( canvas.getLastError() );
		}
		callback();
	}
	
});