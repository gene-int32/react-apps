(this["webpackJsonpreact-apps"]=this["webpackJsonpreact-apps"]||[]).push([[6],{31:function(n,t,e){"use strict";e.r(t);var r=e(93),i=e(94),a=function(){function n(){return Object(r.a)(this,n),this.apiUrl="https://apis.google.com/js/api.js",n.instance||(n.instance=this),n.instance}return Object(i.a)(n,[{key:"installGapi",value:function(){var n=this;return new Promise((function(t,e){var r=document.createElement("script");r.setAttribute("src",n.apiUrl),r.addEventListener("load",(function(){return t()}));try{document.body.appendChild(r)}catch(i){e()}}))}},{key:"load",value:function(n){return new Promise((function(t){gapi.load(n,(function(){return t()}))}))}}]),n}();a.instance=void 0,t.default=new a},93:function(n,t,e){"use strict";function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}e.d(t,"a",(function(){return r}))},94:function(n,t,e){"use strict";function r(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function i(n,t,e){return t&&r(n.prototype,t),e&&r(n,e),n}e.d(t,"a",(function(){return i}))}}]);
//# sourceMappingURL=6.7bb2744a.chunk.js.map