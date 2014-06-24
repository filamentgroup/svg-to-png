/*
 * grunticon
 * https://github.com/filamentgroup/grunticon
 *
 * Copyright (c) 2012 Scott Jehl, Filament Group, Inc
 * Licensed under the MIT license.
 */

/*global phantom:true*/
/*global require:true*/

/*
phantom args sent from grunticon.js:
	[0] - input directory path
	[1] - output directory path
	[2] - png folder name
	[3] - default width
	[4] - default height
*/

(function(){
	"use strict";

	var system = require("system");
	var fs = require( "fs" );

	phantom.onError = function(msg, trace) {
		var msgStack = ['PHANTOM ERROR: ' + msg];
		if (trace && trace.length) {
			msgStack.push('TRACE:');
			trace.forEach(function(t) {
				msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
			});
		}
		system.stderr.write( msgStack.join('\n') );
		phantom.exit(1);
	};

	var RSVP = require('./rsvp');
	var processor = require('./processor');

	var options = {
		inputdir: phantom.args[0],
		dest: phantom.args[1],
		pngout:  phantom.args[2],
		defaultWidth: phantom.args[3],
		defaultHeight: phantom.args[4]
	};

	if( fs.isDirectory( options.inputdir ) && !options.inputdir.match( fs.separator + '$' ) ){
		options.inputdir += fs.separator;
	}
	if( !options.dest.match( fs.separator + '$' ) ){
		options.dest += fs.separator;
	}
	if( options.pngout !== undefined && options.pngout !== "" && !options.pngout.match( fs.separator + '$' ) ){
		options.pngout += fs.separator;
	}

	var files;

	if( fs.isDirectory( options.inputdir ) ){
		files = fs.list( options.inputdir );
	} else {
		var filenameArr = options.inputdir.split( fs.separator );
		var filename = filenameArr[ filenameArr.length - 1 ];
		filenameArr.pop();
		if( !fs.exists( options.inputdir ) ){
			throw new Error( "File doesn't exist: " + filename );
		}
		options.inputdir = filenameArr.join( fs.separator ) + fs.separator;
		files = [ filename ];
	}
	var promises = [];

	files = files.filter( function( file ){
		var svgRegex = /\.svg$/i,
			pngRegex = /\.png$/i,
			isSvg = file.match( svgRegex ),
			isPng = file.match( pngRegex );

		return isSvg || isPng;
	});

	files.forEach( function( file ){
		promises.push( processor.processFile( options.inputdir + file, options ) );
	});


	RSVP.all( promises ).then( function(){
		phantom.exit();
	}, function(err){
		throw new Error( err );
	});
})();
