// Generate reference set from test defs

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

var tests = require('./refset-defs.js').tests;

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
var html_template = fs.readFileSync( 'refset-template.html', 'utf8' );
var html = '';

//
// From this point on, current working directory will be for the parent module
//

// chdir to the proper root dir so paths to images and fonts work as expected
process.chdir( Path.dirname( __dirname ) );

// create and/or empty refset dir if needed
var refset_dir = 'test/refset';
if (!fs.existsSync(refset_dir)) mkdirp.sync( refset_dir );
glob.sync( refset_dir + '/*' ).forEach( function(file) {
	fs.unlinkSync( file );
});

app.doc = {
	actions: [],
	format: 'png',
	quality: 90
};

app.run = function() {
	print( bold("\nCanvasPlus Test Reference Set Generator\n") );
	print( 
		"Node.js " + process.version + 
		" (" + os.type() + " " + os.platform() + " " + os.arch() + " " + 
		os.release() + ", " + Math.floor( os.totalmem() / 1024 / 1024 ) + " MB RAM)\n"
	);
	print( "canvas-plus v" + require('pixl-canvas-plus/package').version + "\n" );
	print( tests.length + " images in set.\n" );
	
	verbose("Loading font...\n");
	(new CanvasPlus()).loadFont( 'fonts/open-sans-regular.ttf' );
	
	verbose("Generating ref images...\n");
	async.eachOfSeries( 
		tests,
		async.ensureAsync( app.runTest.bind(app) ),
		app.finish.bind(app)
	);
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

app.runTest = function(test, idx, callback) {
	// run single test
	var self = this;
	var query = app.parseQueryString( test.uri );
	var doc = this.doc;
	
	print( "\nImage #" + Math.floor(idx + 1) + '/' + tests.length + ": " + test.name + "\n" );
	
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
	
	this.testIdx = idx;
	this.testNum = idx + 1;
	this.refreshImage(test, callback);
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

app.refreshImage = function(test, callback) {
	// some ops are async, so make sure only one of these runs at a time
	var self = this;
	var doc = this.doc;
	
	// rebuild image from filters
	this.canvas = new CanvasPlus();
	this.canvas.set('debug', args.debug || args.verbose);
	
	if (!this.doc.actions[0].__name.match(/^(create|load)$/)) {
		return callback( new Error("The first filter in your document needs to be either 'Create' or 'Load'.") );
	}
	
	// apply all filters
	async.eachSeries( this.doc.actions,
		function(filter, callback) {
			// execute single filter (action)
			filter.run( self.canvas, callback );
		},
		function(err) {
			if (err) return callback(err);
			if (!self.canvas.get('mode')) return callback( new Error("Canvas has no mode set") );
			
			verbose("Generating output image...\n");
			
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
				
				verbose( "Performance Metrics: " + JSON.stringify(metrics) + "\n" );
				
				html += '<a id="' + self.testNum + '"></a>';
				html += '<div class="test_header">Test #' + self.testNum + ': ' + test.name + '</div>';
				
				test.ref = {
					width: width, 
					height: height, 
					mode: mode, 
					size: size,
					// hash: self.canvas.hash()
				};
				
				var image_filename = self.testNum + '.' + doc.format;
				var image_file = 'test/refset/' + image_filename;
				verbose("Writing file: " + image_file + "\n" );
				fs.writeFileSync( image_file, buf );
				
				// reload image back into separate canvas to generate hash
				// this fully tests the round trip
				var temp_canvas = new CanvasPlus();
				// temp_canvas.set('debug', args.debug || args.verbose);
				
				temp_canvas.load( buf, function(err) {
					if (err) die("Failed to reload image after writing: " + err + "\n");
					
					// generate hash
					test.ref.hash = temp_canvas.hash();
					verbose("Hash: " + test.ref.hash + "\n");
					
					// shove data into HTML
					html += '<div><div class="checkerboard" style="display:inline-block; width:' + width + 'px; height:' + height + 'px;"><img src="' + image_filename + '" width="' + width + '" height="' + height + '"></div></div>';
					
					html += '<div class="test_footer">' + [
						width + 'x' + height,
						mode.toUpperCase() + ' ' + doc.format.toUpperCase(),
						doc.quality + '%',
						Tools.getTextFromBytes( size ),
						test.ref.hash
					].join(', ') + '</div>';
					html += "\n";
				
					// next test!
					callback();
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
	
	var report_html = Tools.sub( html_template, { results: html } );
	fs.writeFileSync( refset_dir + '/report.html', report_html );
	fs.writeFileSync( refset_dir + '/data.json', JSON.stringify(tests, null, "\t") + "\n" );
	
	print( "\nSee refset/data.json for a full reference data set for unit testing.\n" );
	print( "See refset/report.html for an HTML image report.\n" );
	
	print( "\nIf all is well with the ref set, copy the data file out for future unit test runs:\n" );
	print( "cp refset/data.json ./\n\n" );
	
	print( "Exiting.\n\n" );
	
	process.exit(0);
};

app.run();
