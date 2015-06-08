"use strict";

function BlgnCommand(options, variables) {

	this.PRINT_TK = 'print';
	this.INCLUDE_TK = 'include';
	this.FOREACH_TK = 'foreach';

	this.options = options;
	this.variables = variables;

	/**
	*	Print a variable or a content
	*	i.e %print my_var% or %print "hello world!"%
	*	@param string content The content
	*	@return string The substitution string
	**/
	this.print = function(arg) {

		if(arg.charAt(0) === '"' && arg.charAt(arg.length - 1) === '"') {
			return arg.replace(/\"/g, '');
		} else {
			if(this.variables[arg] !== undefined) {
				var variableTmp = this.variables[arg];
			} else {
				var variableTmp = this.variables;
				var variableItems = arg.split('.');
				var i;
				for(i = 0; i < variableItems.length; i++) {
					if(variableTmp[variableItems[i]] !== undefined) {
						variableTmp = variableTmp[variableItems[i]];
					} else {
						throw new Error('Variable ' + arg + ' does not exist');
					}
				}
			}

			if(typeof variableTmp === 'string' || typeof variableTmp === 'number') {
				return variableTmp;
			} else {
				throw new Error('Variable ' + arg + ' is not a string or a number');
			}
		}

		throw new Error('Invalid argument for printing instruction');
	}

	this.include = function(file) {
		var Blgn = require('./blgn');
		return (new Blgn(this.options)).setVariables(this.variables).process(file);
	}

	this.foreach = function(args) {
		var list = args.substr(0, args.indexOf(' '));

		var variableList = this.variables;
		var variableItems = list.split('.');
		var i, replacements = [];
		for(i = 0; i < variableItems.length; i++) {
			if(variableList[variableItems[i]] !== undefined) {
				variableList = variableList[variableItems[i]];
			} else {
				throw new Error('Variable ' + list + ' does not exist');
			}
		}

		if(typeof variableList === 'object' && Array.isArray(variableList)) {
			var BlgnInterpreter = require('./interpreter'),
				sequence = '%' + args.substr(list.length + 1, args.length) + '%',
				tokens, interpreter, i;

			for(i = 0; i < variableList.length; i++) {
				interpreter = new BlgnInterpreter(this.options, variableList[i]);
				tokens = interpreter.tokenize(sequence);
				replacements.push(interpreter.dispatch(tokens));
			}
		}

		return replacements.join('');
	};
}

module.exports = BlgnCommand;