/*
 * svg-to-png
 * https://github.com/filamentgroup/svg-to-png
 *
 * Copyright (c) 2013 Jeffrey Lembeck/Filament Group
 * Licensed under the MIT license.
 */

/*global require:true*/
/*global __dirname:true*/
/*global console:true*/
(function(exports) {

	"use strict";

	var os = require( 'os' );
	var fs = require( 'fs' );
	var path = require( 'path' );
	var Imagemin = require('imagemin');

	var RSVP = require( './rsvp' );
	var phantomJsPath = require('phantomjs').path;
	var phantomfile = path.join( __dirname, 'phantomscript.js' );
	var execFile = require('child_process').execFile;

	
	var isWin = os.platform() === "win32";
	
	var pngDefault;
	if( isWin ){
		pngDefault = "''";
	} else {
		pngDefault = "";
	}

	exports.convert = function( input, output, opts ){
		opts = opts || {};

		var files;
		if( typeof input === "string" && fs.lstatSync( input ).isDirectory()){
			files = fs.readdirSync( input ).map( function( file ){
				return path.join( input, file );
			});
		} else if( Array.isArray( input ) ){
			files = input;
		} else {
			throw new Error( "Input must be Array of files or String that is a directory" );
		}

		files = files.filter( function( file ){
			var ext = path.extname(file);
			return ext === ".svg" || ext === ".png";
		});

		if( !files.length ){
			throw new Error( "Input must be Array of SVG or PNG files or String that is a directory that contains some of those" );
		}

		if( typeof output !== "string" ){
			throw new Error( "Output folder must be defined and a String" );
		}

		opts.pngfolder = opts.pngfolder || pngDefault;


		if( !opts.defaultWidth ){
			opts.defaultWidth = "400px";
		}

		if( !opts.defaultHeight ){
			opts.defaultHeight = "300px";
		}

		// take it to phantomjs to do the rest
		console.log( "svg-to-png now spawning phantomjs..." );
		console.log('(using path: ' + phantomJsPath + ')');

		return new RSVP.Promise(function(resolve, reject){
			execFile( phantomJsPath,
				[
					phantomfile,
					JSON.stringify(files),
					output,
					opts.pngfolder,
					opts.defaultWidth,
					opts.defaultHeight
				],

				function(err, stdout, stderr){
					if( err ){
						console.log("\nSomething went wrong with phantomjs...");
						if( stderr ){
							console.log( stderr );
						}
						reject( err );
					} else {
						console.log( stdout );
						resolve( output );
					}
				});

			});

	};

	exports.minify = function(srcDir, destDir, opts){
		opts = opts || {};
		opts.optimizationLevel = opts.optimizationLevel || 3;

		var imagemin = new Imagemin()
				.src( srcDir + '/*.{gif,jpg,png,svg}' )
				.dest(destDir)
				.use(Imagemin.optipng(opts));

		return new RSVP.Promise(function(resolve, reject){
			imagemin.run(function (err, files) {
				if (err) {
					reject(err);
				}

				resolve(files);
			});
		});

	};

}(typeof exports === 'object' && exports || this));

