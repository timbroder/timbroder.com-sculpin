---
author: tim
comments: true
date: 2008-05-28 16:04:00+00:00
dsq_thread_id: ''
layout: post
link: ''
slug: google-hosting-popular-javascript
title: Google hosting popular javascript libraries
wordpress_id: 125
category: Code
---

I came across this yesterday looking for the [mootools](http://mootools.net/)
download link. Google is hosting a bunch of the popular javascript libraries
on their server for you.  
  
  
Pros:

  * Use Google's Bandwidth
  * Google takes care of keeping the files up to date
  * Common include code across your apps
  * Use Google as a Fast proxy
  * Gadgets will have access to cached files
  
Cons:

  * Have to rely on Google to keep files up to date
  * Probably won't include beta releases of libraries
  
The main page is [here](http://code.google.com/apis/ajaxlibs/) and currently
includes:

  * [jQuery](http://jquery.com/ )
  * [prototype](http://www.prototypejs.org/)
  * [script.aculo.us](http://script.aculo.us/)
  * [MooTools](http://mootools.net/)
  * [Dojo](http://dojotoolkit.org/)
  
Example jQuery:

```
<script src="http://www.google.com/jsapi"></script>
<script>
  // Load jQuery
  google.load("jquery", "1");
 
  // on page load complete, fire off a jQuery json-p query
  // against Google web search
  google.setOnLoadCallback(function() {
    $.getJSON("http://ajax.googleapis.com/ajax/services/search/web?q=google&;v=1.0&;callback=?",
 
      // on search completion, process the results
      function (data) {
        if (data.responseDate.results &&
            data.responseDate.results.length>0) {
          renderResults(data.responseDate.results);
        }
      });
    });
</script>
```
