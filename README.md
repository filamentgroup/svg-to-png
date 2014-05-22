# svg-to-png [![Build Status](https://secure.travis-ci.org/filamentgroup/svg-to-png.png?branch=master)](http://travis-ci.org/filamentgroup/svg-to-png)

[![Filament Group](http://filamentgroup.com/images/fg-logo-positive-sm-crop.png) ](http://www.filamentgroup.com/)

Converts SVGs to PNGs

## Getting Started
Install the module with: `npm install svg-to-png`

```javascript
var svg_to_png = require('svg-to-png');

svg_to_png.convert("input", "output") // async, returns promise
.then( function(){
	// Do tons of stuff
});

```

## Documentation
.convert

Takes input, output special folder, and an options hash that include:

* pngfolder: A subdirectory (in the output) you might want the files to go into, normally ""
* defaultWidth: normally 400px
* defaultHeight: normally 300px

## Examples
Check out the tests!

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* v0.1.0 - Hey, released this thing
* v0.2.0 - API change

## License
Copyright (c) 2013 Jeffrey Lembeck/Filament Group  
Licensed under the MIT license.
