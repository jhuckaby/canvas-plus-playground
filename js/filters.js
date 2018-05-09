// Filter Base Class

app.filterBase = Class.create({
	
	title: "",
	div: null,
	params: null,
	
	init: function() {},
	update: function() {},
	run: function() {},
	
	reset: function() {
		// restore default params
		this.params = copyHash( this.defaultParams || {}, true );
		this.init();
		
		// resync range sliders
		this.div.find('input[type=range]').trigger('change.range');
	},
	
	$lookup: function(key) {
		// locate form element based on key (data-key attrib)
		return this.div.find('*[data-key='+key+']');
	},
	
	$group: function(key) {
		// locate group based on key (data-group attrib)
		return this.div.find('*[data-group='+key+']');
	},
	
	$custom: function(key) {
		// locate element based on key (data-custom attrib)
		return this.div.find('*[data-custom='+key+']');
	},
	
	badField: function(field, msg) {
		if (typeof(field) == 'string') field = this.$lookup(field);
		field.addClass('invalid');
		return app.doError(msg);
	},
	
	validate: function() {
		// validate all standard 'data-type' elements
		// and import all 'data-key' elements into params
		var self = this;
		var result = true;
		
		this.div.find('*[data-type]').each( function() {
			var $this = $(this);
			var value = $this.val();
			
			switch ($this.data('type')) {
				case 'int':
					if (!value.match(/^\-?\d+$/)) {
						result = false;
						return self.badField( $this, "Value must be an integer." );
					}
					value = parseInt(value);
					if ($this.data('min') && (value < parseInt($this.data('min')))) {
						/*result = false;
						return self.badField( $this, "Value must be greater than or equal to " + $this.data('min') + "." );*/
						$this.val($this.data('min'));
					}
					if ($this.data('max') && (value > parseInt($this.data('max')))) {
						/*result = false;
						return self.badField( $this, "Value must be less than or equal to " + $this.data('max') + "." );*/
						$this.val($this.data('max'));
					}
				break;
				
				case 'float':
					if (!value.match(/^\-?\d+(\.\d+)?$/)) {
						result = false;
						return self.badField( $this, "Value must be an floating point decimal." );
					}
					value = parseFloat(value);
					if ($this.data('min') && (value < parseFloat($this.data('min')))) {
						/*result = false;
						return self.badField( $this, "Value must be greater than or equal to " + $this.data('min') + "." );*/
						$this.val($this.data('min'));
					}
					if ($this.data('max') && (value > parseFloat($this.data('max')))) {
						/*result = false;
						return self.badField( $this, "Value must be less than or equal to " + $this.data('max') + "." );*/
						$this.val($this.data('max'));
					}
				break;
				
				case 'string':
					if ($this.data('match')) {
						var re = new RegExp( $this.data('match') );
						if (!value.match(re)) {
							result = false;
							return self.badField( $this, "Value must match pattern: " + re );
						}
					}
				break;
				
				case 'color':
					if (value.length && !value.match(/^((\#[0-9a-f]{6})|(\#[0-9a-f]{3})|(rgba?\([\d\,\.\s]+\)))$/)) {
						result = false;
						return self.badField( $this, "Value must match a valid CSS (RGBA) or #Hex color." );
					}
				break;
			} // switch type
		} ); // data-type
		
		if (!result) return false;
		
		// import standard data-key elements
		this.div.find('*[data-key]').each( function() {
			var $this = $(this);
			var value = $this.val();
			if ($this.data('type') == 'int') value = parseInt(value);
			else if ($this.data('type') == 'float') value = parseFloat(value);
			else if ($this.prop('type') == 'checkbox') value = !!$this.prop('checked');
			self.params[ $this.data('key') ] = value;
		} ); // data-key
		
		return true;
	},
	
	serialize: function() {
		// return params suitable for serialization on query
		return this.params || {};
	},
	
	getSampleCodeParams: function(show_all) {
		// return params for sample code dialog
		return this.copyRemoveDefaultParams(show_all);
	},
	
	copyRemoveDefaultParams: function(show_all) {
		// make copy of params, and removing all that match defaults, but keeping an optional set
		var keep = this.alwaysShowParams || {};
		var params = copyHash( this.serialize() );
		
		if (this.defaultParams && !show_all) {
			for (var key in this.defaultParams) {
				if ((params[key] == this.defaultParams[key]) && !keep[key]) delete params[key];
			}
		}
		
		return params;
	}
	
});
