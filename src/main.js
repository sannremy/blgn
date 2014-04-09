"use strict";

var Blgn = require('./modules/blgn');

// generate all static pages
var blgn = new Blgn({
	output: '../bin/',
	fileVersion: Math.floor((new Date()).getTime() / 1000).toString(16).substr(-8),
	version: '0.1-a',
});

blgn.generate('home', {
		head: {
			title: 'Latest posts - '
		},
		page: {
			title: "Enthusiastic Developer's blog",
		},
	})
	.generate('posts')
	.generate('years')
	.generate('tags')
	.generate('pages')
	.generate('errors')
	.copyFolder('resources');
