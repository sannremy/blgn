<!--
  tags: Conference, Mobile
  category: Conference
  title: Microsoft, Mozilla and W3C Talks on Mobile Web Apps
  date: 2012-08-06
-->

Here I was, the [W3café event](http://france.w3cafe.org/w3cafe-paris/w3cafe-standards-web-du-29-06-12/ "W3café event") took place in the conference center of Microsoft France on June 29, 2012. I admit this post comes a bit late but interesting things were discussed during this event. The main subject was: Mobile applications build with HTML5.

During this Friday afternoon, there were 2 different talks including "Internet Explorer 10 and development with HTML5 on Windows 8" and "Mozilla and the Mobile Web: from Firefox for Android to Boot to Gecko". Between both talks, we had to choose a workshop: I took the "Creation of a Mobile Web app based on HTML5" introduced by a W3C member, Dominique Hazael-Massieux.

<iframe class="google-maps spacer" src="http://maps.google.fr/maps?cid=0,0,3219543102930580332&amp;z=14&amp;iwloc=A&amp;output=embed"></iframe>

Here is the list of talks that I attended:

  * IE10 and development with HTML5 on Windows 8<br />by [David Rousset](http://blogs.msdn.com/b/davrous/ "David Rousset's blog") (Microsoft France)
  * Creation of a Mobile Web app based on HTML5<br />by [Dominique Hazael-Massieux](http://www.w3.org/People/Dom/ "Dominique Hazael-Massieux on W3C") (W3C)
  * Mozilla and the Mobile Web: from Firefox for Android to Boot to Gecko<br />by [Tristan Nitot](http://blog.mozilla.org/beyond-the-code/ "Tristan Nitot's blog") (Mozilla Europe)

I wrote a summary of hot topics that have been discussed during these conferences:

<ol class="summary"><li><a href="#internet-explorer-10-for-autumn-2012-what-s-new-">Internet Explorer 10 for autumn 2012, what's new?</a></li><li><a href="#mobile-web-app-vs-native-app">Mobile: Web app vs. Native app</a></li><li><a href="#mozilla-s-b2g-and-marketplace">Mozilla's B2G and Marketplace</a></li></ol>

Internet Explorer 10 for autumn 2012, what's new?
-------------------------------------------------

Internet Explorer 10 will be only supported on Windows 7, Windows 8 and Windows Phone 8. The release date is scheduled for October/November 2012, it will come out along with Windows 8. A good point is that updates will come more frequently for public users. Let's see what IE10 has inside!

### Responsive design and User Experience improvements

First of all, it works with 2 different user experience modes:

  * Desktop mode: the classic mode, it supports all plugins. This doesn't differ from classic browsers and the user experience is very similar to IE9.
  * ~~Metro~~ Windows 8-style UI mode: it enables the browser inside the desktop. The bad point is that it does not support plug-ins but partially Flash and Silverlight. This mode allows Windows 8 users to improve their experiences with other ~~Metro~~ Windows 8-style UI apps.

Windows 8 integrates a JS Framework for Metro Windows 8-style UI app developments called WinJS: UI, transitions, events, and other set of controls like a date picker, a list, a rating component, etc.

IE10 now supports the CSS3 Grids, Regions and Exclusions including the wrap-flow property. This makes mobile and Web integrations easier thank to the flexible page layout. Here is [a good demo of what regions are](http://umaar.github.com/css-region-demo/ "CSS Regions") (resize your window).

### HTML5/CSS3 and tablet features support

For me, the biggest improvement is the support of WebSockets and WebWorkers. We can wonder why they took so much time, and the answer is that they wanted to be sure that the specs are finalized.

Web game developers should be glad with the hardware acceleration support, that's a big step for anyone who develop with WebGL. Moreover, all CSS3 transitions are handled by the hardware acceleration.

For tablets and mobiles, [touch events](http://www.w3.org/TR/touch-events/ "W3C Touch events") are now supported. Actually, finger touch, pen, and mouse events became generic pointer events. Microsoft has gathered those events to not compromise mouse events: they called it [MSPointer events](http://blogs.msdn.com/b/ie/archive/2011/09/20/touch-input-for-ie10-and-metro-style-apps.aspx "MSPointer events"). However, [this topic has been discussed](http://blog.jquery.com/2012/04/10/getting-touchy-about-patents/ "Getting touchy about patents"), because some Apple's patents have been disclosed, and subsequently it has caused a break in the W3C's specs.

Other features are supported such as offline storage types, drag and drop, etc:

  * [localStorage](http://www.w3.org/TR/webstorage/#the-localstorage-attribute "localStorage on W3C"): a simple key/value store map
  * [IndexedDB](http://www.w3.org/TR/IndexedDB/ "IndexedDB on W3C"): a document-oriented database (NoSQL)
  * [Drag and Drop](http://dev.w3.org/html5/spec/dnd.html "Drag and Drop W3C's specifications"): handlers and events for draggable elements

To ensure the compatibility of old Web sites, the quirks mode is implemented until IE9. The consequence is that when the DOCTYPE is not defined, some markup are not supported: For example, in the quirks mode, the `<canvas>` is not supported. IE10 finally drops the quirks mode for standards and almost standards modes. You will find more details on [how the rendering works on this page](http://hsivonen.iki.fi/doctype/ "HTML Doctype").

![David Rousset introducing Internet Explorer 10 at the W3café 2012](images/posts/microsoft-mozilla-and-w3c-talks-on-mobile-web-apps/w3cafe-2012-ie10.jpg "David Rousset introducing Internet Explorer 10 at the W3café 2012")

To put it in a nutshell, Microsoft has done a lot of improvements for its browser with a many HTML5 features support, especially for game developers. On the one hand, IE10 may regain the market against Chrome and Firefox. On the other hand, we didn't see any performance benchmark to compare the real place of IE10 between its current competitors.

Mobile: Web app vs. Native app
------------------------------

Developing a mobile Web application needs another approach than a classic Web application development. Many parameters have to be considered like different interactions including user experiences. Screen sizes, resolutions, network latencies, CPU (and obviously, batteries), OS versions, phone brands have to be taken in consideration... At the opposite of a desktop, a mobile device is more personal and social: the relation between its owner is stronger.

Native applications don't make users interconnected: You can not share a view with others (by sharing an URL). Moreover, it depends on OS versions and stores that provide the app whereas Web applications keep users safe: personal data are isolated from applications, like address books, phone numbers. And over all, no installation is needed and it gives easier access: get the URL by a QR code. For instance, a mall which provides its map via a Web app is more encouraging for the user to get it than to download it from a store, then to accept the terms of service, to install it and to use it finally.

However, there are inconveniences to design a Web app: as Dominique Hazael-Massieux told us, the screen size depends on phone models but now, we can find the same screen size (or almost) but different resolutions. That is what Apple has introduced with their mobile device products. Here is [a good explanation of the problem written by Peter-Paul Koch](http://www.quirksmode.org/blog/archives/2010/04/a_pixel_is_not.html "A pixel is not a pixel is not a pixel"), who entitled it: "A pixel is not a pixel is not a pixel". An mentioned solution is to use the `viewport` meta tag but this is not a standard yet.

### Smaller inputs but new sensors

On a mobile device, inputs are usually small. The typing is slower and longer than on a PC keyboard. The W3C is up to normalize [the speech input](http://lists.w3.org/Archives/Public/public-xg-htmlspeech/2011Feb/att-0020/api-draft.html "The Speech input API on W3C"), but for this moment, only the webkit-based can use this feature with the `x-webkit-speech` attribute. Many other attributes is coming up to help the mobile user such as `tel`, `email`, `date`, `url`, etc. You can find [the whole list of these new input controls](http://www.w3.org/TR/html-markup/input.html "HTML5 new inputs").

### Optimization advises

Dominique gave us some precious advises on how to optimize a Web application, especially tips to save bandwidth. Nowadays, the bandwidth is paid by users, every bit is expensive and need to be saved (due to limited 3G/4G data plan, expensive roaming):

  * Minify every static files: JS, CSS to save bits and to get a faster execution.
  * Use HTTP headers such as the `Cache-Control`, `Last-Modified`...
  * Minimize images into CSS sprites to avoid many connections.
  * Check the EXIF of photos, sometime they are useless.
  * Be careful with JS libraries, they are heavy and sometime they are not fully used.
  * Build CSS files into a single.
  * Control cookies: they are sent at every HTTP request to the same domain name.
  * Use the offline storage offered by HTML5: `localStorage`, `IndexedDB`, `requestFileSystem` (Chrome only), `<html>` `manifest` attribute...

To limit network connections, let the client do the more but keep in mind that the CPU and the memory cost a lot for the battery.

He also talked about the WebRTC: Real-Time Communication. WebRTC has the aim to make traditional desktop application such as P2P, voice calling into Web applications.

![Dominique Hazael-Massieux at the W3café 2012](images/posts/microsoft-mozilla-and-w3c-talks-on-mobile-web-apps/w3cafe-2012-html5.jpg "Dominique Hazael-Massieux at the W3café 2012")

This picture above relates the show case of an augmented reality application using WebGL and WebRTC technologies.

Mozilla's B2G and Marketplace
-----------------------------

The last part was for Tristan Nitot, the president of Mozilla Europe. He introduced [Boot to Gecko (B2G)](https://wiki.mozilla.org/B2G "Mozilla's B2G") and the [Mozilla Marketplace](https://marketplace.mozilla.org/ "Mozilla Marketplace") which wants to be more a open store than existing ones. B2G also wants to be a new OS for mobile device and to use 100% Web apps. Mozilla wish to extend all sensors to Web APIs, so that, every apps could handle them directly from HTML5. Its architecture is composed of a Linux kernel, Gecko and Web apps.

![Tristan Nitot demonstrating Mozilla B2G on a Samsung Galaxy S II](images/posts/microsoft-mozilla-and-w3c-talks-on-mobile-web-apps/w3cafe-2012-b2g.jpg "Tristan Nitot demonstrating Mozilla B2G on a Samsung Galaxy S II")

At the end, he showed us a demonstration of a WebGL application which runs on B2G on a Samsung Galaxy S II. It was pretty stunning!