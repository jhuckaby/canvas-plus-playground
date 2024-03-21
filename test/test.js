// Run generated refset data as unit test suite
// Usage: npm test --> pixl-unit test.js

var fs = require('fs');
var os = require('os');
var Path = require('path');
var Class = require('pixl-class');
var CanvasPlus = require('pixl-canvas-plus');
var cli = require('pixl-cli');

cli.global();
var args = cli.args;
var Tools = cli.Tools;
var async = Tools.async;
var glob = Tools.glob;
var mkdirp = Tools.mkdirp;

var tests = require('./data.json');
var SIZE_PCT_MAX = 5;
var HASH_DIST_MAX = 1;

// dirty up the global namespace so browser playground filter code works in node.js land
global.Class = Class;
global.CanvasPlus = CanvasPlus;
global.app = { filters: {} };
global.copyHash = Tools.copyHash;
global.copyHashRemoveKeys = Tools.copyHashRemoveKeys;

// load playground filters
require( '../js/filters.js' );
glob.sync( '../js/filters/*.js' ).forEach( function(file) {
	require( file );
} );

// load HTML template for refset report
var html_template = fs.readFileSync( 'report-template.html', 'utf8' );
var html = '';
var toc_failures = '';
var toc_passes = '';

//
// From this point on, current working directory will be for the parent module
//

// chdir to the proper root dir so paths to images and fonts work as expected
process.chdir( Path.dirname( __dirname ) );

// create and/or empty output dir if needed
var output_dir = 'test/output';
if (!fs.existsSync(output_dir)) mkdirp.sync( output_dir );
glob.sync( output_dir + '/*' ).forEach( function(file) {
	fs.unlinkSync( file );
});

app.doc = {
	actions: [],
	format: 'png',
	quality: 90
};

exports.setUp = function(callback) {
	// do some setup here
	(new CanvasPlus()).loadFont( 'fonts/open-sans-regular.ttf' );
	callback();
};

exports.tests = tests.map( function(data, idx) {
	var func = function(test) {
		app.runTest( test, data );
	};
	data.idx = idx;
	data.num = idx + 1;
	func.testName = data.name;
	return func;
} );

exports.onAssertFailure = function(test, msg, data) {
	if (!test._failures) test._failures = [];
	test._failures.push(msg);
};

exports.tearDown = function(callback) {
	// do some shutdown stuff here
	app.finish();
	callback();
};

app.resetDocument = function() {
	// reset everything for new test
	this.doc.actions = [];
	this.doc.format = 'jpeg';
	this.doc.quality = 90;
};

app.freeze = function(obj) {
	// pack object into serialized string, as small as possible, preserving unicode, base64 output
	var str = JSON.stringify(obj);
	
	// pre-encode tilde chars, as they will be our unicode control char
	str = str.replace(/\~/g, '~7E');
	
	// now encode all high-ascii / unicode to hex using tilde prefix
	str = str.replace(/([\x80-\xFF\x00-\x08\x0B-\x0C\x0E-\x1F\u00FF-\uFFFF]+)/g, function(m_all, m_g1) {
		return encodeURIComponent(m_g1).replace(/\%/g, '~');
	});
	
	// finally, base-64 the whole thing
	return Buffer.from(str).toString('base64');
};

app.defrost = function(b64) {
	// unpack and decode base-64 frozen string, return original object
	var str = Buffer.from(b64, 'base64').toString();
	
	// decode special tilde-hex syntax for high-ascii (and natural tildes)
	str = str.replace(/(\~[0-9A-F\~]+)/g, function(m_all, m_g1) {
		return decodeURIComponent( m_g1.replace(/\~/g, '%') );
	});
	
	// finally, parse JSON back into object
	return JSON.parse(str);
};

app.parseQueryString = function(url) {
	// parse query string into key/value pairs and return as object
	// dupe query params become array
	var query = {}; 
	
	url.replace(/^.*\?/, '').replace(/([^\=]+)\=([^\&]*)\&?/g, function(match, key, value) {
		var value = decodeURIComponent(value);
		if (value.match(/^\-?\d+$/)) value = parseInt(value);
		else if (value.match(/^\-?\d*\.\d+$/)) value = parseFloat(value);
		if (key in query) {
			if (Tools.isaArray(query[key])) query[key].push( value );
			else query[key] = [ query[key], value ];
		}
		else query[key] = value;
		return '';
	} );
	
	return query; 
};

app.runTest = function(test, data) {
	// run single test
	var self = this;
	var query = app.parseQueryString( data.uri );
	var doc = this.doc;
	
	this.resetDocument();
	
	doc.format = query.f || 'png';
	doc.quality = parseInt( query.q || 90 );
	
	doc.actions = [];
	var t = query.t || [
		'load/' + app.freeze({ image: 'waterfall.jpg' }),
		'resize/' + app.freeze({ width: 640, height: 480, mode: 'fit' })
	];
	if (!Tools.isaArray(t)) t = [t];
	
	t.forEach( function(trans_raw) {
		var transform = null;
		if (trans_raw.match(/^(\w+)\/(.+)$/)) {
			var trans_name = RegExp.$1;
			var json_raw = RegExp.$2;
			var transform = { n: trans_name, p: {} };
			
			try { transform.p = app.defrost(json_raw); }
			catch (e) {;}
			
			if (transform && transform.n) self.addFilter( transform.n, transform.p || {} );
		}
	} );
	
	this.refreshImage(test, data);
};

app.addFilter = function(name, params) {
	// add new filter action to document
	var filter = new app.filters[name]();
	filter.params = Tools.mergeHashes( Tools.copyHash(filter.defaultParams || {}, true), params || {} );
	
	// override font for testing
	if (name == 'text') {
		filter.params.font = 'fonts/open-sans-regular.ttf';
	}
	
	// create/load filters always get prepended to top of list
	if (name.match(/^(create|load)$/)) app.doc.actions.unshift( filter );
	else app.doc.actions.push( filter );
};

app.refreshImage = function(test, data) {
	// some ops are async, so make sure only one of these runs at a time
	var self = this;
	var doc = this.doc;
	
	// rebuild image from filters
	this.canvas = new CanvasPlus();
	this.canvas.set('debug', args.debug || args.verbose);
	
	if (!this.doc.actions[0].__name.match(/^(create|load)$/)) {
		return test.fatal( "The first filter in your document needs to be either 'Create' or 'Load'." );
	}
	
	// apply all filters
	async.eachSeries( this.doc.actions,
		function(filter, callback) {
			// execute single filter (action)
			filter.run( self.canvas, callback );
		},
		function(err) {
			if (err) return callback(err);
			if (!self.canvas.get('mode')) return test.fatal("Canvas has no mode set");
			
			// generate output image
			var opts = {
				format: doc.format,
				quality: doc.quality
			};
			self.canvas.write( opts, function(err, buf) {
				if (err) return callback(err);
				
				var width = self.canvas.get('width');
				var height = self.canvas.get('height');
				var mode = self.canvas.get('mode');
				var metrics = self.canvas.getMetrics();
				var size = metrics.counters.bytes_written || 0;
				
				test.debug( "Performance Metrics: " + JSON.stringify(metrics) );
				
				var ref = {
					width: width, 
					height: height, 
					mode: mode, 
					size: size,
					// hash: self.canvas.hash()
				};
				
				var image_filename = data.num + '.' + doc.format;
				var image_file = 'test/output/' + image_filename;
				// verbose("Writing file: " + image_file + "\n" );
				fs.writeFileSync( image_file, buf );
				
				// reload image back into separate canvas to generate hash
				// this fully tests the round trip
				var temp_canvas = new CanvasPlus();
				// temp_canvas.set('debug', args.debug || args.verbose);
				
				temp_canvas.load( buf, function(err) {
					if (err) die("Failed to reload image after writing: " + err + "\n");
					
					// generate hash
					ref.hash = temp_canvas.hash();
					// verbose("Hash: " + test.ref.hash + "\n");
					
					// compare data to reference copy
					test.ok( ref.width == data.ref.width, "Width does not match reference image: " + ref.width + " != " + data.ref.width );
					test.ok( ref.height == data.ref.height, "Height does not match reference image: " + ref.height + " != " + data.ref.height );
					test.ok( ref.mode == data.ref.mode, "Mode does not match reference image: " + ref.mode + " != " + data.ref.mode );
					
					// file size needs to be within +/- N%
					var pct = Math.round( (ref.size / data.ref.size) * 100 );
					var pct_diff = Math.abs( 100 - pct );
					test.ok( pct_diff <= SIZE_PCT_MAX, "File size difference is outside acceptable range (diff:" + pct_diff + "%, size:" + ref.size + ", ref:" + data.ref.size + ")", { size: ref.size, ref: data.ref.size } );
					
					// hash distance needs to be within N
					var hdiff = self.canvas.hammingDistance( ref.hash, data.ref.hash );
					test.ok( hdiff <= HASH_DIST_MAX, "Hash distance is outside acceptable range (diff:" + hdiff + ")", { hash: ref.hash, ref: data.ref.hash } );
					
					// shove data into HTML
					if (test.failed) {
						// failed
						toc_failures += '<p><a href="#test' + data.num + '">#' + data.num + ": " + data.name + '</a></p>';
					}
					else {
						// passed
						toc_passes += '<p><a href="#test' + data.num + '">#' + data.num + ": " + data.name + '</a></p>';
					}
					
					html += '<a id="test' + data.num + '"></a>';
					html += '<details ' + (test.failed ? 'open' : '') + '>';
					html += '<summary class="test_header ' + (test.failed ? 'failed' : '') + '">Test #' + data.num + ': ' + data.name + '</summary>';
					
					// html += '<img src="' + image_filename + '">';
					html += '<div><div class="checkerboard" style="display:inline-block; width:' + width + 'px; height:' + height + 'px;"><img src="' + image_filename + '" width="' + width + '" height="' + height + '"></div></div>';
					
					html += '<div class="test_footer">';
					if (test._failures) {
						html += '<p><b>Failures:</b> ' + test._failures.join(', ') + '</p>';
					}
					html += '<p>' + [
						width + 'x' + height,
						mode.toUpperCase() + ' ' + doc.format.toUpperCase(),
						doc.quality + '%',
						Tools.getTextFromBytes( size )
					].join(', ') + '</p>';
					html += '<p>Hash: ' + ref.hash + ' &lt;=&gt; ' + data.ref.hash + ' (Dist: ' + hdiff + ')</p>';
					html += '<p><a href="' + data.uri + '" target="_blank">View in Playground</a></p>';
					html += '</div>';
					
					html += '</details>';
					html += "\n";
					
					// next test!
					setTimeout( function() { test.done(); }, 1 );
					
				}); // load
			}); // canvas.write
		} // all filters done
	); // eachSeries
};

app.finish = function(err) {
	// all done!
	if (err) {
		die( "\nERROR: " + err + "\n\n" );
	}
	
	print( bold("\nRun complete!\n") );
	
	if (!toc_failures) toc_failures = '(None)';
	if (!toc_passes) toc_passes = '(None)';
	
	var info = '<pre>';
	info += os.hostname + ", " + (new Date()).toLocaleString() + "\n";
	info += 
		"Node.js " + process.version + 
		" (" + os.type() + " " + os.platform() + " " + os.arch() + " " + 
		os.release() + ", " + Math.floor( os.totalmem() / 1024 / 1024 ) + " MB RAM)\n";
	info += "canvas-plus v" + require('pixl-canvas-plus/package').version + "\n";
	info += tests.length + " total tests in suite.\n";
	info += '</pre>';
	
	var report_html = Tools.sub( html_template, { 
		toc_failures: toc_failures, 
		toc_passes: toc_passes, 
		info: info,
		results: html 
	} );
	fs.writeFileSync( output_dir + '/report.html', report_html );
		
	print( "\nSee output/report.html for an HTML image report.\n" );
	print( "Exiting.\n\n" );
};
