/*global module:true*/
/*global require:true*/
(function(){
	"use strict";

	var fs = require( 'fs' ),
		path;


	var Gfile = function( filename ){
		var svgRegex = /\.svg$/i,
			pngRegex = /\.png$/i,
			isSvg = filename.match( svgRegex );

		this.filename = filename;
		this.isSvg = isSvg;
		this.filenamenoext = filename.replace( isSvg ? svgRegex : pngRegex, "" );
	};

	// TODO remove second two branches
	Gfile.prototype.setImageData = function( inputdir ){
		if( fs.readFileSync && this.isSvg ){
			this.imagedata = fs.readFileSync( path.join( inputdir , this.filename )).toString() || "";
		} else if( fs.readFileSync ){
		} else {
			this.imagedata = fs.read( inputdir + this.filename ) || "";
		}
	};


	module.exports = Gfile;

}());
