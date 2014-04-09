"use strict";

function BlgnMinifier() {

	this.UglifyJS = require("uglify-js");
	this.cssmin = require('ycssmin').cssmin;
	this.htmlMinifier = require('html-minifier');

	this.minifyHtml = function(input) {
		return this.htmlMinifier.minify(input, {
			removeComments: true,
			removeCommentsFromCDATA: true,
			collapseWhitespace: true,
			collapseBooleanAttributes: true,
			removeEmptyAttributes: true
		});
	};

	this.minifyCss = function(input) {
		return this.cssmin(input);
	};

	this.minifyJs = function(input) {
		return this.UglifyJS.minify(input, {
			fromString: true
		}).code;
	};

	this.minifyVariables = function() {

	};
}

module.exports = BlgnMinifier;