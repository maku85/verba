(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{187:function(t,e,o){"use strict";var n=o(0),r=o(262);n.a.use(r.a)},232:function(t,e,o){var content=o(337);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(31).default)("52e62775",content,!0,{sourceMap:!1})},245:function(t,e,o){var content=o(377);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(31).default)("1c06a3ba",content,!0,{sourceMap:!1})},264:function(t,e,o){"use strict";var n=o(67),r=o(78),c=o.n(r),l=o(407),d=o(410),f=o(408),component=Object(n.a)({},(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",[o("v-main",[o("v-container",{staticClass:"fill-height flex-column"},[o("Nuxt")],1)],1),t._v(" "),o("the-footer")],1)}),[],!1,null,null,null);e.a=component.exports;c()(component,{TheFooter:o(395).default}),c()(component,{VApp:l.a,VContainer:d.a,VMain:f.a})},288:function(t,e,o){o(289),t.exports=o(290)},336:function(t,e,o){"use strict";o(232)},337:function(t,e,o){var n=o(30)(!1);n.push([t.i,".page[data-v-6cdcbd40]{width:100%;height:800px;z-index:1;border-radius:10px;overflow:hidden}.content[data-v-6cdcbd40]{text-align:center;color:#444}.content h1[data-v-6cdcbd40]{font-weight:900;font-size:165px;line-height:1;margin-bottom:-10px;opacity:.8}.content h2[data-v-6cdcbd40]{font-weight:700;font-size:42px;margin-bottom:6px;opacity:.8}.content p[data-v-6cdcbd40]{font-weight:300;font-size:18px;opacity:.9}.content a[data-v-6cdcbd40]{font-weight:300;font-size:14px}img[data-v-6cdcbd40]{position:absolute;top:0;left:0;min-width:100%;min-height:100%;z-index:-1;opacity:.5;transform:scale(1.1)}",""]),t.exports=n},370:function(t,e,o){var content=o(371);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(31).default)("ed4be540",content,!0,{sourceMap:!1})},371:function(t,e,o){var n=o(30),r=o(372),c=o(373),l=n(!1),d=r(c);l.push([t.i,':root{--bg:#e5ecee}@font-face{font-family:"Inconsolata";src:local("Inconsolata"),url('+d+') format("truetype");font-display:swap}*,* [class*=text-]{font-family:"Inconsolata",sans-serif!important}::-webkit-scrollbar{width:10px}::-webkit-scrollbar-track{background-color:#e4e4e4;border-radius:4px}::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,.3);border-radius:4px}.v-main{background-color:#e5ecee;background-color:var(--bg);font-size:14px;overflow-y:auto}.v-main:before{content:"";position:absolute;height:100%;width:100%;top:0;bottom:0;left:0;background-image:url(/verba/bg_pattern.webp);background-repeat:repeat;opacity:.05}.v-card{background:#ececec!important;box-shadow:0 2.8px 2.2px rgba(0,0,0,.02),0 6.7px 5.3px rgba(0,0,0,.028),0 12.5px 10px rgba(0,0,0,.035),0 22.3px 17.9px rgba(0,0,0,.042),0 41.8px 33.4px rgba(0,0,0,.05),0 100px 80px rgba(0,0,0,.07)!important}',""]),t.exports=l},373:function(t,e,o){t.exports=o.p+"fonts/Inconsolata.94b76af.ttf"},376:function(t,e,o){"use strict";o(245)},377:function(t,e,o){var n=o(30)(!1);n.push([t.i,".v-footer[data-v-10ff05b6]{opacity:.5}",""]),t.exports=n},395:function(t,e,o){"use strict";o.r(e);o(376);var n=o(67),r=o(78),c=o.n(r),l=o(405),d=o(406),component=Object(n.a)({},(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-footer",{attrs:{padless:""}},[o("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[t._v("\n    "+t._s((new Date).getFullYear())+" — "),o("strong",[t._v("verba")])])],1)}),[],!1,null,"10ff05b6",null);e.default=component.exports;c()(component,{VCol:l.a,VFooter:d.a})},75:function(t,e,o){"use strict";var n={layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},r=(o(336),o(67)),c=o(78),l=o.n(c),d=o(409),f=o(398),v=o(410),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-container",{staticClass:"d-flex align-center"},[o("v-card",{staticClass:"page"},[o("div",{staticClass:"\n        fill-height\n        content\n        d-flex\n        flex-column\n        align-center\n        justify-center\n      "},[o("h1",[t._v(t._s(t.error.statusCode))]),t._v(" "),404===t.error.statusCode?o("h2",[t._v(t._s(t.pageNotFound))]):o("h2",[t._v(t._s(t.otherError))]),t._v(" "),o("p",[t._v(t._s(t.error.message))]),t._v(" "),o("v-btn",{staticClass:"mt-10",attrs:{outlined:"",plain:"",raised:"",to:"/"}},[t._v("\n        torna indietro\n      ")])],1),t._v(" "),o("img",{attrs:{src:"https://source.unsplash.com/random/800x600?topics=nature"}})])],1)}),[],!1,null,"6cdcbd40",null);e.a=component.exports;l()(component,{VBtn:d.a,VCard:f.a,VContainer:v.a})}},[[288,8,3,9]]]);