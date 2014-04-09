<!--
  tags: CSS
  category: Experiment
  title: Making-of: Pure CSS3 logos
  date: 2012-11-18
-->

You guys have probably seen some awesome logos designed in pure CSS3 around the Web such as [Opera](http://v2.desandro.com/articles/opera-logo-css/ "Opera's logo"), [Internet Explorer](http://cordobo.com/wp-content/uploads/ie-pure-css-logo/ "IE's logo"), [Twitter](http://upperdog.se/labs/twitter-logo-in-css/ "Twitter's logo") and [many more](http://www.1stwebdesigner.com/css/css-icons-logos/ "Other pure CSS logos"). I wanted to try to make ones, so I decided to make logos of my working company (this totally was a personal choice and a personal work).
After a couple of hours of work, here is the result:

![Pure CSS Logos](images/posts/making-of-pure-css3-logos/pure-css3-logo.png "Pure CSS Logos")

<p class="center"><a href="http://srchea.com/apps/css3-ubisoft-owlient-logos/" class="button link">View live demo</a></p>

Of course, for better results you need to use latest browser versions which support radial gradient backgrounds, transformations, border radius, etc. If you are using the latest Chrome, Safari, Firefox, Opera or Internet Explorer 10, that will be fine.

<ol class="summary"><li><a href="#the-first-approach">The first approach</a></li><li><a href="#browser-rendering-results">Browser rendering results</a><ol><li><a href="#google-chrome">Google Chrome (10, 11, 14, 23)</a></li><li><a href="#mozilla-firefox">Mozilla Firefox (3.6, 4, 5, 16)</a></li><li><a href="#internet-explorer">Internet Explorer (7, 8, 9, 10 preview)</a></li><li><a href="#opera">Opera (10.50, 11.11, 11.64, 12.0)</a></li></ol></li><li><a href="#debugging-helping-tools">Debugging/Helping tools</a></li></ol>

The first approach
------------------

First of all, I needed to figure out how to build the structure of the logo with HTML elements only: I had to decompose the picture in different layers (I mean the `<div>`) and to think about the way to design them with only CSS properties in the same time. In other words, there are many conditions and constraints to be aware of.

For the structure, the first Ubisoft logo contains 16 layers with 10 full circles (radial gradients and shadows) and 6 for details (colorized borders). The green one has 10 full circles and the Owlient logo has only 4, ears are in a `<div>` actually.

Browser rendering results
-------------------------

Here are some screenshots from different browser versions. I deliberately chose browsers regarding their rendering engines to have a larger panel for this showcase: WebKit (Chrome, Safari), Gecko (Firefox), Presto (Opera) and Trident-based (Internet Explorer).

### Google Chrome

Chrome actually supports background gradients, but the keyword radial has to come inside the `-webkit-gradient(radial, [...])` instead of `-webkit-radial-gradient([...])`. This attribute came in the version 11. There is no difference between versions 11 and 23 except the anti-aliasing.

![Pure CSS Logos with Google Chrome 10](images/posts/making-of-pure-css3-logos/pure-css3-logo-chrome10.png "Pure CSS logos with Google Chrome 10")

<p class="center bold">Google Chrome 10</p>

![Pure CSS Logos with Google Chrome 11 to 14](images/posts/making-of-pure-css3-logos/pure-css3-logo-chrome11-14.png "Pure CSS logos with Google Chrome 11 to 14")

<p class="center bold">Google Chrome 11 to 14</p>

![Pure CSS Logos with Google Chrome 23](images/posts/making-of-pure-css3-logos/pure-css3-logo-chrome23.png "Pure CSS logos with Google Chrome 23")

<p class="center bold">Google Chrome 23</p>

### Mozilla Firefox

There is no prefix on the `border-radius` properties, that is why Firefox 3.6 doesn't curve the blocks, but supports `-moz-border-radius`. Other properties/values have `-moz` prefix, such as `transform` (rotation) and `radial-gradient`.

![Pure CSS Logos with Mozilla Firefox 3.6](images/posts/making-of-pure-css3-logos/pure-css3-logo-ff3-6.png "Pure CSS logos with Mozilla Firefox 3.6")

<p class="center bold">Mozilla Firefox 3.6</p>

![Pure CSS Logos with Mozilla Firefox 4 to 16](images/posts/making-of-pure-css3-logos/pure-css3-logo-ff4-16.png "Pure CSS logos with Mozilla Firefox 4 to 16")

<p class="center bold">Mozilla Firefox 4 to 16</p>

### Opera

It seems that the version 11.11 doesn't support the `radial-gradient` position (`farthest-corner`).

![Pure CSS Logos with Opera 10.50](images/posts/making-of-pure-css3-logos/pure-css3-logo-opera10-50.png "Pure CSS logos with Opera 10.50")

<p class="center bold">Opera 10.50</p>

![Pure CSS Logos with Opera 11.11](images/posts/making-of-pure-css3-logos/pure-css3-logo-opera11-11.png "Pure CSS logos with Opera 11.11")

<p class="center bold">Opera 11.11</p>

![Pure CSS Logos with Opera 11.64 to 12](images/posts/making-of-pure-css3-logos/pure-css3-logo-opera11-64-12.png "Pure CSS logos with Opera 11.64 to 12")

<p class="center bold">Opera 11.64 to 12</p>

### Internet Explorer

No CSS3 support in IE7 and 8 but IE9 supports `border-radius` and `box-shadow` properties.

![Pure CSS Logos with Internet Explorer 7](images/posts/making-of-pure-css3-logos/pure-css3-logo-ie7.png "Pure CSS logos with  Internet Explorer 7")

<p class="center bold">Internet Explorer 7</p>

![Pure CSS Logos with Internet Explorer 8](images/posts/making-of-pure-css3-logos/pure-css3-logo-ie8.png "Pure CSS logos with  Internet Explorer 8")

<p class="center bold">Internet Explorer 8</p>

![Pure CSS Logos with Internet Explorer 9](images/posts/making-of-pure-css3-logos/pure-css3-logo-ie9.png "Pure CSS logos with  Internet Explorer 9")

<p class="center bold">Internet Explorer 9</p>

![Pure CSS Logos with Internet Explorer 10](images/posts/making-of-pure-css3-logos/pure-css3-logo-ie10.png "Pure CSS logos with Internet Explorer 10")

<p class="center bold">Internet Explorer 10</p>

Debugging/Helping tools
-----------------------

I built those logos manually, no export from files or anything. There are a lot of great tools to set gradients, here is a list of generators that I used:

  * [CSS Gradient Background Maker](http://ie.microsoft.com/testdrive/graphics/cssgradientbackgroundmaker/default.html "CSS Gradient Background Maker")
  * [ColorZilla](http://www.colorzilla.com/gradient-editor/ "ColorZilla")

For positioning I have simply used Firebug and the native DOM explorer of Chrome. :)

As usual, you can find the source here: https://github.com/srchea/Pure-CSS3-logos