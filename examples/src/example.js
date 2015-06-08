"use strict";

var Blgn = require('../../src/blgn');

// generate all static pages
var blgn = new Blgn({
	fileVersion: Math.floor((new Date()).getTime() / 1000).toString(16).substr(-8),
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
