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