!function(){"use strict";function t(t){if(!t.summary||""===t.summary)return["no-tags"];var e=/\[([a-zA-Z\.\s\-]*?)\]/g,r=t.summary.match(e);if(!r||0===r.length)return["no-tags"];for(var n=0;n<r.length;n++)r[n]=r[n].toLowerCase().replace("[","").replace("]","");return r}function e(t){var e=t.end.getTime()-t.start.getTime(),r=e/1e3/60/60;return r}function r(t){return t.end&&t.start}var n=require("lodash");module.exports={data:null,breakdown:null,load:function(a,u,o){function i(t,e){for(var r=0;r<t.length;r++)v[t[r]]||(v[t[r]]=0),v[t[r]]+=e}function s(t){return t.start<l?!1:t.end>h?!1:!0}var l=new Date(u),f=new Date(o),h=new Date(o);h.setDate(f.getDate()+1);var v={};if(l>h)throw"Start date must be before end date";a=n(a).filter(r).filter(s).value();for(var c in a)if(a.hasOwnProperty(c)){var d=a[c];i(t(d),e(d))}this.breakdown=v,this.data=a},getHighLevelBreakdown:function(){return n.transform(this.getTree(),function(t,e,r){t[r]=e.value})},getTree:function(){function t(t,e,r){t[e]?t[e].value+=r:t[e]={value:r}}function e(t){n(t).keys().without("value","other").forEach(function(r){var a=n(t[r]).keys().without("value","other").map(function(e){return t[r][e].value}).sum(),u=t[r].value-a;u>0&&u<t[r].value&&(t[r].other={value:u}),e(t[r])}).value()}var r={},a=this;return n(this.breakdown).keys().forEach(function(e){var n=e.split("-"),u=a.breakdown[e];n.length>0&&t(r,n[0],u),n.length>1&&t(r[n[0]],n[1],u),n.length>2&&t(r[n[0]][n[1]],n[2],u),n.length>3&&t(r[n[0]][n[1]][n[2]],n[3],u)}).value(),e(r),r},getBreakdown:function(){return this.breakdown},getEarliest:function(){var t=n(this.data).sortBy("start").first();return t?t.start:null},getLatest:function(){var t=n(this.data).sortBy("start").reverse().first();return t?t.start:null},getCount:function(){return this.data.length},getTotalHours:function(){var t=n(this.breakdown).reduce(function(t,e,r){return t+e});return n.isUndefined(t)?0:t}}}();