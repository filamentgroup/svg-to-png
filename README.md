:warning: This project is archived and the repository is no longer maintained.

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
`.convert`

### Required Params

#### Input
Type: `String` or `Array`

The Input can be one of: A `String` that is the file being converted, a
`String` that is a directory of files to be converted, or an `Array` of
files to convert.

Note: The files passed in MUST ALL be SVGs. If you want to pass in a
directory that is not all SVGs, use `fs.readdir`, filter the results,
and pass those in. An error will be thrown otherwise.

#### Output
Type: `String`

Output folder

### Optional Params

#### Options
Type: `Object`

* `defaultWidth`: normally 400px
* `defaultHeight`: normally 300px
* `compress`: Default `false`, if `true`, will compress your png file
  using optipng
* `optimizationLevel`: Default `3`, if compress is set to `true`, this will set the optimationLevel for optipng
* `debug`: enables console log output

## Examples
Check out the tests!

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Roadmap

This repository is now using [lodash style issue management](https://twitter.com/samselikoff/status/991395669016436736) for enhancements. This means enhancement issues will now be closed instead of leaving them open.

The enhancement backlog can be found here: https://github.com/filamentgroup/svg-to-png/issues?utf8=%E2%9C%93&q=label%3Aneeds-votes+sort%3Areactions-%2B1-desc+

Don’t forget to upvote the top comment of each issue with 👍!

## Release History
* v2.0.0 - Breaking change, pngfolder no longer works nor is there at
	all as an option. Relic of a time where it was necessary.
* v1.0.0 - Take arrays, add minification capabilities
* v0.7.0 - Update Phantom for cert error
* v0.6.0 - Phantom bug fix
* v0.5.0 - Error Handling
* v0.4.0 - File separators for Windows
* v0.3.0 - Tests and Bug Fixes
* v0.2.0 - API change
* v0.1.0 - Hey, released this thing

## License
Copyright (c) 2013 Jeffrey Lembeck/Filament Group  
Licensed under the MIT license.
