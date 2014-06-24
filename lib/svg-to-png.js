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
	var path = require( 'path' );
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
		var promise = new RSVP.Promise();

		if( typeof input !== "string" ){
			throw new Error( "Input folder must be defined and a String" );
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

		execFile( phantomJsPath,
			[
				phantomfile,
				input,
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
					promise.reject( err );
				} else {
					console.log( stdout );
					promise.resolve( opts.dest );
				}

			});

		return promise;
	};

}(typeof exports === 'object' && exports || this));

