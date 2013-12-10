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
	var fs = require( "fs" );
	var RSVP = require('./rsvp');
	var processor = require('./processor');

	var options = {
		inputdir: phantom.args[0],
		dest: phantom.args[1],
		pngout:  phantom.args[2],
		defaultWidth: phantom.args[3],
		defaultHeight: phantom.args[4]
	};

	if( !options.inputdir.match( '/' + '$' ) ){
		options.inputdir += '/';
	}
	if( !options.dest.match( '/' + '$' ) ){
		options.dest += '/';
	}
	if( options.pngout !== undefined && options.pngout !== "" && !options.pngout.match( '/' + '$' ) ){
		options.pngout += '/';
	}

	var files = fs.list( options.inputdir );
	var promises = [];

	files = files.filter( function( file ){
		var svgRegex = /\.svg$/i,
			pngRegex = /\.png$/i,
			isSvg = file.match( svgRegex ),
			isPng = file.match( pngRegex );

		return isSvg || isPng;
	});

	files.forEach( function( file ){
		promises.push( processor.processFile( file, options ) );
	});


	RSVP.all( promises ).then( function(){
		phantom.exit();
	});
})();
