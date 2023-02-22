// CanvasPlus Playground

var app = {
	
	query: parseQueryString( location.href ),
	filters: {},
	
	doc: {
		actions: [],
		format: 'png',
		quality: 90
	},
	
	nextId: 1,
	zoom: 1,
	previewX: 0,
	previewY: 0,
	mouseHandler: null,
	
	init: function() {
		this.$mainPreview = $('div.main_preview');
		
		this.stretchLegs();
		
		this.setupDialogKeyCapture();
		this.restoreDocumentFromQuery();
		this.setupPreviewZoom();
		this.setupPreviewScroll();
		this.setupPreviewHover();
		this.setupOutput();
		this.setupAddFilterMenu();
		this.setupMouseEvents();
	},
	
	stretchLegs: function() {
		// force chrome to load and compile most code
		// we do this because the first time functions are called they are SLOW
		var canvas = new CanvasPlus();
		
		canvas.create({
			"width": 16,
			"height": 16,
			"background": "rgba(255, 0, 0, 0.5)"
		});
		
		canvas.adjust({
			"brightness": 49,
			"contrast": 33,
			"hue": 107,
			"saturation": 33
		});
		
		canvas.blur();
		
		canvas.border();
		
		canvas.convolve({
			"matrix": [ 0, -1, 0, -1, 5, -1, 0, -1, 0 ]
		});
		
		canvas.crop({
			"x": 1,
			"y": 1,
			"width": 14,
			"height": 14
		});
		
		canvas.curves({
			"rgb": [ 0, 127, 255 ]
		});
		
		canvas.desaturate();
		
		canvas.emboss();
		
		canvas.expand({
			"width": 2,
			"height": 2,
			"background": "#0000ff",
			"gravity": "center"
		});
		
		canvas.findEdges();
		
		canvas.flatten({
			"background": ""
		});
		
		canvas.gamma({
			"amount": 1.61
		});
		
		canvas.invert();
		
		canvas.normalize();
		
		canvas.posterize();
		
		canvas.resize({
			"width": 8,
			"height": 8,
			"mode": "fit"
		});
		
		canvas.sepia();
		
		canvas.sharpen();
		
		canvas.solarize();
		
		canvas.temperature({
			"amount": 73
		});
		
		canvas.text({
			"text": "Hello World!",
			"font": "Arial",
			"size": 8,
			"color": "rgba(255, 0, 0, 1.0)",
			"gravity": "center"
		});
		
		canvas.threshold();
		
		canvas.transform({
			"fliph": true
		});
		
		canvas.trim();
		
		canvas.quantize({
			"colors": 256,
			"dither": true
		});
		
		canvas.quantizeFast({
			"crushRGB": 6,
			"crushAlpha": 6,
			"dither": true
		});
		
		canvas.write({"format":"png"}, function(err, buf) {;} );
	},
	
	resetDocument: function() {
		// reset everything
		this.doc.actions = [];
		this.doc.format = 'jpeg';
		this.doc.quality = 90;
		
		$('div.filter_header').off('mouseover').off('mouseout');
		DragSort.detach( 'div.filter_container', 'div.filter' );
		
		$("div.filter_container").find("*").off();
		$('div.filter_container').empty();
	},
	
	restoreDocumentFromQuery: function() {
		// apply settings and filters from query
		var self = this;
		var query = this.query;
		var doc = this.doc;
		
		this.resetDocument();
		
		doc.format = query.f || 'png';
		doc.quality = parseInt( query.q || 90 );
		
		doc.actions = [];
		var t = query.t || [
			'load/' + freeze({ image: 'waterfall.jpg' }),
			'resize/' + freeze({ width: 640, height: 480, mode: 'fit' })
		];
		if (!isaArray(t)) t = [t];
		
		t.forEach( function(trans_raw) {
			var transform = null;
			if (trans_raw.match(/^(\w+)\/(.+)$/)) {
				var trans_name = RegExp.$1;
				var json_raw = RegExp.$2;
				var transform = { n: trans_name, p: {} };
				
				try { transform.p = defrost(json_raw); }
				catch (e) {;}
				
				if (transform && transform.n) self.addFilter( transform.n, transform.p || {} );
			}
		} );
		
		this.resetFilterDragSort();
		this.refreshImage();
	},
	
	setupAddFilterMenu: function() {
		// add filters to menu
		var $menu = $('#fe_add_filter');
		
		hashKeysToArray(app.filters).sort().forEach( function(key) {
			var filter = app.filters[key];
			$menu.append('<option value="' + key + '">&rarr; ' + filter.prototype.title + '</option>');
		} );
	},
	
	setupPreviewZoom: function() {
		// setup click-to-zoom
		var self = this;
		
		this.$mainPreview.on('mousedown', function(event) {
			// zoom in/out
			if (event.which != 1) return;
			if (event.altKey) app.zoomOut(true);
			else app.zoomIn(true);
			
			event.preventDefault();
			event.stopPropagation();
		});
		
		// toggle zoom cursor on alt key
		$(document)
			.on('keydown', function(event) {
				if (event.keyCode == 18) self.$mainPreview.css('cursor', 'zoom-out');
			})
			.on('keyup', function(event) {
				if (event.keyCode == 18) self.$mainPreview.css('cursor', 'zoom-in');
			});
		
		// setup info palettes
		$('#btn_zoom_out').on('mouseup', function() { self.zoomOut(); });
		// $('#btn_zoom_actual').on('mouseup', this.zoomReset.bind(this));
		$('#btn_zoom_in').on('mouseup', function() { self.zoomIn(); });
		
		$('#fe_zoom').on('change', function() {
			// user picked zoom from menu
			var scale = parseFloat( $(this).val() );
			self.previewX = 0;
			self.previewY = 0;
			self.setZoom( scale );
		});
	},
	
	setupPreviewScroll: function() {
		// scroll wheel moves preview around
		var self = this;
		
		$('#preview_container').on('wheel', function(event) {
			// scroll preview
			event = event.originalEvent;
			self.previewX += event.deltaX;
			self.previewY += event.deltaY;
			self.setZoom();
		});
	},
	
	setupPreviewHover: function() {
		// hover over preview to get pixel info
		var self = this;
		
		$('div.main_preview').on('mousemove', function(event) {
			// d_cursor
			var pos = $(this).offset();
			var x = Math.floor( (event.clientX - pos.left) / self.zoom );
			var y = Math.floor( (event.clientY - pos.top) / self.zoom );
			
			if (self.canvas) {
				x = Math.clamp(x, 0, self.canvas.get('width'));
				y = Math.clamp(y, 0, self.canvas.get('height'));
			}
			
			self.lastX = x;
			self.lastY = y;
			
			$('#td_cur_pos').html( x + ' x ' + y );
			
			if (self.canvas && self.canvas.context) {
				var ctx = self.canvas.context;
				var pixel = ctx.getImageData(x, y, 1, 1);
				var data = pixel.data;
				var rgba = 'rgba(' + data[0] + ', ' + data[1] +', ' + data[2] + ', ' + shortFloat(data[3] / 255) + ')';
				
				$('#d_cur_clr').css('background-color', rgba);
				$('#td_cur_rgba').html( data.join(', ') );
			}
		});
	},
	
	setupOutput: function() {
		// setup output palette
		var self = this;
		var doc = this.doc;
		
		// output format
		$('#fe_output_format').val( doc.format ).on('change', function() {
			doc.format = $(this).val();
			if (doc.format == 'jpeg') $('#grp_output_jpeg_quality').show();
			else $('#grp_output_jpeg_quality').hide();
			self.refreshImage();
		}).trigger('change');
		
		// output quality
		$('#fe_jpeg_quality').val( doc.quality ).on('change', function() {
			doc.quality = parseInt( $(this).val() );
			self.refreshImage();
		});
		
		this.setupRanges( '#fs_output' );
	},
	
	addFilterFromMenu: function() {
		// add new filter from menu
		var self = this;
		var name = $('#fe_add_filter').val();
		if (name) {
			// remove previous create/load if applicable
			if (name.match(/^(create|load)$/)) {
				app.doc.actions.forEach( function(filter) {
					if (filter.__name.match(/^(create|load)$/)) {
						self.removeFilter( filter.id );
					}
				} );
			}
			
			this.addFilter(name);
			this.resetFilterDragSort();
			this.refreshImage();
			$('#fe_add_filter').val("");
			
			if (name.match(/^(create|load)$/)) $('div.left_sidebar').scrollTop( 0 );
			else $('div.left_sidebar').scrollTop( 9999 );
		}
	},
	
	addFilter: function(name, params) {
		// add new filter action to document
		var filter = new app.filters[name]();
		filter.id = this.getNextID('f');
		filter.params = mergeHashes( copyHash(filter.defaultParams || {}, true), params || {} );
		
		var $f = $('#fdef_base > div.filter').clone(true, true);
		$f.data('id', filter.id);
		$f.attr('data-id', filter.id);
		
		var $fi = $f.find('> div.filter_inner');
		$fi.find('> div.filter_header > span').html( filter.title );
		
		var $fc = $('#fdef_' + name + ' > div.filter_content').clone(true, true);
		$fi.append( $fc );
		
		filter.div = $fc;
		
		// create/load filters always get prepended to top of list
		if (name.match(/^(create|load)$/)) $('div.filter_container').prepend( $f );
		else $('div.filter_container').append( $f );
		
		filter.init();
		
		$fi.find('> div.filter_header > div.filter_close').on('mouseup', function() {
			app.removeFilter(filter.id);
			app.refreshImage();
		});
		$fi.find('> div.filter_header > div.filter_reset').on('mouseup', function() {
			filter.reset();
			app.refreshImage();
		});
		
		$fc.find('input, textarea, select')
			.on('blur', function() {
				if ($(this).hasClass('invalid')) {
					app.clearError();
				}
			})
			.on('change', function() {
				setTimeout( function() {
					if (filter.update()) app.refreshImage();
				}, 1 );
			});
		
		this.setupRanges( $fc );
		this.setupColors( $fc );
		
		// create/load filters always get prepended to top of list
		if (name.match(/^(create|load)$/)) app.doc.actions.unshift( filter );
		else app.doc.actions.push( filter );
	},
	
	removeFilter: function(id) {
		// remove filter using ID
		$('div.filter_container').find('div.filter[data-id=' + id + ']').remove();
		deleteObject( app.doc.actions, { id: id } );
	},
	
	refreshImage: function() {
		// some ops are async, so make sure only one of these runs at a time
		if ($('#progress_overlay').hasClass('active')) return;
		
		// update URL for bookmarking
		this.updateLocation();
		
		// rebuild image from filters
		this.canvas = new CanvasPlus();
		this.canvas.set('debug', true); // log to console.log
		this.canvas.set('autoOrient', false); // all modern browsers do this automatically now
		// this.canvas.set('useDataURLs', true);
		
		// block user input and show wait cursor
		$('#progress_overlay').addClass('active');
		
		// clear last error if applicable
		this.clearError();
		
		// pre-validation
		if (!this.doc.actions.length) {
			this.$mainPreview.empty().css({ width:0, height:0 });
			
			$('#d_image_src').html( "(No image)" );
			$('#d_image_perf').html( "(No image)" );
			$('#d_image_info').html( "(No image)" );
			
			var c = $('#c_histo')[0];
			c.getContext('2d').clearRect(0, 0, c.width, c.height);
			
			$('#progress_overlay').removeClass('active');
			return;
		}
		if (!this.doc.actions[0].__name.match(/^(create|load)$/)) {
			return this.doError("The first filter in your document needs to be either 'Create' or 'Load'.");
		}
		
		// apply all filters
		this.actionIdx = 0;
		this.runActionQueue();
	},
	
	runActionQueue: function() {
		// run an item from the queue and advance to next one
		if (this.actionIdx < this.doc.actions.length) {
			var filter = this.doc.actions[ this.actionIdx++ ];
			if (filter) {
				filter.run( this.canvas, function(err) {
					if (err) {
						return app.doError( filter.title + ": " + err );
					}
					setTimeout( app.runActionQueue.bind(app), 0 );
				} );
			}
			else this.finishActionQueue();
		}
		else this.finishActionQueue();
	},
	
	finishActionQueue: function() {
		// show final image
		var self = this;
		if (!this.canvas.get('mode')) return;
		
		// generate output image
		var opts = {
			format: this.doc.format,
			quality: this.doc.quality
		};
		this.canvas.write( opts, function(err, buf) {
			if (err) {
				return app.doError("Write: " + err);
			}
			
			// render info
			self.renderInfo();
			
			// cleanup from last time
			var url_creator = window.URL || window.webkitURL || window.mozURL || window.msURL;
			if (self.objectURL) url_creator.revokeObjectURL(self.objectURL);
			
			// make blob for preview/download
			var mime_type = "image/" + self.doc.format.replace(/jpg/, 'jpeg');
			var blob = new Blob( [ buf ], { type: mime_type } );
			var object_url = url_creator.createObjectURL( blob );
			
			var width = self.canvas.get('width');
			var height = self.canvas.get('height');
			
			var img = new Image();
			img.onload = function() {
				// shove into DOM
				self.$mainPreview.empty().css({
					width: '' + width + 'px',
					height: '' + height + 'px',
					marginLeft: '' + Math.floor( 0 - (width / 2) ) + 'px',
					marginTop: '' + Math.floor( 0 - (height / 2) ) + 'px'
				}).append( img );
				
				// reimport image to canvas so we get accurate pixel hover data
				self.canvas.importImage(img);
				self.canvas.render();
				
				// finally, histogram time!
				self.refreshHistogram();
				
				// remove progress overlay
				$('#progress_overlay').removeClass('active');
			};
			
			// trigger load
			img.src = object_url;
			
			// save object url for download button
			self.objectURL = object_url;
		} );
	},
	
	updateLocation: debounce(function() {
		// update URL location matching current document state (debounced)
		if (!app.$mainPreview.children().length) return;
		
		var doc = app.doc;
		var query = {
			t: [],
			f: doc.format
		};
		if (doc.format.match(/jpe?g/i)) query.q = doc.quality;
		
		// build transform list
		doc.actions.forEach( function(filter) {
			query.t.push( filter.__name + '/' + freeze( filter.copyRemoveDefaultParams() ) );
		} );
		
		// update browser location (unless first load)
		history.replaceState( {}, "", composeQueryString(query) );
		
	}, 250),
	
	refreshHistogram: function() {
		// regenerate and render histogram
		this.histo = this.canvas.histogram();
		this.renderHistogram();
	},
	
	renderHistogram: function() {
		// draw histogram
		var histo = this.histo;
		var c = $('#c_histo')[0];
		var ctx = c.getContext('2d');
		var chan = $('#fe_histo_chan').val();
		var width = c.width;
		var height = c.height;
		
		ctx.clearRect(0, 0, width, height);
		
		if (chan == 'rgb') {
			var max = Math.max( histo.redMax, histo.greenMax, histo.blueMax );
			this.renderHistogramChannel('red', max);
			this.renderHistogramChannel('green', max);
			this.renderHistogramChannel('blue', max);
		}
		else {
			this.renderHistogramChannel(chan);
		}
	},
	
	renderHistogramChannel: function(chan, max) {
		// render single histogram channel
		var histo = this.histo;
		var c = $('#c_histo')[0];
		var ctx = c.getContext('2d');
		var width = c.width;
		var height = c.height;
		var xmax = width - 1;
		var ymax = height - 1;
		
		var values = histo[chan];
		if (!max) max = histo[ chan + 'Max' ];
		
		ctx.lineWidth = 2;
		ctx.lineJoin = 'round';
		ctx.lineCap = "butt";
		
		var fillOpacity = 0.4;
		var strokeOpacity = 0.65;
		
		switch (chan) {
			case 'red':
				ctx.fillStyle = 'rgba(255, 0, 0, ' + fillOpacity + ')';
				ctx.strokeStyle = 'rgba(255, 0, 0, ' + strokeOpacity + ')';
			break;
			
			case 'green':
				ctx.fillStyle = 'rgba(0, 255, 0, ' + fillOpacity + ')';
				ctx.strokeStyle = 'rgba(0, 255, 0, ' + strokeOpacity + ')';
			break;
			
			case 'blue':
				ctx.fillStyle = 'rgba(0, 0, 255, ' + fillOpacity + ')';
				ctx.strokeStyle = 'rgba(0, 0, 255, ' + strokeOpacity + ')';
			break;
			
			case 'alpha':
				ctx.fillStyle = 'rgba(0, 0, 0, ' + fillOpacity + ')';
				ctx.strokeStyle = 'rgba(0, 0, 0, ' + strokeOpacity + ')';
			break;
		}
		
		ctx.beginPath();
		ctx.moveTo( 0, ymax );
		
		for (var idx = 0; idx < 256; idx++) {
			var x = (idx / 255) * xmax;
			var y = ymax - ((values[idx] / max) * ymax);
			ctx.lineTo( x, y );
		}
		
		ctx.lineTo( xmax, ymax );
		ctx.lineTo( 0, ymax );
		ctx.fill();
		ctx.stroke();
	},
	
	downloadImage: function() {
		// trigger download of image blob
		if (!this.objectURL) return app.doError("No image to download.");
		
		var dargs = getDateArgs( new Date() );
		var fmt = this.doc.format.replace(/jpeg/i, 'jpg').toLowerCase();
		var filename = 'canvas-playground-' + (dargs.yyyy_mm_dd + '-' + dargs.hh_mi_ss).replace(/\W+/g, '-') + '.' + fmt;
		
		var $a = $("<a/>")
			.css('display', 'none')
			.attr("href", this.objectURL)
			.attr("download", filename);
			
		$("body").append($a);
		$a[0].click();
		$a.remove();
	},
	
	renderInfo: function() {
		// render image info into palette
		var c = this.canvas;
		var doc = this.doc;
		var metrics = this.canvas.getMetrics();
		this.canvas.logDebug(9, "Performance Metrics:", metrics);
		
		// image source info
		var html = '';
		
		var fmt = (c.get('origFormat') || '').replace(/jpg/i, 'jpeg');
		if (fmt) fmt = fmt.toUpperCase();
		else fmt = 'Blank Canvas';
		
		var parts = [ fmt, c.get('origWidth') + 'x' + c.get('origHeight') ];
		if (metrics.counters.bytes_read) parts.push( getTextFromBytes( metrics.counters.bytes_read ) );
		
		html = parts.join(", ");
		$('#d_image_src').html( html );
		
		// perf table
		html = '';
		html += '<table class="metrics padding20">';
			html += '<tr><th>Metric</th><th>Elapsed</th></tr>';
			for (var key in metrics.perf) {
				if (key != 'total') {
					html += '<tr>';
					html += '<td>' + key + '</td>';
					html += '<td>' + metricsFloat( metrics.perf[key] ) + ' ms</td>';
					html += '</tr>';
				}
			}
			html += '<tr class="total">';
			html += '<td><b>Total</b></td>';
			html += '<td>' + metricsFloat( metrics.perf.total ) + ' ms</td>';
			html += '</tr>';
		html += '</table>';
		
		$('#d_image_perf').html( html );
		
		// image output info
		// mode (rgb, index)
		var mode = '';
		switch (c.get('mode')) {
			case 'rgba': 
				mode = 'RGB'; 
				if (c.get('alpha') && !doc.format.match(/jpe?g/i)) mode += 'A';
			break;
			case 'indexed': mode = 'Indexed'; break;
			case 'image': mode = 'Unloaded'; break;
		}
		
		var fmt = doc.format.toUpperCase();
		// if (doc.format.match(/jpe?g/i)) fmt += ' (' + doc.quality + '%)';
		
		var parts = [ mode, fmt, c.get('width') + 'x' + c.get('height') ];
		if (metrics.counters.bytes_written) parts.push( getTextFromBytes( metrics.counters.bytes_written ) );
		
		html = parts.join(", ");
		
		if (c.get('mode') == 'indexed') {
			// indexed mode, show palette colors
			var palette = app.palette = c.palette;
			html += '<div class="info_label" style="margin-top:8px;">Palette (' + palette.length + ' Colors)</div>';
			html += '<div class="info_value">';
			
			for (var idx = 0, len = palette.length; idx < len; idx++) {
				var color = palette[idx];
				var alpha = shortFloat( color.a / 255 );
				var rgba = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + alpha + ')';
				html += '<div class="palette_swatch checkerboard" data-idx="' + idx + '" title="' + rgba + '" onMouseOver="app.hoverPaletteSwatch(this)"><div class="palette_swatch_inner" style="background-color:' + rgba + '"></div></div>';
			} // foreach color
			
			html += '<div class="clear"></div>';
			html += '</div>';
		} // palette
		
		$('#d_image_info').html( html );
	},
	
	hoverPaletteSwatch: function(elem) {
		// hovering over palette swatch, update info
		var $elem = $(elem);
		var idx = parseInt( $elem.data('idx') );
		var color = this.palette[idx];
		var rgba = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + shortFloat( color.a / 255 ) + ')';
		
		$('#td_cur_pos').html( '#' + idx );
		$('#d_cur_clr').css('background-color', rgba);
		$('#td_cur_rgba').html( [color.r, color.g, color.b, color.a].join(', ') );
	},
	
	setupRanges: function(cont_sel) {
		// connect range sliders to their text field counterparts, and visa-versa
		var $cont = (typeof(cont_sel) == 'string') ? $(cont_sel) : cont_sel;
		
		$cont.find('input[type=range]')
			.off('change.range input.range')
			.on('change.range input.range', function() {
				$(this).next().val( $(this).val() );
			});
		
		$cont.find('input[type=text].range')
			.off('change.range')
			.on('change.range', function() {
				var $this = $(this);
				var $range = $this.prev();
				var value = parseFloat( $this.val() ) || 0;
				if ($range.attr('min')) {
					var min = parseFloat( $range.attr('min') );
					if (value < min) value = min;
				}
				if ($range.attr('max')) {
					var max = parseFloat( $range.attr('max') );
					if (value > max) value = max;
				}
				if ($range.attr('step')) {
					var step = parseFloat( $range.attr('step') );
					value = Math.floor( value / step ) * step;
				}
				$range.val( value ).trigger('change.range');
			});
		
		// one-time init sync, range to text field
		$cont.find('input[type=range]').trigger('change.range');
		
		// up/down arrow keys nudge value
		$cont.find('input[type=text]')
			.off('keydown.range')
			.on('keydown.range', function(event) {
				if ((event.keyCode == 38) || (event.keyCode == 40)) {
					var $this = $(this);
					if ($this.hasClass('range')) {
						// text field is part of range slider
						var $range = $this.prev();
						var value = $range.data('type').match(/^(int)$/) ? parseInt($this.val() || 0) : parseFloat($this.val() || 0);
						var step = parseFloat( $range.attr('step') || 1 );
						if (event.keyCode == 40) value -= step; else value += step;
						$this.val( value );
						$range.val( value ).trigger('change');
					}
					else if ($this.data('type') && $this.data('type').match(/^(int|float)$/)) {
						// standard number text field
						var value = $this.data('type').match(/^(int)$/) ? parseInt($this.val() || 0) : parseFloat($this.val() || 0);
						if (event.keyCode == 40) value--; else value++;
						$this.val( value ).trigger('change');
					}
					event.preventDefault();
					event.stopPropagation();
				}
			});
	},
	
	setupColors: function(cont_sel) {
		// add color picker link to color text fields
		var $cont = (typeof(cont_sel) == 'string') ? $(cont_sel) : cont_sel;
		
		$cont.find('input[type=text].color')
			.attr('placeholder', "CSS or Hex")
			.attr('spellcheck', "false")
			.each( function() {
				$('<span></span>').addClass('color_picker_link').attr('title', "Color Picker...").on('mouseup', function() {
					var $color = $(this).prev();
					app.pickColor( $color.val(), function(result) {
						if (result) $color.val( result ).trigger('change');
					} );
				}).insertAfter( $(this) );
			} );
	},
	
	resetFilterDragSort: function() {
		// reset drag sort
		$('div.filter_header').off('mouseover').off('mouseout');
		
		DragSort.detach( 'div.filter_container', 'div.filter' );
		DragSort.attach( 'div.filter_container', 'div.filter', function($items) {
			// drop event, reorder document actions based on DOM
			var filter_map = {};
			app.doc.actions.forEach( function(filter) {
				filter_map[ filter.id ] = filter;
			} );
			app.doc.actions = [];
			
			$items.each( function() {
				var id = $(this).data('id');
				app.doc.actions.push( filter_map[id] );
			} );
			
			app.refreshImage();
		} );
		
		// only allow dragging from header, but drag entire filter, not just header
		$('div.filter_header')
			.on('mouseover', function() {
				if (!DragSort.dragging) {
					$(this).parent().parent().attr('draggable', 'true');
				}
			})
			.on('mouseout', function() {
				if (!DragSort.dragging) {
					$(this).parent().parent().removeAttr('draggable');
				}
			});
	},
	
	setZoom: function(zoom) {
		// set zoom level (scale)
		if (zoom) this.zoom = zoom;
		else zoom = this.zoom;
		var px = Math.floor( (0 - this.previewX) / zoom );
		var py = Math.floor( (0 - this.previewY) / zoom );
		this.$mainPreview.css('transform', 'scale('+zoom+') translateX('+px+'px) translateY('+py+'px)');
		$('#fe_zoom').val( this.zoom );
	},
	
	zoomIn: function(use_mouse) {
		// zoom in by 200%
		if (this.zoom < 16) {
			this.zoom *= 2;
			if (use_mouse) {
				var width = this.canvas.get('width');
				var height = this.canvas.get('height');
				this.previewX = (this.lastX - (width/2)) * this.zoom;
				this.previewY = (this.lastY - (height/2)) * this.zoom;
			}
			else {
				this.previewX *= 2;
				this.previewY *= 2;
			}
			this.setZoom();
		}
	},
	
	zoomOut: function(use_mouse) {
		// zoom out by 200%
		if (this.zoom > 1/16) {
			this.zoom /= 2;
			
			this.previewX /= 2;
			this.previewY /= 2;
			
			if (!use_mouse) {
				// move toward center if using button to zoom out
				this.previewX /= 2;
				this.previewY /= 2;
			}
			
			this.setZoom();
		}
	},
	
	zoomReset: function() {
		// zoom to 100% and center image
		this.previewX = 0;
		this.previewY = 0;
		this.setZoom(1);
	},
	
	getNextID: function(prefix) {
		return prefix + this.nextId++;
	},
	
	doError: function(msg, lifetime) {
		// show an error message at the top of the screen
		// and hide the progress dialog if applicable
		Debug.trace("ERROR: " + msg);
		this.showMessage( 'error', msg, lifetime );
		$('#progress_overlay').removeClass('active');
		return false;
	},
	
	badField: function(id, msg) {
		// mark field as bad
		if (id.match(/^\w+$/)) id = '#' + id;
		$(id).removeClass('invalid').width(); // trigger reflow to reset css animation
		$(id).addClass('invalid');
		// try { $(id).focus(); } catch (e) {;}
		if (msg) return this.doError(msg);
		else return false;
	},
	
	clearError: function(animate) {
		// clear last error
		app.hideMessage(animate);
		$('.invalid').removeClass('invalid');
	},
	
	showMessage: function(type, msg, lifetime) {
		// show success, warning or error message
		// Dialog.hide();
		var icon = '';
		switch (type) {
			case 'success': icon = 'check-circle'; break;
			case 'warning': icon = 'exclamation-circle'; break;
			case 'error': icon = 'exclamation-triangle'; break;
		}
		if (icon) {
			msg = '<i class="fa fa-'+icon+' fa-lg" style="transform-origin:50% 50%; transform:scale(1.25); -webkit-transform:scale(1.25);">&nbsp;&nbsp;&nbsp;</i>' + msg;
		}
		
		$('#d_message_inner').html( msg );
		$('#d_message').hide().removeClass().addClass('message').addClass(type).show(250);
		
		if (this.messageTimer) clearTimeout( this.messageTimer );
		if ((type == 'success') || lifetime) {
			if (!lifetime) lifetime = 8;
			this.messageTimer = setTimeout( function() { app.hideMessage(500); }, lifetime * 1000 );
		}
	},
	
	hideMessage: function(animate) {
		if (animate) $('#d_message').hide(animate);
		else $('#d_message').hide();
	},
	
	showDialog: function(title, inner_html, buttons_html) {
		// show dialog using our own look & feel
		var html = '';
		html += '<div class="dialog_title">' + title + '</div>';
		html += '<div class="dialog_content">' + inner_html + '</div>';
		html += '<div class="dialog_buttons">' + buttons_html + '</div>';
		Dialog.showAuto( "", html );
	},
	
	hideDialog: function() {
		Dialog.hide();
		delete this.confirm_callback;
	},
	
	confirm: function(title, html, ok_btn_label, callback) {
		// show simple OK / Cancel dialog with custom text
		// fires callback with true (OK) or false (Cancel)
		if (!ok_btn_label) ok_btn_label = "OK";
		this.confirm_callback = callback;
		
		var inner_html = "";
		inner_html += '<div style="width:450px; font-size:13px; color:#444;">'+html+'</div>';
		
		var buttons_html = "";
		buttons_html += '<center><table><tr>';
			buttons_html += '<td><div class="button" style="width:100px; font-weight:normal;" onMouseUp="app.confirm_click(false)">Cancel</div></td>';
			buttons_html += '<td width="60">&nbsp;</td>';
			buttons_html += '<td><div class="button" style="width:100px;" onMouseUp="app.confirm_click(true)">'+ok_btn_label+'</div></td>';
		buttons_html += '</tr></table></center>';
		
		this.showDialog( title, inner_html, buttons_html );
	},
	
	confirm_click: function(result) {
		// user clicked OK or Cancel in confirmation dialog, fire callback
		// caller MUST deal with Dialog.hide() if result is true
		this.confirm_callback(result);
		if (!result) Dialog.hide();
		delete this.confirm_callback;
	},
	
	getSampleCode: function(show_all) {
		// serialize filters into sample code
		var doc = app.doc;
		var actions = [];
		
		if (!doc.actions.length) return '';
		
		// build transform list
		doc.actions.forEach( function(filter) {
			actions.push({
				name: filter.__name,
				params: filter.getSampleCodeParams(show_all) 
			});
		} );
		
		var fmt = doc.format.toLowerCase().replace(/jpeg/, 'jpg');
		var filename = "my_image." + fmt;
		
		var code = '';
		code += "var CanvasPlus = require('pixl-canvas-plus');\n";
		code += "var canvas = new CanvasPlus();\n\n";
		
		// shift load action, as that is handled separately
		var first = actions.shift();
		var indent = "";
		if (first.name == 'load') {
			var url = first.params.url || first.params.image;
			code += "canvas.load( '" + url + "', function(err) {\n";
			code += "\tif (err) throw err;\n";
			indent = "\t";
		}
		else if (first.name == 'create') {
			// code += "canvas.create("+JSON.stringify(first.params)+", function(err) {\n";
			code += "canvas.create(" + JSON.stringify(first.params, null, "\t") + ");\n";
		}
		else {
			return ''; // invalid first filter
		}
		
		// format code from each filter
		actions.forEach( function(action) {
			code += "\n";
			if (action.params._before) {
				action.params._before.forEach( function(line) {
					code += indent + line + "\n";
				});
			}
			
			var params = {};
			for (var key in action.params) {
				if (!key.match(/^_/)) params[key] = action.params[key];
			}
			
			var json_raw = JSON.stringify(params, null, "\t");
			if (indent) json_raw = json_raw.replace(/\n/g, "\n" + indent);
			
			if (action.params._match && action.params._replace) {
				json_raw = json_raw.replace(action.params._match, action.params._replace);
			}
			
			if (json_raw == "{}") json_raw = "";
			
			// uglify arrays
			json_raw = json_raw.replace(/\[([^\]]*)\]/g, function(m_all, m_g1) {
				return '[' + m_g1.replace(/\n\s*/g, ' ') + ']';
			});
			
			code += indent + "canvas." + action.name + "(" + json_raw + ");\n";
		} );
		
		// write action
		var write_opts = { format: doc.format };
		if (fmt == 'jpg') write_opts.quality = doc.quality;
		
		code += "\n";
		code += indent + "canvas.write(" + JSON.stringify(write_opts) + ", function(err, buf) {\n";
		code += indent + "\tif (err) throw err;\n\n";
		code += indent + "\t// 'buf' will be a binary buffer containing final image...\n";
		code += indent + "\trequire('fs').writeFileSync('" + filename + "', buf);\n";
		code += indent + "});\n";
		
		// end of load
		if (first.name == 'load') {
			code += "\n});\n";
		}
		
		return code;
	},
	
	showCode: function() {
		// show sample code dialog
		var code = this.getSampleCode(false);
		if (!code) return;
		
		var inner_html = '';
		inner_html += '<div class="code_dialog_show_all_button_container">';
			inner_html += '<table cellspacing="0" cellpadding="0"><tr><td><input type="checkbox" id="fe_code_dialog_show_all" value="1" onChange="app.changeSampleCodeDialogShowAll()"/></td>';
			inner_html += '<td><label for="fe_code_dialog_show_all">Show All Params</label></td></tr></table>';
		inner_html += '</div>';
		
		inner_html += '<div class="code_dialog_container">';
			inner_html += '<pre><code class="javascript">' + code + '</code></pre>';
		inner_html += '</div>';
		
		var buttons_html = '';
		buttons_html += '<div class="button center" style="width:100px;" onMouseUp="Dialog.hide()">OK</div>';
		
		this.showDialog("Sample Code For Current Image", inner_html, buttons_html);
		
		hljs.highlightBlock( $('#dialog_container pre code')[0] );
	},
	
	changeSampleCodeDialogShowAll: function() {
		// change sample code from show all params to only show non-default params
		var code = this.getSampleCode( $('#fe_code_dialog_show_all').is(':checked') );
		if (!code) return;
		
		var $code = $('#dialog_container pre code');
		$code.html( code );
		hljs.highlightBlock( $code[0] );
		Dialog.autoResize();
	},
	
	pickColor: function(orig_color, callback) {
		// pick color using RGB sliders in dialog
		var self = this;
		var html = '';
		
		var new_color = orig_color;
		if (!orig_color) orig_color = 'rgba(0, 0, 0, 0)';
		if (!new_color) new_color = 'rgba(0, 0, 0, 1.0)';
		
		html += '<div class="cpick_container">';
			html += '<div class="cpick_swatch_container">';
				html += '<div class="cpick_swatch checkerboard" style="left:10px; top:15px;"><div class="cpick_swatch_inner" style="background-color:'+orig_color+';"></div></div>';
				html += '<div class="cpick_swatch checkerboard" style="left:40px; top:45px; z-index:2;"><div id="d_clr_new" class="cpick_swatch_inner" style="background-color:'+new_color+';"></div></div>';
			html += '</div>';
			
			html += '<div class="info_label">Red</div>';
			html += '<div class="info_value">';
				html += '<input type="range" class="red" data-custom="red" data-type="int" min="0" max="255" step="1" value="0"/>';
				html += '<input type="text" class="range"/>';
			html += '</div>';
			
			html += '<div class="info_label">Green</div>';
			html += '<div class="info_value">';
				html += '<input type="range" class="green" data-custom="green" data-type="int" min="0" max="255" step="1" value="0"/>';
				html += '<input type="text" class="range"/>';
			html += '</div>';
			
			html += '<div class="info_label">Blue</div>';
			html += '<div class="info_value">';
				html += '<input type="range" class="blue" data-custom="blue" data-type="int" min="0" max="255" step="1" value="0"/>';
				html += '<input type="text" class="range"/>';
			html += '</div>';
			
			html += '<div class="info_label">Alpha</div>';
			html += '<div class="info_value">';
				html += '<input type="range" class="alpha" data-custom="alpha" data-type="int" min="0" max="255" step="1" value="0"/>';
				html += '<input type="text" class="range"/>';
			html += '</div>';
		html += '</div>';
		
		var buttons_html = "";
		buttons_html += '<center><table><tr>';
			buttons_html += '<td><div class="button" style="width:80px; font-weight:normal;" onMouseUp="app.confirm_click(false)">Cancel</div></td>';
			buttons_html += '<td width="60">&nbsp;</td>';
			buttons_html += '<td style="position:relative">';
				buttons_html += '<input id="fe_clr" type="color" style="position:absolute; width:1px; height:1px; opacity:0; margin:0; padding:0; border:1px solid transparent;"/>';
				buttons_html += '<div class="button" style="width:80px; font-weight:normal;" onMouseUp="app.openSystemColorPicker()">System...</div>';
			buttons_html += '</td>';
			buttons_html += '<td width="60">&nbsp;</td>';
			buttons_html += '<td><div class="button" style="width:80px;" onMouseUp="app.confirm_click(true)">Select</div></td>';
		buttons_html += '</tr></table></center>';
		
		// popup dialog
		this.showDialog( "Choose Color", html, buttons_html );
		
		// populate ranges, add input hook
		var $cont = $('#dialog_container');
		var color = parseColor(new_color);
		
		$cont.find('input[data-custom=red]').val( color.r );
		$cont.find('input[data-custom=green]').val( color.g );
		$cont.find('input[data-custom=blue]').val( color.b );
		$cont.find('input[data-custom=alpha]').val( color.a );
		
		this.setupRanges( $cont );
		
		// trigger change on range slide
		$cont.find('input[type=range]')
			.on('input.range', function() {
				$(this).trigger('change.range');
			})
			.on('change.range', function() {
				self.updateColorPickerColor();
			});
		
		// hook system picker for changes
		$('#fe_clr')
			.val( '#' + zeroPad(color.r.toString(16), 2) + zeroPad(color.g.toString(16), 2) + zeroPad(color.b.toString(16), 2) )
			.on('change', function() {
				var clr = parseColor( $(this).val() );
				$cont.find('input[data-custom=red]').val( clr.r ).trigger('change.range');
				$cont.find('input[data-custom=green]').val( clr.g ).trigger('change.range');
				$cont.find('input[data-custom=blue]').val( clr.b ).trigger('change.range');
				self.updateColorPickerColor();
			});
		
		// user dismissed dialog
		this.confirm_callback = function(result) {
			// color picker is complete
			if (result) {
				var color_str = self.getColorPickerColor();
				self.hideDialog();
				callback( color_str );
			}
			else callback(false);
		};
	},
	
	openSystemColorPicker: function() {
		// from inside color picker dialog, this pops open the OS system picker
		var color_str = this.getColorPickerColor( true );
		$('#fe_clr').val( color_str ).click();
	},
	
	getColorPickerColor: function(force_hex) {
		// get current color from picker sliders
		var $cont = $('#dialog_container');
		var color_str = '';
		var color = {
			r: parseInt( $cont.find('input[data-custom=red]').val() ),
			g: parseInt( $cont.find('input[data-custom=green]').val() ),
			b: parseInt( $cont.find('input[data-custom=blue]').val() ),
			a: parseInt( $cont.find('input[data-custom=alpha]').val() )
		};
		if ((color.a < 255) && !force_hex) {
			var alpha = shortFloat( color.a / 255 );
			color_str = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + alpha + ')';
		}
		else {
			// color_str = 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')';
			color_str = '#' + zeroPad(color.r.toString(16), 2) + zeroPad(color.g.toString(16), 2) + zeroPad(color.b.toString(16), 2);
		}
		return color_str;
	},
	
	updateColorPickerColor: function() {
		// update current color from picker sliders
		var color_str = this.getColorPickerColor();
		$('#d_clr_new').css('background-color', color_str);
	},
	
	setupDialogKeyCapture: function() {
		// support enter and esc keys while in dialogs
		$(window).on('keydown', function(event) {
			if (Dialog.active) {
				switch (event.keyCode) {
					case 27: // ESC
						if (app.confirm_callback) app.confirm_click(false);
						else Dialog.hide();
					break;
					
					case 13: // Enter
						if (!isTextAreaFocused()) {
							if (app.confirm_callback) app.confirm_click(true);
							else Dialog.hide();
						}
					break;
				} // switch keyCode
			} // Dialog.active
		}); // keydown
	},
	
	setupMouseEvents: function() {
		// capture mouse events and route to custom object, if applicable
		$(window).on('mousemove', function(event) {
			if (app.mouseHandler) app.mouseHandler.mouseMove(event);
		});
		$(window).on('mouseup', function(event) {
			if (app.mouseHandler) {
				app.mouseHandler.mouseUp(event);
				delete app.mouseHandler;
			}
		});
	}
	
};
