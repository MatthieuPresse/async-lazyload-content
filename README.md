# async-lazyload-content


[CF wiki](https://github.com/MatthieuPresse/async-lazyload-content/wiki) pour l'explication complete.

### Code HTML

	<div class="iframe-srcdoc"><script type="text/html"><!DOCTYPE html>
	    <html>
	    <head><meta charset="utf-8"><style type="text/css">html, body{padding:0;margin:0}</style>
	    </head><body>
	        [[VOTRE CONTENU ICI]]
	    </body>
	</html></script></div>

### Code JS

    'use strict';
    var opt = {
        sel: '.iframe-srcdoc',
        margin: '250px'
    }
    document.addEventListener('DOMContentLoaded', function(event) {

        var intersectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry){

                if (entry.intersectionRatio <= 0) return;

                var iframe = document.createElement('iframe'),
                    srcdoc = entry.target.firstElementChild;
                iframe.setAttribute('srcdoc', srcdoc.text);
                iframe.setAttribute('scrolling', 'no');
                iframe.addEventListener('load', function(){
                    iframe.style.height = iframe.contentWindow.document.body.offsetHeight + 'px';
                });
                entry.target.insertBefore(iframe, srcdoc);

                intersectionObserver.unobserve(entry.target);
            });
        }, {
            rootMargin: opt.margin + ' 0px ' + opt.margin + ' 0px'
        });

        document.querySelectorAll(opt.sel).forEach(function(diviframe) {
            intersectionObserver.observe(diviframe);
        });
    });

### Code CSS

	.iframe-srcdoc iframe {
	    width: 100%;
	    border: none;
	    margin: 0;
	    padding: 0;
	}