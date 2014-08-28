"use strict";

(function(module) {
	function Blgn(options) {

		// init
		var fs = require('fs');
		var BlgnMinifier = require('./minifier');

		this.variables = {};
		this.options = options;
		this.minifier = new BlgnMinifier(this.options);

		if(typeof this.options.output === 'undefined') {
			this.options.output = '../bin/';
		}

		if(typeof this.options.fileVersion === 'undefined') {
			this.options.fileVersion = '';
		} else if(this.options.fileVersion.charAt(0) !== '?') {
			this.options.fileVersion = '?' + this.options.fileVersion;
		}

		// needs uglifyJS2, ycssmin and html-minifier
		if(typeof this.options.minify === 'undefined' || typeof this.options.minify !== 'boolean') {
			this.options.minify = true;
		}

		this.setOptions = function(options) {
			this.options = options;
			return this;
		}

		this.setVariables = function(variables) {
			this.variables = variables;
			return this;
		}

		this.process = function(file) {
			var BlgnParser = require('./parser');
			var BlgnInterpreter = require('./interpreter');

			var parser = new BlgnParser();
			var output = parser.getOutput(file);
			var sequences = parser.getSequences(output);
			this.variables._fileVersion = this.options.fileVersion;

			var i, tokens, replacement;
			var interpreter = new BlgnInterpreter(this.options, this.variables);

			if(sequences !== null) {
				for(i = 0; i < sequences.length; i++) {
					tokens = interpreter.tokenize(sequences[i]);
					replacement = interpreter.dispatch(tokens);

					if(replacement !== null) {
						output = output.replace(sequences[i], replacement);
					} else {
						throw new Error('Replacement crashed: "' + sequences[i] + '" by "' + replacement + '"');
					}
				}
			}

			if(this.options.minify) {
				output = this.minifier.minifyHtml(output);
			}

			return output;
		};

		this.writeToFile = function(file, content) {
			var path = this.options.output + file;

			// folders?
			var folders = path.split('/');
			if(folders.length - 1 > 0) {
				var pathFolder = this.options.output;
				for(var i = 0; i < folders.length - 1; i++) {
					pathFolder += '/' + folders[i];
					if(!fs.existsSync(pathFolder)) {
						fs.mkdirSync(pathFolder);
					}
				}
			}

			fs.exists(path, function(exists) {
				if(exists) {
					fs.unlinkSync(path);
				}
				fs.writeFile(path, content);
			});
		};

		this.copyFolder = function(from, to) {
			if(typeof to === 'undefined') {
				to = this.options.output;
			}

			if(fs.existsSync(from)) {
				var files = fs.readdirSync(from),
					i, stat, file, fileContent, fromFile, toFile;

				for(i = 0; i < files.length; i++) {
					fromFile = from + '/' + files[i];
					toFile = to + '/' + files[i];
					stat = fs.statSync(fromFile);

					if(stat.isDirectory()) {
						if(!fs.existsSync(toFile)) {
							fs.mkdirSync(toFile);
						}

						this.copyFolder(fromFile, toFile);
					} else if(stat.isFile()) {
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
		};

		this.removeFolder = function(folder) {
			if(fs.existsSync(folder)) {
				var files = fs.readdirSync(folder), stat, i, file;
				for(i = 0; i < files.length; i++) {
					file = folder + files[i];
					if(fs.existsSync(file)) {
						stat = fs.statSync(file);
						if(stat.isDirectory()) {
							this.removeFolder(file + '/');
						} else if(stat.isFile()) {
							fs.unlinkSync(file);
						}
					}
				}

				fs.rmdirSync(folder);
			}
		};

		this.removeOutputFolder = function() {
			var folder = this.options.output;
			this.removeFolder(folder);

			return this;
		};

		this.generate = function(page, variables) {

			if(typeof variables === 'undefined') {
				variables = {};
			}
			var html, i;
			this.variables = variables;
			var Data = require('./data');
			this.variables.data = new Data();
			var posts = this.variables.data.posts;

			switch(page) {
				case 'home' :
					this.variables.postsOverview1 = [];
					this.variables.postsOverview2 = [];
					this.variables.postsOverview3 = [];

					for(i = 0; i < posts.length; i++) {
						if(i % 3 === 0) {
							this.variables.postsOverview1.push(posts[i]);
						} else if(i % 3 === 1) {
							this.variables.postsOverview2.push(posts[i]);
						} else if(i % 3 === 2) {
							this.variables.postsOverview3.push(posts[i]);
						}
					}

					html = this.process('base_post_lists.tpl');
					this.writeToFile('index.html', html);
				break;
				case 'posts' :
				case 'pages' :
					var list = this.variables.data[page], template;
					for(i = 0; i < list.length; i++) {
						this.variables.head = {
							title: list[i].metadata.title + ' - '
						};
						
						this.variables.page = {
							title: list[i].metadata.title,
						};

						if(page === 'posts') {
							this.variables.currentPost = list[i];
							template = 'base_post.tpl';
						} else if(page === 'pages') {
							this.variables.currentPage = list[i];
							template = 'base_page.tpl';
						}

						if(template !== null) {
							html = this.process(template);
							this.writeToFile(list[i].url + '.html', html);
						}
					}
				break;
				case 'tags' :
				case 'years' :
					var j, k, postTags, tagFound;
					var list = this.variables.data[page];
					for(i = 0; i < list.length; i++) {
						k = -1;
						this.variables.postsOverview1 = [];
						this.variables.postsOverview2 = [];
						this.variables.postsOverview3 = [];

						if(page === 'years') {
							this.variables.head = {
								title: 'Posted in ' + list[i].raw + ' - '
							};

							this.variables.page = {
								title: 'Posted in ' + list[i].raw,
							};
						} else if(page === 'tags') {
							this.variables.head = {
								title: 'Posts on ' + list[i].raw + ' - '
							};

							this.variables.page = {
								title: 'Posts on <span class="hashtag ' + list[i].css + '">' + list[i].raw + '</span>',
							};
						} else {
							continue;
						}

						for(j = 0; j < posts.length; j++) {
							
							if(page === 'years' && posts[j].date.year === list[i].raw) {
								k++;
							} else if(page === 'tags') {
								tagFound = false;
								postTags = posts[j].tags;
								for(var p = 0; p < postTags.length; p++) {
									if(list[i].lower === postTags[p].lower) {
										tagFound = true;
										break;
									}
								}

								if(!tagFound) {
									continue;
								} else {
									k++;
								}
							} else {
								continue;
							}

							if(k % 3 === 0) {
								this.variables.postsOverview1.push(posts[j]);
							} else if(k % 3 === 1) {
								this.variables.postsOverview2.push(posts[j]);
							} else if(k % 3 === 2) {
								this.variables.postsOverview3.push(posts[j]);
							}
						}

						html = this.process('base_post_lists.tpl');
						if(page === 'years') {
							this.writeToFile('year/' + list[i].url + '.html', html);
						} else if(page === 'tags') {
							this.writeToFile('tag/' + list[i].url + '.html', html);
						}
					}
				break;
				case 'errors' :
					var httpErrors = [400, 401, 403, 404, 500];

					for(i = 0; i < httpErrors.length; i++) {
						this.variables.head = {
							title: 'HTTP Error ' + httpErrors[i] + ' - '
						};

						this.variables.httpError = httpErrors[i];

						if(template !== null) {
							html = this.process('base_http_error.tpl');
							this.writeToFile('err/' + httpErrors[i] + '.html', html);
						}
					}
				break;
				default :
				break;
			}

			return this;
		}
	}

	module.exports = Blgn;
}(module));