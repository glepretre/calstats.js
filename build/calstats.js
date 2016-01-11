!function(){"use strict";function t(t){var e=t.summary.replace(/ /g,"_");if(!e||""===e)return["untagged-"+e];var a=e.match(/\[([a-zA-Z0-9\_\.\s\-]*?)\]/g);return r.isEmpty(a)&&(a=["untagged-"+e]),r(a).map(function(t){return t.toLowerCase().replace("[","").replace("]","").replace(/ /g,"_")}).value()}function e(t){var e=t.end.getTime()-t.start.getTime(),a=e/1e3/60/60;return a}function a(t){return t.end&&t.start}var r=require("lodash"),n={google:require("./adapters/google"),ical:require("./adapters/ical")};module.exports={adapters:n,input:{rawData:null,startDate:null,endDate:null},data:null,breakdown:null,adapter:n.ical,setRawData:function(t){return this.input.rawData=t,this},setStartDate:function(t){return this.input.startDate=t,this},setEndDate:function(t){return this.input.endDate=t,this},setAdapter:function(t){return this.adapter=t,this},load:function(t,e,a){this.setRawData(t),this.setStartDate(e),this.setEndDate(a),this.setAdapter(this.adapters.ical),this.run()},validate:function(){if(!this.input.startDate)throw'Please set the start date - e.g. calstats.setStartDate("2016-01-01")';if(!this.input.endDate)throw'Please set the end date - e.g. calstats.setStartDate("2016-01-06")';if(!this.input.rawData)throw"Please set the raw data - e.g. calstats.setRawData(data)"},run:function(){function n(t,e){for(var a=0;a<t.length;a++)l[t[a]]||(l[t[a]]=0),l[t[a]]+=e}function i(t){return t.start<u?!1:t.end>o?!1:!0}this.validate();var s=this.adapter.transform(this.input.rawData),u=new Date(this.input.startDate),o=new Date(this.input.endDate);o.setDate(o.getDate()+1);var l={};if(u>o)throw"Start date must be before end date";s=r(s).filter(a).filter(i).value();for(var h in s)if(s.hasOwnProperty(h)){var d=s[h];n(t(d),e(d))}this.breakdown=l,this.data=s},getHighLevelBreakdown:function(){return r.transform(this.getTree(),function(t,e,a){t[a]=e.value})},getTree:function(){function t(t,e,a){t[e]?t[e].value+=a:t[e]={value:a}}function e(t){r(t).keys().without("value","other").forEach(function(a){var n=r(t[a]).keys().without("value","other").map(function(e){return t[a][e].value}).sum(),i=t[a].value-n;i>0&&i<t[a].value&&(t[a].other={value:i}),e(t[a])}).value()}var a={},n=this;return r(this.breakdown).keys().forEach(function(e){var r=e.split("-"),i=n.breakdown[e];r.length>0&&t(a,r[0],i),r.length>1&&t(a[r[0]],r[1],i),r.length>2&&t(a[r[0]][r[1]],r[2],i),r.length>3&&t(a[r[0]][r[1]][r[2]],r[3],i)}).value(),e(a),a},getBreakdown:function(){return this.breakdown},getEarliest:function(){var t=r(this.data).sortBy("start").first();return t?t.start:null},getLatest:function(){var t=r(this.data).sortBy("start").reverse().first();return t?t.start:null},getCount:function(){return this.data&&this.data.length?this.data.length:0},getTotalHours:function(){var t=r(this.breakdown).reduce(function(t,e,a){return t+e});return r.isUndefined(t)?0:t}}}();