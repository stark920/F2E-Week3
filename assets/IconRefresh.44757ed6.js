var Ve=Object.defineProperty,Ze=Object.defineProperties;var Ke=Object.getOwnPropertyDescriptors;var ye=Object.getOwnPropertySymbols;var Xe=Object.prototype.hasOwnProperty,Ye=Object.prototype.propertyIsEnumerable;var ve=(t,e,r)=>e in t?Ve(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,$=(t,e)=>{for(var r in e||(e={}))Xe.call(e,r)&&ve(t,r,e[r]);if(ye)for(var r of ye(e))Ye.call(e,r)&&ve(t,r,e[r]);return t},Ce=(t,e)=>Ze(t,Ke(e));import{_ as z,b as W,c as V,f as Z,u as Qe,i as Ge}from"./index.e97ecd69.js";const et={},tt={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-heart",viewBox:"0 0 16 16"},rt=Z("path",{d:"m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"},null,-1),nt=[rt];function it(t,e){return W(),V("svg",tt,nt)}var Kr=z(et,[["render",it]]);const at={},ot={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-heart-fill",viewBox:"0 0 16 16"},st=Z("path",{"fill-rule":"evenodd",d:"M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"},null,-1),ut=[st];function ct(t,e){return W(),V("svg",ot,ut)}var Xr=z(at,[["render",ct]]);const j=Qe(),Yr=Ge({id:"likes",state:()=>({likeRoutes:[],likeStations:[]}),persist:!0,actions:{toggleLikeRoutes(t){const e=this.likeRoutes.findIndex(r=>r.RouteUID===t.RouteUID);e>=0?(this.likeRoutes.splice(e,1),j.error("\u5DF2\u53D6\u6D88\u6536\u85CF\u8DEF\u7DDA")):(this.likeRoutes.push(t),j.success("\u5DF2\u6536\u85CF\u8DEF\u7DDA"))},toggleLikeStations(t){const e=this.likeStations.findIndex(r=>r.StationUID===t.StationUID);e>=0?(this.likeStations.splice(e,1),j.error("\u5DF2\u53D6\u6D88\u6536\u85CF\u7AD9\u9EDE")):(this.likeStations.push(t),j.success("\u5DF2\u6536\u85CF\u7AD9\u9EDE"))}}});var ue={exports:{}},ge=function(e,r){return function(){for(var n=new Array(arguments.length),a=0;a<n.length;a++)n[a]=arguments[a];return e.apply(r,n)}},lt=ge,ce=Object.prototype.toString,le=function(t){return function(e){var r=ce.call(e);return t[r]||(t[r]=r.slice(8,-1).toLowerCase())}}(Object.create(null));function T(t){return t=t.toLowerCase(),function(r){return le(r)===t}}function fe(t){return Array.isArray(t)}function J(t){return typeof t=="undefined"}function ft(t){return t!==null&&!J(t)&&t.constructor!==null&&!J(t.constructor)&&typeof t.constructor.isBuffer=="function"&&t.constructor.isBuffer(t)}var Te=T("ArrayBuffer");function dt(t){var e;return typeof ArrayBuffer!="undefined"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&Te(t.buffer),e}function ht(t){return typeof t=="string"}function pt(t){return typeof t=="number"}function xe(t){return t!==null&&typeof t=="object"}function q(t){if(le(t)!=="object")return!1;var e=Object.getPrototypeOf(t);return e===null||e===Object.prototype}var mt=T("Date"),yt=T("File"),vt=T("Blob"),Ct=T("FileList");function de(t){return ce.call(t)==="[object Function]"}function Et(t){return xe(t)&&de(t.pipe)}function St(t){var e="[object FormData]";return t&&(typeof FormData=="function"&&t instanceof FormData||ce.call(t)===e||de(t.toString)&&t.toString()===e)}var wt=T("URLSearchParams");function Rt(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function Nt(){return typeof navigator!="undefined"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window!="undefined"&&typeof document!="undefined"}function he(t,e){if(!(t===null||typeof t=="undefined"))if(typeof t!="object"&&(t=[t]),fe(t))for(var r=0,i=t.length;r<i;r++)e.call(null,t[r],r,t);else for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.call(null,t[n],n,t)}function ae(){var t={};function e(n,a){q(t[a])&&q(n)?t[a]=ae(t[a],n):q(n)?t[a]=ae({},n):fe(n)?t[a]=n.slice():t[a]=n}for(var r=0,i=arguments.length;r<i;r++)he(arguments[r],e);return t}function Dt(t,e,r){return he(e,function(n,a){r&&typeof n=="function"?t[a]=lt(n,r):t[a]=n}),t}function _t(t){return t.charCodeAt(0)===65279&&(t=t.slice(1)),t}function bt(t,e,r,i){t.prototype=Object.create(e.prototype,i),t.prototype.constructor=t,r&&Object.assign(t.prototype,r)}function $t(t,e,r){var i,n,a,o={};e=e||{};do{for(i=Object.getOwnPropertyNames(t),n=i.length;n-- >0;)a=i[n],o[a]||(e[a]=t[a],o[a]=!0);t=Object.getPrototypeOf(t)}while(t&&(!r||r(t,e))&&t!==Object.prototype);return e}function At(t,e,r){t=String(t),(r===void 0||r>t.length)&&(r=t.length),r-=e.length;var i=t.indexOf(e,r);return i!==-1&&i===r}function Ot(t){if(!t)return null;var e=t.length;if(J(e))return null;for(var r=new Array(e);e-- >0;)r[e]=t[e];return r}var gt=function(t){return function(e){return t&&e instanceof t}}(typeof Uint8Array!="undefined"&&Object.getPrototypeOf(Uint8Array)),m={isArray:fe,isArrayBuffer:Te,isBuffer:ft,isFormData:St,isArrayBufferView:dt,isString:ht,isNumber:pt,isObject:xe,isPlainObject:q,isUndefined:J,isDate:mt,isFile:yt,isBlob:vt,isFunction:de,isStream:Et,isURLSearchParams:wt,isStandardBrowserEnv:Nt,forEach:he,merge:ae,extend:Dt,trim:Rt,stripBOM:_t,inherits:bt,toFlatObject:$t,kindOf:le,kindOfTest:T,endsWith:At,toArray:Ot,isTypedArray:gt,isFileList:Ct},x=m;function Ee(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var Pe=function(e,r,i){if(!r)return e;var n;if(i)n=i(r);else if(x.isURLSearchParams(r))n=r.toString();else{var a=[];x.forEach(r,function(c,h){c===null||typeof c=="undefined"||(x.isArray(c)?h=h+"[]":c=[c],x.forEach(c,function(f){x.isDate(f)?f=f.toISOString():x.isObject(f)&&(f=JSON.stringify(f)),a.push(Ee(h)+"="+Ee(f))}))}),n=a.join("&")}if(n){var o=e.indexOf("#");o!==-1&&(e=e.slice(0,o)),e+=(e.indexOf("?")===-1?"?":"&")+n}return e},Tt=m;function K(){this.handlers=[]}K.prototype.use=function(e,r,i){return this.handlers.push({fulfilled:e,rejected:r,synchronous:i?i.synchronous:!1,runWhen:i?i.runWhen:null}),this.handlers.length-1};K.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)};K.prototype.forEach=function(e){Tt.forEach(this.handlers,function(i){i!==null&&e(i)})};var xt=K,Pt=m,Ut=function(e,r){Pt.forEach(e,function(n,a){a!==r&&a.toUpperCase()===r.toUpperCase()&&(e[r]=n,delete e[a])})},Ue=m;function U(t,e,r,i,n){Error.call(this),this.message=t,this.name="AxiosError",e&&(this.code=e),r&&(this.config=r),i&&(this.request=i),n&&(this.response=n)}Ue.inherits(U,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var Be=U.prototype,Ie={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach(function(t){Ie[t]={value:t}});Object.defineProperties(U,Ie);Object.defineProperty(Be,"isAxiosError",{value:!0});U.from=function(t,e,r,i,n,a){var o=Object.create(Be);return Ue.toFlatObject(t,o,function(c){return c!==Error.prototype}),U.call(o,t.message,e,r,i,n),o.name=t.name,a&&Object.assign(o,a),o};var F=U,Fe={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},w=m;function Bt(t,e){e=e||new FormData;var r=[];function i(a){return a===null?"":w.isDate(a)?a.toISOString():w.isArrayBuffer(a)||w.isTypedArray(a)?typeof Blob=="function"?new Blob([a]):Buffer.from(a):a}function n(a,o){if(w.isPlainObject(a)||w.isArray(a)){if(r.indexOf(a)!==-1)throw Error("Circular reference detected in "+o);r.push(a),w.forEach(a,function(c,h){if(!w.isUndefined(c)){var s=o?o+"."+h:h,f;if(c&&!o&&typeof c=="object"){if(w.endsWith(h,"{}"))c=JSON.stringify(c);else if(w.endsWith(h,"[]")&&(f=w.toArray(c))){f.forEach(function(y){!w.isUndefined(y)&&e.append(s,i(y))});return}}n(c,s)}}),r.pop()}else e.append(o,i(a))}return n(t),e}var ke=Bt,ee=F,It=function(e,r,i){var n=i.config.validateStatus;!i.status||!n||n(i.status)?e(i):r(new ee("Request failed with status code "+i.status,[ee.ERR_BAD_REQUEST,ee.ERR_BAD_RESPONSE][Math.floor(i.status/100)-4],i.config,i.request,i))},H=m,Ft=H.isStandardBrowserEnv()?function(){return{write:function(r,i,n,a,o,u){var c=[];c.push(r+"="+encodeURIComponent(i)),H.isNumber(n)&&c.push("expires="+new Date(n).toGMTString()),H.isString(a)&&c.push("path="+a),H.isString(o)&&c.push("domain="+o),u===!0&&c.push("secure"),document.cookie=c.join("; ")},read:function(r){var i=document.cookie.match(new RegExp("(^|;\\s*)("+r+")=([^;]*)"));return i?decodeURIComponent(i[3]):null},remove:function(r){this.write(r,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),kt=function(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)},Lt=function(e,r){return r?e.replace(/\/+$/,"")+"/"+r.replace(/^\/+/,""):e},jt=kt,Ht=Lt,Le=function(e,r){return e&&!jt(r)?Ht(e,r):r},te=m,qt=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],Mt=function(e){var r={},i,n,a;return e&&te.forEach(e.split(`
`),function(u){if(a=u.indexOf(":"),i=te.trim(u.substr(0,a)).toLowerCase(),n=te.trim(u.substr(a+1)),i){if(r[i]&&qt.indexOf(i)>=0)return;i==="set-cookie"?r[i]=(r[i]?r[i]:[]).concat([n]):r[i]=r[i]?r[i]+", "+n:n}}),r},Se=m,Jt=Se.isStandardBrowserEnv()?function(){var e=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a"),i;function n(a){var o=a;return e&&(r.setAttribute("href",o),o=r.href),r.setAttribute("href",o),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:r.pathname.charAt(0)==="/"?r.pathname:"/"+r.pathname}}return i=n(window.location.href),function(o){var u=Se.isString(o)?n(o):o;return u.protocol===i.protocol&&u.host===i.host}}():function(){return function(){return!0}}(),oe=F,zt=m;function je(t){oe.call(this,t==null?"canceled":t,oe.ERR_CANCELED),this.name="CanceledError"}zt.inherits(je,oe,{__CANCEL__:!0});var X=je,Wt=function(e){var r=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return r&&r[1]||""},k=m,Vt=It,Zt=Ft,Kt=Pe,Xt=Le,Yt=Mt,Qt=Jt,Gt=Fe,_=F,er=X,tr=Wt,we=function(e){return new Promise(function(i,n){var a=e.data,o=e.headers,u=e.responseType,c;function h(){e.cancelToken&&e.cancelToken.unsubscribe(c),e.signal&&e.signal.removeEventListener("abort",c)}k.isFormData(a)&&k.isStandardBrowserEnv()&&delete o["Content-Type"];var s=new XMLHttpRequest;if(e.auth){var f=e.auth.username||"",y=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.Authorization="Basic "+btoa(f+":"+y)}var l=Xt(e.baseURL,e.url);s.open(e.method.toUpperCase(),Kt(l,e.params,e.paramsSerializer),!0),s.timeout=e.timeout;function C(){if(!!s){var v="getAllResponseHeaders"in s?Yt(s.getAllResponseHeaders()):null,O=!u||u==="text"||u==="json"?s.responseText:s.response,d={data:O,status:s.status,statusText:s.statusText,headers:v,config:e,request:s};Vt(function(D){i(D),h()},function(D){n(D),h()},d),s=null}}if("onloadend"in s?s.onloadend=C:s.onreadystatechange=function(){!s||s.readyState!==4||s.status===0&&!(s.responseURL&&s.responseURL.indexOf("file:")===0)||setTimeout(C)},s.onabort=function(){!s||(n(new _("Request aborted",_.ECONNABORTED,e,s)),s=null)},s.onerror=function(){n(new _("Network Error",_.ERR_NETWORK,e,s,s)),s=null},s.ontimeout=function(){var O=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",d=e.transitional||Gt;e.timeoutErrorMessage&&(O=e.timeoutErrorMessage),n(new _(O,d.clarifyTimeoutError?_.ETIMEDOUT:_.ECONNABORTED,e,s)),s=null},k.isStandardBrowserEnv()){var b=(e.withCredentials||Qt(l))&&e.xsrfCookieName?Zt.read(e.xsrfCookieName):void 0;b&&(o[e.xsrfHeaderName]=b)}"setRequestHeader"in s&&k.forEach(o,function(O,d){typeof a=="undefined"&&d.toLowerCase()==="content-type"?delete o[d]:s.setRequestHeader(d,O)}),k.isUndefined(e.withCredentials)||(s.withCredentials=!!e.withCredentials),u&&u!=="json"&&(s.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&s.addEventListener("progress",e.onDownloadProgress),typeof e.onUploadProgress=="function"&&s.upload&&s.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(c=function(v){!s||(n(!v||v&&v.type?new er:v),s.abort(),s=null)},e.cancelToken&&e.cancelToken.subscribe(c),e.signal&&(e.signal.aborted?c():e.signal.addEventListener("abort",c))),a||(a=null);var N=tr(l);if(N&&["http","https","file"].indexOf(N)===-1){n(new _("Unsupported protocol "+N+":",_.ERR_BAD_REQUEST,e));return}s.send(a)})},rr=null,p=m,Re=Ut,Ne=F,nr=Fe,ir=ke,ar={"Content-Type":"application/x-www-form-urlencoded"};function De(t,e){!p.isUndefined(t)&&p.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}function or(){var t;return(typeof XMLHttpRequest!="undefined"||typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]")&&(t=we),t}function sr(t,e,r){if(p.isString(t))try{return(e||JSON.parse)(t),p.trim(t)}catch(i){if(i.name!=="SyntaxError")throw i}return(r||JSON.stringify)(t)}var Y={transitional:nr,adapter:or(),transformRequest:[function(e,r){if(Re(r,"Accept"),Re(r,"Content-Type"),p.isFormData(e)||p.isArrayBuffer(e)||p.isBuffer(e)||p.isStream(e)||p.isFile(e)||p.isBlob(e))return e;if(p.isArrayBufferView(e))return e.buffer;if(p.isURLSearchParams(e))return De(r,"application/x-www-form-urlencoded;charset=utf-8"),e.toString();var i=p.isObject(e),n=r&&r["Content-Type"],a;if((a=p.isFileList(e))||i&&n==="multipart/form-data"){var o=this.env&&this.env.FormData;return ir(a?{"files[]":e}:e,o&&new o)}else if(i||n==="application/json")return De(r,"application/json"),sr(e);return e}],transformResponse:[function(e){var r=this.transitional||Y.transitional,i=r&&r.silentJSONParsing,n=r&&r.forcedJSONParsing,a=!i&&this.responseType==="json";if(a||n&&p.isString(e)&&e.length)try{return JSON.parse(e)}catch(o){if(a)throw o.name==="SyntaxError"?Ne.from(o,Ne.ERR_BAD_RESPONSE,this,null,this.response):o}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:rr},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};p.forEach(["delete","get","head"],function(e){Y.headers[e]={}});p.forEach(["post","put","patch"],function(e){Y.headers[e]=p.merge(ar)});var pe=Y,ur=m,cr=pe,lr=function(e,r,i){var n=this||cr;return ur.forEach(i,function(o){e=o.call(n,e,r)}),e},He=function(e){return!!(e&&e.__CANCEL__)},_e=m,re=lr,fr=He,dr=pe,hr=X;function ne(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new hr}var pr=function(e){ne(e),e.headers=e.headers||{},e.data=re.call(e,e.data,e.headers,e.transformRequest),e.headers=_e.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),_e.forEach(["delete","get","head","post","put","patch","common"],function(n){delete e.headers[n]});var r=e.adapter||dr.adapter;return r(e).then(function(n){return ne(e),n.data=re.call(e,n.data,n.headers,e.transformResponse),n},function(n){return fr(n)||(ne(e),n&&n.response&&(n.response.data=re.call(e,n.response.data,n.response.headers,e.transformResponse))),Promise.reject(n)})},S=m,qe=function(e,r){r=r||{};var i={};function n(s,f){return S.isPlainObject(s)&&S.isPlainObject(f)?S.merge(s,f):S.isPlainObject(f)?S.merge({},f):S.isArray(f)?f.slice():f}function a(s){if(S.isUndefined(r[s])){if(!S.isUndefined(e[s]))return n(void 0,e[s])}else return n(e[s],r[s])}function o(s){if(!S.isUndefined(r[s]))return n(void 0,r[s])}function u(s){if(S.isUndefined(r[s])){if(!S.isUndefined(e[s]))return n(void 0,e[s])}else return n(void 0,r[s])}function c(s){if(s in r)return n(e[s],r[s]);if(s in e)return n(void 0,e[s])}var h={url:o,method:o,data:o,baseURL:u,transformRequest:u,transformResponse:u,paramsSerializer:u,timeout:u,timeoutMessage:u,withCredentials:u,adapter:u,responseType:u,xsrfCookieName:u,xsrfHeaderName:u,onUploadProgress:u,onDownloadProgress:u,decompress:u,maxContentLength:u,maxBodyLength:u,beforeRedirect:u,transport:u,httpAgent:u,httpsAgent:u,cancelToken:u,socketPath:u,responseEncoding:u,validateStatus:c};return S.forEach(Object.keys(e).concat(Object.keys(r)),function(f){var y=h[f]||a,l=y(f);S.isUndefined(l)&&y!==c||(i[f]=l)}),i},Me={version:"0.27.2"},mr=Me.version,A=F,me={};["object","boolean","number","function","string","symbol"].forEach(function(t,e){me[t]=function(i){return typeof i===t||"a"+(e<1?"n ":" ")+t}});var be={};me.transitional=function(e,r,i){function n(a,o){return"[Axios v"+mr+"] Transitional option '"+a+"'"+o+(i?". "+i:"")}return function(a,o,u){if(e===!1)throw new A(n(o," has been removed"+(r?" in "+r:"")),A.ERR_DEPRECATED);return r&&!be[o]&&(be[o]=!0,console.warn(n(o," has been deprecated since v"+r+" and will be removed in the near future"))),e?e(a,o,u):!0}};function yr(t,e,r){if(typeof t!="object")throw new A("options must be an object",A.ERR_BAD_OPTION_VALUE);for(var i=Object.keys(t),n=i.length;n-- >0;){var a=i[n],o=e[a];if(o){var u=t[a],c=u===void 0||o(u,a,t);if(c!==!0)throw new A("option "+a+" must be "+c,A.ERR_BAD_OPTION_VALUE);continue}if(r!==!0)throw new A("Unknown option "+a,A.ERR_BAD_OPTION)}}var vr={assertOptions:yr,validators:me},Je=m,Cr=Pe,$e=xt,Ae=pr,Q=qe,Er=Le,ze=vr,P=ze.validators;function B(t){this.defaults=t,this.interceptors={request:new $e,response:new $e}}B.prototype.request=function(e,r){typeof e=="string"?(r=r||{},r.url=e):r=e||{},r=Q(this.defaults,r),r.method?r.method=r.method.toLowerCase():this.defaults.method?r.method=this.defaults.method.toLowerCase():r.method="get";var i=r.transitional;i!==void 0&&ze.assertOptions(i,{silentJSONParsing:P.transitional(P.boolean),forcedJSONParsing:P.transitional(P.boolean),clarifyTimeoutError:P.transitional(P.boolean)},!1);var n=[],a=!0;this.interceptors.request.forEach(function(l){typeof l.runWhen=="function"&&l.runWhen(r)===!1||(a=a&&l.synchronous,n.unshift(l.fulfilled,l.rejected))});var o=[];this.interceptors.response.forEach(function(l){o.push(l.fulfilled,l.rejected)});var u;if(!a){var c=[Ae,void 0];for(Array.prototype.unshift.apply(c,n),c=c.concat(o),u=Promise.resolve(r);c.length;)u=u.then(c.shift(),c.shift());return u}for(var h=r;n.length;){var s=n.shift(),f=n.shift();try{h=s(h)}catch(y){f(y);break}}try{u=Ae(h)}catch(y){return Promise.reject(y)}for(;o.length;)u=u.then(o.shift(),o.shift());return u};B.prototype.getUri=function(e){e=Q(this.defaults,e);var r=Er(e.baseURL,e.url);return Cr(r,e.params,e.paramsSerializer)};Je.forEach(["delete","get","head","options"],function(e){B.prototype[e]=function(r,i){return this.request(Q(i||{},{method:e,url:r,data:(i||{}).data}))}});Je.forEach(["post","put","patch"],function(e){function r(i){return function(a,o,u){return this.request(Q(u||{},{method:e,headers:i?{"Content-Type":"multipart/form-data"}:{},url:a,data:o}))}}B.prototype[e]=r(),B.prototype[e+"Form"]=r(!0)});var Sr=B,wr=X;function I(t){if(typeof t!="function")throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(n){e=n});var r=this;this.promise.then(function(i){if(!!r._listeners){var n,a=r._listeners.length;for(n=0;n<a;n++)r._listeners[n](i);r._listeners=null}}),this.promise.then=function(i){var n,a=new Promise(function(o){r.subscribe(o),n=o}).then(i);return a.cancel=function(){r.unsubscribe(n)},a},t(function(n){r.reason||(r.reason=new wr(n),e(r.reason))})}I.prototype.throwIfRequested=function(){if(this.reason)throw this.reason};I.prototype.subscribe=function(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]};I.prototype.unsubscribe=function(e){if(!!this._listeners){var r=this._listeners.indexOf(e);r!==-1&&this._listeners.splice(r,1)}};I.source=function(){var e,r=new I(function(n){e=n});return{token:r,cancel:e}};var Rr=I,Nr=function(e){return function(i){return e.apply(null,i)}},Dr=m,_r=function(e){return Dr.isObject(e)&&e.isAxiosError===!0},Oe=m,br=ge,M=Sr,$r=qe,Ar=pe;function We(t){var e=new M(t),r=br(M.prototype.request,e);return Oe.extend(r,M.prototype,e),Oe.extend(r,e),r.create=function(n){return We($r(t,n))},r}var E=We(Ar);E.Axios=M;E.CanceledError=X;E.CancelToken=Rr;E.isCancel=He;E.VERSION=Me.version;E.toFormData=ke;E.AxiosError=F;E.Cancel=E.CanceledError;E.all=function(e){return Promise.all(e)};E.spread=Nr;E.isAxiosError=_r;ue.exports=E;ue.exports.default=E;var Or=ue.exports;function G(t,e){return e.reduce((r,i)=>(t&&Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=t[i]),r),{})}const R=Or.create(),gr=async()=>{if(localStorage.getItem("tdxToken")){const o=JSON.parse(localStorage.getItem("tdxToken")),u=o.time;if(Date.now()-u<86400)return o.token}const n=await(await fetch("https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token",{body:"grant_type=client_credentials&client_id=pb220416-e87a0a64-5d08-4c1c&client_secret=6f88b9c0-3851-4258-a962-ba26ef1a8d06",headers:{"Content-Type":"application/x-www-form-urlencoded"},method:"POST"})).json(),a={token:`${n.token_type} ${n.access_token}`,time:Date.now()};return localStorage.setItem("tdxToken",JSON.stringify(a)),`${n.token_type} ${n.access_token}`};R.interceptors.request.use(async function(t){var e;if(!((e=t.headers)!=null&&e.Authorization)){const r=await gr();R.defaults.headers.common.Authorization=r,t.headers=Ce($({},t.headers),{Authorization:r})}return t},function(t){return console.log("Request Error:",t),null});R.interceptors.response.use(function(t){return t},function(t){return console.log("Response Error:",t),null});const Tr=[{CityName:"\u81FA\u5317\u5E02",CityCode:"TPE",City:"Taipei"},{CityName:"\u81FA\u4E2D\u5E02",CityCode:"TXG",City:"Taichung"},{CityName:"\u57FA\u9686\u5E02",CityCode:"KEE",City:"Keelung"},{CityName:"\u81FA\u5357\u5E02",CityCode:"TNN",City:"Tainan"},{CityName:"\u9AD8\u96C4\u5E02",CityCode:"KHH",City:"Kaohsiung"},{CityName:"\u65B0\u5317\u5E02",CityCode:"NWT",City:"NewTaipei"},{CityName:"\u5B9C\u862D\u7E23",CityCode:"ILA",City:"YilanCounty"},{CityName:"\u6843\u5712\u5E02",CityCode:"TAO",City:"Taoyuan"},{CityName:"\u5609\u7FA9\u5E02",CityCode:"CYI",City:"Chiayi"},{CityName:"\u65B0\u7AF9\u7E23",CityCode:"HSQ",City:"HsinchuCounty"},{CityName:"\u82D7\u6817\u7E23",CityCode:"MIA",City:"MiaoliCounty"},{CityName:"\u5357\u6295\u7E23",CityCode:"NAN",City:"NantouCounty"},{CityName:"\u5F70\u5316\u7E23",CityCode:"CHA",City:"ChanghuaCounty"},{CityName:"\u65B0\u7AF9\u5E02",CityCode:"HSZ",City:"Hsinchu"},{CityName:"\u96F2\u6797\u7E23",CityCode:"YUN",City:"YunlinCounty"},{CityName:"\u5609\u7FA9\u7E23",CityCode:"CYQ",City:"ChiayiCounty"},{CityName:"\u5C4F\u6771\u7E23",CityCode:"PIF",City:"PingtungCounty"},{CityName:"\u82B1\u84EE\u7E23",CityCode:"HUA",City:"HualienCounty"},{CityName:"\u81FA\u6771\u7E23",CityCode:"TTT",City:"TaitungCounty"},{CityName:"\u91D1\u9580\u7E23",CityCode:"KIN",City:"KinmenCounty"},{CityName:"\u6F8E\u6E56\u7E23",CityCode:"PEN",City:"PenghuCounty"},{CityName:"\u9023\u6C5F\u7E23",CityCode:"LIE",City:"LienchiangCounty"}],xr=(t,e)=>{const r=Tr.find(i=>i.City===t||i.CityCode===t||i.CityName===t);if(e){const i=e;return r!=null&&r[i]?r[i]:r}return r},Pr=async(t,e,r=1e3)=>{if(r>1e3||t<-90||t>90||e<-180||e>180)return null;const i=["StationUID","StationID","StationName","StationPosition","Stops","LocationCityCode"],n="https://tdx.transportdata.tw/api/advanced/v2/Bus/Station/NearBy";try{const a=await R.get(`${n}?$select=${i.join(",")}&$spatialFilter=nearby(${t}, ${e}, ${r})&$format=JSON`);return a.data?a.data.map(c=>(c.StopsNum=c.Stops.length,!c.StationName.En&&c.Stops[0].StopName.En&&(c.StationName.En=c.Stops[0].StopName.En),c.City=xr(c.LocationCityCode,"City"),c)).map(c=>G(c,["StationUID","StationID","StationName","StationPosition","StopsNum","City"])):null}catch(a){return console.log(a),null}},Ur=async(t,e)=>{const r=["RouteUID","Direction","NextBusTime","PlateNumb","RouteName","IsLastBus","EstimateTime"],i=["RouteUID","DepartureStopNameZh","DepartureStopNameEn","DestinationStopNameZh","DestinationStopNameEn","RouteMapImageUrl","City"],n="https://tdx.transportdata.tw/api/advanced/v2/Bus";try{const a=R.get(`${n}/EstimatedTimeOfArrival/City/${e}/PassThrough/Station/${t}?$select=${r.join(",")}&$format=JSON`),o=R.get(`${n}/Route/City/${e}/PassThrough/Station/${t}?$select=${i.join(",")}&$format=JSON`),u=await Promise.all([a,o]),c=u[0].data,h=u[1].data;if(c&&h){const s=c.map(l=>{const C=h.find(b=>b.RouteUID===l.RouteUID);return C&&(l.DepartureStopNameZh=C.DepartureStopNameZh,l.DepartureStopNameEn=C.DepartureStopNameEn,l.DestinationStopNameZh=C.DestinationStopNameZh,l.DestinationStopNameEn=C.DestinationStopNameEn,l.RouteMapImageUrl=C.RouteMapImageUrl,l.City=C.City),l.EstimateTime||(l.EstimateTime=-1),l}),f=new Set([...r,...i]);return s.map(l=>G(l,Array.from(f)))}return null}catch(a){return console.log(a),null}},L=["RouteUID","RouteName","DepartureStopNameZh","DepartureStopNameEn","DestinationStopNameZh","DestinationStopNameEn","RouteMapImageUrl","City"],se="https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/",Br=async t=>{if(t==="Taipei")return ie("Taipei","NewTaipei");if(t==="Hsinchu")return ie("Hsinchu","HsinchuCounty");if(t==="Chiayi")return ie("Chiayi","ChiayiCounty");try{const e=await R.get(`${se}${t}?$select=${L.join(",")}&$format=JSON`);return e.data?e.data.map(i=>G(i,L)):null}catch(e){return console.log(e),null}},ie=async(t,e)=>{try{const r=R.get(`${se}${t}?$select=${L.join(",")}&$format=JSON`),i=R.get(`${se}${e}?$select=${L.join(",")}&$format=JSON`),n=await Promise.all([r,i]);if(n[0].data&&n[1].data){const a=n[0].data,o=n[1].data;return a.concat(o).map(h=>G(h,L))}return null}catch(r){return console.log(r),null}},Ir=async(t,e)=>{var a,o,u,c,h,s;const r="https://ptx.transportdata.tw/MOTC/v2/Bus",i=["RouteName","Direction","Stops"],n=["RouteName","PlateNumb","StopUID","StopName","Direction","EstimateTime","StopSequence","NextBusTime","IsLastBus"];try{const f=R.get(`${r}/StopOfRoute/City/${t}/${e}?$select=${i.join(",")}&$format=JSON`),y=R.get(`${r}/EstimatedTimeOfArrival/City/${t}/${e}?$select=${n.join(",")}&$format=JSON`),l=await Promise.all([f,y]);if(!l[0]||!l[1])return null;const C=l[0].data.filter(d=>d.RouteName.Zh_tw===e),b=l[1].data.filter(d=>d.RouteName.Zh_tw===e),N={go:(o=(a=C.filter(d=>d.Direction===0)[0])==null?void 0:a.Stops)!=null?o:[],back:(c=(u=C.filter(d=>d.Direction===1)[0])==null?void 0:u.Stops)!=null?c:[],circle:(s=(h=C.filter(d=>d.Direction===2)[0])==null?void 0:h.Stops)!=null?s:[]},v={go:b.filter(d=>d.Direction===0),back:b.filter(d=>d.Direction===1),circle:b.filter(d=>d.Direction===2)};return{go:N.go.length>0?N.go.map(d=>{const g=v.go.find(D=>D.StopUID===d.StopUID);return $($({},d),g)}):[],back:N.back.length>0?N.back.map(d=>{const g=v.back.find(D=>D.StopUID===d.StopUID);return $($({},d),g)}):[],circle:N.circle.length>0?N.circle.map(d=>{const g=v.circle.find(D=>D.StopUID===d.StopUID);return $($({},d),g)}):[]}}catch(f){return console.log(f),null}},Qr={getRoutesData:Br,getRouteWithArrivalTime:Ir,getNearbyStation:Pr,getNearbyStationWithArrival:Ur},Fr={},kr={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-chevron-left",viewBox:"0 0 16 16"},Lr=Z("path",{"fill-rule":"evenodd",d:"M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"},null,-1),jr=[Lr];function Hr(t,e){return W(),V("svg",kr,jr)}var Gr=z(Fr,[["render",Hr]]);const qr={},Mr={class:"h-6 w-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Jr=Z("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"},null,-1),zr=[Jr];function Wr(t,e){return W(),V("svg",Mr,zr)}var en=z(qr,[["render",Wr]]);export{Xr as I,Kr as a,Qr as b,Gr as c,en as d,Yr as u};
