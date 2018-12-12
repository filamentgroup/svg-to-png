/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/

/*global require:true*/
/*global __dirname:true*/
(function( exports ){
	'use strict';

	var path = require( 'path' );
	var fs = require( 'fs' );
	var sizeOf = require( 'image-size' );
	var svg_to_png = require(path.join( "..", "lib", "svg-to-png.js") );

	exports.convert = {
		setUp: function(done) {
			// setup here
			done();
		},
		tearDown: function( done ){
			if( fs.existsSync( path.join( __dirname, "output", "bear.png" )) ){
				fs.unlinkSync( path.join(__dirname, "output", "bear.png") );
			}
			if( fs.existsSync( path.join( __dirname, "output", "png", "bear.png" )) ){
				fs.unlinkSync( path.join( __dirname, "output", "png", "bear.png") );
			}
			done();
		},
		'no args': function(test) {
			test.expect(1);
			// tests here
			test.throws( function(){
				svg_to_png.convert();
			}, Error, "Should throw input error" );
			test.done();
		},
		'one arg': function(test) {
			test.expect(1);
			// tests here
			test.throws( function(){
				svg_to_png.convert(path.resolve(path.join(__dirname, "files")));
			}, Error, "Should throw output error" );
			test.done();
		},
		'two args - first is dir': function(test) {
			test.expect(1);
			// tests here
			svg_to_png.convert(path.resolve(path.join(__dirname, "files")), path.resolve(path.join( __dirname,"output")) )
			.then( function(){
				test.ok( fs.existsSync( path.join( __dirname, "output", "bear.png" ) ) );
				test.done();
			});
		},
		'two args - first is dir w/ pngout': function(test) {
			test.expect(1);
			// tests here
			svg_to_png.convert(path.resolve(path.join(__dirname, "files")), path.resolve(path.join(__dirname, "output", "png")) )
			.then( function(){
				test.ok( fs.existsSync( path.join( __dirname, "output", "png", "bear.png" )) );
				test.done();
			});
		}
	};

	exports.checkOutputSize = {
		setUp: function(done) {
			// setup here
			done();
		},
		tearDown: function( done ){
			if( fs.existsSync( path.join( __dirname, "output", "Internet-44px-width-44px-height.png" )) ){
				fs.unlinkSync( path.join( __dirname, "output", "Internet-44px-width-44px-height.png" ) );
			}
			if( fs.existsSync( path.join( __dirname, "output", "Internet-no-width-no-height.png" )) ){
				fs.unlinkSync( path.join( __dirname, "output", "Internet-no-width-no-height.png" ) );
			}
			if( fs.existsSync( path.join( __dirname, "output", "Internet-100pct-width-100pct-height.png" )) ){
				fs.unlinkSync( path.join( __dirname, "output", "Internet-100pct-width-100pct-height.png" ) );
			}
			if( fs.existsSync( path.join( __dirname, "output", "Internet-100pct-width-100pct-height-no-viewbox.png" )) ){
				fs.unlinkSync( path.join( __dirname, "output", "Internet-100pct-width-100pct-height-no-viewbox.png" ) );
			}
			done();
		},
		'px width/height, and viewbox': function(test) {
			test.expect(1);
			// tests here
			svg_to_png.convert( path.join(__dirname, "viewbox", "Internet-44px-width-44px-height.svg" ), path.join( __dirname, "output" ) )
			.then( function(){
				sizeOf(path.join( __dirname, "output", "Internet-44px-width-44px-height.png" ), function (err, dimensions) {
					test.ok(dimensions.width === 44 && dimensions.height === 44);
					test.done();
				});
			});
		},
		'no width/height, and viewbox': function(test) {
			// tests here
			svg_to_png.convert( path.join(__dirname, "viewbox", "Internet-no-width-no-height.svg" ), path.join( __dirname, "output" ) )
			.then( function(){
				sizeOf(path.join( __dirname, "output", "Internet-no-width-no-height.png" ), function (err, dimensions) {
					test.ok(dimensions.width === 400 && dimensions.height === 300);
					test.done();
				});
			});
		},
		'100% width/height, and viewbox': function(test) {
			// tests here
			svg_to_png.convert( path.join(__dirname, "viewbox", "Internet-100pct-width-100pct-height.svg" ), path.join( __dirname, "output" ) )
			.then( function(){
				sizeOf(path.join( __dirname, "output", "Internet-100pct-width-100pct-height.png" ), function (err, dimensions) {
					test.ok(dimensions.width === 44 && dimensions.height === 44);
					test.done();
				});
			});
		},
		'% width/height, and no viewbox': function(test) {
			// tests here
			svg_to_png.convert( path.join(__dirname, "viewbox", "Internet-100pct-width-100pct-height-no-viewbox.svg" ), path.join( __dirname, "output" ) )
			.then( function(){
				sizeOf(path.join( __dirname, "output", "Internet-100pct-width-100pct-height-no-viewbox.png" ), function (err, dimensions) {
					test.ok(dimensions.width === 100 && dimensions.height === 100);
					test.done();
				});
			});
		}
	};

	exports.convertWithDir = {
		setUp: function(done) {
			// setup here
			done();
		},
		tearDown: function( done ){
			if( fs.existsSync( path.join( __dirname, "output", "bear.png" )) ){
				fs.unlinkSync( path.join(__dirname, "output", "bear.png") );
			}
			if( fs.existsSync( path.join( __dirname, "output", "png", "bear.png" )) ){
				fs.unlinkSync( path.join( __dirname, "output", "png", "bear.png") );
			}
			done();
		},
		'two args - first is file that doesn\'t exist': function(test) {
			test.expect(1);
			// tests here
			test.throws(function(){
				svg_to_png.convert( path.resolve( path.join(__dirname, "files", "foo.svg") ), path.resolve( path.join( __dirname,"output") ) );
			});
			test.done();
		},
		'two args - first is file that doesn\'t exist in array': function(test) {
			test.expect(1);
			// tests here
			test.throws(function() {
				svg_to_png.convert( [path.resolve( path.join(__dirname, "files", "foo.svg") )], path.resolve( path.join( __dirname,"output") ) );
			});
			test.done();
		},
		'two args - first is file': function(test) {
			test.expect(1);
			// tests here
			svg_to_png.convert(path.join(__dirname, "files", "bear.svg"), path.join(__dirname,"output") )
			.then( function(){
				test.ok( fs.existsSync( path.join(__dirname, "output", "bear.png" ) ) );
				test.done();
      })
      .catch(console.log);
		},
		'two args - first is file w/ pngout': function(test) {
			test.expect(1);
			// tests here
			svg_to_png.convert(path.join(__dirname, "files", "bear.svg"), path.join(__dirname, "output", "png") )
			.then( function(){
				test.ok( fs.existsSync( path.join(__dirname, "output", "png", "bear.png" )) );
				test.done();
			});
		}
	};

	exports.convertAndCompress = {
		setUp: function(done) {
			// setup here
			done();
		},
		tearDown: function( done ){
			if( fs.existsSync( path.join( __dirname, "output", "bear.png" )) ){
				fs.unlinkSync( path.join(__dirname, "output", "bear.png" ) );
			}
			done();
		},
		'two args - first is file': function(test) {
			test.expect(1);
			// tests here
			svg_to_png.convert(path.join(__dirname, "files", "bear.svg"), path.join( __dirname,"output"), {
				compress: true
			})
			.then( function(){
				test.ok( fs.existsSync( path.join( __dirname, "output", "bear.png" ) ) );
				test.done();
			});
		}
	};

	exports.convertAndCompressLarge = {
		setUp: function(done) {
			// setup here
			done();
		},
		tearDown: function( done ){
			var outputFiles = fs.readdirSync( path.resolve( path.join( __dirname, "output" ) ) )
			.map( function( file ){
				return path.resolve( path.join( __dirname, "output", file ) );
			});

			outputFiles.forEach(function( file ){
				if( fs.lstatSync( file ).isFile() ){
					fs.unlinkSync( file );
				} else {
					fs.rmdirSync( file );
				}
			});
			done();
		},
		'two args - first is arr': function(test) {
			test.expect(1);
			// tests here
			var bigDir = fs.readdirSync( path.resolve( path.join( __dirname, "big" ) ) )
			.map(function(file){
				return path.resolve( path.join( __dirname, "big", file ) );
			}),

			bigDirSVGs = bigDir.filter( function( file ){
				return path.extname(file) === ".svg";
			});

			svg_to_png.convert(
				bigDirSVGs,
				path.join( __dirname,"output"), {
				compress: true
			})
			.then( function(){
				test.ok( true );
				test.done();
			});
		}
	};
}(typeof exports === 'object' && exports || this));
