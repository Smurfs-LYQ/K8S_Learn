define("biz_common/utils/monitor.js",[],function(){
"use strict";
function t(t,r){
if(null===t)return{};
for(var o={},e=Object.keys(t),n=0;n<e.length;n++){
var i=e[n];
r.indexOf(i)>=0||(o[i]=t[i]);
}
return o;
}
function r(t){
var r=[],o=null;
for(o in t)Object.prototype.hasOwnProperty.call(t,o)&&r.push(o+"="+encodeURIComponent(t[o]));
return r.join("&");
}
var o=[],e="/mp/jsmonitor?#wechat_redirect",n={};
return window.__monitor?window.__monitor:(n._reportOptions={
idkey:{}
},n.getReportData=function(t){
t=t||{};
var r,e,i=n._reportOptions.idkey||{},p=null;
try{
for(p in i)Object.prototype.hasOwnProperty.call(i,p)&&i[p]&&o.push(p+"_"+i[p]);
}catch(a){
return!1;
}
if(0===o.length)return!1;
try{
var c=n._reportOptions;
if(null!==c&&void 0!==c)for(e in c)Object.prototype.hasOwnProperty.call(c,e)&&(r[e]=c[e]);
}catch(a){
r={};
}
return r.idkey=o.join(";"),r.t=Math.random(),t.remove!==!1&&(o=[],n._reportOptions={
idkey:{}
}),r;
},n.setLogs=function(r){
var o=r.id,e=r.key,i=r.value,p=t(r,["id","key","value"]),a=n._reportOptions.idkey||{},c=o+"_"+e;
a[c]?a[c]+=i:a[c]=i,n._reportOptions.idkey=a;
try{
if(null!==p&&void 0!==p)for(var s in p)Object.prototype.hasOwnProperty.call(p,s)&&(n._reportOptions[s]=p[s]);
}catch(u){
console.log(u);
}
return n;
},n.setAvg=function(t,r,o){
var e=n._reportOptions.idkey||{},i=t+"_"+r,p=t+"_"+(r-1);
return e[i]?e[i]+=o:e[i]=o,e[p]?e[p]+=1:e[p]=1,n._reportOptions.idkey=e,n;
},n.setSum=function(t,r,o){
var e=n._reportOptions.idkey,i=t+"_"+r;
return e[i]?e[i]+=o:e[i]=o,n._reportOptions.idkey=e,n;
},n.send=function(t,o){
t!==!1&&(t=!0);
var i=n.getReportData();
i&&(o&&o instanceof Function?o({
url:e,
type:"POST",
mayAbort:!0,
data:i,
async:t,
timeout:2e3
}):(new Image).src=location.origin+"/mp/jsmonitor?"+r(i)+"#wechat_redirect");
},window.__monitor=n,n);
});define("biz_wap/utils/setMpInfo.js",["biz_wap/jsapi/core.js"],function(n,r,t){
"use strict";
function e(n,r){
a(i,n),o.invoke("currentMpInfo",i,r);
}
var o=n("biz_wap/jsapi/core.js"),i={},a=null;
a="function"==typeof Object.assign?Object.assign:function(){
var n=Array.prototype.slice.call(arguments);
if(null==n[0])throw new TypeError("Cannot convert undefined or null to object");
for(var r=Object(n[0]),t=1;t<n.length;t++){
var e=n[t];
if(null!=e)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(r[o]=e[o]);
}
return r;
},t.exports={
currentMpInfo:e
};
});var _extends=Object.assign||function(e){
for(var n=1;n<arguments.length;n++){
var t=arguments[n];
for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);
}
return e;
};
define("pages/utils.js",["appmsg/appmsg_report.js","biz_common/utils/emoji_data.js","pages/version4video.js","biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js","biz_common/dom/event.js","album/utils/report.js","common/utils.js","biz_common/utils/url/parse.js","appmsg/i18n.js"],function(e){
"use strict";
function n(e){
if(!e)return null;
var n=location.href.match(new RegExp("(\\?|&)"+e+"=([^&]+)"));
return n?n[2].split("#")[0]:null;
}
function t(e){
if(window.hasChannelTwoTab&&E.isNewNativePage()){
var n=void 0;
n=document.getElementById("tab").offsetTop-window.minHeight;
var t=document.body.offsetHeight,i=F+n;
if(i>t){
var o=n+F-document.body.offsetHeight,r=document.createElement("div");
r.setAttribute("class","empty_comment_element"),r.style.cssText="height: "+o+"px;",
document.getElementById(e).appendChild(r);
}
window.minMountHeight=i;
}
}
function i(){
I.on(window,"load",function(){
!window.__networkType&&C.inWechat&&!function(){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
T.invoke("getNetworkType",{},function(n){
window.__networkType=e[n.err_msg];
});
}();
},!1);
}
function o(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
appId:e.appId,
img_url:e.img_url,
img_width:e.img_width,
img_height:e.img_height,
link:e.link.replace(/<br\/>/g,"\n"),
desc:e.desc.replace(/<br\/>/g,"\n"),
title:e.title
};
i(),/#wechat_redirect/.test(n.link)||(n.link+="#wechat_redirect");
var t="",o={
url:n.link,
actionType:0
},r=L;
e.isAlbum?(t="album",n=_extends({
album_id:e.album_id,
album_type:e.album_type
},n),o=_extends({
albumId:e.album_id,
albumType:e.album_type
},o)):"function"==typeof e.shareReport&&(r=function(n,t){
return e.shareReport(t.actionType);
}),T.on("menu:share:appmessage",function(e){
var i=void 0;
e&&"favorite"===e.scene?(i=24,n.link=D(n.link,"scene",V[1])):(i=1,n.link=D(n.link,"scene",V[0])),
o.url=n.link,o.actionType=i,r(t,o),T.invoke("sendAppMessage",n);
}),T.on("menu:share:timeline",function(){
n.link=D(n.link,"scene",V[2]),o.url=n.link,o.actionType=2,r(t,o),T.invoke("shareTimeline",n);
}),T.on("menu:share:weiboApp",function(){
n.link=D(n.link,"scene",V[3]),o.url=n.link,o.actionType=3,r(t,o),T.invoke("shareWeiboApp",{
img_url:n.img_url,
link:n.link,
title:n.title
});
}),T.on("menu:share:facebook",function(){
n.link=D(n.link,"scene",V[4]),o.url=n.link,o.actionType=7,r(t,o),T.invoke("shareFB",n);
}),T.on("menu:share:QZone",function(){
n.link=D(n.link,"scene",V[5]),o.url=n.link,o.actionType=5,r(t,o),T.invoke("shareQZone",n);
}),T.on("menu:share:qq",function(){
n.link=D(n.link,"scene",V[6]),o.url=n.link,o.actionType=5,r(t,o),T.invoke("shareQQ",n);
}),T.on("menu:share:email",function(){
n.link=D(n.link,"scene",V[7]),o.url=n.link,o.actionType=5,r(t,o),T.invoke("sendEmail",{
content:n.link,
title:n.title
});
});
}
function r(e){
for(var n=window.location.href,t=n.indexOf("?"),i=n.substr(t+1),o=i.split("&"),r=0;r<o.length;r++){
var a=o[r].split("=");
if(a[0].toUpperCase()==e.toUpperCase())return a[1];
}
return"";
}
function a(e,n){
T.invoke("createWebViewForFastLoad",{
scene:1
},function(){
e.forEach(function(e){
T.invoke("downloadPageDataForFastLoad",{
itemList:[{
item_show_type:5,
url:e[n]
}]
},function(e){
console.log(e);
});
});
});
}
function s(e,n,t){
var i=void 0;
return function(){
var o=this,r=arguments,a=function(){
i=null,t||e.apply(o,r);
},s=t&&!i;
clearTimeout(i),i=setTimeout(a,n),s&&e.apply(o,r);
};
}
function c(e){
var n=parseInt(e,10),t=0,i=0;
n>60&&(t=parseInt(n/60,10),n=parseInt(n%60,10),t>60&&(i=parseInt(t/60,10),t=parseInt(t%60,10))),
10>n&&(n="0"+n);
var o=":"+n;
return t>0?(10>t&&(t="0"+t),o=t+o):o="00"+o,i>0&&(0===parseInt(i,10)?i="":10>i&&(i="0"+i),
o=""+i+":"+o),o;
}
function l(e){
if("en"===window.LANG)return O.dealLikeReadShow_en(e);
var n="";
if(parseInt(e,10)>1e5)n="10万+";else if(parseInt(e,10)>1e4&&parseInt(e,10)<=1e5){
var t=""+parseInt(e,10)/1e4,i=t.indexOf(".");
n=-1===i?t+"万":t.substr(0,i)+"."+t.charAt(i+1)+"万";
}else n=0===parseInt(e,10)?"":e||"";
return n;
}
function u(e,n){
var t=void 0,i=void 0;
return function(){
var o=this,r=arguments,a=+new Date;
t&&t+n>a?(clearTimeout(i),i=setTimeout(function(){
t=a,e.apply(o,r);
},n)):(t=a,e.apply(o,r));
};
}
function d(){
var e=0,n=0,t=0;
return document.body&&(n=document.body.scrollTop),document.documentElement&&(t=document.documentElement.scrollTop),
e=n-t>0?n:t;
}
function m(){
var e=0,n=void 0,t=void 0;
return document.body&&(n=document.body.scrollHeight),document.documentElement&&(t=document.documentElement.scrollHeight),
e=n-t>0?n:t;
}
function p(){
var e=0;
return e="CSS1Compat"===document.compatMode?document.documentElement.clientHeight:document.body.clientHeight;
}
function g(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=location.origin+"/mp/videochannel_profile_page?biz_username="+encodeURIComponent(e.userName)+"&sessionid="+e.sessionId+"&__biz="+e.biz+"&scene="+e.scene+"&subscene="+e.subscene+"&channel_session_id="+e.channelSessionId+"#wechat_redirect";
R(n,!0);
}
function f(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=e.albumLink.replace("#wechat_redirect","")+("&scene="+e.scene+"&is_first_screen=1&subscene="+e.subscene+"&vid="+e.vid+"&count="+(e.pageCount?e.pageCount:3)+"&from_msgid="+(e.curMsgid?e.curMsgid:"")+"&from_itemidx="+(e.curItemidx?e.curItemidx:"")+"&scenenote="+e.scenenote+"#wechat_redirect");
R(n,!0);
}
function h(e){
return e.getBoundingClientRect().top;
}
function w(e){
return e.getBoundingClientRect().height;
}
function v(){
return d()+p()+30>=m();
}
function _(e,n){
return M.getQuery("__biz",e)+"_"+M.getQuery("mid",e)+"_"+M.getQuery("idx",e)+"_"+n;
}
function b(e,n){
var t="en"===window.LANG,i=t?"k":"万",o="",r=1e4*n,a=t?10*n:n;
if(e=parseInt(e,10),e>r)o=a+i+"+";else if(e>=1e4&&r>=e){
var s=""+(t?e/1e3:e/1e4),c=s.indexOf(".");
o=-1===c?s+i:s.substr(0,c)+"."+s.charAt(c+1)+i;
}else o=e;
return o||0;
}
function k(e,n){
if(n.useSwitchVideo||E.isNativePage())T.invoke("handleMPPageAction",_extends({
action:"switchVideo",
scene:n.clickScene,
channelSessionId:window.channel_session_id,
landingType:window.isFromVideoChannel?1:2,
subscene:n.clickSubScene
},e),function(e){
console.log(JSON.stringify(e));
});else if(n.isWcSlPlayerTailIframe&&window.top!==window)window.parent.postMessage({
__wcSlPlayerLoadTailRelateVideo__:e.url
},document.location.protocol+"//mp.weixin.qq.com");else if(!window.__failConfigWxOpen&&E.isWcSlPage())n.leaveReport(),
E.loadNewPageKeepingHistoryStackIfSecOpen(e.url);else{
console.log("==================JSAPI.invoke openWebViewUseFastLoad",window.__failConfigWxOpen,E.isWcSlPage());
var t=n.target.getElementsByClassName("js_relate_cover_img")[0],i=window.getComputedStyle(t),o=t.getBoundingClientRect(),r=document.createElement("canvas");
r.style.width=i.width,r.style.height=i.height,r.width=parseFloat(i.width),r.height=parseFloat(i.height);
var a=r.getContext("2d"),s="";
try{
a.drawImage(t,0,0,o.width,o.height),s=r.toDataURL();
}catch(c){
console.error(c);
}
j.isAndroid&&(s=""),T.invoke("openWebViewUseFastLoad",_extends({
scene:n.clickScene,
item_show_type:5,
openType:0,
subscene:n.clickSubScene,
channelSessionId:window.channel_session_id,
currentInfo:{
url:e.cover,
data:s,
pos:{
x:o.left-parseFloat(i.paddingLeft)-parseFloat(i.borderLeftWidth),
y:o.top-parseFloat(i.paddingTop)-parseFloat(i.borderTopWidth),
width:o.width-parseFloat(i.paddingLeft)-parseFloat(i.paddingRight)-parseFloat(i.borderLeftWidth)-parseFloat(i.borderRightWidth),
height:o.height-parseFloat(i.paddingTop)-parseFloat(i.paddingBottom)-parseFloat(i.borderTopWidth)-parseFloat(i.borderBottomWidth)
}
}
},e),function(t){
console.log(t),t&&t.err_msg&&-1===t.err_msg.indexOf("ok")&&T.invoke("openUrlWithExtraWebview",{
url:e.url,
openType:1
},function(t){
t&&t.err_msg&&-1===t.err_msg.indexOf("ok")&&(n.leaveReport(),window.location.href=e.url);
});
});
}
}
var y=e("appmsg/appmsg_report.js"),x=e("biz_common/utils/emoji_data.js"),W=e("pages/version4video.js"),j=e("biz_wap/utils/mmversion.js"),T=e("biz_wap/jsapi/core.js"),I=e("biz_common/dom/event.js"),S=e("album/utils/report.js"),E=e("common/utils.js"),M=e("biz_common/utils/url/parse.js"),O=e("appmsg/i18n.js"),F=E.getInnerHeight(),A=E.getInnerWidth(),C={
inWechat:W.device.inWechat,
windowWechat:/WindowsWechat/i.test(navigator.userAgent),
macWechat:/wechat.*mac os/i.test(navigator.userAgent),
emojiImg:'<img src="https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif" class="icon_emotion_single #style#" alt="#name#">',
emojiDataMap:{}
};
!function(){
for(var e=0,n=x.length;n>e;e++){
var t=x[e];
t.cn&&!C.emojiDataMap[t.cn]&&(C.emojiDataMap[t.cn]={
index:e
}),t.hk&&!C.emojiDataMap[t.hk]&&(C.emojiDataMap[t.hk]={
index:e
}),t.us&&!C.emojiDataMap[t.us]&&(C.emojiDataMap[t.us]={
index:e
});
}
}();
var P=function(e){
return/\[[^\[\]]+\]/.test(e)?e.replace(/\[[^\[\]]+\]/g,function(e){
if(C.emojiDataMap[e]&&x[C.emojiDataMap[e].index]){
var n=x[C.emojiDataMap[e].index];
return C.emojiImg.replace("#name#",e).replace("#style#",n.style);
}
return e;
}):e;
},R=function(e,n){
C.inWechat?C.windowWechat||C.macWechat?n===!0?window.parent.open(e):window.parent.location.href=e:T.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
-1==t.err_msg.indexOf("ok")&&(n===!0?window.parent.open(e):window.parent.location.href=e);
}):n===!0?window.open(e):location.href=e;
},z=function(){
!C.inWechat||C.windowWechat||C.macWechat?window.close():T.invoke("closeWindow",function(e){
-1==e.err_msg.indexOf("ok")&&window.close();
});
},N=function(e){
return document.getElementById(e);
},L=function(e){
var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
"album"===e&&S.shareReport(n);
},B=function(e,n){
return(n||document).getElementsByClassName(e);
},q=function(e){
return(""+(e||"")).replace(/^\s+|\s+$/g,"");
},H=function(e,n){
return(n||document).querySelector(e);
},U=function(e,n){
return(n||document).querySelectorAll(e);
},D=function(e,n,t){
var i=new RegExp(n+"=[^&]*","gi"),o=n+"="+t;
return i.test(e)?e.replace(i,o):e.replace(/(#.*)?$/,""+(e.indexOf("?")>-1?"&":"?")+o+"$1");
},V=[1,24,2,3,43,22,23,5],Q=null,G=function(e){
var t=e.$container;
t&&!j.isInMiniProgram&&(Q&&I.off(t,"tap",Q),I.on(t,"tap",".js_go_profile",Q=function(t){
var i=t.delegatedTarget;
i&&!function(){
var t=i.getAttribute("data-biz")||e.biz||window.biz||"";
if("function"==typeof e.beforeGo2Profile&&e.beforeGo2Profile(i),1==window.isprofileblock)T.invoke("openUrlWithExtraWebview",{
url:"https://mp.weixin.qq.com/mp/profileblock?__biz="+t+"#wechat_redirect",
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href="https://mp.weixin.qq.com/mp/profileblock?__biz="+t+"#wechat_redirect");
});else{
var o=i.getAttribute("data-scene")||e.profile_scene||"";
y.profileReport({
isnew:0,
title:e.title||"",
item_show_type:e.item_show_type||""
}),console.log("channelSessionId"+n("channel_session_id")),T.invoke("profile",{
username:e.user_name,
profileReportInfo:"",
scene:o+"",
channelSessionId:n("channel_session_id"),
subscene:e.subscene,
tabType:e.tabType||1
},function(){});
}
}();
}));
},$=function(e){
var n=arguments.length<=1||void 0===arguments[1]?.5:arguments[1],t=arguments.length<=2||void 0===arguments[2]?"vertical":arguments[2],i=arguments.length<=3||void 0===arguments[3]?window:arguments[3];
if(!e)return!1;
var o=!1,r=0,a=0,s=!1,c=!1,l=i===i.window?A:i.getBoundingClientRect().width,u=i===i.window?F:i.getBoundingClientRect().height;
switch("number"==typeof n?(r=n,a=n):(r=n.vertical,a=n.horizontal),t){
case"vertical":
s=!0;
break;

case"horizontal":
c=!0;
break;

case"all":
s=!0,c=!0;
}
var d=e.getBoundingClientRect();
if(s){
var m=d.height*r;
d.bottom>m&&d.top<u-m&&(o=!0);
}
if(!c)return o;
if(s&&!o)return o;
var p=d.width*a;
return o=d.right>p&&d.left<l-p?!0:!1;
},J=function(e,n){
for(;e;){
if(e===n)return!0;
e=e.parentNode;
}
return!1;
},Z=function(e){
var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],t=arguments.length<=2||void 0===arguments[2]?"webview":arguments[2];
if(e){
/^http/.test(e)||(e=location.protocol+"//"+location.host+e);
var i=(-1===e.indexOf("?")?"?":"&")+Object.keys(n).map(function(e){
return e+"="+n[e];
}).join("&"),o=e.indexOf("#");
switch(-1===o?e+=i+"#wechat_redirect":e=e.slice(0,o)+i+e.slice(o),t){
case"webview":
-1!==navigator.userAgent.indexOf("MicroMessenger")&&(j.isIOS||j.isAndroid||j.isWp)?T.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(n){
-1===n.err_msg.indexOf("ok")&&(location.href=e);
}):location.href=e;
break;

case"href":
default:
location.href=e;
}
}
},K=function(e){
if(!e.length)return{};
var n=e.indexOf("?"),t={};
return n>-1&&e.slice(n+1,e.indexOf("#")>-1?e.indexOf("#"):void 0).split("&").forEach(function(e){
if(e){
var n=e.indexOf("=");
n>-1?t[e.slice(0,n)]=e.slice(n+1):t[e]="";
}
}),t;
},X=function(){
var e=arguments.length<=0||void 0===arguments[0]?0:arguments[0],n=arguments.length<=1||void 0===arguments[1]?1:arguments[1];
if("number"!=typeof e||"number"!=typeof n)throw new Error(e+" and "+n+" should be a number.");
var t={
value:0,
unit:""
},i=1e4,o=["","万","亿","万亿"],r=0;
return"en"===window.LANG&&(i=1e3,o=["","k","m","b"]),i>e?(t.value=e,t.unit=""):(r=Math.floor(Math.log(e)/Math.log(i)),
t.value=(e/Math.pow(i,r)).toFixed(n),t.unit=o[r]),t.value+t.unit;
};
return{
jumpUrl:R,
closeWin:z,
trim:q,
getId:N,
qs:H,
qsAll:U,
inWechat:C.inWechat,
windowWechat:C.windowWechat,
macWechat:C.macWechat,
emojiFormat:P,
getParam:n,
go2ProfileEvent:G,
prepareNativePage:a,
debounce:s,
throttle:u,
formatReadNum:l,
formatSeconds:c,
setTwoTabHeight:t,
getByClass:B,
getScrollTop:d,
getScrollHeight:m,
getWindowHeight:p,
shareMessage:o,
getElementTop:h,
formatAlbumnReadNum:b,
getElementHeight:w,
getQuery:r,
openAllVideoPage:g,
getNetWorkType:i,
getMoreVideoInfo:_,
isPageEnd:v,
openAlbumPage:f,
switchVideo:k,
checkExposedStatus:$,
isParent:J,
goUrl:Z,
getUrlParamsMap:K,
numFormat2Unit:X
};
});define("tpl/appmsg/loading.html.js",[],function(){
return'<div style="display: none;">\n  <div class="weui-mask_transparent"></div>\n  <div class="weui-toast">\n    <i class="weui-loading weui-icon_toast"></i>\n    <p class="weui-toast__content js_loading_content"></p>\n  </div>\n</div>';
});define("biz_common/base64.js",[],function(r,t,n){
"use strict";
var e,c="2.1.9";
if("undefined"!=typeof n&&n.exports)try{}catch(o){}
var u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=function(r){
for(var t={},n=0,e=r.length;e>n;n++)t[r.charAt(n)]=n;
return t;
}(u),h=String.fromCharCode,i=function(r){
if(r.length<2){
var t=r.charCodeAt(0);
return 128>t?r:2048>t?h(192|t>>>6)+h(128|63&t):h(224|t>>>12&15)+h(128|t>>>6&63)+h(128|63&t);
}
var t=65536+1024*(r.charCodeAt(0)-55296)+(r.charCodeAt(1)-56320);
return h(240|t>>>18&7)+h(128|t>>>12&63)+h(128|t>>>6&63)+h(128|63&t);
},f=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,A=function(r){
return r.replace(f,i);
},d=function(r){
var t=[0,2,1][r.length%3],n=r.charCodeAt(0)<<16|(r.length>1?r.charCodeAt(1):0)<<8|(r.length>2?r.charCodeAt(2):0),e=[u.charAt(n>>>18),u.charAt(n>>>12&63),t>=2?"=":u.charAt(n>>>6&63),t>=1?"=":u.charAt(63&n)];
return e.join("");
},g=function(r){
return r.replace(/[\s\S]{1,3}/g,d);
},s=e?function(r){
return(r.constructor===e.constructor?r:new e(r)).toString("base64");
}:function(r){
return g(A(r));
},C=function(r,t){
return t?s(String(r)).replace(/[+\/]/g,function(r){
return"+"==r?"-":"_";
}).replace(/=/g,""):s(String(r));
},l=function(r){
return C(r,!0);
},p=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),S=function(r){
switch(r.length){
case 4:
var t=(7&r.charCodeAt(0))<<18|(63&r.charCodeAt(1))<<12|(63&r.charCodeAt(2))<<6|63&r.charCodeAt(3),n=t-65536;
return h((n>>>10)+55296)+h((1023&n)+56320);

case 3:
return h((15&r.charCodeAt(0))<<12|(63&r.charCodeAt(1))<<6|63&r.charCodeAt(2));

default:
return h((31&r.charCodeAt(0))<<6|63&r.charCodeAt(1));
}
},b=function(r){
return r.replace(p,S);
},v=function(r){
var t=r.length,n=t%4,e=(t>0?a[r.charAt(0)]<<18:0)|(t>1?a[r.charAt(1)]<<12:0)|(t>2?a[r.charAt(2)]<<6:0)|(t>3?a[r.charAt(3)]:0),c=[h(e>>>16),h(e>>>8&255),h(255&e)];
return c.length-=[0,0,2,1][n],c.join("");
},F=function(r){
return r.replace(/[\s\S]{1,4}/g,v);
},j=e?function(r){
return(r.constructor===e.constructor?r:new e(r,"base64")).toString();
}:function(r){
return b(F(r));
},m=function(r){
return j(String(r).replace(/[-_]/g,function(r){
return"-"==r?"+":"/";
}).replace(/[^A-Za-z0-9\+\/]/g,""));
};
return{
VERSION:c,
atob:F,
btoa:g,
fromBase64:m,
toBase64:C,
utob:A,
encode:C,
encodeURI:l,
btou:b,
decode:m
};
});define("biz_wap/jsapi/log.js",["biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js"],function(i){
"use strict";
function o(i,o){
o=e+" "+o+" location:["+location.href+"]",n.isWechat&&n.isAndroid?r.invoke("log",{
level:i,
msg:o
}):n.isWechat&&(n.isIOS||n.isMac)&&r.invoke("writeLog",{
level:i,
msg:o
});
}
var r=i("biz_wap/jsapi/core.js"),n=i("biz_wap/utils/mmversion.js"),e="__wap__",a={
info:function(){
o("info",Array.prototype.join.apply(arguments));
},
warn:function(){
o("warn",Array.prototype.join.apply(arguments));
},
error:function(){
o("error",Array.prototype.join.apply(arguments));
},
debug:function(){
o("debug",Array.prototype.join.apply(arguments));
}
};
return a.log=a.info,a;
});define("biz_wap/utils/storage.js",[],function(){
"use strict";
function t(t){
if(!t)throw"require function name.";
this.key=t,this.init();
}
var e="__WXLS__",n=window.localStorage||{
getItem:function(){},
setItem:function(){},
removeItem:function(){},
key:function(){},
length:0
};
return t.getItem=function(t){
return t=e+t,n.getItem(t);
},t.setItem=function(i,r){
i=e+i;
for(var a=3;a--;)try{
n.setItem(i,r);
break;
}catch(o){
t.clear();
}
},t.clear=function(){
var t,i;
for(t=n.length-1;t>=0;t--)i=n.key(t),0==i.indexOf(e)&&n.removeItem(i);
},t.prototype={
constructor:t,
init:function(){
this.check();
},
getData:function(){
var e=t.getItem(this.key)||"{}";
try{
e=JSON.parse(e);
}catch(n){
e={};
}
return e;
},
check:function(){
var e,n,i=this.getData(),r={},a=+new Date;
for(e in i)n=i[e],+n.exp>a&&(r[e]=n);
t.setItem(this.key,JSON.stringify(r));
},
set:function(e,n,i){
var r=this.getData();
r[e]={
val:n,
exp:i||+new Date
},t.setItem(this.key,JSON.stringify(r));
},
get:function(t){
var e=this.getData();
return e=e[t],e?e.val||null:null;
},
remove:function(e){
var n=this.getData();
n[e]&&delete n[e],t.setItem(this.key,JSON.stringify(n));
}
},t;
});define("biz_common/utils/wxgspeedsdk.js",[],function(){
"use strict";
function e(e){
if(!e.pid||!e.speeds)return-1;
if(!e.speeds.length>0){
var n=e.speeds;
e.speeds=[],e.speeds.push(n);
}
e.user_define&&(p=e.user_define);
for(var t=d(e),o=0;o<e.speeds.length;o++){
var r=e.speeds[o];
r.time=parseInt(r.time),r.sid>20&&r.time>=0&&i(t,r.sid,r.time);
}
}
function n(){
s(function(){
setTimeout(function(){
for(var e in u)r({
pid_uin_rid:e,
speeds:u[e],
user_define:p
},c);
u={};
},100);
});
}
function t(e){
s(function(){
if(!e.pid||!e.time)return-1;
var n=d(e);
i(n,9,e.time);
});
}
function o(e){
s(function(){
var n=d(e);
u[n]||(u[n]=[]);
var t=window.performance||window.msPerformance||window.webkitPerformance||{};
if(t&&t.timing){
var o=t.timing||{};
i(n,1,o.domainLookupEnd-o.domainLookupStart),i(n,2,"https:"==location.protocol&&0!=o.secureConnectionStart?o.connectEnd-o.secureConnectionStart:0),
i(n,3,o.connectEnd-o.connectStart),i(n,4,o.responseStart-o.requestStart),i(n,5,o.responseEnd-o.responseStart),
i(n,6,o.domContentLoadedEventStart-o.domLoading),i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),
i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart),function(){
setTimeout(function(){
o.loadEventEnd&&(i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart));
},0);
}(u),u[n][9]||i(n,9,o.domContentLoadedEventStart-o.navigationStart),i(n,10,o.redirectEnd-o.redirectStart),
i(n,11,o.domainLookupStart-o.fetchStart),i(n,12,o.domLoading-o.responseStart);
}
});
}
function i(e,n,t){
u[e]=u[e]||[],u[e][n]=u[e][n]||[],0>t||(21>n?u[e][n][0]=t:u[e][n].push(t));
}
function d(e){
return e&&e.pid?e.pid+"_"+(e.uin||0)+"_"+(e.rid||0):void(console&&console.error("Must provide a pid"));
}
function r(e,n){
var t=e.pid_uin_rid.split("_");
if(3!=t.length)return void(console&&console.error("pid,uin,rid, invalid args"));
var o="pid="+t[0]+"&uin="+t[1]+"&rid="+t[2];
e.user_define&&(o+="&user_define="+e.user_define);
for(var i=n+o+"&speeds=",d="",r=[],s=1;s<e.speeds.length;s++)if(e.speeds[s]){
for(var a=0;a<e.speeds[s].length;a++){
var p=s+"_"+e.speeds[s][a];
i.length+d.length+p.length<1024?d=d+p+";":(d.length&&r.push(i+d.substring(0,d.length-1)),
d=p+";");
}
s==e.speeds.length-1&&r.push(i+d.substring(0,d.length-1));
}
for(var s=0;s<r.length;s++)(new Image).src=r[s];
}
function s(e){
"complete"==document.readyState?e():f.push(e);
}
function a(){
for(var e=0;e<f.length;e++)f[e]();
f=[];
}
var p,u={},c="https://badjs.weixinbridge.com/frontend/reportspeed?",f=[];
return window.addEventListener?window.addEventListener("load",a,!1):window.attachEvent&&window.attachEvent("onload",a),
{
saveSpeeds:e,
send:n,
setFirstViewTime:t,
setBasicTime:o
};
});define("pages/version4video.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/device.js","new_video/ctl.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function i(e,i){
i=i||"",i=["uin:"+d.user_uin,"resp:"+i].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+i+"&r="+Math.random();
}
function o(){
return window.__second_open__?!0:-1!=p.indexOf("&_newvideoplayer=0")?!1:-1!=p.indexOf("&_newvideoplayer=1")?!0:1!=d.is_login?!1:d.use_tx_video_player?!1:_.canSupportVideo&&m.inWechat?m.is_ios||m.is_android?!0:!1:(d._hasReportCanSupportVideo||_.canSupportVideo||!m.inWechat||(d._hasReportCanSupportVideo=!0,
i(44)),!1);
}
function n(){
{
var e=p,i=window.location.href;
d.sn||"";
}
return-1==e.indexOf("&_videoad=0")||"5a2492d450d45369cd66e9af8ee97dbd"!=d.sn&&"f62e1cb98630008303667f77c17c43d7"!=d.sn&&"30c609ee11a3a74a056e863f0e20cae2"!=d.sn?f.isInMiniProgram?!1:-1!=e.indexOf("&_videoad=1")?!0:-1===e.indexOf("mp.weixin.qq.com/s")&&-1===e.indexOf("mp.weixin.qq.com/mp/appmsg/show")&&-1===e.indexOf("mp.weixin.qq.com/mp/authreadtemplate")?!1:"54"==d.appmsg_type?!1:-1!=i.indexOf("&xd=1")?!1:d.__appmsgCgiData&&d.__appmsgCgiData.can_use_page&&(m.is_ios||m.is_android)?!0:x.showAd()?!0:!1:!1;
}
function s(){
var e=p,i=t(),o=(new Date).getHours(),n=!1;
return d.user_uin?-1!=e.indexOf("&_proxy=0")?!1:-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")?!1:(-1!=e.indexOf("&_proxy=1")&&(n=!0),
o>=9&&14>=o?!1:(m.inWechat&&m.is_android&&m.is_x5&&m.wechatVer>="6.2.2"&&(n=!0),
m.inWechat&&m.is_android&&m.is_xweb&&m.xweb_version>=16&&(n=!0),m.inWechat&&m.is_ios&&(-1!=u.indexOf("MicroMessenger/6.2.4")||m.wechatVer>="6.2.4")&&(n=!0),
n&&i&&i.isUseProxy?!0:!1)):!1;
}
function r(){
return y.networkType;
}
function t(){
var e={
isUseProxy:0,
isUsePreload:0,
experSet:0
},i=!1;
if(i||(e.experSet=1),e)switch(e.experSet){
case 1:
e.isUseProxy=0,e.isUsePreload=0;
break;

case 2:
e.isUseProxy=0,e.isUsePreload=1;
break;

case 3:
e.isUseProxy=1,e.isUsePreload=0;
break;

case 4:
e.isUseProxy=1,e.isUsePreload=1;
break;

default:
e=!1;
}
return 10>P&&a(l,!1),l||(e.isUseProxy=0),h||(e.isUsePreload=0),0==e.isUseProxy&&0==e.isUsePreload?e.experSet=1:0==e.isUseProxy&&1==e.isUsePreload?e.experSet=2:1==e.isUseProxy&&0==e.isUsePreload?e.experSet=3:1==e.isUseProxy&&1==e.isUsePreload&&(e.experSet=4),
g===!1&&(console.info("[视频代理实验]",e),g=!0),e;
}
function a(e,i){
l=e,h=i;
}
var d,p,w=e("biz_common/dom/event.js"),c=e("biz_wap/jsapi/core.js"),_=e("biz_wap/utils/device.js"),x=e("new_video/ctl.js"),f=e("biz_wap/utils/mmversion.js"),u=window.navigator.userAgent,y={
networkType:""
},m={},l=!0,h=!0,g=!1,v=function(){
var e=navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
return e&&e[1]&&parseInt(e[1].split("_")[0],10);
},P=v();
if(parent==window)d=window,p=window.location.href;else try{
p=parent.window.location.href,d=parent.window;
}catch(b){
p=window.location.href,d=window;
}
return function(e){
var i=_.os;
m.is_ios=/(iPhone|iPad|iPod|iOS)/i.test(e),m.is_android=!!i.android,m.is_wp=!!i.phone,
m.is_pc=!(i.phone||!i.Mac&&!i.windows),m.inWechat=/MicroMessenger/.test(e),m.inWindowWechat=/WindowsWechat/i.test(e),
m.inMacWechat=/wechat.*mac os/i.test(e),m.is_android_phone=m.is_android&&/Mobile/i.test(e),
m.is_android_tablet=m.is_android&&!/Mobile/i.test(e),m.ipad=/iPad/i.test(e),m.iphone=!m.ipad&&/(iphone)\sos\s([\d_]+)/i.test(e),
m.is_x5=/TBS\//.test(e)&&/MQQBrowser/i.test(e);
var o,n=/XWEB\/([\d\.]+)/i,s=e.match(n);
s&&s[1]&&(o=parseInt(s[1])),m.is_xweb=!!s,m.xweb_version=o;
var r=e.match(/MicroMessenger\/((\d+)(\.\d+)*)/);
m.wechatVer=r&&r[1]||0,w.on(window,"load",function(){
if(""==y.networkType&&m.inWechat){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
},i=["2g","3g","4g","2g/3g"];
c.invoke("getNetworkType",{},function(o){
y.networkType=e[o.err_msg]||"fail",window.networkType=y.networkType,("network_type:edge"==o.err_msg||"network_type:wwan"==o.err_msg)&&(o.detailtype&&i.indexOf(o.detailtype)>-1||o.subtype&&i.indexOf(o.subtype)>-1)&&(window.networkType=o.detailtype||o.subtype),
window.simType=o.simtype;
});
}
},!1);
}(window.navigator.userAgent),"undefined"==typeof d._hasReportCanSupportVideo&&(d._hasReportCanSupportVideo=!1),
{
device:m,
isShowMpVideo:o,
isUseProxy:s,
isUseAd:n,
getNetworkType:r,
proxyPreloadExper:t,
modifyExper:a
};
});define("a/a_config.js",[],function(){
"use strict";
var e={
ANDROID_APP_PRODUCT_TYPE:12,
IOS_APP_PRODUCT_TYPE:19,
ADD_CONTACT_PRODUCT_TYPE:23,
MINI_GAME_PRODUCT_TYPE:46,
CARD_PRODUCT_TYPE:36,
SHOP_PRODUCT_TYPE:30,
WECHATCARD_PRODUCT_TYPE:47,
BRAND_WECHAT_PRODUCT_TYPE:29,
BRAND_GDT_PRODUCT_TYPE:31
},t={
POS_BOTTOM:0,
POS_MID:4,
POS_SPONSOR:3,
POS_AD_BEFORE_VIDEO:7,
POS_AD_AFTER_VIDEO:9,
POS_AD_MID_VIDEO:16
},o={
AD_DEST_TYPE:0,
OUTER_DEST_TYPE:1,
APPDETAIL_DEST_TYPE:2,
BIZ_DEST_TYPE:3,
APPINFO_PAGE_DEST_TYPE:4,
WECHAT_SHOP_DEST_TYPE:5,
WECHAT_APPLET_DEST_TYPE:6,
LEAF_DEST_TYPE:7,
CANVAS_AD_DEST_TYPE:9
},a=function(){
var e=18e4;
return window.user_uin&&!isNaN(parseInt(window.user_uin,10))&&(parseInt(window.user_uin,10)%10===2||parseInt(window.user_uin,10)%10===3)&&(e=3e4),
console.info("[广告时间缓存实验]",e),e;
}(),_=["openUrlWithExtraWebview","openADCanvas","addContact","profile","getInstallState","installDownloadTask","addDownloadTask","pauseDownloadTask","resumeDownloadTask","queryDownloadTask","launchApplication","writeCommData","adDataReport","downloadAppInternal","wxdownload:progress_change","menu:share:appmessage","menu:share:timeline","menu:share:weibo","menu:share:facebook","menu:general:share","launch3rdApp","addDownloadTaskStraight","sendAppMessage","shareTimeline","getNetworkType","jumpToBizProfile","shareWeibo","shareFB","imagePreview","getBackgroundAudioState","openWeApp","preloadMiniProgramContacts","preloadMiniProgramEnv","calRqt","openCardDetail","batchAddCard","handleMPPageAction","makePhoneCall","getOAID","saveWaid","batchPreloadMiniProgram","onScreenShot","handleAdAction","activity:state_change","getAdIdInfo","onWebPageUrlExposed"],i=["/mp/advertisement_report","/mp/ad_report","/mp/ad_video_report","/mp/jsmonitor","/mp/ad_complaint","/mp/jsreport","/tp/datacenter/report","/mp/getappmsgad","/mp/ad_biz_info"],n=[/(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/advertisement_report/,/(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/ad_report/,/(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/ad_video_report/,/(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/jsmonitor/,/(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/ad_complaint/,/(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/jsreport/,/(https?:)?\/\/mp\.weixin\.qq\.com\/tp\/datacenter\/report/,/(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/getappmsgad/,/(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/ad_biz_info/,/(https?:)?\/\/mp\.weixin\.qq\.com\/tp\/goods_info/,/(https?:)?\/\/mp\.weixin\.qq\.com\/tp\/app_mobile/,/(https?:)?\/\/mp\.weixin\.qq\.com\/tp\/datareport\/report/,/(https?:)?\/\/mp\.weixin\.qq\.com\/promotion\/wxalandpage\/getcanvasinfo/],p="转化按钮",r="广告文案或辅助信息",d={
hint_txt:"创意-20200827_1",
url:"https://ad.weixin.qq.com/guide/196?weixinadkey=59d5cf0b4fbf7d2f66cd90aaa82a5208057512dd06fcb64d7fd57e71ec15945e1744ac499e05a04999381c3bf30c21ca&amp;gdt_vid=wx0clsqxat6lzly601&amp;weixinadinfo=315019981.wx0clsqxat6lzly601.75.1",
type:"0",
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=AQM1xOr6MFeZmWeZrowCvQcrvQUBUq4o8ER2yFgwF9grPdtUR9bIJQ8laqMAJjGlkGLuVbyABIPX6Eifa2%2FK%2Buq17IIT21tYcUnpeU4VqEEsEQhc5Pa7C7drAvl0Mz30CNepODMXeD%2BEdny8SmmxN7prV78e1L2S6oqhNjrnTqM1t40ZGU84httoAODXEjmE89IX0ncOiP1oTsgm1tYwahSkxN6HLZIb6bhxZrc5ba3mCKMZ5GV4UEyDuQCyySxtA5QTt0eQJJA%2FSgHe79yTxUrzzoGrtlhK0O3HussVeRjKcvLkE6w%2FpQBnropwT%2FmE23RT2bOoyw%2BVCMlWTtk%2Bvxh%2FIOFAmrWHYzDuNkDNRo3um26RD2TFpeyRasbZoFRAV7RA9k4P3REAH4vemxktbNq24rtuF6MFGEcXpcGOD%2FxZJlBmInM7rguFAhRQWvCy3nIpO7knN2rl2DZv%2FcfkuoP4bedzUMcxtrU2Wz%2B82EG9ULHJunGHT%2F%2BcWj%2Bv8n%2Fh9bUtAtk7Fr1HBQdkQ8SbYadhRDWWuSEC2iMfqpMyzNqLltdxhyXxMRpsruPb2p4WoHnSvuGfbnkXIKcDppOTLB38xStPIbbaaR4FC%2B4AOF1UqbtMor9JJQQNz3vspSngY%2F37uYiQXAKNYB2RAB%2BbfoYMSS2VcJvY%2B0lWH3%2BYFTmBs6%2BxixGTJmB4%2FXZZcNs4PgRs6OoIefEnLz%2FvwoAvrs%2FUPotqevoiHfq%2FlLILAzo28D%2FKSU9hOOHXrS4LrUYhK47WKSeoglnagaOZI5kGZa9iBcwj9V6FR4HEml51P9u5xaTOnPZjfEAx5l6BBxTT4379irAZCB2Zfcd6wBU2Eo5p9yXVSH%2FCH8yVAgIEsrJ9oeqpO%2FwozsQ2PkXw%2Bz77B56hYp1zYG7HK%2BCDjx1NSisa6g8PFa72xOb8wpjZ9Lao70oGSWshIjCH4kWfKX0P8uFJc22L%2FZihKj0J%2BqgC1LgiMc6SXmFHdvTSIxTRKm9GImpbVfLTN3xrT%2BGGutwMTfgWta7EDR7d6HXQBA1orNotnnK37GOw1jHud8fzQkfuMN%2F7DO6kW0wAXs4LDMhJpnHi2%2Ba4VjL8Yjh0wmTZkVy4iIPYDmYSAzuJ3aP3cXuGv%2B1JwF%2Fod7hCA6RBYwZN2fXvO5AUo7FdoRr8ssPB7eAiNhcFonMv5%2Bt8L1b7QLoXGlplvxh9Fz669q43xnDsEy8ucOfyush8RiYLPxGj4YFr2gy6%2BAV5u%2FMgZIShq149jRn42%2B%2BnmzPC8JdiiIe4p5Ec7KFFrv%2F302DcKBPI9lQDsC1xWAvIfJcnxC%2FqYgDikLE1SsurxV2PV1icS%2BpU706S2LmnpyAsZw%3D%3D",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=AQM1xOr6MFeZmWeZrowCvQcrvQUBUq4o8ER2yFgwF9grPdtUR9bIJQ8laqMAJjGlkGLuVbyABIPX6Eifa2%2FK%2Buq17IIT21tYcUnpeU4VqEEsEQhc5Pa7C7drAvl0Mz30CNepODMXeD%2BEdny8SmmxN7prV78e1L2S6oqhNjrnTqM1t40ZGU84httoAODXEjmE89IX0ncOiP1oTsgm1tYwahSkxN6HLZIb6bhxZrc5ba3mCKMZ5GV4UEyDuQCyySxtA5QTt0eQJJA%2FSgHe79yTxUrzzoGrtlhK0O3HussVeRjKcvLkE6w%2FpQBnropwT%2FmE23RT2bOoyw%2BVCMlWTtk%2Bvxh%2FIOFAmrWHYzDuNkDNRo3um26RD2TFpeyRasbZoFRAV7RA9k4P3REAH4vemxktbNq24rtuF6MFGEcXpcGOD%2FxZJlBmInM7rguFAhRQWvCy3nIpO7knN2rl2DZv%2FcfkuoP4bedzUMcxtrU2Wz%2B82EG9ULHJunGHT%2F%2BcWj%2Bv8n%2Fh9bUtAtk7Fr1HBQdkQ8SbYadhRDWWuSEC2iMfqpMyzNqLltdxhyXxMRpsruPb2p4WoHnSvuGfbnkXIKcDppOTLB38xStPIbbaaR4FC%2B4AOF1UqbtMor9JJQQNz3vspSngY%2F37uYiQXAKNYB2RAB%2BbfoYMSS2VcJvY%2B0lWH3%2BYFTmBs6%2BxixGTJmB4%2FXZZcNs4PgRs6OoIefEnLz%2FvwoAvrs%2FUPotqevoiHfq%2FlLILAzo28D%2FKSU9hOOHXrS4LrUYhK47WKSeoglnagaOZI5kGZa9iBcwj9V6FR4HEml51P9u5xaTOnPZjfEAx5l6BBxTT4379irAZCB2Zfcd6wBU2Eo5p9yXVSH%2FCH8yVAgIEsrJ9oeqpO%2FwozsQ2PkXw%2Bz77B56hYp1zYG7HK%2BCDjx1NSisa6g8PFa72xOb8wpjZ9Lao70oGSWshIjCH4kWfKX0P8uFJc22L%2FZihKj0J%2BqgC1LgiMc6SXmFHdvTSIxTRKm9GImpbVfLTN3xrT%2BGGutwMTfgWta7EDR7d6HXQBA1orNotnnK37GOw1jHud8fzQkfuMN%2F7DO6kW0wAXs4LDMhJpnHi2%2Ba4VjL8Yjh0wmTZkVy4iIPYDmYSAzuJ3aP3cXuGv%2B1JwF%2Fod7hCA6RBYwZN2fXvO5AUo7FdoRr8ssPB7eAiNhcFonMv5%2Bt8L1b7QLoXGlplvxh9Fz669q43xnDsEy8ucOfyush8RiYLPxGj4YFr2gy6%2BAV5u%2FMgZIShq149jRn42%2B%2BnmzPC8JdiiIe4p5Ec7KFFrv%2F302DcKBPI9lQDsC1xWAvIfJcnxC%2FqYgDikLE1SsurxV2PV1icS%2BpU706S2LmnpyAsZw%3D%3D",
traceid:"wx0clsqxat6lzly601",
group_id:"wx0clsqxat6lzly600_wx0clsqxat6lzly601",
ticket:"",
pt:2,
image_url:"http://wxsnsdythumb.wxs.qq.com/141/20204/snscosdownload/SH/reserved/5f4604790009bfd700000000b3679d090000008d00004eec?m=1c9e9086c11018ef774e28ee3b744a67&amp;ck=1c9e9086c11018ef774e28ee3b744a67",
ad_desc:"",
biz_appid:"wx69618ae091cf2c76",
biz_info:{
user_name:"gh_1e80bb81a1d2",
nick_name:"微信广告",
head_img:"https://wxa.wxs.qq.com/res/images/bizsdk/preview/wxlogo.png",
biz_uin:3094043316,
signature:"微信广告"
},
pos_type:4,
watermark_type:0,
logo:"",
is_cpm:0,
dest_type:1,
material_width:960,
material_height:540,
ad_width:0,
ad_height:0,
use_new_protocol:2,
product_type:29,
material_type:0,
crt_exp_tid:0,
crt_exp_info:"",
flow_exp_info:"[{&quot;exp_para&quot;:[{&quot;name&quot;:94574,&quot;value&quot;:&quot;gb&quot;},{&quot;name&quot;:100036,&quot;value&quot;:&quot;1&quot;}]}]",
watermark_text:"活动推广",
crt_size:"484",
button_action:"{&quot;button_text&quot;:&quot;"+p+"&quot;,&quot;jump_type&quot;:1,&quot;jump_url&quot;:&quot;https:\\/\\/ad.weixin.qq.com\\/guide\\/196?weixinadkey=bd80a7a5a0e57a3b971b1c372bb06a3748f8f01c44f1bfe1a0aa4fe927e21037fc57ddfe77f5e0648611197259574f4b&amp;gdt_vid=wx0clsqxat6lzly601&amp;weixinadinfo=315019981.wx0clsqxat6lzly601.75.1&quot;,&quot;text_type&quot;:0}",
position_index:21,
shop_image:[],
material_id_list:[],
uxinfo:"315019981|wx0clsqxat6lzly601|289237697|0|1598496949|0|0|9020229299926746||AgI0AyUHOnPeccmEYhaAko8Pr4P95P7Vl6qjqKrxaR/CSGQ3e+STumguP/V43UuYT8o=|315020504",
ext_info:"{}",
ad_token:"bf8463b9a4b692768c820c412bb705a73e8a9dd2c769f22549e4bb5aeaaeccc1358b60b6ce7546f95cfdf7f73d187572",
crt_info:"[{&quot;width&quot;:960,&quot;height&quot;:540,&quot;thumb_url&quot;:&quot;http://wxsnsdythumb.wxs.qq.com/141/20204/snscosdownload/SH/reserved/5f4604790009bfd700000000b3679d090000008d00004eec?m=1c9e9086c11018ef774e28ee3b744a67&amp;ck=1c9e9086c11018ef774e28ee3b744a67&quot;,&quot;image_url&quot;:&quot;http://wxsnsdythumb.wxs.qq.com/141/20204/snscosdownload/SH/reserved/5f4604790009bfd700000000b3679d090000008d00004eec?m=1c9e9086c11018ef774e28ee3b744a67&amp;ck=1c9e9086c11018ef774e28ee3b744a67&quot;,&quot;size&quot;:18323,&quot;image_md5&quot;:&quot;1c9e9086c11018ef774e28ee3b744a67&quot;,&quot;materialId&quot;:&quot;112199640&quot;,&quot;card_info&quot;:{&quot;mp_tag_type&quot;:2,&quot;mp_brandeffect_isopen&quot;:0,&quot;mp_tags&quot;:[&quot;"+r+"&quot;]}}]",
reranking_ext_info:"{&quot;tid&quot;:315020504}",
ext_back_comm:"{&quot;pctr&quot;:0.019999999553}"
};
return{
defaultMidAdData:d,
AD_TYPE:e,
AD_POS:t,
AD_CACHE_TIME:a,
AD_DEST_TYPE:o,
AD_FRAME_DOMAIN:"https://wxa.wxs.qq.com",
INVALID_METHOD_NAME_MSG_PREFIX:"Invalid methodName",
INVALID_METHOD_TYPE_MSG_PREFIX:"Invalid methodType",
INVALID_ARGS_MSG_PREFIX:"Invalid args",
INVALID_REQ_PATH_MSG_PREFIX:"Invalid request path",
AD_IFRAME_HIDE_CLASS:"iframe_ad_dn",
AD_JSAPI_WHITE_LIST:_,
AD_REQ_PATH_WHITE_LIST:i,
AD_WEB_COMPT_REQ_PATH_WHITE_LIST:n,
FRAME_ERROR:"onError",
FRAME_READY:"onFrameReadyV2",
CHANGE_FRAME_STYLE:"changeFrameStyle",
PROXY_ACTION:"onProxyV2",
PROXY_CALLBACK_ACTION:"proxyCallbackV2",
CLICK_OUTSIDE_ACTION:"clickOutsideV2",
PAGE_SCROLL_ACTION:"pageScrollV2",
ORIGIN_VIDEO_VID_PREFIX:"wxv",
AD_VIDEO_FIN_ACTION:"adVideoEnd",
AD_VIDEO_PLAY_ACTION:"onVideoPlayV2",
AD_VIDEO_END_ACTION:"onVideoEndV2",
AD_PLAY_VIDEO_ACTION:"playVideoV2",
AD_CHANGE_VIDEO_STATE:"changeVideoPlayState",
AD_VIDEO_SET_SCREEN_STATE_ACTION:"setScreenState",
GET_APPMSGAD_READY_STATUS_ACTION:"getAppmsgadReadyStatus",
APPMSGAD_READY_ACTION:"appmsgadReady",
HAS_AD_DATA_QUERY_KEY:"has_ad_data",
GET_AD_DATA_AFTER_VIDEO_ACTION_NAME:"getAdDataAfterVideo",
SET_PAGE_DATA_ACTION_NAME:"setPageDataV2",
SET_AD_DATA_ACTION_NAME:"setAdDataV2",
SEND_AD_VID_ACTION:"sendAdVid",
GET_AD_VID_ACTION:"getAdVid"
};
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("a/a_utils.js",["biz_wap/jsapi/core.js","biz_wap/utils/ajax.js","biz_wap/utils/mmversion.js","biz_common/utils/report.js","biz_common/dom/class.js","biz_common/utils/url/parse.js","biz_wap/utils/openUrl.js","biz_wap/utils/wapsdk.js","common/utils.js","a/a_config.js"],function(e){
"use strict";
function t(e,t){
w("/mp/ad_report?action=follow&type="+e+t);
}
function n(e,t){
h.jsmonitor({
id:115849,
key:e,
value:t
});
}
function r(e){
h.jsmonitor({
id:28307,
key:e
});
}
function i(e){
h.jsmonitor({
id:128729,
key:e
});
}
function o(e){
var t=j.AD_WEB_COMPT_REQ_PATH_WHITE_LIST.some(function(t){
return t.test(e);
});
return t;
}
function a(e){
if(!e)return"";
var t=document.createElement("a");
return t.href=e,t.hostname;
}
function s(e){
for(var t=[],n=0;n<e.length;++n){
var r=e[n],i="undefined"==typeof r?"undefined":_typeof(r);
r="string"===i?r.htmlDecode():r,"object"===i&&(r="[object Array]"===Object.prototype.toString.call(r)?s(r):p(r)),
t.push(r);
}
return t;
}
function p(e){
var t={};
for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){
var r=e[n],i="undefined"==typeof r?"undefined":_typeof(r);
r="string"===i?r.htmlDecode():r,"object"===i&&(r="[object Array]"===Object.prototype.toString.call(r)?s(r):p(r)),
t[n]=r;
}
return t;
}
function c(e,t){
var n=0;
g.isIOS?n=1:g.isAndroid&&(n=2);
var r={
creative_load_fail:[{
ts:parseInt(+new Date/1e3,10),
aid:parseInt(e.info.aid,10),
img_url:encodeURIComponent(t),
network_type:window.networkType,
errmsg:"",
os_type:n,
client_version:parseInt(window.clientversion,10),
traceid:e.info.traceid
}]
};
r=JSON.stringify(r),l({
url:"/mp/advertisement_report?action=extra_report&extra_data="+r+"&__biz="+window.biz,
timeout:2e3
});
}
function d(e,t){
var n={
ad_sign_data:t.adSignData,
ad_sign_k1:t.adSignK1,
ad_sign_k2:t.adSignK2,
ad_sign_md5:t.signMd5
};
return v.join(e,n,!0);
}
function u(e,t,n,r){
try{
e.postMessage(JSON.stringify({
action:t,
value:n
}),r||"*");
}catch(i){
console.log("postMessage error",i);
}
}
function m(e,t){
if(!e||!e.flow_exp_info)return"";
var n=e.flow_exp_info||"";
try{
n=JSON.parse(n.replace(/&quot;/g,'"'));
}catch(r){
return"";
}
if(!n.length)return"";
for(var i=0;i<n.length;i++)if(n[i].exp_para&&n[i].exp_para.length)for(var o=0;o<n[i].exp_para.length;o++)if(n[i].exp_para[o].name===t)return n[i].exp_para[o].value;
return null;
}
function _(e){
if(!e||!e.crt_exp_info)return{};
var t=e.crt_exp_info.htmlDecode(),n={};
try{
n=JSON.parse(t);
}catch(r){
n={},console.error("getCrtExpInfo fail: ",r);
}
return n;
}
var f=e("biz_wap/jsapi/core.js"),l=e("biz_wap/utils/ajax.js"),g=e("biz_wap/utils/mmversion.js"),w=e("biz_common/utils/report.js"),y=e("biz_common/dom/class.js"),v=e("biz_common/utils/url/parse.js"),b=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,h=e("biz_wap/utils/wapsdk.js"),x=e("common/utils.js"),j=e("a/a_config.js"),z="pos_",S=[" ","-","(",":",'"',"'","：","（","—","－","“","‘"],O=["wximg.qq.com","wximg.gtimg.com","pgdt.gtimg.cn","mmsns.qpic.cn","mmbiz.qpic.cn","vweixinthumb.tc.qq.com","pp.myapp.com","wx.qlog.cn","mp.weixin.qq.com"],k=[350064395,3194181833,3191183081,3191008240,459315e3,2547206501,17516575,3194183798,3193008987,3191008237,3190008366,1314021127,3190008373,3192140177,3193183025,3191138746,3192008231,3191138747,3191138743,3193183023,3193183029,3192138635,3190138969,3192138631,3194182870,3192138630,3194182869,3192138629,3192138628,3193183024,3191138744,3192138627,3194182868,3193183031,3192138634,3190138972,3191138745,3192138633,3193183030,3190138971,3193183028,3193183027,3193183026,3190138970,3192138632,3192184240,3194248804,388382775,3193008989,3193008986,3194241008,3193240873,3193240874,3190179574],I={
report:t,
report115849:n,
report128729:i,
checkRequestUrlAllowed:o,
saveCopy:p,
saveCopyArr:s,
joinSignParam:d,
postMessage:u,
getCrtExpInfo:_,
getExpParaVal:m,
checkShowCpc:function(e,t,n,r){
if(t)return!0;
if(!e)return!1;
var i=x.getInnerHeight(),o=i/2,a=e.offsetTop,s=n.offsetHeight,p=void 0;
if(o>a?p=1:i>a&&(p=2),p&&r){
var c=JSON.stringify({
biz_middle_not_exp:[{
scene:p,
traceid:r.traceid,
aid:+r.aid,
appmsg_id:+window.appmsgid,
item_idx:+window.idx
}]
});
l({
url:"/mp/advertisement_report?action=extra_report&extra_data="+c+"&__biz="+window.biz,
timeout:2e3
});
}
return o>a||o>s-a?!1:!0;
},
openWebAppStore:function(e,t){
return x.getIosMainVersion()>=12?void f.invoke("launchApplication",{
schemeUrl:e
},function(){}):void f.invoke("downloadAppInternal",{
appUrl:e
},function(n){
n.err_msg&&-1!==n.err_msg.indexOf("ok")||b("/mp/ad_redirect?url="+encodeURIComponent(e)+"&ticket="+t);
});
},
adOptReport:function(e,t,n,r){
var i=v.join("/mp/ad_complaint",{
action:"report",
type:e,
pos_type:t,
trace_id:n,
aid:r,
__biz:window.biz,
r:Math.random()
},!0);
w(i);
},
checkAdImg:function(e){
if(e){
var t=e.image_url||"",n=a(t);
n&&-1===O.indexOf(n)&&r(58);
}
},
formName:function(e){
for(var t=-1,n=0,r=S.length;r>n;++n){
var i=S[n],o=e.indexOf(i);
-1!==o&&(-1===t||t>o)&&(t=o);
}
return-1!==t&&(e=e.substring(0,t)),e;
},
formSize:function(e){
return"number"!=typeof e?e:(e>=1024?(e/=1024,e=e>=1024?(e/1024).toFixed(2)+"MB":e.toFixed(2)+"KB"):e=e.toFixed(2)+"B",
e);
},
isItunesLink:function(e){
return/^https?:\/\/(itunes|apps)\.apple\.com\//.test(e);
},
extend:function(e,t){
for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);
return e;
},
getPosKeyDesc:function(e,t){
var n=t?e+"_"+t:e;
return z+n;
},
openCanvasAd:function(e){
f.invoke("openADCanvas",{
canvasId:e.canvasId,
preLoad:0,
noStore:0,
extraData:JSON.stringify({
pos_type:e.pos_type
}),
adInfoXml:e.adInfoXml
},function(n){
0!==Number(n.ret)?(b(e.url),t(135,e.report_param)):t(134,e.report_param);
});
},
setBackgroundClass:function(){
window._has_comment||0!==window.adDatasRealNum||window._share_redirect_url||window.is_temp_url?y.removeClass(document.body,"rich_media_empty_extra"):y.addClass(document.body,"rich_media_empty_extra");
},
lazyLoadAdImg:function(e){
for(var t=document.getElementsByClassName("js_alazy_img"),n=function(n){
var i=t[n];
i.onload=function(){
r(54),i.src.indexOf("retry")>-1&&r(69);
},i.onerror=function(){
-1===i.src.indexOf("retry")?i.src=v.addParam(i.src,"retry",1):!function(){
r(98);
var t="other";
g.isIOS?t="iphone":g.isAndroid&&(t="android"),setTimeout(function(){
var n=window.networkType||"unknow",r=v.join("/tp/datacenter/report",{
cmd:"report",
id:900023,
uin:777,
os:t,
aid:e.aid,
image_url:encodeURIComponent(i.src),
type:e.type,
network:n
},!0);
l({
url:r,
async:!0
});
},500),c(e,i.src);
}(),r(57);
},i.src=i.dataset.src;
},i=0;i<t.length;i++)n(i);
},
reportUrlLength:function(e,t,r,i,o,a,s){
var p=d(s,{
adSignData:e,
adSignK1:t,
adSignK2:r,
signMd5:i,
viewidKeyObj:o
});
if(p.length>=4e3){
n(13);
var c=JSON.stringify({
biz_log_report:[{
pos_type:+a.pos_type,
traceid:a.tid,
aid:+a.aid,
log_type:1,
ext_info:"[url length:"+p.length+"]"+s.substring(0,2e3)
}]
});
l({
url:"/mp/advertisement_report?action=extra_report",
timeout:2e3,
data:{
extra_data:c,
__biz:window.biz
},
type:"post"
});
}
},
isVideoSharePageOnlyAd:function(){
return"5"===window.item_show_type&&"ad"===v.getQuery("render_type");
},
listenMessage:function(e,t,n){
arguments.length<3&&(n=t,t=null);
var r=function(e){
var r=void 0;
if(!t||e.origin===t){
if("object"!==_typeof(e.data))try{
r=JSON.parse(e.data);
}catch(i){
return;
}else r=e.data;
"function"==typeof n&&n(e,r);
}
};
return e.addEventListener("message",r),r;
},
removeListen:function(e,t){
e.removeEventListener("message",t);
},
isSample:function(e){
return k.indexOf(window.user_uin)>-1?!0:window.user_uin&&window.user_uin/100%1e3<=10*e?!0:!1;
},
broadcastFrame:function(e,t,n,r){
e=e||[];
for(var i=0;i<e.length;i++){
var o=e[i].src||e[i].getAttribute("data-realsrc");
(!r||r&&o.indexOf(r)>-1)&&u(e[i].contentWindow,t,n);
}
}
};
return I;
});var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var i=arguments[t];
for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o]);
}
return e;
};
define("a/a.js",["biz_wap/utils/mmversion.js","biz_common/utils/get_para_list.js","biz_common/utils/url/parse.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/storage.js","appmsg/log.js","biz_common/dom/class.js","a/a_config.js","a/a_utils.js","common/utils.js","biz_common/dom/offset.js","a/appdialog_confirm.js","biz_common/utils/wxgspeedsdk.js","a/web_compt_ad.js","video/video_tail_utils.js"],function(e){
"use strict";
function t(e){
var t=void 0;
e===R.POS_MID&&(t=document.getElementsByTagName("mpcpc")),z[e]=t.length;
for(var i=0;i<t.length;i++)B[S.getPosKeyDesc(e,i)]=t[i];
}
function i(){
t(R.POS_MID);
}
function o(){
var e=1,t=null;
if(!j){
var i=-1!==navigator.userAgent.indexOf("WindowsWechat");
if(!document.getElementsByClassName||-1===navigator.userAgent.indexOf("MicroMessenger")||i||g.isInMiniProgram){
if(e=0,F&&(F.style.display="none"),W&&(W.style.display="none"),z[R.POS_MID])for(var o=0;o<z[R.POS_MID];o++){
var a=B[S.getPosKeyDesc(R.POS_MID,o)];
a&&(a.style.display="none");
}
}else if(window.localStorage&&-1===window.location.href.indexOf("mock"))try{
var n=N.get(C);
t=n.info;
try{
t=JSON.parse(t);
}catch(r){
t=null;
}
var s=Date.now()-n.time;
if(6e4>=s?M.report120081(12):12e4>=s?M.report120081(13):s<E.AD_CACHE_TIME&&M.report120081(14),
t&&s<E.AD_CACHE_TIME&&1*t.advertisement_num>0){
if(e=0,window.user_uin&&!Number.isNaN(parseInt(window.user_uin,10))&&parseInt(window.user_uin,10)%10!==2&&parseInt(window.user_uin,10)%10!==3){
var d=[],p=void 0;
if(t.advertisement_info)for(var o in t.advertisement_info)Object.prototype.hasOwnProperty.call(t.advertisement_info,o)&&d.push({
pos_type:+t.advertisement_info[o].pos_type,
traceid:t.advertisement_info[o].traceid,
aid:+t.advertisement_info[o].aid,
log_type:9,
ext_info:JSON.stringify({
duplicate_time:s
})
});
p=JSON.stringify({
biz_log_report:d
}),y({
url:"/mp/advertisement_report?action=extra_report&extra_data="+p+"&__biz="+window.biz,
timeout:2e3
}),console.log("[广告命中缓存上报]",p);
}
}else N.remove(C);
O("[Ad] is_need_ad: "+e+" , adData:"+JSON.stringify(n));
}catch(r){
e=1,t=null;
}
}
return{
is_need_ad:e,
both_ad:0,
_adInfo:t
};
}
function a(e){
e=e||document.body.offsetHeight,I.invoke("configMpAdAttrs",{
viewHeight:e
},function(t){
console.log("debug for configMpAdAttrs height: ",e,", response:",t);
});
}
function n(e,t,i,o){
if(e.pos_type===R.POS_MID&&!z[R.POS_MID]){
if(!q){
var a=Date.now();
q=v(k,{
getNestedStructure:e.position_index>=v.paragraphStartIdx
}),Math.random()<.1&&(b.saveSpeeds({
uin:window.user_uin,
pid:34,
speeds:[{
sid:37,
time:Date.now()-a
}]
}),b.send());
}
var n=void 0!==e.position_index;
e.position_index=e.position_index>=v.paragraphStartIdx?e.position_index-v.paragraphStartIdx:e.position_index,
n=n&&e.position_index>=0&&e.position_index<q.length;
var r=o?(i+1)/(o+1)*q.length:q.length/2,s=n?e.position_index:Math.floor(r)-1;
s=0>s?0:s;
var d=q[s],p=d.parentNode,_=document.createElement("p");
p.appendChild(_);
var m=_.offsetWidth;
if(p.removeChild(_),m<.7*k.offsetWidth){
if(void 0!==e.position_index){
var f=JSON.stringify({
url:encodeURIComponent(window.location.href),
dataType:"mid_ad_width_url"
});
(new Image).src="/mp/jsmonitor?idkey=120081_23_1&lc=1&log0="+f+"&r="+Math.random();
}else M.report120081(15);
return;
}
var c=document.createElement("mpcpc");
B[S.getPosKeyDesc(R.POS_MID)]=c,M.insertAfter(c,d),t&&S.report115849(2);
}
}
function r(){
var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=0,i=0,o=0,a=[],n=[],r=[],s=M.getWebComptStatus();
for(var d in e)if(Object.prototype.hasOwnProperty.call(e,d)){
var p=e[d];
if((p.pos_type===R.POS_BOTTOM||p.pos_type===R.POS_AD_AFTER_VIDEO)&&"5"===window.item_show_type)continue;
var _=S.getCrtExpInfo(p),m=110===_.exp_type,f=g.isAndroid&&g.gtVersion("7.0.15",!0),c=p.pos_type===R.POS_MID&&"1"===S.getExpParaVal(p,100280),l=!!A.getQuery("forcewebcompt"),u=p.pos_type===R.POS_MID,h=p.pos_type===R.POS_AD_BEFORE_VIDEO,v=p.pos_type===R.POS_BOTTOM&&"1"===S.getExpParaVal(p,100316),y=p.pos_type===R.POS_BOTTOM;
if(u&&t++,c&&i++,y&&o++,f&&(s&&"error"===s.status&&S.report128729(64),s&&"loading"===s.status&&S.report128729(65)),
s&&"ready"===s.status&&f&&(c||v||m||l))r.push(p);else if(u||h&&0===p.is_mp_video||y||p.pos_type===R.POS_AD_AFTER_VIDEO||p.pos_type===R.POS_AD_MID_VIDEO||h&&1===p.is_mp_video||p.pos_type===R.POS_SPONSOR)n.push(p);else{
a.push(p);
var I=JSON.stringify({
adInfo:p,
dataType:"unrecognized_ad_info"
});
(new Image).src="/mp/jsmonitor?idkey=115849_72_1&lc=1&log0="+I+"&r="+Math.random();
}
}
if(o>1){
for(var w=[],O={
aid:Date.now(),
pos_type:R.POS_BOTTOM
},d=n.length-1;d>=0;d--)n[d].pos_type===R.POS_BOTTOM&&w.push(n.splice(d,1)[0]);
O.children=w.reverse(),O.flow_exp_info=O.children[0].flow_exp_info,n.push(O);
}
if(window.is_temp_url&&t<z[R.POS_MID])for(var d=t;d<z[R.POS_MID];d++){
var D=_extends({
aid:""+parseInt(Math.random()*Math.pow(10,9),10)
},E.defaultMidAdData);
r.length?r.push(D):n.push(D);
}
return{
oldAdInfos:a,
newAdInfos:n,
webComponentAdInfos:r,
midAdDataCount:t,
webComptMidAdDataCount:i
};
}
function s(e,t){
if(!e)return e;
var i=document.createElement("iframe"),o=S.getExpParaVal(t,94574),a=1*S.getExpParaVal(t,104690)===1&&-1!==[R.POS_BOTTOM,R.POS_MID].indexOf(t.pos_type),n=A.getQuery("forceframeversion");
o=n||o,o=o&&a?t.pos_type+"/"+o:o;
var r=o?o+"/":"",s=E.AD_FRAME_DOMAIN+"/tmpl/"+r+"base_tmpl.html";
i.src=s,i.className="iframe_ad_container",i.scrolling="no",i.createIframeTime=Date.now(),
e.appendChild(i),g.isIOS&&(i.style.width="1px",i.style.minWidth="100%");
var d=new Image;
d.onerror=function(){
S.report115849(86);
},d.src="https://wxa.wxs.qq.com/images/icon/icon_video_go.png";
try{
localStorage.setItem("__WXLS_ad_iframe_url",s);
}catch(p){
console.error(p);
}
return i;
}
function d(e,t,i){
S.postMessage(e,t,i,E.AD_FRAME_DOMAIN);
}
function p(e,t){
return e+" | "+t;
}
function _(e,t){
var i=e.getAttribute("data-src"),o=e.src||i;
return/^http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/.test(i)||/^http(s)*\:\/\/mp\.weixin\.qq\.com\/mp\/readtemplate\?t=pages\/video_player_tmpl/.test(i)?o&&o.indexOf("vid="+t)>-1:!1;
}
function m(e,t,i){
d(e,"proxyCallbackV2",{
proxyId:t.proxyId,
aid:t.aid,
proxyData:i
});
}
function f(e,t){
var i=t.proxyData||{};
T({
app_name:i.args.app_name,
app_img_url:i.args.icon_url,
onOk:function(){
m(e,t,{
err_msg:"appDialogConfirm:yes"
});
},
onCancel:function(){
m(e,t,{
err_msg:"appDialogConfirm:cancel"
});
}
});
}
function c(){
this.aInfoMap={},this.iframes=document.getElementsByTagName("iframe");
}
function l(e,t){
L&&A.getQuery("adWidth")&&(document.documentElement.style.width=A.getQuery("adWidth")+"px");
var i={};
if(0===e.is_need_ad)i=e._adInfo,i||(i={
advertisement_num:0
});else if(t.advertisement_num>0&&t.advertisement_info&&(i.advertisement_info=S.saveCopy(t.advertisement_info)),
i.advertisement_num=t.advertisement_num,i.appid=t.appid,window._adRenderData=i,i){
var o=S.saveCopy(i),a=o.advertisement_info;
if(a)for(var s in a)(a[s].pos_type===R.POS_AD_BEFORE_VIDEO||a[s].pos_type===R.POS_AD_AFTER_VIDEO)&&(delete a[s],
o.advertisement_num--);
o.advertisement_num&&N.set(C,{
info:JSON.stringify(o),
time:Date.now()
},+new Date+24e4);
}
i=i||{
advertisement_num:0
};
var d=r(i.advertisement_info);
G=new c,G.handleAdWithFrame(d.newAdInfos,d.midAdDataCount,i.appid),J=new V,J.config({
adElCountMapByPos:z,
insertAutoAdElement:n
}),J.handleAd(d.webComponentAdInfos,d.webComptMidAdDataCount),!i.flag&&i.advertisement_num>0&&(window.adDatasRealNum=i.advertisement_num);
}
function u(){
return G;
}
function h(){
return J;
}
var g=e("biz_wap/utils/mmversion.js"),v=e("biz_common/utils/get_para_list.js"),A=e("biz_common/utils/url/parse.js"),y=e("biz_wap/utils/ajax.js"),I=e("biz_wap/jsapi/core.js"),w=e("biz_wap/utils/storage.js"),O=e("appmsg/log.js"),D=e("biz_common/dom/class.js"),E=e("a/a_config.js"),S=e("a/a_utils.js"),M=e("common/utils.js"),P=e("biz_common/dom/offset.js"),T=e("a/appdialog_confirm.js"),b=e("biz_common/utils/wxgspeedsdk.js"),V=e("a/web_compt_ad.js"),x=e("video/video_tail_utils.js"),N=new w("ad"),C=[window.biz,window.sn,window.mid,window.idx].join("_"),j=!!A.getQuery("mock")||!!A.getQuery("rtx"),R=E.AD_POS,W=document.getElementById("js_bottom_ad_area"),F=document.getElementById("js_sponsor_ad_area"),B={
pos_3:F,
pos_0:W
},z={},k=document.getElementById("js_content"),H=document.getElementById("page-content"),L=S.isVideoSharePageOnlyAd(),q=void 0;
c.prototype.initMidAd=function(e,t){
n(e,!0,t,this.midAdDataCount);
var i=document.getElementsByTagName("mpcpc")[t];
i&&(this.aInfoMap[e.aid].iframeEle=s(i,e),window.__report&&window.__report(125),
S.report115849("0"));
},c.prototype.initAdBeforeVideo=function(e){
for(var t=[],i=[],o=0;o<this.iframes.length;o++){
var a=this.iframes[o];
if(t.push(a.getAttribute("data-src")),i.push(a.src),_(a,e.vid)){
var n=12,r=this.aInfoMap[e.aid],d=document.createElement("div");
d.className="mpad_relative";
var p=a.nextSibling;
M.insertAfter(d,a),d.appendChild(a);
var m=s(d,e);
return D.addClass(m,"mpad_absolute"),r.iframeEle=m,r.heightWidthRate=(parseInt(a.style.height,10)-n)/parseInt(a.style.width,10),
a.adVidFromAppmsg=e.vid,setTimeout(function(){
a.contentWindow?a.contentWindow.adVidFromAppmsg=e.vid:S.report115849(51),S.postMessage(a.contentWindow,E.SEND_AD_VID_ACTION,{
adVidFromAppmsg:e.vid
});
},0),p&&d.appendChild(p),void(0===e.is_mp_video?S.report115849(1):M.report120081(3));
}
}
},c.prototype.responseVideoGetAdVid=function(e){
for(var t=0;t<this.iframes.length;t++)if(e===this.iframes[t].contentWindow&&this.iframes[t].adVidFromAppmsg)return void S.postMessage(e,E.SEND_AD_VID_ACTION,{
adVidFromAppmsg:this.iframes[t].adVidFromAppmsg
});
S.postMessage(e,E.SEND_AD_VID_ACTION,{});
},c.prototype.initAdAfterVideo=function(e){
var t=document.getElementById("js_tail_video_ad_area"),i=s(t,e);
this.aInfoMap[e.aid].heightWidthRate=t.offsetHeight/t.offsetWidth,this.aInfoMap[e.aid].iframeEle=i,
this.aInfoMap[e.aid].tailAdArea=t;
},c.prototype.initAdMidVideo=function(e){
var t=document.getElementById("js_mid_video_ad_area");
t&&!this.aInfoMap[e.aid].iframeEle&&(this.aInfoMap[e.aid].iframeEle=s(t,e));
},c.prototype.initBottomAd=function(e){
this.aInfoMap[e.aid].iframeEle=s(W,e),S.report115849(9);
},c.prototype.initSponsorAd=function(e){
this.aInfoMap[e.aid].iframeEle=s(F,e),S.report115849(63);
},c.prototype.onFrameReady=function(e){
var t="",i=void 0;
if(S.report115849(99),this.mapInfoMap(function(t,o,a){
o.contentWindow===e&&(i=a);
}),i){
var o=i.iframeEle.parentNode,a="8"===window.item_show_type&&M.isNativePage();
i.aInfo.pos_type===R.POS_MID&&(t=o&&o.dataset&&o.dataset.category_id_list),d(e,E.SET_PAGE_DATA_ACTION_NAME,{
biz:window.biz,
uin:window.uin,
scene:window.scene,
source:window.source,
idx:window.idx,
mid:window.mid,
isSg:window.isSg,
userUin:window.user_uin,
sn:window.sn,
appmsgid:window.appmsgid,
sendTime:window.send_time||"",
passTicket:decodeURIComponent(window.pass_ticket),
itemShowType:window.item_show_type,
globalAdDebug:j,
bodyScrollTop:M.getScrollTop(),
contentOffsetHeight:H?H.offsetHeight:0,
adOffsetTop:P.getOffset(i.iframeEle).offsetTop,
screenHeight:M.getInnerHeight(),
midCategoryIdList:t,
heightWidthRate:i.heightWidthRate,
createIframeTime:i.iframeEle.createIframeTime,
skin:a?"black":"white",
appid:this.appid,
pageUrl:window.location.href
}),d(e,"setAdDataV2",i.aInfo);
}
},c.prototype.mapInfoMap=function(e,t){
for(var i in this.aInfoMap)if(Object.prototype.hasOwnProperty.call(this.aInfoMap,i)){
var o=this.aInfoMap[i],a=o.iframeEle;
a&&(!t||t&&t===i)&&e&&e(o.aInfo,a,o);
}
},c.prototype.broadcastAdFrame=function(e,t){
this.mapInfoMap(function(i,o){
d(o.contentWindow,e,t);
});
},c.prototype.hasVideoPlayingInScreen=function(e,t){
try{
for(var i=e+t,o=0;o<this.iframes.length;o++){
var a=this.iframes[o],n=P.getOffset(a).offsetTop;
if(("play"===a.contentWindow.videoStatus||"loading"===a.contentWindow.videoStatus)&&i>n&&e<n+a.offsetHeight)return!0;
}
}catch(r){
return!1;
}
return!1;
},c.prototype.bindScrollEvent=function(){
var e=this;
M.bindDebounceScrollEvent(function(){
var t=M.getScrollTop(),i=M.getInnerHeight();
e.mapInfoMap(function(o,a){
var n=P.getOffset(a).offsetTop;
a.contentWindow&&d(a.contentWindow,"pageScrollV2",{
bodyScrollTop:t,
adOffsetTop:n,
screenHeight:i,
hasVideoPlayingInScreen:e.hasVideoPlayingInScreen(t,i)
});
});
});
},c.prototype.checkApiInvokeValid=function(e){
if(!this.aInfoMap[e.aid])return"Invalid aid";
var t=e.proxyData||{},i=this.aInfoMap[e.aid].aInfo,o=t.methodName;
return-1===E.AD_JSAPI_WHITE_LIST.indexOf(o)?p(E.INVALID_METHOD_NAME_MSG_PREFIX,o):"addContact"!==o&&"profile"!==o||i&&i.biz_info&&t.args.username===i.biz_info.user_name?!0:p(E.INVALID_ARGS_MSG_PREFIX,"Invalid biz username");
},c.prototype.changeFrameStyle=function(e){
if(this.aInfoMap[e.aid]){
var t=this.aInfoMap[e.aid].iframeEle;
if(e.display===!1?D.addClass(t,E.AD_IFRAME_HIDE_CLASS):e.display===!0&&D.removeClass(t,E.AD_IFRAME_HIDE_CLASS),
e.height&&(t.style.height=e.height),L&&a(parseInt(e.height,10)),this.aInfoMap[e.aid].aInfo.pos_type===R.POS_BOTTOM&&!this.hasReportBottomTime&&"5"===window.item_show_type){
var i=Date.now()-window.logs.pagetime.page_begin;
if(this.hasReportBottomTime=!0,Math.random()>.1)return;
b.saveSpeeds({
uin:window.uin,
pid:675,
speeds:[{
sid:28,
time:i
}]
}),b.send();
}
}
},c.prototype.commonRequest=function(e,t){
var i=t.proxyData||{},o=i.args||{};
return-1===E.AD_REQ_PATH_WHITE_LIST.indexOf(o.path)?void m(e,t,{
err_msg:p(E.INVALID_REQ_PATH_MSG_PREFIX,o.path)
}):(y({
type:o.requestType,
url:o.path+"?"+(o.requestQuery||""),
data:o.requestBody||{},
mayAbort:!0,
success:function(i){
m(e,t,{
err_msg:"request:success",
response:i
});
},
error:function(i,o){
m(e,t,{
err_msg:"request:error",
xhr:i,
err_info:o
});
}
}),void("/mp/advertisement_report"===o.path&&o.requestQuery.indexOf("report_type=2")>-1&&S.report115849(38)));
},c.prototype.onJsapiProxy=function(e,t){
function i(i){
m(e,t,i),"openUrlWithExtraWebview"===o.methodName&&-1===i.err_msg.indexOf("ok")&&(window.location.href=o.args.url);
}
if("5"!==window.item_show_type||this.aInfoMap[t.aid]){
var o=t.proxyData||{},a=this.checkApiInvokeValid(t);
if("string"==typeof a)return void m(e,t,{
err_msg:a
});
if("handleMPPageAction"===o.methodName&&"closeAdWebview"===o.args.action)return void x.showTailPanel(!0);
try{
"on"===o.methodType?I[o.methodType](o.methodName,i):I[o.methodType](o.methodName,o.args,i);
}catch(n){
console.error(n),m(e,t,{
err_msg:p(E.INVALID_METHOD_TYPE_MSG_PREFIX,o.methodType)
});
}
"adDataReport"===o.methodName&&1===o.args.need_record_page_operation&&S.report115849(41);
}
},c.prototype.onProxy=function(e,t){
if("jsapi"===t.proxyType)return void this.onJsapiProxy(e,t);
var i=t.proxyData||{};
if("bizapi"===t.proxyType){
if("appDialogConfirm"===i.methodName)return void f(e,t);
if("request"===i.methodName)return void this.commonRequest(e,t);
if("addIdKeyReport"===i.methodName)return void(window.__addIdKeyReport&&window.__addIdKeyReport(i.args.id,i.args.key,i.args.val));
"removeADCache"===i.methodName&&N.remove(C);
}
},c.prototype.bindAppVideoEvent=function(){
var e=this;
"5"===window.item_show_type&&(M.isNativePage()||M.isWcSlPage())&&this.hasAdAfterVideo?x.onReceiveMPPageData(function(t){
t.data===E.GET_AD_DATA_AFTER_VIDEO_ACTION_NAME&&e.newAdInfos.map(function(e){
e.pos_type===R.POS_AD_AFTER_VIDEO&&x.sendMPPageData(JSON.stringify({
aInfo:e,
dataType:"adData"
}),"adWeb");
});
}):window.location.href.indexOf("/mp/authreadtemplate")>-1&&x.setTailOpts({
hasAd:this.hasAdAfterVideo,
showAd:function(){
e.mapInfoMap(function(e,t,i){
e.pos_type===R.POS_AD_AFTER_VIDEO&&(d(t.contentWindow,E.SET_PAGE_DATA_ACTION_NAME,{
heightWidthRate:i.tailAdArea.offsetHeight/i.tailAdArea.offsetWidth
}),d(t.contentWindow,E.AD_PLAY_VIDEO_ACTION,""));
});
}
});
},c.prototype.bindAdEvent=function(){
var e=this,t=document.getElementById("js_article");
S.listenMessage(window,function(t,i){
var o=i.action,a=i.value||{};
if(o===E.AD_VIDEO_PLAY_ACTION&&a.playAd&&S.report115849(35),o===E.AD_VIDEO_PLAY_ACTION&&(a.vid||a.aid))return a.playAd&&S.report115849(25),
e.mapInfoMap(function(e,t){
var i=e.vid&&e.vid===a.vid;
i||e.aid===a.aid?i&&(d(t.contentWindow,E.AD_PLAY_VIDEO_ACTION,""),a.playAd&&S.report115849(21)):d(t.contentWindow,"pauseVideoV2","");
}),void(a.aid&&S.broadcastFrame(e.iframes,E.AD_VIDEO_PLAY_ACTION,"","vid="));
if("mpvideo_broadcast_statusChange"===i.type)return void(t.source.videoStatus=i.data.status);
if(i.action===E.GET_AD_VID_ACTION&&e.responseVideoGetAdVid(t.source),t.origin===E.AD_FRAME_DOMAIN)switch(o){
case"onFrameReadyV2":
e.onFrameReady(t.source);
break;

case"onProxyV2":
e.onProxy(t.source,a);
break;

case"changeFrameStyle":
e.changeFrameStyle(a);
break;

case"onVideoEndV2":
e.mapInfoMap(function(t){
S.broadcastFrame(e.iframes,E.AD_VIDEO_FIN_ACTION,"","vid="+t.vid);
},a.aid);
}
}),t&&t.addEventListener("click",function(){
e.broadcastAdFrame("clickOutsideV2","");
}),this.bindScrollEvent();
},c.prototype.handleAdWithFrame=function(){
var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=arguments.length<=1||void 0===arguments[1]?0:arguments[1],i=arguments[2],o=0,a=this;
this.midAdDataCount=t,this.newAdInfos=e,this.appid=i,e.forEach(function(e){
return a.aInfoMap[e.aid]={
aInfo:e
},e.pos_type===R.POS_MID?(a.initMidAd(e,o),void o++):e.pos_type===R.POS_AD_BEFORE_VIDEO?(0===e.is_mp_video?S.report115849(18):M.report120081(2),
void a.initAdBeforeVideo(e)):e.pos_type===R.POS_BOTTOM?void a.initBottomAd(e):e.pos_type===R.POS_AD_AFTER_VIDEO?(a.hasAdAfterVideo=!0,
void(M.isWcSlPage()?x.setHasAdData4WcSlPlayer(!0):M.isNativePage()?x.createTailWebview(!0):(S.report115849(33),
a.initAdAfterVideo(e)))):e.pos_type===R.POS_AD_MID_VIDEO?(a.hasAdMidVideo=!0,void a.initAdMidVideo(e)):void(e.pos_type===R.POS_SPONSOR&&a.initSponsorAd(e));
}),x.setTailOpts({
canCreateTailWebview:!0
}),e.length&&(this.bindAppVideoEvent(),this.bindAdEvent());
},c.prototype.handleAdWithFrameAsync=function(){
var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0];
this.newAdInfos&&this.newAdInfos.forEach(function(t){
t.pos_type===R.POS_AD_MID_VIDEO&&-1!==e.indexOf(R.POS_AD_MID_VIDEO)&&this.initAdMidVideo(t);
});
};
var G=null,J=null;
return i(),{
checkNeedAds:o,
afterGetAdData:l,
getAdFrameController:u,
getWebComptAdController:h
};
});define("rt/appmsg/getappmsgext.rt.js",[],function(){
"use strict";
return{
base_resp:{
ret:"number",
errmsg:"string",
wxtoken:"number"
},
advertisement_num:"number",
advertisement_info:[{
hint_txt_R:"string",
url_R:"string",
type_R:"string",
rl_R:"string",
apurl_R:"string",
traceid_R:"string",
group_id_R:"string",
ticket:"string",
aid:"string",
pt:"number",
image_url:"string",
ad_desc:"string",
biz_appid:"string",
pos_type:"number",
watermark_type:"number",
logo:"string",
app_info:{},
biz_info:{},
card_info:{}
}],
comment_enabled:"number",
appmsgticket:{
ticket:"string"
},
self_head_imgs:"string",
appmsgstat:{
ret:"number",
show:"boolean",
is_login:"boolean",
like_num:"number",
liked:"boolean",
read_num:"number",
real_read_num:"number"
},
timestamp:"number",
reward_total_count:"number",
reward_head_imgs:["string"]
};
});define("pages/video_communicate_adaptor.js",["pages/player_tips.js"],function(t){
"use strict";
function e(){
window.addEventListener("message",i,!1),p();
}
function i(t){
var e;
if(t.origin?e=t.origin:t.originalEvent&&(e=t.originalEvent.origin),/^http(s)?\:\/\/mp\.weixin\.qq\.com$/.test(e)&&t.source){
var i=t.data;
if(i&&i.type){
if(!/^mpvideo_/.test(i.type))return;
var o=i.type.replace(/^mpvideo_/,"");
/^broadcast_/.test(o)?u.postMessageEvt.broadcast({
data:i.data,
type:o
}):u.postMessageEvt[o]&&u.postMessageEvt[o](i.data);
}
}
}
function o(t){
var e=t.type.replace(/^broadcast_/,""),i=d();
if(i.length>0)for(var o=0,a=i.length;a>o;o++){
var r=i[o];
n({
win:r.contentWindow,
type:e,
data:t.data
});
}
n({
win:window,
type:e,
data:t.data
});
}
function n(t){
var e=t.type;
/^mpvideo_/.test(e)||(e="mpvideo_"+e);
var i={
data:t.data,
type:e
};
t.win.postMessage(i,document.location.protocol+"//mp.weixin.qq.com");
}
function a(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
t.msg&&new f({
msg:t.msg
});
}
function r(t){
for(var e=d({
vid:t.vid
}),i=0,o=e.length;o>i;i++){
var a=e[i];
a.style.display="";
var r=a.parentNode,s=r.querySelectorAll('.js_img_loading[data-vid="'+t.vid+'"]');
if(s&&s.length>0)for(var i=0,o=s.length;o>i;i++)r.removeChild(s[i]);
n({
type:"afterRemoveLoading",
win:a.contentWindow
});
}
}
function d(t){
t=t||{};
for(var e=document.getElementsByTagName("iframe"),i=[],o=0,n=e.length;n>o;o++){
var a=e[o],r=a.getAttribute("src");
if(window.__second_open__&&(r=a.getAttribute("data-realsrc")),r&&-1!=r.indexOf("/mp/videoplayer")){
if("undefined"!=typeof t.vid){
var d=r.match(/[\?&]vid\=([^&]*)/);
if(!d||!d[1]||d[1]!=t.vid)continue;
}
i.push(a);
}
}
return i;
}
function s(t){
if(t.height){
var e=d({
vid:t.vid
});
if(0!=e.length){
var i=e[0],o=i.offsetHeight+1*t.height;
i.setAttribute("height",o),i.setAttribute("data-additionalheight",t.height),i.style.setProperty&&i.style.setProperty("height",o+"px","important");
}
}
}
function v(t){
u.videoInfo[t.vid]||(u.videoInfo[t.vid]={}),u.videoInfo[t.vid].ori_status=t.ori_status,
u.videoInfo[t.vid].hit_bizuin=t.hit_bizuin,u.videoInfo[t.vid].hit_vid=t.hit_vid;
}
function p(){
"function"==typeof window.__getVideoWh&&window.addEventListener("resize",function(){
for(var t=d(),e=0,i=t.length;i>e;e++){
var o=t[e];
setTimeout(function(t){
return function(){
var e=window.__getVideoWh(t),i=e.w,o=e.h,n=1*t.getAttribute("data-additionalheight");
n&&(o+=n),t.setAttribute("width",i),t.setAttribute("height",o),t.style.setProperty&&(t.style.setProperty("width",i+"px","important"),
t.style.setProperty("height",o+"px","important"));
};
}(o),50);
}
},!1);
}
function g(){
return u.videoInfo;
}
var f=t("pages/player_tips.js"),u={
videoInfo:{},
postMessageEvt:{
broadcast:o,
removeVideoLoading:r,
addVideoIframeHeight:s,
videoInited:v,
showTips:a
}
};
return e(),{
getVideoInfo:g
};
});define("biz_wap/utils/ajax_wx.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function t(e){
var t={};
return"undefined"!=typeof uin&&(t.uin=uin),"undefined"!=typeof key&&(t.key=key),
"undefined"!=typeof pass_ticket&&(t.pass_ticket=pass_ticket),"undefined"!=typeof wxtoken&&(t.wxtoken=wxtoken),
"undefined"!=typeof window.devicetype&&(t.devicetype=window.devicetype),"undefined"!=typeof window.clientversion&&(t.clientversion=window.clientversion),
window.biz&&(t.__biz=window.biz),r.getQuery("enterid")&&(t.enterid=r.getQuery("enterid")),
"undefined"!=typeof appmsg_token?t.appmsg_token=appmsg_token:e.indexOf("advertisement_report")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=68064_13_1&r="+Math.random()),
t.x5=p?"1":"0",t.f="json",r.join(e,t);
}
function i(e,t){
return e.url.indexOf(t)>-1&&-1===e.url.indexOf("action=")&&(!e.data||!e.data.action);
}
function n(e){
var t=a.isIOS&&a.gtVersion("7.0.10",!0)||a.isAndroid&&a.gtVersion("7.0.12",!0);
s.invoke("currentMpInfo",{
userName:window.user_name,
brandName:t&&""===window.nickname?"未命名公众号":window.title,
title:window.msg_title||"",
brandIcon:hd_head_img.replace(/\/0$/,"/132"),
itemShowType:window.item_show_type,
isPaySubscribe:window.isPaySubscribe,
topBarStyle:t?1:0,
topBarShowed:e
},function(){});
}
function o(e){
console.log(e),/^(http:\/\/|https:\/\/|\/\/)/.test(e.url)?/^\/\//.test(e.url)&&(e.url="https:"+e.url):e.url="https://mp.weixin.qq.com/"+e.url.replace(/^\//,""),
e.url+=-1==e.url.indexOf("?")?"?fasttmplajax=1":"&fasttmplajax=1","html"==e.f||-1!=e.url.indexOf("?f=json")&&-1!=e.url.indexOf("&f=json")||(e.url+="&f=json"),
e.notJoinUrl||"html"==e.f||(e.url=t(e.url));
var o=null;
if("object"==typeof e.data){
var p=e.data;
o=[];
for(var d in p)p.hasOwnProperty(d)&&o.push(d+"="+encodeURIComponent(p[d]));
o=o.join("&");
}else o="string"==typeof e.data?e.data:null;
console.log("ajax_wx req:",e.type,e);
var m=1,u=function(e,t){
return s.invoke("request",{
url:e.url,
method:e.type,
data:t,
header:{
Cookie:document.cookie
}
},function(o){
if(o.err_msg.indexOf(":ok")>-1){
i(e,"/mp/getappmsgext")&&(window.receiveGetAppmsgExt=o.statusCode+"|"+Date.now()),
i(e,"/mp/getappmsgad")&&(window.receiveGetAppmsgAd=o.statusCode+"|"+Date.now());
var p={};
if(o.data)try{
if("json"==e.dataType?(p=JSON.parse(o.data),console.log("ajax_wx res:",p)):p=o.data,
p&&p.base_resp&&1*p.base_resp.ret!==0&&"undefined"!=typeof window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs&&Math.random()<.001){
var d=e.url;
-1!==url.indexOf("?")&&(d=url.substr(0,url.indexOf("?")),r.getQuery("action",url)&&(d=d+"?action="+r.getQuery("action",url))),
("/mp/getappmsgext"!==d&&"/mp/getappmsgad"!==d||"undefined"!=typeof p.base_resp.ret)&&window.WX_BJ_REPORT.BadJs.report(d,"ret="+p.base_resp.ret,{
mid:window.PAGE_MID,
view:"wap_retcode"
});
}
}catch(c){
return console.error(c),void(e.error&&e.error({},{
type:1,
error:c
}));
}
var w={};
try{
w=JSON.parse(o.data);
}catch(c){}
w.base_resp&&"-3"==w.base_resp.ret&&m>0&&(a.isIOS||a.isAndroid&&window.clientversion>27000600)?(m--,
s.invoke("updatePageAuth",{},function(i){
if(console.log("updatePageAuth",i),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_3_1",
i&&i.err_msg&&i.err_msg.indexOf(":ok")>-1){
window.top.pass_ticket=encodeURIComponent(r.getQuery("pass_ticket",i.fullUrl).html(!1).replace(/\s/g,"+")),
e.pass_ticket&&(e.pass_ticket=window.top.pass_ticket),console.warn("[skeleton] updatePageAuth resetTopbar");
var o=a.isIOS&&a.gtVersion("7.0.10",!0);
if("0"===window.item_show_type&&o){
var s=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop||0;
n(s>40?!0:!1);
}
u(e,t),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_4_1";
}else e.success&&e.success(p);
})):e.success&&e.success(p);
}else if(o.err_msg.indexOf("no permission")>-1)Ajax(e),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_31_1";else{
e.error&&e.error({},o),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_32_1";
var l=.001;
if(Math.random()<l){
var _="request: "+JSON.stringify(e.type)+" "+JSON.stringify(e.url)+" ;;;; cookie: "+JSON.stringify(document.cookie)+" ;;;; data: "+JSON.stringify(t)+" ;;;; resp: "+JSON.stringify(o);
window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs&&window.WX_BJ_REPORT.BadJs.report("ajax_wx_request_error",_,{
mid:"mmbizwap:Monitor"
});
}
}
e.complete&&e.complete();
});
};
return i(e,"/mp/getappmsgext")&&(window.startGetAppmsgExtTime=Date.now()),i(e,"/mp/getappmsgad")&&(window.startGetAppmsgAdTime=Date.now()),
u(e,o);
}
e("biz_common/utils/string/html.js");
var r=e("biz_common/utils/url/parse.js"),s=e("biz_wap/jsapi/core.js"),a=e("biz_wap/utils/mmversion.js"),p=-1!=navigator.userAgent.indexOf("TBS/");
return{
ajax:o,
joinUrl:t
};
});define("biz_common/utils/respTypes.js",[],function(require,exports,module,alert){
"use strict";
var logList=[],log=function(r){
logList.push(r);
},printLog=function(){
for(var r=0,e=logList.length;e>r;++r)console.log("[RespType]"+logList[r]);
},isArray=function(r){
return"[object Array]"==Object.prototype.toString.call(r);
},getValueType=function(r){
return isArray(r)?"array":typeof r;
},parseRtDesc=function(r,e){
var t="mix",o=!1,c=e;
if(e){
var n="_R",s=e.indexOf(n),i=e.length-n.length;
o=-1!=s&&s==i,c=o?e.substring(0,i):e;
}
return"string"==typeof r?t=r:isArray(r)?t="array":"object"==typeof r&&(t="object"),
{
key:c,
type:t,
isRequired:o
};
},checkForArrayRtDesc=function(r,e){
if(!isArray(r))return!1;
for(var t=0,o=r.length;o>t;++t){
for(var c,n=r[t],s=0,i=0===e.length;c=e[s++];)if(checkForRtDesc(n,c)){
i=!0;
break;
}
if(!i)return!1;
}
return!0;
},checkForStringRtDesc=function(r,e){
var t=getValueType(r),o=parseRtDesc(e),c=o.type==t;
return c||log("miss match type : "+t+" !== "+o.type),c;
},checkForObjectRtDesc=function(r,e){
if("object"!=typeof r||isArray(r))return log("must be object"),!1;
var t=r,o=r;
for(var c in e)if(e.hasOwnProperty(c)){
var n=e[c],s=parseRtDesc(n,c),i=s.key;
o=t[i];
var u=getValueType(o);
if(s.isRequired&&void 0===o)return log("is required @key="+i),!1;
if(void 0!==o){
if(u!=s.type&&"mix"!=s.type)return log("miss match type : "+u+" !== "+s.type+" @key="+i),
!1;
if(("array"==u||"object"==u)&&"mix"!=s.type&&!checkForRtDesc(o,n))return!1;
}
}
return!0;
},checkForRtDesc=function(r,e){
return isArray(e)?checkForArrayRtDesc(r,e):"object"==typeof e?checkForObjectRtDesc(r,e):"string"==typeof e?checkForStringRtDesc(r,e):!1;
},check=function(json,rtDescs){
if("string"==typeof json)try{
json=eval("("+json+")");
}catch(e){
return log("parse json error"),!1;
}
if("object"!=typeof json)return log("must be object"),!1;
isArray(rtDesc)||(rtDescs=[rtDescs]);
for(var rtDesc,i=0;rtDesc=rtDescs[i++];)if(checkForRtDesc(json,rtDesc))return!0;
return!1;
};
return{
check:function(r,e){
logList=[];
try{
var t=check(r,e);
return t||printLog(),t;
}catch(o){
return logList.push("[rtException]"+o.toString()),printLog(),!1;
}
},
getMsg:function(){
return logList.join(";");
}
};
});