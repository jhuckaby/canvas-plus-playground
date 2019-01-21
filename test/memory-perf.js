// Memory leak and performance test

var Path = require('path');
var CanvasPlus = require('pixl-canvas-plus');
var cli = require('pixl-cli');

cli.global();
var args = cli.args;
var Tools = cli.Tools;
var async = Tools.async;
var glob = Tools.glob;
var mkdirp = Tools.mkdirp;

// chdir to the proper root dir so paths to images and fonts work as expected
process.chdir( Path.dirname( __dirname ) );

async.timesSeries( 100,
	function(idx, callback) {
		
		var canvas = new CanvasPlus();
		
		canvas.load( 'images/samples/html5-logo.png', function(err) {
			if (err) throw err;
			
			canvas.resize({
				"width": 200,
				"height": 200,
				"mode": "fitpad",
				"background": "#ffffff"
			});
			
			// Note: Fonts are handled differently in the browser vs. Node.js.
			// Please see https://github.com/jhuckaby/canvas-plus#fonts for details.
			canvas.text({
				"text": "HELLO",
				"font": "Arial",
				"size": 24,
				"color": "rgba(255, 0, 0, 1.0)",
				"gravity": "center"
			});
			
			canvas.write({"format":"jpeg","quality":100}, function(err, buf) {
				if (err) throw err;
				
				console.log( "\n#" + idx + ": " + 
					Math.floor( process.memoryUsage().rss / 1024 / 1024 ) + " MB in use",
				);
				console.log( "Perf: " + JSON.stringify(canvas.perf.metrics()) );
				
				callback();
				
			}); // canvas.write
		}); // canvas.load
		
	},
	function() {
		console.log("\nThe end!\n");
	}
);
