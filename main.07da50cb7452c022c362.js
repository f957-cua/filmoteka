(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"0HMw":function(e,t,n){},"H/xR":function(e,t){var n="light-theme",l="dark-theme",a=document.querySelector("#theme-switch-toggle");function o(e,t){document.body.classList.add(e),document.body.classList.remove(t),localStorage.setItem("theme",e)}localStorage.getItem("theme")===l?(a.checked="true",o(l,n)):(a.checked=!1,o(n,l)),a.addEventListener("change",(function(e){e.target.checked?o(l,n):o(n,l)}))},QfWi:function(e,t,n){"use strict";n.r(t);var l={body:document.body,logo:document.querySelector(".js-logo"),gallery:document.querySelector(".js-fetch-list"),headerSearchForm:document.querySelector(".js-form")},a=(n("JBxO"),n("FdtR"),"1a7532c831c19ca759402dbd11644ca2"),o="https://api.themoviedb.org/3/",r=function(){return fetch("https://api.themoviedb.org/3/trending/all/day?api_key=1a7532c831c19ca759402dbd11644ca2").then((function(e){return e.json()}))},c=function(e,t){return void 0===t&&(t=1),fetch(o+"search/movie?api_key="+a+"&language=en-US&page="+t+"&query="+e).then((function(e){return e.json()}))},i=n("xaHX"),u=n.n(i);l.logo.addEventListener("click",(function(e){e.preventDefault(),r().then((function(e){var t=e.results;l.gallery.innerHTML=u()(t)}))}));var s="";l.headerSearchForm.addEventListener("submit",(function(e){e.preventDefault(),s=e.target[0].value,c(s).then((function(e){var t=e.results;l.gallery.innerHTML=u()(t)}))}));n("H/xR"),n("0HMw")},xaHX:function(e,t,n){var l=n("mp5j");e.exports=(l.default||l).template({1:function(e,t,n,l,a){var o,r=null!=t?t:e.nullContext||{},c=e.hooks.helperMissing,i="function",u=e.escapeExpression,s=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return'<li class="photo-card">\r\n  <img loading="lazy" src="https://image.tmdb.org/t/p/w500'+u(typeof(o=null!=(o=s(n,"poster_path")||(null!=t?s(t,"poster_path"):t))?o:c)===i?o.call(r,{name:"poster_path",hash:{},data:a,loc:{start:{line:3,column:58},end:{line:3,column:73}}}):o)+'" alt='+u(typeof(o=null!=(o=s(n,"original_title")||(null!=t?s(t,"original_title"):t))?o:c)===i?o.call(r,{name:"original_title",hash:{},data:a,loc:{start:{line:3,column:79},end:{line:3,column:97}}}):o)+' width="320"\r\n    height="auto">\r\n  <h2> '+u(typeof(o=null!=(o=s(n,"original_title")||(null!=t?s(t,"original_title"):t))?o:c)===i?o.call(r,{name:"original_title",hash:{},data:a,loc:{start:{line:5,column:7},end:{line:5,column:25}}}):o)+" </h2>\r\n  <h3> Release date "+u(typeof(o=null!=(o=s(n,"release_date")||(null!=t?s(t,"release_date"):t))?o:c)===i?o.call(r,{name:"release_date",hash:{},data:a,loc:{start:{line:6,column:20},end:{line:6,column:36}}}):o)+" </h3>\r\n  <h4>Rating: "+u(typeof(o=null!=(o=s(n,"vote_average")||(null!=t?s(t,"vote_average"):t))?o:c)===i?o.call(r,{name:"vote_average",hash:{},data:a,loc:{start:{line:7,column:14},end:{line:7,column:30}}}):o)+"</h4>\r\n</li>\r\n"},compiler:[8,">= 4.3.0"],main:function(e,t,n,l,a){var o;return null!=(o=(e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]})(n,"each").call(null!=t?t:e.nullContext||{},t,{name:"each",hash:{},fn:e.program(1,a,0),inverse:e.noop,data:a,loc:{start:{line:1,column:0},end:{line:9,column:9}}}))?o:""},useData:!0})}},[["QfWi",1,2]]]);
//# sourceMappingURL=main.07da50cb7452c022c362.js.map