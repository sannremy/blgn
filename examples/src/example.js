"use strict";

var Blgn = require('../../src/blgn');

// generate all static pages
var blgn = new Blgn({
	// path of templates, posts, pages and resources folders
	source: __dirname,

	// file version
	fileVersion: Math.floor((new Date()).getTime() / 1000).toString(16).substr(-8),

	// version of the website
	version: '0.1-a',
});

blgn.generate('home', {
		head: {
			title: "Homepage title (head)"
		},
		page: {
			title: "Homepage title (body)",
		},
	})
	.generate('posts')
	.generate('years')
	.generate('tags')
	.generate('pages')
	.generate('rss')
	.generate('errors')
	.copyFolder('resources');
