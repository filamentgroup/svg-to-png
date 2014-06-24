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
(function( exports ){
	'use strict';

	var path = require( 'path' );
	var fs = require( 'fs' );
	var svg_to_png = require(path.join( "..", "lib", "svg-to-png.js") );


	exports.convert = {
		setUp: function(done) {
			// setup here
			done();
		},
		tearDown: function( done ){
			if( fs.existsSync( path.join( "test", "output", "bear.png" )) ){
				fs.unlinkSync( path.join("test", "output", "bear.png") );
			}
			if( fs.existsSync( path.join( "test", "output", "png", "bear.png" )) ){
				fs.unlinkSync( path.join( "test", "output", "png", "bear.png") );
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
				svg_to_png.convert(path.join("test", "files"));
			}, Error, "Should throw output error" );
			test.done();
		},
		'two args - first is dir': function(test) {
			test.expect(1);
			// tests here
			svg_to_png.convert(path.join("test", "files"), path.join( "test","output") )
			.then( function(){
				test.ok( fs.existsSync( path.join( "test", "output", "bear.png" ) ) );
				test.done();
			});
		},
		'two args - first is dir w/ pngout': function(test) {
			test.expect(1);
			// tests here
			svg_to_png.convert(path.join("test", "files"), path.join("test", "output"), { pngfolder: "png" } )
			.then( function(){
				test.ok( fs.existsSync( path.join( "test", "output", "png", "bear.png" )) );
				test.done();
			});
		}
	};
	exports.convertWithDir = {
		setUp: function(done) {
			// setup here
			done();
		},
		tearDown: function( done ){
			if( fs.existsSync( path.join( "test", "output", "bear.png" )) ){
				fs.unlinkSync( path.join("test", "output", "bear.png") );
			}
			if( fs.existsSync( path.join( "test", "output", "png", "bear.png" )) ){
				fs.unlinkSync( path.join( "test", "output", "png", "bear.png") );
			}
			done();
		},
		'two args - first is file that doesn\'t exist': function(test) {
			test.expect(1);
			// tests here
			svg_to_png.convert( path.join("test", "files", "foo.svg"), path.join( "test","output") )
			.then( function(){
			}, function(err){
				test.ok( err );
				test.done();
			});
		},
		'two args - first is file': function(test) {
			test.expect(1);
			// tests here
			svg_to_png.convert(path.join("test", "files", "bear.svg"), path.join( "test","output") )
			.then( function(){
				test.ok( fs.existsSync( path.join( "test", "output", "bear.png" ) ) );
				test.done();
			});
		},
		'two args - first is file w/ pngout': function(test) {
			test.expect(1);
			// tests here
			svg_to_png.convert(path.join("test", "files", "bear.svg"), path.join("test", "output"), { pngfolder: "png" } )
			.then( function(){
				test.ok( fs.existsSync( path.join( "test", "output", "png", "bear.png" )) );
				test.done();
			});
		}
	};
}(typeof exports === 'object' && exports || this));
