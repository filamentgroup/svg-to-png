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

	var path = require( 'path' );
	var RSVP = require( './rsvp' );
	var phantomJsPath = require('phantomjs').path;
	var phantomfile = path.join( __dirname, 'phantomscript.js' );
	var execFile = require('child_process').execFile;

	exports.convert = function( input, output, opts ){
		opts = opts || {};
		var promise = new RSVP.Promise();
		// take it to phantomjs to do the rest
		console.log( "svg-to-png now spawning phantomjs..." );
		console.log('(using path: ' + phantomJsPath + ')');

		if( typeof input !== "string" ){
			throw new Error( "Input folder must be defined and a String" );
		}

		if( typeof output !== "string" ){
			throw new Error( "Output folder must be defined and a String" );
		}

		if( typeof opts.dest !== "string" ){
			throw new Error( "opts.dest must be defined" );
		}

		if( !opts.defaultWidth ){
			opts.defaultWidth = "400px";
		}

		if( !opts.defaultHeight ){
			opts.defaultHeight = "300px";
		}

		execFile( phantomJsPath,
			[
				phantomfile,
				input,
				opts.dest,
				output,
				opts.defaultWidth,
				opts.defaultHeight
			],

			function(err, stdout, stderr){
				if( err ){
					console.log("\nSomething went wrong with phantomjs...");
					promise.reject( err );
				}

				if( stderr ){
					console.log( stderr );
				}

				console.log( stdout );
				promise.resolve( opts.dest );
			});

		return promise;
	};

}(typeof exports === 'object' && exports || this));

