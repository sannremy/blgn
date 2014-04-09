"use strict";

function BlgnParser() {

	this.getOutput = function(file) {
		var fs = require('fs');

		var path = 'templates/' + file;
		var output = null;
		if(fs.existsSync(path)) {
			output = fs.readFileSync(path, 'utf8');
		}

		if(typeof output === 'undefined' || output === null) {
			throw new Error('Output of ' + path + ' is empty');
		}

		return output;
	};

	this.getSequences = function(output) {
		return output.match(/%([a-zA-Z_]\w*? ("[^"]+"|[a-zA-Z_][/\w.]*?))+%/g);
	};
	
}

module.exports = BlgnParser;