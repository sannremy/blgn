"use strict";

(function(module) {
	function Blgn(options) {

		// init
		var fs = require('fs');
		var path = require('path');
		var BlgnMinifier = require('./minifier');

		this.variables = {};
		this.options = options;

		if(typeof this.options.source === 'undefined') {
			this.options.source = process.cwd();
		}

		if(typeof this.options.output === 'undefined') {
			this.options.output = this.options.source + '/../output/';
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

		this.minifier = new BlgnMinifier(this.options);

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

			var parser = new BlgnParser(this.options);
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

			return output;
		};

		this.writeToFile = function(file, content) {

			if(this.options.minify) {
				if(file.substr(-5) === '.html') {
					content = this.minifier.minifyHtml(content);
				} else if(file.substr(-4) === '.xml' || file.substr(-4) === '.rss') {
					content = this.minifier.minifyXml(content);
				}
			}

			var pathFolder = this.options.output;

			if(!fs.existsSync(pathFolder)) {
				fs.mkdirSync(pathFolder);
			}

			// if folders don't exist, create them
			var folders = file.split('/');

			if(folders.length) {
				for(var i = 0; i < folders.length - 1; i++) {
					pathFolder += '/' + folders[i];
					if(!fs.existsSync(pathFolder)) {
						fs.mkdirSync(pathFolder);
					}
				}
			}

			var filePath = path.resolve(this.options.output, file);

			fs.exists(filePath, function(exists) {
				if(exists) {
					fs.unlinkSync(filePath);
				}
				fs.writeFile(filePath, content);
			});
		};

		this.copyFolder = function(from, to) {
			if(typeof to === 'undefined') {
				to = this.options.output;
			}

			from = path.resolve(this.options.source, from);

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
			this.variables.data = new Data(this.options);
			var posts = this.variables.data.posts;

			switch(page) {
				case 'home' :
					this.variables.postsOverview = posts;
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
					var j, postTags, tagFound;
					var list = this.variables.data[page];

					for(i = 0; i < list.length; i++) {

						this.variables.postsOverview = [];

						if(page === 'years') {
							this.variables.head = {
								title: 'Posted in ' + list[i].raw
							};

							this.variables.page = {
								title: 'Posted in ' + list[i].raw
							};
						} else if(page === 'tags') {
							this.variables.head = {
								title: 'Posts on ' + list[i].raw
							};

							this.variables.page = {
								title: 'Posts on <span class="hashtag ' + list[i].css + '">' + list[i].raw + '</span>',
							};
						} else {
							continue;
						}

						for(j = 0; j < posts.length; j++) {
							if(page === 'years' && posts[j].date.year === list[i].raw) {
								this.variables.postsOverview.push(posts[j]);
							} else if(page === 'tags') {

								postTags = posts[j].tags;
								for(var p = 0; p < postTags.length; p++) {
									if(list[i].lower === postTags[p].lower) {
										this.variables.postsOverview.push(posts[j]);
										break;
									}
								}
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
				case 'rss' :
					var j = 0,
						tags = [];

					for(i = 0; i < posts.length; i++) {

						tags = [];
						posts[i].guid = posts[i].url;

						for(j = 0; j < posts[i].tags.length; j++) {
							tags.push(posts[i].tags[j].raw);
						}

						posts[i].tagsString = tags.join(', ');

						posts[i].pubDate = posts[i].date.object.toUTCString();
					}

					var xml = this.process('base_rss.tpl');
					this.writeToFile('rss/posts.xml', xml);

				break;
				default :
				break;
			}

			return this;
		}
	}

	module.exports = Blgn;
}(module));
