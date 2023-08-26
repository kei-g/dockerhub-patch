"use strict";var Ht=Object.create;var W=Object.defineProperty;var Kt=Object.getOwnPropertyDescriptor;var Jt=Object.getOwnPropertyNames;var Wt=Object.getPrototypeOf,zt=Object.prototype.hasOwnProperty;var v=(e,t)=>()=>(e&&(t=e(e=0)),t);var b=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Yt=(e,t)=>{for(var r in t)W(e,r,{get:t[r],enumerable:!0})},Me=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Jt(t))!zt.call(e,o)&&o!==r&&W(e,o,{get:()=>t[o],enumerable:!(n=Kt(t,o))||n.enumerable});return e};var F=(e,t,r)=>(r=e!=null?Ht(Wt(e)):{},Me(t||!e||!e.__esModule?W(r,"default",{value:e,enumerable:!0}):r,e)),Qt=e=>Me(W({},"__esModule",{value:!0}),e);var Z=b(B=>{"use strict";Object.defineProperty(B,"__esModule",{value:!0});B.toCommandProperties=B.toCommandValue=void 0;function nr(e){return e==null?"":typeof e=="string"||e instanceof String?e:JSON.stringify(e)}B.toCommandValue=nr;function or(e){return Object.keys(e).length?{title:e.title,file:e.file,line:e.startLine,endLine:e.endLine,col:e.startColumn,endColumn:e.endColumn}:{}}B.toCommandProperties=or});var He=b(O=>{"use strict";var ir=O&&O.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),sr=O&&O.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),ar=O&&O.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&ir(t,e,r);return sr(t,e),t};Object.defineProperty(O,"__esModule",{value:!0});O.issue=O.issueCommand=void 0;var ur=ar(require("os")),Fe=Z();function Ge(e,t,r){let n=new fe(e,t,r);process.stdout.write(n.toString()+ur.EOL)}O.issueCommand=Ge;function cr(e,t=""){Ge(e,{},t)}O.issue=cr;var Ve="::",fe=class{constructor(t,r,n){t||(t="missing.command"),this.command=t,this.properties=r,this.message=n}toString(){let t=Ve+this.command;if(this.properties&&Object.keys(this.properties).length>0){t+=" ";let r=!0;for(let n in this.properties)if(this.properties.hasOwnProperty(n)){let o=this.properties[n];o&&(r?r=!1:t+=",",t+=`${n}=${fr(o)}`)}}return t+=`${Ve}${lr(this.message)}`,t}};function lr(e){return Fe.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}function fr(e){return Fe.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}});function H(){return ee>te.length-16&&(Ke.default.randomFillSync(te),ee=0),te.slice(ee,ee+=16)}var Ke,te,ee,de=v(()=>{Ke=F(require("crypto")),te=new Uint8Array(256),ee=te.length});var Je,We=v(()=>{Je=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i});function dr(e){return typeof e=="string"&&Je.test(e)}var k,K=v(()=>{We();k=dr});function hr(e,t=0){let r=(g[e[t+0]]+g[e[t+1]]+g[e[t+2]]+g[e[t+3]]+"-"+g[e[t+4]]+g[e[t+5]]+"-"+g[e[t+6]]+g[e[t+7]]+"-"+g[e[t+8]]+g[e[t+9]]+"-"+g[e[t+10]]+g[e[t+11]]+g[e[t+12]]+g[e[t+13]]+g[e[t+14]]+g[e[t+15]]).toLowerCase();if(!k(r))throw TypeError("Stringified UUID is invalid");return r}var g,C,J=v(()=>{K();g=[];for(let e=0;e<256;++e)g.push((e+256).toString(16).substr(1));C=hr});function pr(e,t,r){let n=t&&r||0,o=t||new Array(16);e=e||{};let i=e.node||ze,s=e.clockseq!==void 0?e.clockseq:he;if(i==null||s==null){let h=e.random||(e.rng||H)();i==null&&(i=ze=[h[0]|1,h[1],h[2],h[3],h[4],h[5]]),s==null&&(s=he=(h[6]<<8|h[7])&16383)}let u=e.msecs!==void 0?e.msecs:Date.now(),l=e.nsecs!==void 0?e.nsecs:me+1,a=u-pe+(l-me)/1e4;if(a<0&&e.clockseq===void 0&&(s=s+1&16383),(a<0||u>pe)&&e.nsecs===void 0&&(l=0),l>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");pe=u,me=l,he=s,u+=122192928e5;let c=((u&268435455)*1e4+l)%4294967296;o[n++]=c>>>24&255,o[n++]=c>>>16&255,o[n++]=c>>>8&255,o[n++]=c&255;let d=u/4294967296*1e4&268435455;o[n++]=d>>>8&255,o[n++]=d&255,o[n++]=d>>>24&15|16,o[n++]=d>>>16&255,o[n++]=s>>>8|128,o[n++]=s&255;for(let h=0;h<6;++h)o[n+h]=i[h];return t||C(o)}var ze,he,pe,me,Ye,Qe=v(()=>{de();J();pe=0,me=0;Ye=pr});function mr(e){if(!k(e))throw TypeError("Invalid UUID");let t,r=new Uint8Array(16);return r[0]=(t=parseInt(e.slice(0,8),16))>>>24,r[1]=t>>>16&255,r[2]=t>>>8&255,r[3]=t&255,r[4]=(t=parseInt(e.slice(9,13),16))>>>8,r[5]=t&255,r[6]=(t=parseInt(e.slice(14,18),16))>>>8,r[7]=t&255,r[8]=(t=parseInt(e.slice(19,23),16))>>>8,r[9]=t&255,r[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,r[11]=t/4294967296&255,r[12]=t>>>24&255,r[13]=t>>>16&255,r[14]=t>>>8&255,r[15]=t&255,r}var re,ge=v(()=>{K();re=mr});function gr(e){e=unescape(encodeURIComponent(e));let t=[];for(let r=0;r<e.length;++r)t.push(e.charCodeAt(r));return t}function ne(e,t,r){function n(o,i,s,u){if(typeof o=="string"&&(o=gr(o)),typeof i=="string"&&(i=re(i)),i.length!==16)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let l=new Uint8Array(16+o.length);if(l.set(i),l.set(o,i.length),l=r(l),l[6]=l[6]&15|t,l[8]=l[8]&63|128,s){u=u||0;for(let a=0;a<16;++a)s[u+a]=l[a];return s}return C(l)}try{n.name=e}catch{}return n.DNS=vr,n.URL=yr,n}var vr,yr,ve=v(()=>{J();ge();vr="6ba7b810-9dad-11d1-80b4-00c04fd430c8",yr="6ba7b811-9dad-11d1-80b4-00c04fd430c8"});function _r(e){return Array.isArray(e)?e=Buffer.from(e):typeof e=="string"&&(e=Buffer.from(e,"utf8")),Xe.default.createHash("md5").update(e).digest()}var Xe,Ze,et=v(()=>{Xe=F(require("crypto"));Ze=_r});var wr,tt,rt=v(()=>{ve();et();wr=ne("v3",48,Ze),tt=wr});function br(e,t,r){e=e||{};let n=e.random||(e.rng||H)();if(n[6]=n[6]&15|64,n[8]=n[8]&63|128,t){r=r||0;for(let o=0;o<16;++o)t[r+o]=n[o];return t}return C(n)}var nt,ot=v(()=>{de();J();nt=br});function Or(e){return Array.isArray(e)?e=Buffer.from(e):typeof e=="string"&&(e=Buffer.from(e,"utf8")),it.default.createHash("sha1").update(e).digest()}var it,st,at=v(()=>{it=F(require("crypto"));st=Or});var Er,ut,ct=v(()=>{ve();at();Er=ne("v5",80,st),ut=Er});var lt,ft=v(()=>{lt="00000000-0000-0000-0000-000000000000"});function Tr(e){if(!k(e))throw TypeError("Invalid UUID");return parseInt(e.substr(14,1),16)}var dt,ht=v(()=>{K();dt=Tr});var pt={};Yt(pt,{NIL:()=>lt,parse:()=>re,stringify:()=>C,v1:()=>Ye,v3:()=>tt,v4:()=>nt,v5:()=>ut,validate:()=>k,version:()=>dt});var mt=v(()=>{Qe();rt();ot();ct();ft();ht();K();J();ge()});var _t=b(E=>{"use strict";var Pr=E&&E.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),xr=E&&E.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),vt=E&&E.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&Pr(t,e,r);return xr(t,e),t};Object.defineProperty(E,"__esModule",{value:!0});E.prepareKeyValueMessage=E.issueFileCommand=void 0;var gt=vt(require("fs")),ye=vt(require("os")),Rr=(mt(),Qt(pt)),yt=Z();function Sr(e,t){let r=process.env[`GITHUB_${e}`];if(!r)throw new Error(`Unable to find environment variable for file command ${e}`);if(!gt.existsSync(r))throw new Error(`Missing file at path: ${r}`);gt.appendFileSync(r,`${yt.toCommandValue(t)}${ye.EOL}`,{encoding:"utf8"})}E.issueFileCommand=Sr;function Ar(e,t){let r=`ghadelimiter_${Rr.v4()}`,n=yt.toCommandValue(t);if(e.includes(r))throw new Error(`Unexpected input: name should not contain the delimiter "${r}"`);if(n.includes(r))throw new Error(`Unexpected input: value should not contain the delimiter "${r}"`);return`${e}<<${r}${ye.EOL}${n}${ye.EOL}${r}`}E.prepareKeyValueMessage=Ar});var bt=b(I=>{"use strict";Object.defineProperty(I,"__esModule",{value:!0});I.checkBypass=I.getProxyUrl=void 0;function kr(e){let t=e.protocol==="https:";if(wt(e))return;let r=(()=>t?process.env.https_proxy||process.env.HTTPS_PROXY:process.env.http_proxy||process.env.HTTP_PROXY)();if(r)return new URL(r)}I.getProxyUrl=kr;function wt(e){if(!e.hostname)return!1;let t=process.env.no_proxy||process.env.NO_PROXY||"";if(!t)return!1;let r;e.port?r=Number(e.port):e.protocol==="http:"?r=80:e.protocol==="https:"&&(r=443);let n=[e.hostname.toUpperCase()];typeof r=="number"&&n.push(`${n[0]}:${r}`);for(let o of t.split(",").map(i=>i.trim().toUpperCase()).filter(i=>i))if(n.some(i=>i===o))return!0;return!1}I.checkBypass=wt});var Pt=b(N=>{"use strict";var Jo=require("net"),Cr=require("tls"),_e=require("http"),Ot=require("https"),Ur=require("events"),Wo=require("assert"),qr=require("util");N.httpOverHttp=Dr;N.httpsOverHttp=Mr;N.httpOverHttps=jr;N.httpsOverHttps=Br;function Dr(e){var t=new A(e);return t.request=_e.request,t}function Mr(e){var t=new A(e);return t.request=_e.request,t.createSocket=Et,t.defaultPort=443,t}function jr(e){var t=new A(e);return t.request=Ot.request,t}function Br(e){var t=new A(e);return t.request=Ot.request,t.createSocket=Et,t.defaultPort=443,t}function A(e){var t=this;t.options=e||{},t.proxyOptions=t.options.proxy||{},t.maxSockets=t.options.maxSockets||_e.Agent.defaultMaxSockets,t.requests=[],t.sockets=[],t.on("free",function(n,o,i,s){for(var u=Tt(o,i,s),l=0,a=t.requests.length;l<a;++l){var c=t.requests[l];if(c.host===u.host&&c.port===u.port){t.requests.splice(l,1),c.request.onSocket(n);return}}n.destroy(),t.removeSocket(n)})}qr.inherits(A,Ur.EventEmitter);A.prototype.addRequest=function(t,r,n,o){var i=this,s=we({request:t},i.options,Tt(r,n,o));if(i.sockets.length>=this.maxSockets){i.requests.push(s);return}i.createSocket(s,function(u){u.on("free",l),u.on("close",a),u.on("agentRemove",a),t.onSocket(u);function l(){i.emit("free",u,s)}function a(c){i.removeSocket(u),u.removeListener("free",l),u.removeListener("close",a),u.removeListener("agentRemove",a)}})};A.prototype.createSocket=function(t,r){var n=this,o={};n.sockets.push(o);var i=we({},n.proxyOptions,{method:"CONNECT",path:t.host+":"+t.port,agent:!1,headers:{host:t.host+":"+t.port}});t.localAddress&&(i.localAddress=t.localAddress),i.proxyAuth&&(i.headers=i.headers||{},i.headers["Proxy-Authorization"]="Basic "+new Buffer(i.proxyAuth).toString("base64")),U("making CONNECT request");var s=n.request(i);s.useChunkedEncodingByDefault=!1,s.once("response",u),s.once("upgrade",l),s.once("connect",a),s.once("error",c),s.end();function u(d){d.upgrade=!0}function l(d,h,j){process.nextTick(function(){a(d,h,j)})}function a(d,h,j){if(s.removeAllListeners(),h.removeAllListeners(),d.statusCode!==200){U("tunneling socket could not be established, statusCode=%d",d.statusCode),h.destroy();var V=new Error("tunneling socket could not be established, statusCode="+d.statusCode);V.code="ECONNRESET",t.request.emit("error",V),n.removeSocket(o);return}if(j.length>0){U("got illegal response body from proxy"),h.destroy();var V=new Error("got illegal response body from proxy");V.code="ECONNRESET",t.request.emit("error",V),n.removeSocket(o);return}return U("tunneling connection has established"),n.sockets[n.sockets.indexOf(o)]=h,r(h)}function c(d){s.removeAllListeners(),U(`tunneling socket could not be established, cause=%s
`,d.message,d.stack);var h=new Error("tunneling socket could not be established, cause="+d.message);h.code="ECONNRESET",t.request.emit("error",h),n.removeSocket(o)}};A.prototype.removeSocket=function(t){var r=this.sockets.indexOf(t);if(r!==-1){this.sockets.splice(r,1);var n=this.requests.shift();n&&this.createSocket(n,function(o){n.request.onSocket(o)})}};function Et(e,t){var r=this;A.prototype.createSocket.call(r,e,function(n){var o=e.request.getHeader("host"),i=we({},r.options,{socket:n,servername:o?o.replace(/:.*$/,""):e.host}),s=Cr.connect(0,i);r.sockets[r.sockets.indexOf(n)]=s,t(s)})}function Tt(e,t,r){return typeof e=="string"?{host:e,port:t,localAddress:r}:e}function we(e){for(var t=1,r=arguments.length;t<r;++t){var n=arguments[t];if(typeof n=="object")for(var o=Object.keys(n),i=0,s=o.length;i<s;++i){var u=o[i];n[u]!==void 0&&(e[u]=n[u])}}return e}var U;process.env.NODE_DEBUG&&/\btunnel\b/.test(process.env.NODE_DEBUG)?U=function(){var e=Array.prototype.slice.call(arguments);typeof e[0]=="string"?e[0]="TUNNEL: "+e[0]:e.unshift("TUNNEL:"),console.error.apply(console,e)}:U=function(){};N.debug=U});var Rt=b((Yo,xt)=>{xt.exports=Pt()});var At=b(p=>{"use strict";var Ir=p&&p.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),Nr=p&&p.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),ce=p&&p.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&Ir(t,e,r);return Nr(t,e),t},m=p&&p.__awaiter||function(e,t,r,n){function o(i){return i instanceof r?i:new r(function(s){s(i)})}return new(r||(r=Promise))(function(i,s){function u(c){try{a(n.next(c))}catch(d){s(d)}}function l(c){try{a(n.throw(c))}catch(d){s(d)}}function a(c){c.done?i(c.value):o(c.value).then(u,l)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(p,"__esModule",{value:!0});p.HttpClient=p.isHttps=p.HttpClientResponse=p.HttpClientError=p.getProxyUrl=p.MediaTypes=p.Headers=p.HttpCodes=void 0;var oe=ce(require("http")),be=ce(require("https")),St=ce(bt()),ie=ce(Rt()),R;(function(e){e[e.OK=200]="OK",e[e.MultipleChoices=300]="MultipleChoices",e[e.MovedPermanently=301]="MovedPermanently",e[e.ResourceMoved=302]="ResourceMoved",e[e.SeeOther=303]="SeeOther",e[e.NotModified=304]="NotModified",e[e.UseProxy=305]="UseProxy",e[e.SwitchProxy=306]="SwitchProxy",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect",e[e.BadRequest=400]="BadRequest",e[e.Unauthorized=401]="Unauthorized",e[e.PaymentRequired=402]="PaymentRequired",e[e.Forbidden=403]="Forbidden",e[e.NotFound=404]="NotFound",e[e.MethodNotAllowed=405]="MethodNotAllowed",e[e.NotAcceptable=406]="NotAcceptable",e[e.ProxyAuthenticationRequired=407]="ProxyAuthenticationRequired",e[e.RequestTimeout=408]="RequestTimeout",e[e.Conflict=409]="Conflict",e[e.Gone=410]="Gone",e[e.TooManyRequests=429]="TooManyRequests",e[e.InternalServerError=500]="InternalServerError",e[e.NotImplemented=501]="NotImplemented",e[e.BadGateway=502]="BadGateway",e[e.ServiceUnavailable=503]="ServiceUnavailable",e[e.GatewayTimeout=504]="GatewayTimeout"})(R=p.HttpCodes||(p.HttpCodes={}));var y;(function(e){e.Accept="accept",e.ContentType="content-type"})(y=p.Headers||(p.Headers={}));var q;(function(e){e.ApplicationJson="application/json"})(q=p.MediaTypes||(p.MediaTypes={}));function $r(e){let t=St.getProxyUrl(new URL(e));return t?t.href:""}p.getProxyUrl=$r;var Lr=[R.MovedPermanently,R.ResourceMoved,R.SeeOther,R.TemporaryRedirect,R.PermanentRedirect],Vr=[R.BadGateway,R.ServiceUnavailable,R.GatewayTimeout],Fr=["OPTIONS","GET","DELETE","HEAD"],Gr=10,Hr=5,ae=class e extends Error{constructor(t,r){super(t),this.name="HttpClientError",this.statusCode=r,Object.setPrototypeOf(this,e.prototype)}};p.HttpClientError=ae;var ue=class{constructor(t){this.message=t}readBody(){return m(this,void 0,void 0,function*(){return new Promise(t=>m(this,void 0,void 0,function*(){let r=Buffer.alloc(0);this.message.on("data",n=>{r=Buffer.concat([r,n])}),this.message.on("end",()=>{t(r.toString())})}))})}};p.HttpClientResponse=ue;function Kr(e){return new URL(e).protocol==="https:"}p.isHttps=Kr;var Oe=class{constructor(t,r,n){this._ignoreSslError=!1,this._allowRedirects=!0,this._allowRedirectDowngrade=!1,this._maxRedirects=50,this._allowRetries=!1,this._maxRetries=1,this._keepAlive=!1,this._disposed=!1,this.userAgent=t,this.handlers=r||[],this.requestOptions=n,n&&(n.ignoreSslError!=null&&(this._ignoreSslError=n.ignoreSslError),this._socketTimeout=n.socketTimeout,n.allowRedirects!=null&&(this._allowRedirects=n.allowRedirects),n.allowRedirectDowngrade!=null&&(this._allowRedirectDowngrade=n.allowRedirectDowngrade),n.maxRedirects!=null&&(this._maxRedirects=Math.max(n.maxRedirects,0)),n.keepAlive!=null&&(this._keepAlive=n.keepAlive),n.allowRetries!=null&&(this._allowRetries=n.allowRetries),n.maxRetries!=null&&(this._maxRetries=n.maxRetries))}options(t,r){return m(this,void 0,void 0,function*(){return this.request("OPTIONS",t,null,r||{})})}get(t,r){return m(this,void 0,void 0,function*(){return this.request("GET",t,null,r||{})})}del(t,r){return m(this,void 0,void 0,function*(){return this.request("DELETE",t,null,r||{})})}post(t,r,n){return m(this,void 0,void 0,function*(){return this.request("POST",t,r,n||{})})}patch(t,r,n){return m(this,void 0,void 0,function*(){return this.request("PATCH",t,r,n||{})})}put(t,r,n){return m(this,void 0,void 0,function*(){return this.request("PUT",t,r,n||{})})}head(t,r){return m(this,void 0,void 0,function*(){return this.request("HEAD",t,null,r||{})})}sendStream(t,r,n,o){return m(this,void 0,void 0,function*(){return this.request(t,r,n,o)})}getJson(t,r={}){return m(this,void 0,void 0,function*(){r[y.Accept]=this._getExistingOrDefaultHeader(r,y.Accept,q.ApplicationJson);let n=yield this.get(t,r);return this._processResponse(n,this.requestOptions)})}postJson(t,r,n={}){return m(this,void 0,void 0,function*(){let o=JSON.stringify(r,null,2);n[y.Accept]=this._getExistingOrDefaultHeader(n,y.Accept,q.ApplicationJson),n[y.ContentType]=this._getExistingOrDefaultHeader(n,y.ContentType,q.ApplicationJson);let i=yield this.post(t,o,n);return this._processResponse(i,this.requestOptions)})}putJson(t,r,n={}){return m(this,void 0,void 0,function*(){let o=JSON.stringify(r,null,2);n[y.Accept]=this._getExistingOrDefaultHeader(n,y.Accept,q.ApplicationJson),n[y.ContentType]=this._getExistingOrDefaultHeader(n,y.ContentType,q.ApplicationJson);let i=yield this.put(t,o,n);return this._processResponse(i,this.requestOptions)})}patchJson(t,r,n={}){return m(this,void 0,void 0,function*(){let o=JSON.stringify(r,null,2);n[y.Accept]=this._getExistingOrDefaultHeader(n,y.Accept,q.ApplicationJson),n[y.ContentType]=this._getExistingOrDefaultHeader(n,y.ContentType,q.ApplicationJson);let i=yield this.patch(t,o,n);return this._processResponse(i,this.requestOptions)})}request(t,r,n,o){return m(this,void 0,void 0,function*(){if(this._disposed)throw new Error("Client has already been disposed.");let i=new URL(r),s=this._prepareRequest(t,i,o),u=this._allowRetries&&Fr.includes(t)?this._maxRetries+1:1,l=0,a;do{if(a=yield this.requestRaw(s,n),a&&a.message&&a.message.statusCode===R.Unauthorized){let d;for(let h of this.handlers)if(h.canHandleAuthentication(a)){d=h;break}return d?d.handleAuthentication(this,s,n):a}let c=this._maxRedirects;for(;a.message.statusCode&&Lr.includes(a.message.statusCode)&&this._allowRedirects&&c>0;){let d=a.message.headers.location;if(!d)break;let h=new URL(d);if(i.protocol==="https:"&&i.protocol!==h.protocol&&!this._allowRedirectDowngrade)throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");if(yield a.readBody(),h.hostname!==i.hostname)for(let j in o)j.toLowerCase()==="authorization"&&delete o[j];s=this._prepareRequest(t,h,o),a=yield this.requestRaw(s,n),c--}if(!a.message.statusCode||!Vr.includes(a.message.statusCode))return a;l+=1,l<u&&(yield a.readBody(),yield this._performExponentialBackoff(l))}while(l<u);return a})}dispose(){this._agent&&this._agent.destroy(),this._disposed=!0}requestRaw(t,r){return m(this,void 0,void 0,function*(){return new Promise((n,o)=>{function i(s,u){s?o(s):u?n(u):o(new Error("Unknown error"))}this.requestRawWithCallback(t,r,i)})})}requestRawWithCallback(t,r,n){typeof r=="string"&&(t.options.headers||(t.options.headers={}),t.options.headers["Content-Length"]=Buffer.byteLength(r,"utf8"));let o=!1;function i(l,a){o||(o=!0,n(l,a))}let s=t.httpModule.request(t.options,l=>{let a=new ue(l);i(void 0,a)}),u;s.on("socket",l=>{u=l}),s.setTimeout(this._socketTimeout||3*6e4,()=>{u&&u.end(),i(new Error(`Request timeout: ${t.options.path}`))}),s.on("error",function(l){i(l)}),r&&typeof r=="string"&&s.write(r,"utf8"),r&&typeof r!="string"?(r.on("close",function(){s.end()}),r.pipe(s)):s.end()}getAgent(t){let r=new URL(t);return this._getAgent(r)}_prepareRequest(t,r,n){let o={};o.parsedUrl=r;let i=o.parsedUrl.protocol==="https:";o.httpModule=i?be:oe;let s=i?443:80;if(o.options={},o.options.host=o.parsedUrl.hostname,o.options.port=o.parsedUrl.port?parseInt(o.parsedUrl.port):s,o.options.path=(o.parsedUrl.pathname||"")+(o.parsedUrl.search||""),o.options.method=t,o.options.headers=this._mergeHeaders(n),this.userAgent!=null&&(o.options.headers["user-agent"]=this.userAgent),o.options.agent=this._getAgent(o.parsedUrl),this.handlers)for(let u of this.handlers)u.prepareRequest(o.options);return o}_mergeHeaders(t){return this.requestOptions&&this.requestOptions.headers?Object.assign({},se(this.requestOptions.headers),se(t||{})):se(t||{})}_getExistingOrDefaultHeader(t,r,n){let o;return this.requestOptions&&this.requestOptions.headers&&(o=se(this.requestOptions.headers)[r]),t[r]||o||n}_getAgent(t){let r,n=St.getProxyUrl(t),o=n&&n.hostname;if(this._keepAlive&&o&&(r=this._proxyAgent),this._keepAlive&&!o&&(r=this._agent),r)return r;let i=t.protocol==="https:",s=100;if(this.requestOptions&&(s=this.requestOptions.maxSockets||oe.globalAgent.maxSockets),n&&n.hostname){let u={maxSockets:s,keepAlive:this._keepAlive,proxy:Object.assign(Object.assign({},(n.username||n.password)&&{proxyAuth:`${n.username}:${n.password}`}),{host:n.hostname,port:n.port})},l,a=n.protocol==="https:";i?l=a?ie.httpsOverHttps:ie.httpsOverHttp:l=a?ie.httpOverHttps:ie.httpOverHttp,r=l(u),this._proxyAgent=r}if(this._keepAlive&&!r){let u={keepAlive:this._keepAlive,maxSockets:s};r=i?new be.Agent(u):new oe.Agent(u),this._agent=r}return r||(r=i?be.globalAgent:oe.globalAgent),i&&this._ignoreSslError&&(r.options=Object.assign(r.options||{},{rejectUnauthorized:!1})),r}_performExponentialBackoff(t){return m(this,void 0,void 0,function*(){t=Math.min(Gr,t);let r=Hr*Math.pow(2,t);return new Promise(n=>setTimeout(()=>n(),r))})}_processResponse(t,r){return m(this,void 0,void 0,function*(){return new Promise((n,o)=>m(this,void 0,void 0,function*(){let i=t.message.statusCode||0,s={statusCode:i,result:null,headers:{}};i===R.NotFound&&n(s);function u(c,d){if(typeof d=="string"){let h=new Date(d);if(!isNaN(h.valueOf()))return h}return d}let l,a;try{a=yield t.readBody(),a&&a.length>0&&(r&&r.deserializeDates?l=JSON.parse(a,u):l=JSON.parse(a),s.result=l),s.headers=t.message.headers}catch{}if(i>299){let c;l&&l.message?c=l.message:a&&a.length>0?c=a:c=`Failed request: (${i})`;let d=new ae(c,i);d.result=s.result,o(d)}else n(s)}))})}};p.HttpClient=Oe;var se=e=>Object.keys(e).reduce((t,r)=>(t[r.toLowerCase()]=e[r],t),{})});var kt=b(S=>{"use strict";var xe=S&&S.__awaiter||function(e,t,r,n){function o(i){return i instanceof r?i:new r(function(s){s(i)})}return new(r||(r=Promise))(function(i,s){function u(c){try{a(n.next(c))}catch(d){s(d)}}function l(c){try{a(n.throw(c))}catch(d){s(d)}}function a(c){c.done?i(c.value):o(c.value).then(u,l)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(S,"__esModule",{value:!0});S.PersonalAccessTokenCredentialHandler=S.BearerCredentialHandler=S.BasicCredentialHandler=void 0;var Ee=class{constructor(t,r){this.username=t,this.password=r}prepareRequest(t){if(!t.headers)throw Error("The request has no headers");t.headers.Authorization=`Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`}canHandleAuthentication(){return!1}handleAuthentication(){return xe(this,void 0,void 0,function*(){throw new Error("not implemented")})}};S.BasicCredentialHandler=Ee;var Te=class{constructor(t){this.token=t}prepareRequest(t){if(!t.headers)throw Error("The request has no headers");t.headers.Authorization=`Bearer ${this.token}`}canHandleAuthentication(){return!1}handleAuthentication(){return xe(this,void 0,void 0,function*(){throw new Error("not implemented")})}};S.BearerCredentialHandler=Te;var Pe=class{constructor(t){this.token=t}prepareRequest(t){if(!t.headers)throw Error("The request has no headers");t.headers.Authorization=`Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`}canHandleAuthentication(){return!1}handleAuthentication(){return xe(this,void 0,void 0,function*(){throw new Error("not implemented")})}};S.PersonalAccessTokenCredentialHandler=Pe});var qt=b($=>{"use strict";var Ct=$&&$.__awaiter||function(e,t,r,n){function o(i){return i instanceof r?i:new r(function(s){s(i)})}return new(r||(r=Promise))(function(i,s){function u(c){try{a(n.next(c))}catch(d){s(d)}}function l(c){try{a(n.throw(c))}catch(d){s(d)}}function a(c){c.done?i(c.value):o(c.value).then(u,l)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty($,"__esModule",{value:!0});$.OidcClient=void 0;var Jr=At(),Wr=kt(),Ut=Se(),Re=class e{static createHttpClient(t=!0,r=10){let n={allowRetries:t,maxRetries:r};return new Jr.HttpClient("actions/oidc-client",[new Wr.BearerCredentialHandler(e.getRequestToken())],n)}static getRequestToken(){let t=process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;if(!t)throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");return t}static getIDTokenUrl(){let t=process.env.ACTIONS_ID_TOKEN_REQUEST_URL;if(!t)throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");return t}static getCall(t){var r;return Ct(this,void 0,void 0,function*(){let i=(r=(yield e.createHttpClient().getJson(t).catch(s=>{throw new Error(`Failed to get ID Token. 
 
        Error Code : ${s.statusCode}
 
        Error Message: ${s.result.message}`)})).result)===null||r===void 0?void 0:r.value;if(!i)throw new Error("Response json body do not have ID Token field");return i})}static getIDToken(t){return Ct(this,void 0,void 0,function*(){try{let r=e.getIDTokenUrl();if(t){let o=encodeURIComponent(t);r=`${r}&audience=${o}`}Ut.debug(`ID token url is ${r}`);let n=yield e.getCall(r);return Ut.setSecret(n),n}catch(r){throw new Error(`Error message: ${r.message}`)}})}};$.OidcClient=Re});var Ue=b(_=>{"use strict";var Ae=_&&_.__awaiter||function(e,t,r,n){function o(i){return i instanceof r?i:new r(function(s){s(i)})}return new(r||(r=Promise))(function(i,s){function u(c){try{a(n.next(c))}catch(d){s(d)}}function l(c){try{a(n.throw(c))}catch(d){s(d)}}function a(c){c.done?i(c.value):o(c.value).then(u,l)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(_,"__esModule",{value:!0});_.summary=_.markdownSummary=_.SUMMARY_DOCS_URL=_.SUMMARY_ENV_VAR=void 0;var zr=require("os"),ke=require("fs"),{access:Yr,appendFile:Qr,writeFile:Xr}=ke.promises;_.SUMMARY_ENV_VAR="GITHUB_STEP_SUMMARY";_.SUMMARY_DOCS_URL="https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";var Ce=class{constructor(){this._buffer=""}filePath(){return Ae(this,void 0,void 0,function*(){if(this._filePath)return this._filePath;let t=process.env[_.SUMMARY_ENV_VAR];if(!t)throw new Error(`Unable to find environment variable for $${_.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);try{yield Yr(t,ke.constants.R_OK|ke.constants.W_OK)}catch{throw new Error(`Unable to access summary file: '${t}'. Check if the file has correct read/write permissions.`)}return this._filePath=t,this._filePath})}wrap(t,r,n={}){let o=Object.entries(n).map(([i,s])=>` ${i}="${s}"`).join("");return r?`<${t}${o}>${r}</${t}>`:`<${t}${o}>`}write(t){return Ae(this,void 0,void 0,function*(){let r=!!t?.overwrite,n=yield this.filePath();return yield(r?Xr:Qr)(n,this._buffer,{encoding:"utf8"}),this.emptyBuffer()})}clear(){return Ae(this,void 0,void 0,function*(){return this.emptyBuffer().write({overwrite:!0})})}stringify(){return this._buffer}isEmptyBuffer(){return this._buffer.length===0}emptyBuffer(){return this._buffer="",this}addRaw(t,r=!1){return this._buffer+=t,r?this.addEOL():this}addEOL(){return this.addRaw(zr.EOL)}addCodeBlock(t,r){let n=Object.assign({},r&&{lang:r}),o=this.wrap("pre",this.wrap("code",t),n);return this.addRaw(o).addEOL()}addList(t,r=!1){let n=r?"ol":"ul",o=t.map(s=>this.wrap("li",s)).join(""),i=this.wrap(n,o);return this.addRaw(i).addEOL()}addTable(t){let r=t.map(o=>{let i=o.map(s=>{if(typeof s=="string")return this.wrap("td",s);let{header:u,data:l,colspan:a,rowspan:c}=s,d=u?"th":"td",h=Object.assign(Object.assign({},a&&{colspan:a}),c&&{rowspan:c});return this.wrap(d,l,h)}).join("");return this.wrap("tr",i)}).join(""),n=this.wrap("table",r);return this.addRaw(n).addEOL()}addDetails(t,r){let n=this.wrap("details",this.wrap("summary",t)+r);return this.addRaw(n).addEOL()}addImage(t,r,n){let{width:o,height:i}=n||{},s=Object.assign(Object.assign({},o&&{width:o}),i&&{height:i}),u=this.wrap("img",null,Object.assign({src:t,alt:r},s));return this.addRaw(u).addEOL()}addHeading(t,r){let n=`h${r}`,o=["h1","h2","h3","h4","h5","h6"].includes(n)?n:"h1",i=this.wrap(o,t);return this.addRaw(i).addEOL()}addSeparator(){let t=this.wrap("hr",null);return this.addRaw(t).addEOL()}addBreak(){let t=this.wrap("br",null);return this.addRaw(t).addEOL()}addQuote(t,r){let n=Object.assign({},r&&{cite:r}),o=this.wrap("blockquote",t,n);return this.addRaw(o).addEOL()}addLink(t,r){let n=this.wrap("a",t,{href:r});return this.addRaw(n).addEOL()}},Dt=new Ce;_.markdownSummary=Dt;_.summary=Dt});var Mt=b(w=>{"use strict";var Zr=w&&w.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),en=w&&w.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),tn=w&&w.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&Zr(t,e,r);return en(t,e),t};Object.defineProperty(w,"__esModule",{value:!0});w.toPlatformPath=w.toWin32Path=w.toPosixPath=void 0;var rn=tn(require("path"));function nn(e){return e.replace(/[\\]/g,"/")}w.toPosixPath=nn;function on(e){return e.replace(/[/]/g,"\\")}w.toWin32Path=on;function sn(e){return e.replace(/[/\\]/g,rn.sep)}w.toPlatformPath=sn});var Se=b(f=>{"use strict";var an=f&&f.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),un=f&&f.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),jt=f&&f.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&an(t,e,r);return un(t,e),t},Bt=f&&f.__awaiter||function(e,t,r,n){function o(i){return i instanceof r?i:new r(function(s){s(i)})}return new(r||(r=Promise))(function(i,s){function u(c){try{a(n.next(c))}catch(d){s(d)}}function l(c){try{a(n.throw(c))}catch(d){s(d)}}function a(c){c.done?i(c.value):o(c.value).then(u,l)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(f,"__esModule",{value:!0});f.getIDToken=f.getState=f.saveState=f.group=f.endGroup=f.startGroup=f.info=f.notice=f.warning=f.error=f.debug=f.isDebug=f.setFailed=f.setCommandEcho=f.setOutput=f.getBooleanInput=f.getMultilineInput=f.getInput=f.addPath=f.setSecret=f.exportVariable=f.ExitCode=void 0;var T=He(),M=_t(),L=Z(),It=jt(require("os")),cn=jt(require("path")),ln=qt(),Nt;(function(e){e[e.Success=0]="Success",e[e.Failure=1]="Failure"})(Nt=f.ExitCode||(f.ExitCode={}));function fn(e,t){let r=L.toCommandValue(t);if(process.env[e]=r,process.env.GITHUB_ENV||"")return M.issueFileCommand("ENV",M.prepareKeyValueMessage(e,t));T.issueCommand("set-env",{name:e},r)}f.exportVariable=fn;function dn(e){T.issueCommand("add-mask",{},e)}f.setSecret=dn;function hn(e){process.env.GITHUB_PATH||""?M.issueFileCommand("PATH",e):T.issueCommand("add-path",{},e),process.env.PATH=`${e}${cn.delimiter}${process.env.PATH}`}f.addPath=hn;function qe(e,t){let r=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!r)throw new Error(`Input required and not supplied: ${e}`);return t&&t.trimWhitespace===!1?r:r.trim()}f.getInput=qe;function pn(e,t){let r=qe(e,t).split(`
`).filter(n=>n!=="");return t&&t.trimWhitespace===!1?r:r.map(n=>n.trim())}f.getMultilineInput=pn;function mn(e,t){let r=["true","True","TRUE"],n=["false","False","FALSE"],o=qe(e,t);if(r.includes(o))return!0;if(n.includes(o))return!1;throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${e}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``)}f.getBooleanInput=mn;function gn(e,t){if(process.env.GITHUB_OUTPUT||"")return M.issueFileCommand("OUTPUT",M.prepareKeyValueMessage(e,t));process.stdout.write(It.EOL),T.issueCommand("set-output",{name:e},L.toCommandValue(t))}f.setOutput=gn;function vn(e){T.issue("echo",e?"on":"off")}f.setCommandEcho=vn;function yn(e){process.exitCode=Nt.Failure,$t(e)}f.setFailed=yn;function _n(){return process.env.RUNNER_DEBUG==="1"}f.isDebug=_n;function wn(e){T.issueCommand("debug",{},e)}f.debug=wn;function $t(e,t={}){T.issueCommand("error",L.toCommandProperties(t),e instanceof Error?e.toString():e)}f.error=$t;function bn(e,t={}){T.issueCommand("warning",L.toCommandProperties(t),e instanceof Error?e.toString():e)}f.warning=bn;function On(e,t={}){T.issueCommand("notice",L.toCommandProperties(t),e instanceof Error?e.toString():e)}f.notice=On;function En(e){process.stdout.write(e+It.EOL)}f.info=En;function Lt(e){T.issue("group",e)}f.startGroup=Lt;function Vt(){T.issue("endgroup")}f.endGroup=Vt;function Tn(e,t){return Bt(this,void 0,void 0,function*(){Lt(e);let r;try{r=yield t()}finally{Vt()}return r})}f.group=Tn;function Pn(e,t){if(process.env.GITHUB_STATE||"")return M.issueFileCommand("STATE",M.prepareKeyValueMessage(e,t));T.issueCommand("save-state",{name:e},L.toCommandValue(t))}f.saveState=Pn;function xn(e){return process.env[`STATE_${e}`]||""}f.getState=xn;function Rn(e){return Bt(this,void 0,void 0,function*(){return yield ln.OidcClient.getIDToken(e)})}f.getIDToken=Rn;var Sn=Ue();Object.defineProperty(f,"summary",{enumerable:!0,get:function(){return Sn.summary}});var An=Ue();Object.defineProperty(f,"markdownSummary",{enumerable:!0,get:function(){return An.markdownSummary}});var De=Mt();Object.defineProperty(f,"toPosixPath",{enumerable:!0,get:function(){return De.toPosixPath}});Object.defineProperty(f,"toWin32Path",{enumerable:!0,get:function(){return De.toWin32Path}});Object.defineProperty(f,"toPlatformPath",{enumerable:!0,get:function(){return De.toPlatformPath}})});var Ft=require("https");var z=(e,t)=>r=>t(r,e),je=(e,t)=>(r,n)=>r?t(r):e(n),x=(e,t,r,n)=>{e&&(t[r]=n)};var Xt=F(require("https")),Zt=(e,t)=>{let r=e.payload&&JSON.stringify(e.payload),n={"Content-length":r?.length??0};x(e.payload,n,"Content-type","application/json"),x(e.token,n,"Authorization",`Bearer: ${e.token}`);let o=["GET","POST"],i={headers:n,method:e.method||o[+e.payload]};x(e.agent,i,"agent",e.agent);let s=(e.http??Xt).request(e.url,i,z(t,er));e.baker?.bake(s),s.on("error",z(void 0,t)),r&&s.write(r),s.end()},Be=e=>new Promise((t,r)=>Zt(e,je(t,r))),er=(e,t)=>{let r={};e.on("data",n=>r.data=r.data?Buffer.concat([r.data,n]):n),e.on("end",()=>r.data?t(void 0,JSON.parse(r.data.toString())):t(new Error("No data"),void 0)),e.on("error",z(void 0,t))};var Y=class{visit(t,r){for(let n of r)if(this.handle(t,n))break}},D=class extends Y{constructor(r,n){super();this.preferredMethod=r;this.preferredKey=n}handle(r,n){let o=n.key===this.preferredKey;return o&&this.preferredMethod.bind(r)(n.value),o}},le=class extends Y{handle(t,r){return t.accept(r),!1}},Q=class{constructor(){this.fields={};this.common={Domain:void 0,Expires:void 0,Path:void 0}}accept(t){this.fields[t.key]=t.value}acceptDomain(t){this.common.Domain=t}acceptExpires(t){this.common.Expires=new Date(t)}acceptHttpOnly(t){this.common.HttpOnly=!0}acceptPath(t){this.common.Path=t}acceptSecure(t){this.common.Secure=!0}toString(){let t=0,r=new Array(this.fields.length);for(let n in this.fields)r[t++]=`${n}=${this.fields[n]}`;return r.join("; ").trim()}},G=new Q,Ie=e=>{let t=new Q,r=new Array;for(let n of e.split(";")){let o=n.split("="),i=o[0].trim(),s=o.slice(1).join("=");r.push({key:i,value:s})}for(let n of tr)n.visit(t,r);return t},tr=[new D(G.acceptDomain,"Domain"),new D(G.acceptExpires,"Expires"),new D(G.acceptHttpOnly,"HttpOnly"),new D(G.acceptPath,"Path"),new D(G.acceptSecure,"Secure"),new le];var X=class e{constructor(){this.cookies={}}static{this.theOne=new e}static get default(){return e.theOne}bake(t){let r=this.get(t.host)?.map(rr)?.join("; ")?.trim();return r?.length&&t.setHeader("Cookie",r),t.on("response",n=>{"set-cookie"in n.headers&&(this.cookies[t.host]=n.headers["set-cookie"].map(Ie))}),t}get(t){if(t in this.cookies){let r=Date.now(),n=this.cookies[t].filter(o=>r<o.common.Expires.getTime());if(n.length)return this.cookies[t]=n;delete this.cookies[t]}}},rr=e=>e.toString();var Ne=(e,t)=>{let r=t;return r.url=`https://hub.docker.com/v2/${e}`,Be(r)},$e=e=>{let t={method:"POST",payload:{password:e.password,username:e.username}};return x(e.agent,t,"agent",e.agent),x(e.baker,t,"baker",e.baker),x(e.http,t,"http",e.http),Ne("users/login",t)},Le=e=>{let t={method:"PATCH",payload:{description:e.description,full_description:e.overview},token:e.token};return x(e.agent,t,"agent",e.agent),x(e.baker,t,"baker",e.baker),x(e.http,t,"http",e.http),Ne(`repositories/${e.repo}`,t)};var P=F(Se()),Gt=require("fs"),kn=async()=>{let e=(0,P.getInput)("description",{required:!0}),t=(0,P.getInput)("overview")||(0,Gt.readFileSync)("README.md").toString(),r=(0,P.getInput)("password",{required:!0});(0,P.setSecret)(r);let n=(0,P.getInput)("repo",{required:!0}),o=(0,P.getInput)("username",{required:!0}),i=new Ft.Agent({keepAlive:!0}),s=X.default,u=await $e({agent:i,baker:s,password:r,username:o});return"token"in u&&typeof u.token=="string"?await Le({agent:i,baker:s,description:e,overview:t,repo:`${o}/${n}`,token:u.token}):Promise.reject(u)};kn().catch(e=>(0,P.setFailed)(e)).then(e=>typeof e>"u"||(0,P.setOutput)("response",e));
