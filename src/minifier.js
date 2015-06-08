"use strict";

function BlgnMinifier(options) {

	this.options = options;

	this.UglifyJS = require("uglify-js");
	this.cssmin = require('ycssmin').cssmin;
	this.htmlMinifier = require('html-minifier');
	this.prettyData = require('pretty-data').pd;

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

	this.minifyXml = function(input) {
		return this.prettyData.xmlmin(input, false);
	}

	this.minifyIdsClasses = function() {
		if(fs.existsSync(this.options.output)) {
			var files = fs.readdirSync(this.options.output),
				i, stat, file, fileContent, fromFile, toFile;

			for(i = 0; i < files.length; i++) {
				fromFile = this.options.output + '/' + files[i];
				toFile = to + '/' + files[i];
				stat = fs.statSync(fromFile);

				if(stat.isDirectory()) {
					if(fs.existsSync(toFile)) {
						fs.unlinkSync(toFile);
					}

					fs.mkdirSync(toFile);
					this.copyFolder(fromFile, toFile);
				} else if(stat.isFile()) {
					if(fs.existsSync(toFile)) {
						fs.unlinkSync(toFile);
					}

					fileContent = fs.readFileSync(fromFile);

					if(this.options.minify && fromFile.substr(-3) === '.js') {
						fileContent = this.minifier.minifyJs("" + fileContent);
					} else if(this.options.minify && fromFile.substr(-4) === '.css') {
						fileContent = this.minifier.minifyCss("" + fileContent);
					}

					fs.writeFileSync(toFile, fileContent);
				}
			}
		}
	}
}

module.exports = BlgnMinifier;