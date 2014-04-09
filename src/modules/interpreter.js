"use strict";

function BlgnInterpreter(options, variables) {

	this.options = options;
	this.variables = variables;

	var BlgnCommand = require('./command');
	BlgnCommand = new BlgnCommand(this.options, this.variables);

	this.tokenize = function(sequence) {
		// remove start and end % character
		var sentence = sequence.substr(1);
		sentence = sentence.substr(0, sentence.length - 1);

		var commandIndex = sentence.indexOf(' ');
		var tokens = {
			command: sentence.substr(0, commandIndex),
			args: sentence.substr(commandIndex + 1, sentence.length)
		};

		return tokens;
	}

	this.dispatch = function(tokens) {

		var replacement = null;

		if(tokens.command !== '') {

			switch(tokens.command) {
				case BlgnCommand.PRINT_TK :
					if(tokens.args !== '') {
						replacement = BlgnCommand.print(tokens.args);
					} else {
						throw new Error('Nothing to print');
					}
				break;

				case BlgnCommand.INCLUDE_TK :
					if(tokens.args !== '') {
						replacement = BlgnCommand.include(tokens.args);
					} else {
						throw new Error('No file found to include');
					}
				break;

				case BlgnCommand.FOREACH_TK :
					replacement = BlgnCommand.foreach(tokens.args);
				break;

				default :
					throw new Error(tokens.command + ' does not exist');
				break;
			}
		} else {
			throw new Error('Empty command');
		}

		return replacement;
	};
}

module.exports = BlgnInterpreter;