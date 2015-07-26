"use strict";

function BlgnParser(options) {

	this.options = options;

	this.getOutput = function(file) {
		var fs = require('fs');
		var path = require("path");

		var filepath = path.resolve(this.options.source, 'templates', file);
		var output = null;
		if(fs.existsSync(filepath)) {
			output = fs.readFileSync(filepath, 'utf8');
		}

		if(output === undefined || output === null) {
			throw new Error('Output of ' + filepath + ' is empty');
		}

		return output;
	};

	this.getSequences = function(output) {
		return output.match(/%([a-zA-Z_]\w*? ("[^"]+"|[a-zA-Z_][/\w.]*?))+%/g);
	};
	
}

module.exports = BlgnParser;