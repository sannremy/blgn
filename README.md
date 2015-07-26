blgn
====

Generation of a light-weight blog in Node.js

Installation
------------

`npm install blgn`

Examples
--------

```
var Blgn = require('blgn');

// generate all static pages
var blgn = new Blgn();

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
```

See blgn/examples for more details.