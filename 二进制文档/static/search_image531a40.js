define("biz_common/dom/attr.js",[],function(){
"use strict";
function t(t,e,n){
return"undefined"==typeof n?t.getAttribute(e):t.setAttribute(e,n);
}
function e(t,e,n,r){
t.style.setProperty?(r=r||null,t.style.setProperty(e,n,r)):"undefined"!=typeof t.style.cssText&&(r=r?"!"+r:"",
t.style.cssText+=";"+e+":"+n+r+";");
}
return{
attr:t,
setProperty:e
};
});define("biz_wap/utils/ajax.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","biz_common/utils/respTypes.js","biz_wap/utils/ajax_wx.js"],function(require,exports,module,alert){
"use strict";
function reqType(e,t){
return e.url.indexOf(t)>-1&&-1===e.url.indexOf("action=")&&(!e.data||!e.data.action);
}
function logClientLog(e){
try{
var t;
/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?t="writeLog":/(Android)/i.test(navigator.userAgent)&&(t="log"),
t&&doLog(t,e);
}catch(r){
throw console.error(r),r;
}
}
function doLog(e,t){
var r,o,a={};
r=top!=window?top.window:window;
try{
o=r.WeixinJSBridge,a=r.document;
}catch(n){}
e&&o&&o.invoke?o.invoke(e,{
level:"info",
msg:"[WechatFe][ajax]"+t
}):setTimeout(function(){
a.addEventListener?a.addEventListener("WeixinJSBridgeReady",function(){
doLog(e,t);
},!1):a.attachEvent&&(a.attachEvent("WeixinJSBridgeReady",function(){
doLog(e,t);
}),a.attachEvent("onWeixinJSBridgeReady",function(){
doLog(e,t);
}));
},0);
}
function reportRt(e,t,r){
var o="";
if(r&&r.length){
var a=1e3,n=r.length,s=Math.ceil(n/a);
o=["&lc="+s];
for(var i=0;s>i;++i)o.push("&log"+i+"=[rtCheckError]["+i+"]"+encodeURIComponent(r.substr(i*a,a)));
o=o.join("");
}
var p,c="idkey="+e+"_"+t+"_1"+o+"&r="+Math.random();
if(window.ActiveXObject)try{
p=new ActiveXObject("Msxml2.XMLHTTP");
}catch(d){
try{
p=new ActiveXObject("Microsoft.XMLHTTP");
}catch(u){
p=!1;
}
}else window.XMLHttpRequest&&(p=new XMLHttpRequest);
p&&(p.open("POST",location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?",!0),p.setRequestHeader("cache-control","no-cache"),
p.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
p.setRequestHeader("X-Requested-With","XMLHttpRequest"),p.send(c));
}
function reportAjaxLength(e,t,r){
var o="";
if(r&&r.length){
var a=1e3,n=r.length,s=Math.ceil(n/a);
o=["&lc="+s];
for(var i=0;s>i;++i)o.push("&log"+i+"=[Ajax Length Limit]["+i+"]"+encodeURIComponent(r.substr(i*a,a)));
o=o.join("");
}
var p,c="idkey="+e+"_"+t+"_1"+o+"&r="+Math.random();
if(window.ActiveXObject)try{
p=new ActiveXObject("Msxml2.XMLHTTP");
}catch(d){
try{
p=new ActiveXObject("Microsoft.XMLHTTP");
}catch(u){
p=!1;
}
}else window.XMLHttpRequest&&(p=new XMLHttpRequest);
p&&(p.open("POST",location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?",!0),p.setRequestHeader("cache-control","no-cache"),
p.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
p.setRequestHeader("X-Requested-With","XMLHttpRequest"),p.send(c),(new Image).src="/mp/jsmonitor?idkey="+e+"_"+t+"_1"+o+"&r="+Math.random());
}
function Ajax(obj){
var type=(obj.type||"GET").toUpperCase(),url;
url=obj.notJoinUrl?obj.url:ajaxWx.joinUrl(obj.url),"html"==obj.f&&(url=url.replace("&f=json",""));
var mayAbort=!!obj.mayAbort,async="undefined"==typeof obj.async?!0:obj.async,xhr=new XMLHttpRequest,timer=null,data=null;
if("object"==typeof obj.data){
var d=obj.data;
data=[];
for(var k in d)d.hasOwnProperty(k)&&data.push(k+"="+encodeURIComponent(d[k]));
data=data.join("&");
}else data="string"==typeof obj.data?obj.data:null;
xhr.open(type,url,async);
var _onreadystatechange=xhr.onreadystatechange;
try{
url&&url.length>LENGTH_LIMIT&&reportAjaxLength(27613,17,"ajax get limit[length: "+url.length+"]"+url.substring(0,1024));
}catch(e){}
xhr.onreadystatechange=function(){
if("function"==typeof _onreadystatechange&&_onreadystatechange.apply(xhr),3==xhr.readyState&&obj.received&&obj.received(xhr),
4==xhr.readyState){
reqType(obj,"/mp/getappmsgext")&&(window.receiveGetAppmsgExt=xhr.status+"|"+Date.now(),
logClientLog("receive appmsgext response, status: "+xhr.status)),reqType(obj,"/mp/getappmsgad")&&(window.receiveGetAppmsgAd=xhr.status+"|"+Date.now(),
logClientLog("receive appmsgad response, status: "+xhr.status)),xhr.onreadystatechange=null;
var status=xhr.status;
if(status>=200&&400>status)try{
var responseText=xhr.responseText,resp=responseText;
if("json"==obj.dataType)try{
resp=eval("("+resp+")");
var rtId=obj.rtId,rtKey=obj.rtKey||0,rtDesc=obj.rtDesc,checkRet=!0;
if(rtId&&rtDesc&&RespTypes&&!RespTypes.check(resp,rtDesc)&&reportRt(rtId,rtKey,RespTypes.getMsg()+"[detail]"+responseText+";"+obj.url),
resp&&resp.base_resp&&1*resp.base_resp.ret!==0&&"undefined"!=typeof window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs&&Math.random()<.001){
var reportUrl=url;
-1!==url.indexOf("?")&&(reportUrl=url.substr(0,url.indexOf("?")),Url.getQuery("action",url)&&(reportUrl=reportUrl+"?action="+Url.getQuery("action",url))),
("/mp/getappmsgext"!==reportUrl&&"/mp/getappmsgad"!==reportUrl||"undefined"!=typeof resp.base_resp.ret)&&window.WX_BJ_REPORT.BadJs.report(reportUrl,"ret="+resp.base_resp.ret,{
mid:window.PAGE_MID,
view:"wap_retcode"
});
}
}catch(e){
return void(obj.error&&obj.error(xhr,{
type:1,
error:e
}));
}
obj.success&&obj.success(resp);
}catch(e){
throw __moon_report({
offset:MOON_AJAX_SUCCESS_OFFSET,
e:e
}),e;
}else{
try{
obj.error&&obj.error(xhr,{
type:2,
error:"status error",
status:status
});
}catch(e){
throw __moon_report({
offset:MOON_AJAX_ERROR_OFFSET,
e:e
}),e;
}
if(status||!mayAbort){
var __ajaxtest=window.__ajaxtest||"0";
__moon_report({
offset:MOON_AJAX_NETWORK_OFFSET,
log:"ajax_network_error["+status+"]["+__ajaxtest+"]: "+url+";host:"+location.host,
e:""
});
}
}
clearTimeout(timer);
try{
obj.complete&&obj.complete();
}catch(e){
throw __moon_report({
offset:MOON_AJAX_COMPLETE_OFFSET,
e:e
}),e;
}
obj.complete=null;
}
},"POST"==type&&xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
obj.noXRequestedWidthHeader||xhr.setRequestHeader("X-Requested-With","XMLHttpRequest"),
"undefined"!=typeof obj.timeout&&(timer=setTimeout(function(){
xhr.abort("timeout");
try{
obj.complete&&obj.complete();
}catch(e){
throw __moon_report({
offset:MOON_AJAX_COMPLETE_OFFSET,
e:e
}),e;
}
obj.complete=null,__moon_report({
offset:MOON_AJAX_TIMEOUT_OFFSET,
log:"ajax_timeout_error: "+url,
e:""
});
},obj.timeout));
try{
xhr.send(data);
try{
data&&data.length>LENGTH_LIMIT&&reportAjaxLength(27613,18,"ajax post limit[length: "+data.length+"]"+data.substring(0,1024));
}catch(e){}
}catch(e){
obj.error&&obj.error(xhr,{
type:3,
error:e
});
}
return reqType(obj,"/mp/getappmsgext")&&(window.startGetAppmsgExtTime=Date.now(),
logClientLog("start get appmsgext, url: ",obj.url)),reqType(obj,"/mp/getappmsgad")&&(window.startGetAppmsgAdTime=Date.now(),
logClientLog("start get appmsgad, url: ",obj.url)),xhr;
}
require("biz_common/utils/string/html.js");
var Url=require("biz_common/utils/url/parse.js"),RespTypes=require("biz_common/utils/respTypes.js"),ajaxWx=require("biz_wap/utils/ajax_wx.js"),isx5=-1!=navigator.userAgent.indexOf("TBS/"),__moon_report=window.__moon_report||function(){},MOON_AJAX_SUCCESS_OFFSET=3,MOON_AJAX_NETWORK_OFFSET=4,MOON_AJAX_ERROR_OFFSET=5,MOON_AJAX_TIMEOUT_OFFSET=6,MOON_AJAX_COMPLETE_OFFSET=7,MOON_AJAX_GET_LIMIT_4K=17,MOON_AJAX_POST_LIMIT_4K=18,LENGTH_LIMIT=4096,doc={},isAcrossOrigin=!1;
try{
doc=top.window.document;
}catch(e){
isAcrossOrigin=!0;
}
return function(){
return window.__second_open__||!isAcrossOrigin&&top.window.__second_open__?ajaxWx.ajax.apply(ajaxWx,arguments):Ajax.apply(void 0,arguments);
};
});define("appmsg/log.js",["biz_wap/utils/log.js"],function(i){
"use strict";
var s=i("biz_wap/utils/log.js");
return function(i,t){
s(i,t);
};
});define("biz_common/dom/class.js",[],function(){
"use strict";
function s(s,a){
return s.classList?s.classList.contains(a):s.className.match(new RegExp("(\\s|^)"+a+"(\\s|$)"));
}
function a(s,a){
s.classList?s.classList.add(a):this.hasClass(s,a)||(s.className+=" "+a);
}
function e(a,e){
if(a.classList)a.classList.remove(e);else if(s(a,e)){
var c=new RegExp("(\\s|^)"+e+"(\\s|$)");
a.className=a.className.replace(c," ");
}
}
function c(c,l){
s(c,l)?e(c,l):a(c,l);
}
return{
hasClass:s,
addClass:a,
removeClass:e,
toggleClass:c
};
});define("biz_wap/utils/device.js",[],function(){
"use strict";
function s(s){
{
var e=s.match(/MQQBrowser\/(\d+\.\d+)/i),r=s.match(/QQ\/(\d+\.(\d+)\.(\d+)\.(\d+))/i)||s.match(/V1_AND_SQ_([\d\.]+)/),i=s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/)||s.match(/MicroMessenger\/((\d+)\.(\d+))/),t=s.match(/Mac\sOS\sX\s(\d+[\.|_]\d+)/),n=s.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/),a=s.match(/Linux\s/),d=s.match(/MiuiBrowser\/(\d+\.\d+)/i),h=s.match(/MI-ONE/),c=s.match(/MI PAD/),w=s.match(/UCBrowser\/(\d+\.\d+(\.\d+\.\d+)?)/)||s.match(/\sUC\s/),u=s.match(/IEMobile(\/|\s+)(\d+\.\d+)/)||s.match(/WPDesktop/),b=s.match(/(ipod).*\s([\d_]+)/i),p=s.match(/(ipad).*\s([\d_]+)/i),v=s.match(/(iphone)\sos\s([\d_]+)/i),m=s.match(/Chrome\/(\d+\.\d+)/),f=s.match(/Mozilla.*Linux.*Android.*AppleWebKit.*Mobile Safari/),l=s.match(/(android)\s([\d\.]+)/i);
s.indexOf("HTC")>-1;
}
if(o.browser=o.browser||{},o.os=o.os||{},window.ActiveXObject){
var M=6;
(window.XMLHttpRequest||s.indexOf("MSIE 7.0")>-1)&&(M=7),(window.XDomainRequest||s.indexOf("Trident/4.0")>-1)&&(M=8),
s.indexOf("Trident/5.0")>-1&&(M=9),s.indexOf("Trident/6.0")>-1&&(M=10),o.browser.ie=!0,
o.browser.version=M;
}else s.indexOf("Trident/7.0")>-1&&(o.browser.ie=!0,o.browser.version=11);
l&&(this.os.android=!0,this.os.version=l[2]),b&&(this.os.ios=this.os.ipod=!0,this.os.version=b[2].replace(/_/g,".")),
p&&(this.os.ios=this.os.ipad=!0,this.os.version=p[2].replace(/_/g,".")),v&&(this.os.iphone=this.os.ios=!0,
this.os.version=v[2].replace(/_/g,".")),n&&(this.os.windows=!0,this.os.version=n[2]),
t&&(this.os.Mac=!0,this.os.version=t[1]),a&&(this.os.Linux=!0),s.indexOf("lepad_hls")>0&&(this.os.LePad=!0),
c&&(this.os.MIPAD=!0),e&&(this.browser.MQQ=!0,this.browser.version=e[1]),r&&(this.browser.MQQClient=!0,
this.browser.version=r[1]),i&&(this.browser.WeChat=!0,this.browser.mmversion=this.browser.version=i[1]),
d&&(this.browser.MIUI=!0,this.browser.version=d[1]),w&&(this.browser.UC=!0,this.browser.version=w[1]||0/0),
u&&(this.browser.IEMobile=!0,this.browser.version=u[2]),f&&(this.browser.AndriodBrowser=!0),
h&&(this.browser.M1=!0),m&&(this.browser.Chrome=!0,this.browser.version=m[1]),this.os.windows&&(this.os.win64="undefined"!=typeof navigator.platform&&"win64"==navigator.platform.toLowerCase()?!0:!1),
(this.os.Mac||this.os.windows||this.os.Linux)&&(this.os.pc=!0);
var g={
iPad7:"iPad; CPU OS 7",
LePad:"lepad_hls",
XiaoMi:"MI-ONE",
SonyDTV:"SonyDTV",
SamSung:"SAMSUNG",
HTC:"HTC",
VIVO:"vivo"
};
for(var O in g)this.os[O]=-1!==s.indexOf(g[O]);
o.os.phone=o.os.phone||/windows phone/i.test(s),this.os.getNumVersion=function(){
return parseFloat(o.os.version,"10");
},this.os.hasTouch="ontouchstart"in window,this.os.hasTouch&&this.os.ios&&this.os.getNumVersion()<6&&(this.os.hasTouch=!1),
o.browser.WeChat&&o.browser.version<5&&(this.os.hasTouch=!1),o.browser.getNumVersion=function(){
return parseFloat(o.browser.version,"10");
},o.browser.isFFCanOcx=function(){
return o.browser.firefox&&o.browser.getNumVersion()>=3?!0:!1;
},o.browser.isCanOcx=function(){
return!(!o.os.windows||!o.browser.ie&&!o.browser.isFFCanOcx()&&!o.browser.webkit);
},o.browser.isNotIESupport=function(){
return!!o.os.windows&&(!!o.browser.webkit||o.browser.isFFCanOcx());
},o.userAgent={},o.userAgent.browserVersion=o.browser.version,o.userAgent.osVersion=o.os.version,
delete o.userAgent.version;
}
var o={};
s.call(o,window.navigator.userAgent);
var e=function(){
var s=window.navigator.userAgent,e=null;
if(o.os.android){
if(o.browser.MQQ&&o.browser.getNumVersion()>=4.2)return!0;
if(-1!=s.indexOf("MI2"))return!0;
if(o.os.version>="4"&&(e=s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/))&&e[1]>=4.2)return!0;
if(o.os.version>="4.1")return!0;
}
return!1;
}(),r=function(){
var s=document.createElement("video");
if("function"==typeof s.canPlayType){
if("probably"==s.canPlayType('video/mp4; codecs="mp4v.20.8"'))return!0;
if("probably"==s.canPlayType('video/mp4; codecs="avc1.42E01E"')||"probably"==s.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'))return!0;
}
return!1;
}(),i=function(){
return console.info("[canSupportAutoPlay]",o.os.ios,o.os.getNumVersion()),o.os.ios&&o.os.getNumVersion()<10?!1:!0;
}();
return o.canSupportVideo=r||e,o.canSupportVideoMp4=r,o.canSupportH5Video=e,o.canSupportAutoPlay=i,
o;
});define("appmsg/weapp_common.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(e,p,a,n){
"use strict";
function o(e){
return e.indexOf(h)>-1?e:""+e+h;
}
function t(){
var e=navigator.userAgent.match(/MicroMessenger\/(\d+)\.(\d+)\.(\d+)/);
if(e){
var p=Number(e[1]),a=Number(e[2]),n=Number(e[3]);
p>6?w.canJumpOnTap=!0:6===p&&a>5?w.canJumpOnTap=!0:6===p&&5===a&&n>=3&&(w.canJumpOnTap=!0);
}else navigator.userAgent.match(/MicroMessenger\//)||(w.isNonWechat=!0);
r();
}
function r(){
try{
w.appidSnInfo=JSON.parse(window.weapp_sn_arr_json).weapp_card_list;
}catch(e){
w.appidSnInfo=[];
}
if(!w.appidSnInfo||0==w.appidSnInfo.length)return w.getInfoState=1,void i();
for(var p={
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
uin:window.uin||"",
key:window.key||"",
pass_ticket:window.pass_ticket||"",
weapp_num:w.appidSnInfo.length
},a={},n={},o=0;o<p.weapp_num;o++){
var t=w.appidSnInfo[o].appid,r=w.appidSnInfo[o].sn;
a[t]?a[t].push(o):(a[t]=[o],p["weapp_appid_"+o]=w.appidSnInfo[o].appid,w.appidSnDict[t]=r),
n[r]?n[r].push(o):(n[r]=[o],p["weapp_sn_"+o]=w.appidSnInfo[o].sn);
}
var c="/mp/appmsg_weapp?action=batch_get_weapp";
for(var s in p)c+="&"+s+"="+encodeURIComponent(p[s]);
l({
url:c,
type:"GET",
dataType:"json",
async:!0,
success:function(e){
try{
if(console.log("weapp_common success:",e),w.appidInfoResp=e,e.base_resp.ret)throw new Error("Fetch weapp info but get ret="+e.base_resp.ret);
w.data={
infoMap:{},
appid:e.appid||"",
appmsg_compact_url:e.appmsg_compact_url||"",
pathArgs:"appid="+encodeURIComponent(e.appid)+(e.appmsg_compact_url?"&appmsg_compact_url="+encodeURIComponent(e.appmsg_compact_url):"")
};
for(var p=e.weapp_info,a=0;a<p.length;a++){
var n=p[a].weapp_appid;
w.data.infoMap[n]=p[a];
}
w.getInfoState=4;
}catch(o){
w.getInfoState=3,w.appidInfoCatchErr=o;
}
i();
},
error:function(){
w.getInfoState=2,i();
}
});
}
function i(){
if(1==w.getInfoState||2==w.getInfoState)for(var e=0,p=w.appInfoErrQueue.length;p>e;e++){
var a=w.appInfoErrQueue[e];
"function"==typeof a&&a({
code:w.getInfoState
});
}else if(3==w.getInfoState)for(var e=0,p=w.appInfoErrQueue.length;p>e;e++){
var a=w.appInfoErrQueue[e];
"function"==typeof a&&a({
code:w.getInfoState,
resp:w.appidInfoResp,
catchErr:w.appidInfoCatchErr
});
}else if(4==w.getInfoState)for(var e=0,p=w.appInfoSucQueue.length;p>e;e++){
var a=w.appInfoSucQueue[e];
"function"==typeof a&&a({
resp:w.appidInfoResp,
data:w.data
});
}
w.appInfoErrQueue=[],w.appInfoSucQueue=[];
}
function c(e){
console.log("getAppidInfo",w),1!=w.getInfoState&&2!=w.getInfoState||"function"!=typeof e.onError?3==w.getInfoState&&"function"==typeof e.onError?e.onError({
code:w.getInfoState,
resp:w.appidInfoResp,
catchErr:w.appidInfoCatchErr
}):4==w.getInfoState&&"function"==typeof e.onSuccess?e.onSuccess({
resp:w.appidInfoResp,
data:w.data
}):("function"==typeof e.onSuccess&&w.appInfoSucQueue.push(e.onSuccess),"function"==typeof e.onError&&w.appInfoErrQueue.push(e.onError)):e.onError({
code:w.getInfoState
});
}
function s(e,p){
var a={
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
weapp_appid:e.appid||"",
weapp_sn:w.appidSnDict[e.appid]||"",
path:e.path||""
},n="/mp/appmsg_weapp?action=get_wxa_code";
for(var o in a)n+="&"+o+"="+encodeURIComponent(a[o]);
l({
url:n,
type:"GET",
dataType:"json",
async:!0,
success:function(e){
e.base_resp&&0===e.base_resp.ret?p&&p(e.url):p&&p();
},
error:function(){
p&&p();
}
});
}
function f(e){
if(!e)return"";
var p="",a=e.indexOf("?"),n=w.data&&w.data.pathArgs?w.data.pathArgs:"";
return p=a>=0?e.slice(0,a)+(a>0?".html":"")+e.slice(a)+"&"+n:e+(""!==e?".html?":"?")+n,
p.replace(/&amp;/g,"&");
}
function u(e){
var p="",a=e.indexOf("?");
return p=e.slice(0,a)+(a>0?".html":"")+e.slice(a);
}
function d(e){
e=e||{};
var p;
if(e.options)p=e.options,p.relativeURL&&(p.relativeURL=p.relativeURL.replace(/&amp;/g,"&"),
p.relativeURL.indexOf(".html")<0&&(p.relativeURL=f(p.relativeURL)));else if(e.appid&&(w.data||e.cps_weapp_username)){
var a;
e.cps_weapp_username?(a={},a.weapp_username=e.cps_weapp_username,a.app_version=e.cps_weapp_version):a=w.data.infoMap[e.appid],
a&&(p={
userName:a.weapp_username,
scene:e.scene,
sceneNote:e.sceneNote,
relativeURL:f(e.path)
},void 0!==a.app_version&&(p.appVersion=a.app_version),e.cps_weapp_username&&(p.relativeURL=u(e.path)));
}
p&&(e.privateExtraData&&(p.privateExtraData=e.privateExtraData),e.sourceAppId&&(p.sourceAppId=e.sourceAppId),
p.scene=p.scene||1058,p.appVersion=p.appVersion||1,p.userName=o(p.userName),console.log("weapp257",p),
w.canJumpOnTap?I.invoke("openWeApp",p,function(p){
"system:function_not_exist"===p.err_msg?w.isNonWechat?("function"!=typeof e.beforeNonWechatWarn||e.beforeNonWechatWarn()!==!1)&&_():("function"!=typeof e.beforeJumpBackupPage||e.beforeJumpBackupPage()!==!1)&&m(e.appid):"function"==typeof e.onJsapiCallback&&e.onJsapiCallback(p);
}):w.isNonWechat?("function"!=typeof e.beforeNonWechatWarn||e.beforeNonWechatWarn()!==!1)&&_():("function"!=typeof e.beforeJumpBackupPage||e.beforeJumpBackupPage()!==!1)&&m(e.appid));
}
function m(e){
location.href="https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&appid="+encodeURIComponent(e)+"#wechat_redirect";
}
function _(){
setTimeout(function(){
n("请在微信内打开小程序");
},0);
}
function g(e){
var p={
userNames:[o(e)]
};
I.invoke("preloadMiniProgramContacts",p),I.invoke("preloadMiniProgramEnv",p);
}
var l=e("biz_wap/utils/ajax.js"),I=e("biz_wap/jsapi/core.js"),w={
canJumpOnTap:!1,
isNonWechat:!1,
data:null,
appidInfoResp:null,
appidInfoCatchErr:null,
appInfoSucQueue:[],
appInfoErrQueue:[],
appidSnInfo:[],
appidSnDict:{},
getInfoState:0
},h="@app";
return t(),{
canJumpOnTap:w.canJumpOnTap,
isNonWechat:w.isNonWechat,
getAppidInfo:c,
getAppidCode:s,
appidSnInfo:w.appidSnInfo,
getRelativeURL:f,
jumpUrl:d,
preloadMiniProgram:g
};
});function _classCallCheck(e,t){
if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");
}
var _createClass=function(){
function e(e,t){
for(var a=0;a<t.length;a++){
var i=t[a];
i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i);
}
}
return function(t,a,i){
return a&&e(t.prototype,a),i&&e(t,i),t;
};
}();
define("appmsg/review_image.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","appmsg/log.js","biz_wap/utils/ajax.js","biz_wap/utils/mmversion.js","appmsg/cdn_img_lib.js"],function(e){
"use strict";
var t=e("biz_common/dom/event.js"),a=e("biz_wap/jsapi/core.js"),i=e("biz_common/utils/url/parse.js"),o=e("appmsg/log.js"),r=e("biz_wap/utils/ajax.js"),n=e("biz_wap/utils/mmversion.js"),d=n.isIOS&&1==window._copyright_stat&&1==window.is_need_reward,s=!1;
e("appmsg/cdn_img_lib.js");
var p=function(e,t){
r({
url:"/mp/rewardappmsgreport",
data:{
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
oper:t||"",
cdn_url:e||"",
ascene:window.ascene||-1
},
type:"POST",
dataType:"json",
async:!0
});
},l=function(){
function e(t){
_classCallCheck(this,e),this.is_https_res=t.is_https_res,this.imgsSrc=[],this.detaTime=0,
((t.imgs||[]).length||t.container)&&this.add(t);
}
return _createClass(e,[{
key:"add",
value:function(e){
var a=this,i=e.imgs||[];
!!e.container&&Array.prototype.forEach.call(e.container.getElementsByTagName("img")||[],function(e){
return i.push(e);
}),i.forEach(function(e){
var t=a.getSrc(e);
null!==t&&(a.imgsSrc.push(t),a.bindEvent(e,t));
}),d&&!function(){
var e=document.getElementById("js_content"),i=0,o=0;
t.on(e,"touchstart",function(e){
return e&&e.target&&e.target.tagName&&"string"==typeof e.target.tagName&&"IMG"===e.target.tagName.toString().toUpperCase()?(a.detaTime=+new Date,
i=e.touches[0].pageX,void(o=e.touches[0].pageY)):void(a.detaTime=0);
}),t.on(e,"touchmove",function(e){
var t=e.touches[0].pageX,r=e.touches[0].pageY;
Math.abs(t-i)>10&&Math.abs(r-o)>10&&(a.detaTime=0);
}),t.on(e,"touchend",function(e){
0!=a.detaTime&&(+new Date-a.detaTime>800&&+new Date-a.detaTime<6e3?p(e.target.src,1):a.detaTime=0);
});
}();
}
},{
key:"reviewImage",
value:function(e,t,i){
var r={
current:e,
urls:this.imgsSrc,
currentInfo:{
url:e,
data:t,
pos:i
},
forbidForward:window.isPaySubscribe?1:0
};
console.log("imagePreview request",r),console.log("previewFlag",s),s||(s=!0,console.log(r),
a.invoke("imagePreview",r,function(e){
console.log("imagePreview response",e),!!window.__addIdKeyReport&&window.__addIdKeyReport("28307","2");
}),setTimeout(function(){
s=!1;
},500),o("[Appmsg] click image, src: "+e));
}
},{
key:"getSrc",
value:function(e){
if("1"!==e.getAttribute("data-disable-preview")){
var t=e.getAttribute("data-src")||e.getAttribute("src");
if(t&&0!==t.indexOf("data:")){
for(;-1!==t.indexOf("?tp=webp");)t=t.replace("?tp=webp","");
e.dataset&&e.dataset.s&&t.isCDN()&&(t=t.replace(/\/640$/,"/0"),t=t.replace(/\/640\?/,"/0?")),
t.isCDN()&&(t=i.addParam(t,"wxfrom","3",!0)),t=this.is_https_res?t.http2https():t.https2http();
var a=e.getAttribute("data-type");
return a&&(t=i.addParam(t,"wxtype",a,!0)),t;
}
}
return null;
}
},{
key:"bindEvent",
value:function(e,a){
var i=this;
void 0===a&&(a=this.getSrc(e)),"1"!=e.getAttribute("data-nopreviewclick")&&!function(a){
n.isAndroid&&e.setAttribute("data-wxsrc",a),t.on(e,"click",function(e){
if(e.stopPropagation(),!(e&&e.target&&e.target.className&&e.target.className.indexOf("img_loadederror")>-1)){
if("function"==typeof window.__addIdKeyReport&&window.__addIdKeyReport("110644",2),
window.getComputedStyle){
for(var t=e.target,o=t.getBoundingClientRect(),r=.15*o.width,s=.15*o.height,l=!0;t&&"body"!=t.nodeName.toLowerCase();){
var c=window.getComputedStyle(t,null),g=parseInt(c.getPropertyValue("opacity")),u=c.getPropertyValue("filter"),m=c.getPropertyValue("visibility"),w=c.mixBlendMode;
if(1!=g||"visible"!==m||u.indexOf("opacity")>=0||u.indexOf("blur")>=0||w&&"normal"!==w){
l=!1;
break;
}
var h=t.getBoundingClientRect();
if(("hidden"==c.overflow||"hidden"==c.overflowX||"hidden"==c.overflowY)&&(h.left-o.left>r||h.right-o.right<-1*r||h.top-o.top>s||h.bottom-o.bottom<-1*s)){
l=!1;
break;
}
t=t.parentElement;
}
if(!l){
if(console.log("don't try this again"),"function"==typeof window.__addIdKeyReport){
window.__addIdKeyReport("110644",3);
var f=new Image,b="https://badjs.weixinbridge.com/badjs?id=168&level=4&from="+encodeURIComponent(location.href)+"&msg="+encodeURIComponent(a);
f.src=b.slice(0,1024);
}
return!1;
}
}
"undefined"==typeof getComputedStyle&&(window.getComputedStyle=document.body.currentStyle?function(e){
return e.currentStyle;
}:{});
var v=e.target,y=window.getComputedStyle(v),_=v.getBoundingClientRect(),j=document.createElement("canvas");
j.style.width=y.width,j.style.height=y.height,j.width=parseFloat(y.width),j.height=parseFloat(y.height);
var C=j.getContext("2d"),F="";
C.drawImage(v,0,0,parseFloat(y.width),parseFloat(y.height));
try{
F=j.toDataURL();
}catch(e){}
n.isAndroid&&(F=""),i.reviewImage(a,F,{
x:_.left-parseFloat(y.paddingLeft)-parseFloat(y.borderLeftWidth),
y:_.top-parseFloat(y.paddingTop)-parseFloat(y.borderTopWidth),
width:_.width-parseFloat(y.paddingLeft)-parseFloat(y.paddingRight)-parseFloat(y.borderLeftWidth)-parseFloat(y.borderRightWidth),
height:_.height-parseFloat(y.paddingTop)-parseFloat(y.paddingBottom)-parseFloat(y.borderTopWidth)-parseFloat(y.borderBottomWidth)
}),d&&0==i.detaTime&&p(e.target.src,2);
}
});
}(a),e.removeAttribute("data-nopreviewclick");
}
}]),e;
}();
return l;
});define("biz_common/utils/string/html.js",[],function(){
"use strict";
return String.prototype.html=function(t){
var e,n=["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","¥","&amp;","&"],r=["&","&amp;","¥","&yen;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;","`","&#96;"];
e=t?r:n;
for(var o=0,i=this;o<e.length;o+=2)i=i.replace(new RegExp(e[o],"g"),e[o+1]);
return i;
},String.prototype.htmlEncode=function(){
return this.html(!0);
},String.prototype.htmlDecode=function(){
return this.html(!1);
},String.prototype.getPureText=function(){
return this.replace(/<\/?[^>]*\/?>/g,"");
},String.prototype.htmlLite=function(t){
var e=["&#96;","`","&#39;","'","&quot;",'"',"&gt;",">","&lt;","<","&amp;","&"];
t&&e.reverse();
for(var n=0,r=this;n<e.length;n+=2)r=r.replace(new RegExp(e[n],"g"),e[n+1]);
return r;
},String.prototype.htmlEncodeLite=function(){
return this.htmlLite(!0);
},String.prototype.htmlDecodeLite=function(){
return this.htmlLite(!1);
},{
htmlDecode:function(t){
return t.htmlDecode();
},
htmlEncode:function(t){
return t.htmlEncode();
},
getPureText:function(t){
return t.getPureText();
},
htmlEncodeLite:function(t){
return t.htmlEncodeLite();
},
htmlDecodeLite:function(t){
return t.htmlDecodeLite();
}
};
});define("cps/tpl/list_tpl.html.js",[],function(){
return'<# if(cps_isready == true){ #> <!--cps 数据ready-->\n    <# if(cps_state == \'no_cps\'){ #>\n        <!--违规-->\n        <section class="cps_inner cps_inner_list cps_inner_empty js_product_err_container">\n            <p>此内容因违规，暂无法查看</p>\n        </section>\n    <# } else { #>\n        <!--正常-->\n        <section class="cps_inner cps_inner_list js_list_container js_product_container<# if(pid_type == \'book\' || pid_type != \'movie\'){ #> cps_inner_book<# } #>">\n            <div class="cps_inner_wrp js_product_loop_content">\n                <div class="cps_inner_content">\n                    <figure class="cps_inner_image_container">\n                        <span class="js_cover cps_inner_image" style="background: url(<#=img_url#>) no-repeat center bottom; background-size: cover;"></span>\n                    </figure>\n                    <# if(is_ad == 1){ #>\n                    <span class="cps_inner_info_adTag js_cps_adTag">广告</span>\n                    <# } #>\n                    <div class="cps_inner_info">\n                        <div class="cps_inner_info_hd <# if(typeof price === \'undefined\' || pid_type === \'book\' || pid_type === \'movie\'){ #>cps_inner_info_hd_has-desc<# } #>">\n                            <h2 class="cps_inner_info_title"><#=title#></h2>\n                            <# if(typeof price === \'undefined\' || pid_type === \'book\' || pid_type === \'movie\'){ #>\n                            <p class="cps_inner_info_desc a"><#=desc#></p>\n                            <# } #>\n                            <div class="cps_inner_info_from">\n                                <span style="background: url(<#=source_logo_url#>) no-repeat center;\n                                background-size: contain;" class="cps_inner_ic_from"></span><#=source_name#>\n                            </div>\n                        </div>\n        \n                        <div class="cps_inner_info_ft">\n                            <span class="cps_inner_btn_cps_info <# if(is_ad == 1){ #>buy<# } #>"><!--<i class="cps_inner_ic_miniapp"></i><# if(is_ad == 1){ #>购买<# } else { #>详情<# } #>--></span>\n                            <# if(typeof price !== \'undefined\' && pid_type !== \'book\' && pid_type !== \'movie\'){ #>\n                            <p class="cps_inner_info_desc b price"><span class="price_sign">¥</span><#=price#></p>\n                            <# } #>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n    <# } #>\n<# }else{ #>\n    <section class="cps_inner cps_inner_list cps_inner_placeholder">\n        <div class="cps_inner_wrp" data-templateid="" data-pid="{{pid1}}" data-order="" data-packid="" data-wxaappid="{{wxa_appid1}}" data-wxapath="{{url_path1}}">\n            <!-- 数据加载成功模板 -->\n            <div class="cps_inner_content">\n                <figure class="cps_inner_image_container">\n                    <span width="100%" class="cps_inner_image"></span>\n                </figure>\n                <div class="cps_inner_info">\n                    <div class="cps_inner_info_hd">\n                        <h2 class="cps_inner_info_title"></h2>\n                    </div>\n                    <div class="cps_inner_info_ft"></div>\n                </div>\n            </div>\n        </div>\n    </section>\n<# } #>\n    \n\n\n';
});define("cps/tpl/card_tpl.html.js",[],function(){
return'<!--卡片类型-->\n<# if(cps_isready == true){ #> <!--cps 数据ready-->\n    <# if(cps_state == \'no_cps\'){ #>\n        <!--违规-->\n        <section class="cps_inner cps_inner_card cps_inner_empty js_product_err_container js_banner_container">\n            <p>此内容因违规，暂无法查看</p>\n        </section>\n    \n    <# } else {#>\n        <!--正常-->\n        <section class="cps_inner cps_inner_card js_product_container js_banner_container">\n            <div class="cps_inner_wrp js_product_loop_content">\n                <div class="cps_inner_content">\n                    <figure class="cps_inner_image_container">\n                        <span width="100%" class="js_cover cps_inner_image" style="background: url(<#=img_url#>) no-repeat center; background-size:cover;"></span>\n                        <# if(is_ad == 1){ #>\n                        <span class="cps_inner_info_adTag js_cps_adTag">广告</span>\n                        <# } #>\n                    </figure>\n                    <div class="cps_inner_info">\n                        <div class="cps_inner_info_hd">\n                            <h2 class="cps_inner_info_title <# if(typeof price !== \'undefined\' && pid_type !== \'book\' && pid_type !== \'movie\'){ #>line2<# } #>"><#=title#></h2> <!--通用模版带金额，title 可以显示2行-->\n                            <div class="cps_inner_info_from">\n                                <span class="cps_inner_ic_from" style="background: url(<#=source_logo_url#>) no-repeat center;\n                                background-size: contain;"></span><#=source_name#>\n                            </div>\n                        </div>\n                        <div class="cps_inner_info_ft">\n                            <span class="cps_inner_btn_cps_info <# if(is_ad == 1){ #>buy<# } #>"><!--<i class="cps_inner_ic_miniapp"></i><# if(is_ad == 1){ #>购买<# } else { #>详情<# } #>--></span>\n                            <# if(typeof price !== \'undefined\' && pid_type !== \'book\' && pid_type !== \'movie\'){ #>\n                            <p class="cps_inner_info_desc e"><span class="price_sign">¥</span><#=price#></p>\n                            <# } #>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n    \n    <# } #>\n<# }else{ #>\n    <section class="cps_inner cps_inner_card cps_inner_placeholder">\n        <div class="cps_inner_wrp">\n            <!-- 数据加载成功模板 -->\n            <div class="cps_inner_content">\n                <figure class="cps_inner_image_container">\n                    <span class="cps_inner_image"></span>\n                </figure>\n                <div class="cps_inner_info">\n                    <div class="cps_inner_info_hd">\n                        <h2 class="cps_inner_info_title"></h2>\n                    </div>\n                    <div class="cps_inner_info_ft"></div>\n                </div>\n            </div>\n        </div>\n    </section>\n<# } #>';
});define("cps/tpl/banner_tpl.html.js",[],function(){
return'<# if(cps_isready == true){ #> <!--cps 数据ready-->\n    <# if(cps_state == \'no_cps\'){ #>\n        <!--违规-->\n        <section class="cps_inner cps_inner_banner cps_inner_empty js_product_err_container js_banner_container">\n            <p>此内容因违规，暂无法查看</p>\n        </section>\n    \n    <# } else {#>\n        <!--正常-->\n        <section class="cps_inner cps_inner_banner js_product_container js_banner_container">\n            <div class="cps_inner_wrp js_product_loop_content">\n                <div class="cps_inner_content">\n                    <figure class="cps_inner_image_container">\n                        <span width="100%" class="js_cover cps_inner_image" style="background: url(<#=img_url#>) no-repeat center; background-size: cover;"></span>\n                    </figure>\n                    <# if(is_ad == 1){ #>\n                    <span class="cps_inner_info_adTag js_cps_adTag">广告</span>\n                    <# } #>\n                    <div class="cps_inner_info_container">\n                        <h2 class="cps_inner_info_title"><#=title#></h2>\n                        <div class="cps_inner_info">\n                            <div class="cps_inner_info_hd">\n                                <p class="cps_inner_info_desc c"><#=desc#></p>\n                                <div class="cps_inner_info_from">\n                                    <span class="cps_inner_ic_from" style="background: url(<#=source_logo_url#>) no-repeat center;\n                                    background-size: contain;"></span><#=source_name#>\n                                </div>\n                            </div>\n                            <div class="cps_inner_info_ft">\n                                <span class="cps_inner_btn_cps_info <# if(is_ad == 1){ #>buy<# } #>"><!--<i class="cps_inner_ic_miniapp"></i><# if(is_ad == 1){ #>购买<# } else { #>详情<# } #>--></span>\n                            </div>\n                        </div>\n                    </div>\n                    \n                </div>\n            </div>\n        </section>\n    \n    <# } #>\n<# }else{ #>\n    <section class="cps_inner cps_inner_banner cps_inner_placeholder">\n        <div class="cps_inner_wrp">\n            <!-- 数据加载成功模板 -->\n            <div class="cps_inner_content">\n                <figure class="cps_inner_image_container">\n                    <span width="100%" class="cps_inner_image"></span>\n                </figure>\n                <div class="cps_inner_info">\n                    <div class="cps_inner_info_hd">\n                        <h2 class="cps_inner_info_title"></h2>\n                        <p class="cps_inner_info_desc d"></p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n<# } #>\n';
});define("biz_common/tmpl.js",[],function(){
"use strict";
function e(e,n){
("undefined"==typeof n||null===n)&&(n=!0);
var t="";
return t=e.replace(/[\r\t\n]/g," ").split("<#").join("	").replace(/((^|#>)[^\t]*)'/g,"$1\r"),
t=n?t.replace(/\t==(.*?)#>/g,"',typeof $1 !== 'undefined' ? $1 : '','").replace(/\t=(.*?)#>/g,"', String(typeof $1 !== 'undefined' ? $1 : '').replace(/&/g,'&amp;').replace(/\"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;') ,'"):t.replace(/\t=(.*?)#>/g,"',typeof $1 !== 'undefined' ? $1 : '','"),
t=t.split("	").join("');").split("#>").join("p.push('").split("\r").join("\\'");
}
var n=function(n,t,p){
var r=e(n,p),i=function(){};
try{
i=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+r+"');}return p.join('');");
}catch(u){
n=n.replace(/\'/g,"&#39;").replace(/'/g,"&#39;"),r=e(n,p),i=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+r+"');}return p.join('');");
}
return i(t);
},t=function(e,t,p){
var r=document.getElementById(e);
return r?n(r.innerHTML,t,p):"";
};
return{
render:t,
tmpl:n
};
});define("appmsg/set_font_size.js",["biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js","biz_wap/utils/device.js","biz_wap/utils/localstorage.js"],function(t){
"use strict";
function e(t,e){
for(var o=[],n=document.createTreeWalker(t,4);n.nextNode();){
var i=n.currentNode.parentNode,a=i.getAttribute("mp-original-font-size");
a||(a=getComputedStyle(i).fontSize,i.setAttribute("mp-original-font-size",a));
var s=i.getAttribute("mp-original-line-height");
s||(s=getComputedStyle(i).lineHeight,i.setAttribute("mp-original-line-height",s)),
o.push([i,a,s]);
}
o.forEach(function(t){
t[0].style.fontSize=parseFloat(t[1])*e+"px",t[0].style.lineHeight=parseFloat(t[2])*e+"px";
});
}
function o(t){
l||"function"!=typeof t||window.top.__fontScaleChangeCbList__.push(t);
}
function n(){
window.top.__fontScaleChangeCbList__=[];
}
function i(t){
_.os.android&&!function(){
var n={
1:.8,
2:1,
3:1.1,
4:1.12,
5:1.125,
6:1.4,
7:1.55,
8:1.65
},i=p.get("__font_scale_back_for_android__")||1;
e(t,i),!l&&(window.top.__fontScaleBackForAndroid__=i),o(function(o){
var a=n[o.fontSize]||1;
e(t,i/a),!l&&(window.top.__fontScaleBackForAndroid__=1/a),p.set("__font_scale_back_for_android__",1/a);
});
}();
}
var a=t("biz_wap/utils/mmversion.js"),s=t("biz_wap/jsapi/core.js"),_=t("biz_wap/utils/device.js"),p=t("biz_wap/utils/localstorage.js"),l=!1;
try{
l=!window.top.document;
}catch(c){
l=!0;
}
return l||window.top.__fontScaleChangeCbList__||(window.top.__fontScaleChangeCbList__=[]),
window.top===window&&s.on("menu:setfont",function(t){
if(a.isIOS&&location.href.match(/fontScale=\d+/))parseFloat(t.fontScale)<=0&&(t.fontScale=100),
_.os.ipad&&_.os.getNumVersion()>=13?(e(document.getElementsByTagName("html").item(0),t.fontScale/100),
window.ipados13_font_scale=t.fontScale):document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=t.fontScale+"%";else if(a.isAndroid)s.invoke("setFontSizeCallback",{
fontSize:t.fontSize
});else if(a.isWindows){
var o,n=t.fontGear||2,i=["appmsg_desktop_fontsize_1","appmsg_desktop_fontsize_2","appmsg_desktop_fontsize_3","appmsg_desktop_fontsize_4","appmsg_desktop_fontsize_5","appmsg_desktop_fontsize_6"];
(o=document.body.classList).remove.apply(o,i),document.body.classList.add("appmsg_desktop_fontsize_"+n);
}
window.__fontScaleChangeCbList__.forEach(function(e){
return e(t);
});
}),{
setFontSize:e,
onFontScaleChange:o,
keepNormalFontSizeForAndroid:i,
removeScaleChangeCbList:n
};
});define("appmsg/sec_load_fail_report.js",["common/comm_report.js"],function(o){
"use strict";
var i=o("common/comm_report.js");
if(window.localStorage&&window.localStorage.getItem){
var e=4500,w="loadSec-"+window.biz+"-"+window.mid+"-"+window.idx,t=window.localStorage.getItem(w);
t&&window.write_sceen_time-parseInt(t,10)>e&&(i.report(20801,{
Bizuin:window.biz,
MsgId:1*window.mid,
ItemIdx:1*window.idx,
Url:window.msg_source_url||"",
Title:window.msg_title||""
}),window.localStorage.removeItem(w));
}
});define("biz_wap/ui/weui.js",[],function(){
"use strict";
function e(){
for(var e=document.getElementsByTagName("link"),i=/^http(s)?:\/\/res\.wx\.qq\.com\/open\/libs\/weui\/([^\/]*)\/weui(\.min)?\.css$/,n=0;n<e.length;n++){
var t=(e[n].href.match(i)||[])[2];
if(t){
if("1"===t[0])return!0;
console.warn("Weui.css("+t+") in page is deprecated. Weui.css(1.0+) will be insert in page automatically.");
}
}
return!1;
}
function i(){
var e=["actionSheet","alert","confirm","dialog","validate","checkIfBlur","gallery","loading","picker","datePicker","searchBar","slider","tab","toast","topTips","uploader"];
window.weui={};
for(var i=0;i<e.length;i++)!function(i){
window.weui[e[i]]=function(){
a.push({
name:e[i],
args:arguments
}),console.info(e[i]+" will be executed after weui.js loaded.");
};
}(i);
}
function n(){
var e=document.createElement("script");
e.onload=function(){
for(var e=0;e<a.length;e++)window.weui[a[e].name].apply(window,a[e].args);
},e.onerror=function(){
throw new Error("weui.js loaded fail.");
},e.src=r,document.body.appendChild(e);
}
var t="https://res.wx.qq.com/open/libs/weui/2.4.2/weui.min.css",r="https://res.wx.qq.com/open/libs/weuijs/1.2.1/weui.min.js",a=[];
if(!e()){
var o=document.createElement("link");
o.href=t,o.rel="stylesheet",document.head.appendChild(o);
}
i(),n();
});var _slicedToArray=function(){
function t(t,e){
var n=[],r=!0,o=!1,i=void 0;
try{
for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);
}catch(d){
o=!0,i=d;
}finally{
try{
!r&&u["return"]&&u["return"]();
}finally{
if(o)throw i;
}
}
return n;
}
return function(e,n){
if(Array.isArray(e))return e;
if(Symbol.iterator in Object(e))return t(e,n);
throw new TypeError("Invalid attempt to destructure non-iterable instance");
};
}();
define("appmsg/search_image.js",[],function(){
"use strict";
function t(){
var t=window.location.href.split("?")[1];
if(t){
for(var e=t.split("&"),n=0;n<e.length;n++){
var r=e[n].split("="),o=_slicedToArray(r,2),i=o[0],a=o[1];
if("imageIndex"===i)return parseInt(a,10);
}
return"";
}
return"";
}
function e(){
var t=0;
return"undefined"!=typeof window.pageXOffset?t=window.pageXOffset:"undefined"!=typeof document.compatMode&&"BackCompat"!==document.compatMode?t=document.documentElement.scrollTop:"undefined"!=typeof document.body&&(t=document.body.scrollTop),
t;
}
function n(t){
return t&&t.getBoundingClientRect?t.getBoundingClientRect().top+e():0;
}
function r(){
for(var t=[],e=document.getElementsByTagName("img"),n=0,r=e.length;r>n;n++){
var o=e.item(n),i=o.getAttribute("data-src");
i&&t.push(o);
}
return t;
}
function o(){
if(""!==i){
var t=r();
if(!(i>t.length)){
var e=n(t[i]);
window.scroll(0,e);
}
}
}
var i=t();
""!==i&&"scrollRestoration"in history&&(history.scrollRestoration="manual"),"loading"!==document.readyState?o():window.addEventListener("DOMContentLoaded",function(){
o();
});
});