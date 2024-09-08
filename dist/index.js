"use strict";var Kt=Object.create;var z=Object.defineProperty;var Jt=Object.getOwnPropertyDescriptor;var Wt=Object.getOwnPropertyNames;var zt=Object.getPrototypeOf,Yt=Object.prototype.hasOwnProperty;var v=(e,t)=>()=>(e&&(t=e(e=0)),t);var b=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Qt=(e,t)=>{for(var r in t)z(e,r,{get:t[r],enumerable:!0})},je=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Wt(t))!Yt.call(e,o)&&o!==r&&z(e,o,{get:()=>t[o],enumerable:!(n=Jt(t,o))||n.enumerable});return e};var F=(e,t,r)=>(r=e!=null?Kt(zt(e)):{},je(t||!e||!e.__esModule?z(r,"default",{value:e,enumerable:!0}):r,e)),Xt=e=>je(z({},"__esModule",{value:!0}),e);var ee=b(B=>{"use strict";Object.defineProperty(B,"__esModule",{value:!0});B.toCommandProperties=B.toCommandValue=void 0;function or(e){return e==null?"":typeof e=="string"||e instanceof String?e:JSON.stringify(e)}B.toCommandValue=or;function ir(e){return Object.keys(e).length?{title:e.title,file:e.file,line:e.startLine,endLine:e.endLine,col:e.startColumn,endColumn:e.endColumn}:{}}B.toCommandProperties=ir});var Ke=b(O=>{"use strict";var sr=O&&O.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),ar=O&&O.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),ur=O&&O.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&sr(t,e,r);return ar(t,e),t};Object.defineProperty(O,"__esModule",{value:!0});O.issue=O.issueCommand=void 0;var cr=ur(require("os")),He=ee();function Ge(e,t,r){let n=new de(e,t,r);process.stdout.write(n.toString()+cr.EOL)}O.issueCommand=Ge;function lr(e,t=""){Ge(e,{},t)}O.issue=lr;var Fe="::",de=class{constructor(t,r,n){t||(t="missing.command"),this.command=t,this.properties=r,this.message=n}toString(){let t=Fe+this.command;if(this.properties&&Object.keys(this.properties).length>0){t+=" ";let r=!0;for(let n in this.properties)if(this.properties.hasOwnProperty(n)){let o=this.properties[n];o&&(r?r=!1:t+=",",t+=`${n}=${dr(o)}`)}}return t+=`${Fe}${fr(this.message)}`,t}};function fr(e){return He.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}function dr(e){return He.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}});function K(){return te>re.length-16&&(Je.default.randomFillSync(re),te=0),re.slice(te,te+=16)}var Je,re,te,he=v(()=>{Je=F(require("crypto")),re=new Uint8Array(256),te=re.length});var We,ze=v(()=>{We=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i});function hr(e){return typeof e=="string"&&We.test(e)}var k,J=v(()=>{ze();k=hr});function pr(e,t=0){let r=(g[e[t+0]]+g[e[t+1]]+g[e[t+2]]+g[e[t+3]]+"-"+g[e[t+4]]+g[e[t+5]]+"-"+g[e[t+6]]+g[e[t+7]]+"-"+g[e[t+8]]+g[e[t+9]]+"-"+g[e[t+10]]+g[e[t+11]]+g[e[t+12]]+g[e[t+13]]+g[e[t+14]]+g[e[t+15]]).toLowerCase();if(!k(r))throw TypeError("Stringified UUID is invalid");return r}var g,C,W=v(()=>{J();g=[];for(let e=0;e<256;++e)g.push((e+256).toString(16).substr(1));C=pr});function mr(e,t,r){let n=t&&r||0,o=t||new Array(16);e=e||{};let i=e.node||Ye,s=e.clockseq!==void 0?e.clockseq:pe;if(i==null||s==null){let h=e.random||(e.rng||K)();i==null&&(i=Ye=[h[0]|1,h[1],h[2],h[3],h[4],h[5]]),s==null&&(s=pe=(h[6]<<8|h[7])&16383)}let u=e.msecs!==void 0?e.msecs:Date.now(),l=e.nsecs!==void 0?e.nsecs:ge+1,a=u-me+(l-ge)/1e4;if(a<0&&e.clockseq===void 0&&(s=s+1&16383),(a<0||u>me)&&e.nsecs===void 0&&(l=0),l>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");me=u,ge=l,pe=s,u+=122192928e5;let c=((u&268435455)*1e4+l)%4294967296;o[n++]=c>>>24&255,o[n++]=c>>>16&255,o[n++]=c>>>8&255,o[n++]=c&255;let d=u/4294967296*1e4&268435455;o[n++]=d>>>8&255,o[n++]=d&255,o[n++]=d>>>24&15|16,o[n++]=d>>>16&255,o[n++]=s>>>8|128,o[n++]=s&255;for(let h=0;h<6;++h)o[n+h]=i[h];return t||C(o)}var Ye,pe,me,ge,Qe,Xe=v(()=>{he();W();me=0,ge=0;Qe=mr});function gr(e){if(!k(e))throw TypeError("Invalid UUID");let t,r=new Uint8Array(16);return r[0]=(t=parseInt(e.slice(0,8),16))>>>24,r[1]=t>>>16&255,r[2]=t>>>8&255,r[3]=t&255,r[4]=(t=parseInt(e.slice(9,13),16))>>>8,r[5]=t&255,r[6]=(t=parseInt(e.slice(14,18),16))>>>8,r[7]=t&255,r[8]=(t=parseInt(e.slice(19,23),16))>>>8,r[9]=t&255,r[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,r[11]=t/4294967296&255,r[12]=t>>>24&255,r[13]=t>>>16&255,r[14]=t>>>8&255,r[15]=t&255,r}var ne,ve=v(()=>{J();ne=gr});function vr(e){e=unescape(encodeURIComponent(e));let t=[];for(let r=0;r<e.length;++r)t.push(e.charCodeAt(r));return t}function oe(e,t,r){function n(o,i,s,u){if(typeof o=="string"&&(o=vr(o)),typeof i=="string"&&(i=ne(i)),i.length!==16)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let l=new Uint8Array(16+o.length);if(l.set(i),l.set(o,i.length),l=r(l),l[6]=l[6]&15|t,l[8]=l[8]&63|128,s){u=u||0;for(let a=0;a<16;++a)s[u+a]=l[a];return s}return C(l)}try{n.name=e}catch{}return n.DNS=yr,n.URL=_r,n}var yr,_r,ye=v(()=>{W();ve();yr="6ba7b810-9dad-11d1-80b4-00c04fd430c8",_r="6ba7b811-9dad-11d1-80b4-00c04fd430c8"});function wr(e){return Array.isArray(e)?e=Buffer.from(e):typeof e=="string"&&(e=Buffer.from(e,"utf8")),Ze.default.createHash("md5").update(e).digest()}var Ze,et,tt=v(()=>{Ze=F(require("crypto"));et=wr});var br,rt,nt=v(()=>{ye();tt();br=oe("v3",48,et),rt=br});function Or(e,t,r){e=e||{};let n=e.random||(e.rng||K)();if(n[6]=n[6]&15|64,n[8]=n[8]&63|128,t){r=r||0;for(let o=0;o<16;++o)t[r+o]=n[o];return t}return C(n)}var ot,it=v(()=>{he();W();ot=Or});function Er(e){return Array.isArray(e)?e=Buffer.from(e):typeof e=="string"&&(e=Buffer.from(e,"utf8")),st.default.createHash("sha1").update(e).digest()}var st,at,ut=v(()=>{st=F(require("crypto"));at=Er});var Tr,ct,lt=v(()=>{ye();ut();Tr=oe("v5",80,at),ct=Tr});var ft,dt=v(()=>{ft="00000000-0000-0000-0000-000000000000"});function xr(e){if(!k(e))throw TypeError("Invalid UUID");return parseInt(e.substr(14,1),16)}var ht,pt=v(()=>{J();ht=xr});var mt={};Qt(mt,{NIL:()=>ft,parse:()=>ne,stringify:()=>C,v1:()=>Qe,v3:()=>rt,v4:()=>ot,v5:()=>ct,validate:()=>k,version:()=>ht});var gt=v(()=>{Xe();nt();it();lt();dt();pt();J();W();ve()});var wt=b(E=>{"use strict";var Rr=E&&E.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),Pr=E&&E.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),yt=E&&E.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&Rr(t,e,r);return Pr(t,e),t};Object.defineProperty(E,"__esModule",{value:!0});E.prepareKeyValueMessage=E.issueFileCommand=void 0;var vt=yt(require("fs")),_e=yt(require("os")),Sr=(gt(),Xt(mt)),_t=ee();function Ar(e,t){let r=process.env[`GITHUB_${e}`];if(!r)throw new Error(`Unable to find environment variable for file command ${e}`);if(!vt.existsSync(r))throw new Error(`Missing file at path: ${r}`);vt.appendFileSync(r,`${_t.toCommandValue(t)}${_e.EOL}`,{encoding:"utf8"})}E.issueFileCommand=Ar;function kr(e,t){let r=`ghadelimiter_${Sr.v4()}`,n=_t.toCommandValue(t);if(e.includes(r))throw new Error(`Unexpected input: name should not contain the delimiter "${r}"`);if(n.includes(r))throw new Error(`Unexpected input: value should not contain the delimiter "${r}"`);return`${e}<<${r}${_e.EOL}${n}${_e.EOL}${r}`}E.prepareKeyValueMessage=kr});var Ot=b(I=>{"use strict";Object.defineProperty(I,"__esModule",{value:!0});I.checkBypass=I.getProxyUrl=void 0;function Cr(e){let t=e.protocol==="https:";if(bt(e))return;let r=t?process.env.https_proxy||process.env.HTTPS_PROXY:process.env.http_proxy||process.env.HTTP_PROXY;if(r)return new URL(r)}I.getProxyUrl=Cr;function bt(e){if(!e.hostname)return!1;let t=process.env.no_proxy||process.env.NO_PROXY||"";if(!t)return!1;let r;e.port?r=Number(e.port):e.protocol==="http:"?r=80:e.protocol==="https:"&&(r=443);let n=[e.hostname.toUpperCase()];typeof r=="number"&&n.push(`${n[0]}:${r}`);for(let o of t.split(",").map(i=>i.trim().toUpperCase()).filter(i=>i))if(n.some(i=>i===o))return!0;return!1}I.checkBypass=bt});var Rt=b(N=>{"use strict";var Ho=require("net"),qr=require("tls"),we=require("http"),Et=require("https"),Ur=require("events"),Go=require("assert"),Mr=require("util");N.httpOverHttp=Dr;N.httpsOverHttp=jr;N.httpOverHttps=Br;N.httpsOverHttps=Ir;function Dr(e){var t=new A(e);return t.request=we.request,t}function jr(e){var t=new A(e);return t.request=we.request,t.createSocket=Tt,t.defaultPort=443,t}function Br(e){var t=new A(e);return t.request=Et.request,t}function Ir(e){var t=new A(e);return t.request=Et.request,t.createSocket=Tt,t.defaultPort=443,t}function A(e){var t=this;t.options=e||{},t.proxyOptions=t.options.proxy||{},t.maxSockets=t.options.maxSockets||we.Agent.defaultMaxSockets,t.requests=[],t.sockets=[],t.on("free",function(n,o,i,s){for(var u=xt(o,i,s),l=0,a=t.requests.length;l<a;++l){var c=t.requests[l];if(c.host===u.host&&c.port===u.port){t.requests.splice(l,1),c.request.onSocket(n);return}}n.destroy(),t.removeSocket(n)})}Mr.inherits(A,Ur.EventEmitter);A.prototype.addRequest=function(t,r,n,o){var i=this,s=be({request:t},i.options,xt(r,n,o));if(i.sockets.length>=this.maxSockets){i.requests.push(s);return}i.createSocket(s,function(u){u.on("free",l),u.on("close",a),u.on("agentRemove",a),t.onSocket(u);function l(){i.emit("free",u,s)}function a(c){i.removeSocket(u),u.removeListener("free",l),u.removeListener("close",a),u.removeListener("agentRemove",a)}})};A.prototype.createSocket=function(t,r){var n=this,o={};n.sockets.push(o);var i=be({},n.proxyOptions,{method:"CONNECT",path:t.host+":"+t.port,agent:!1,headers:{host:t.host+":"+t.port}});t.localAddress&&(i.localAddress=t.localAddress),i.proxyAuth&&(i.headers=i.headers||{},i.headers["Proxy-Authorization"]="Basic "+new Buffer(i.proxyAuth).toString("base64")),q("making CONNECT request");var s=n.request(i);s.useChunkedEncodingByDefault=!1,s.once("response",u),s.once("upgrade",l),s.once("connect",a),s.once("error",c),s.end();function u(d){d.upgrade=!0}function l(d,h,j){process.nextTick(function(){a(d,h,j)})}function a(d,h,j){if(s.removeAllListeners(),h.removeAllListeners(),d.statusCode!==200){q("tunneling socket could not be established, statusCode=%d",d.statusCode),h.destroy();var V=new Error("tunneling socket could not be established, statusCode="+d.statusCode);V.code="ECONNRESET",t.request.emit("error",V),n.removeSocket(o);return}if(j.length>0){q("got illegal response body from proxy"),h.destroy();var V=new Error("got illegal response body from proxy");V.code="ECONNRESET",t.request.emit("error",V),n.removeSocket(o);return}return q("tunneling connection has established"),n.sockets[n.sockets.indexOf(o)]=h,r(h)}function c(d){s.removeAllListeners(),q(`tunneling socket could not be established, cause=%s
`,d.message,d.stack);var h=new Error("tunneling socket could not be established, cause="+d.message);h.code="ECONNRESET",t.request.emit("error",h),n.removeSocket(o)}};A.prototype.removeSocket=function(t){var r=this.sockets.indexOf(t);if(r!==-1){this.sockets.splice(r,1);var n=this.requests.shift();n&&this.createSocket(n,function(o){n.request.onSocket(o)})}};function Tt(e,t){var r=this;A.prototype.createSocket.call(r,e,function(n){var o=e.request.getHeader("host"),i=be({},r.options,{socket:n,servername:o?o.replace(/:.*$/,""):e.host}),s=qr.connect(0,i);r.sockets[r.sockets.indexOf(n)]=s,t(s)})}function xt(e,t,r){return typeof e=="string"?{host:e,port:t,localAddress:r}:e}function be(e){for(var t=1,r=arguments.length;t<r;++t){var n=arguments[t];if(typeof n=="object")for(var o=Object.keys(n),i=0,s=o.length;i<s;++i){var u=o[i];n[u]!==void 0&&(e[u]=n[u])}}return e}var q;process.env.NODE_DEBUG&&/\btunnel\b/.test(process.env.NODE_DEBUG)?q=function(){var e=Array.prototype.slice.call(arguments);typeof e[0]=="string"?e[0]="TUNNEL: "+e[0]:e.unshift("TUNNEL:"),console.error.apply(console,e)}:q=function(){};N.debug=q});var St=b((Jo,Pt)=>{Pt.exports=Rt()});var kt=b(p=>{"use strict";var Nr=p&&p.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),$r=p&&p.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),le=p&&p.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&Nr(t,e,r);return $r(t,e),t},m=p&&p.__awaiter||function(e,t,r,n){function o(i){return i instanceof r?i:new r(function(s){s(i)})}return new(r||(r=Promise))(function(i,s){function u(c){try{a(n.next(c))}catch(d){s(d)}}function l(c){try{a(n.throw(c))}catch(d){s(d)}}function a(c){c.done?i(c.value):o(c.value).then(u,l)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(p,"__esModule",{value:!0});p.HttpClient=p.isHttps=p.HttpClientResponse=p.HttpClientError=p.getProxyUrl=p.MediaTypes=p.Headers=p.HttpCodes=void 0;var ie=le(require("http")),Oe=le(require("https")),At=le(Ot()),se=le(St()),P;(function(e){e[e.OK=200]="OK",e[e.MultipleChoices=300]="MultipleChoices",e[e.MovedPermanently=301]="MovedPermanently",e[e.ResourceMoved=302]="ResourceMoved",e[e.SeeOther=303]="SeeOther",e[e.NotModified=304]="NotModified",e[e.UseProxy=305]="UseProxy",e[e.SwitchProxy=306]="SwitchProxy",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect",e[e.BadRequest=400]="BadRequest",e[e.Unauthorized=401]="Unauthorized",e[e.PaymentRequired=402]="PaymentRequired",e[e.Forbidden=403]="Forbidden",e[e.NotFound=404]="NotFound",e[e.MethodNotAllowed=405]="MethodNotAllowed",e[e.NotAcceptable=406]="NotAcceptable",e[e.ProxyAuthenticationRequired=407]="ProxyAuthenticationRequired",e[e.RequestTimeout=408]="RequestTimeout",e[e.Conflict=409]="Conflict",e[e.Gone=410]="Gone",e[e.TooManyRequests=429]="TooManyRequests",e[e.InternalServerError=500]="InternalServerError",e[e.NotImplemented=501]="NotImplemented",e[e.BadGateway=502]="BadGateway",e[e.ServiceUnavailable=503]="ServiceUnavailable",e[e.GatewayTimeout=504]="GatewayTimeout"})(P=p.HttpCodes||(p.HttpCodes={}));var y;(function(e){e.Accept="accept",e.ContentType="content-type"})(y=p.Headers||(p.Headers={}));var U;(function(e){e.ApplicationJson="application/json"})(U=p.MediaTypes||(p.MediaTypes={}));function Lr(e){let t=At.getProxyUrl(new URL(e));return t?t.href:""}p.getProxyUrl=Lr;var Vr=[P.MovedPermanently,P.ResourceMoved,P.SeeOther,P.TemporaryRedirect,P.PermanentRedirect],Fr=[P.BadGateway,P.ServiceUnavailable,P.GatewayTimeout],Hr=["OPTIONS","GET","DELETE","HEAD"],Gr=10,Kr=5,ue=class e extends Error{constructor(t,r){super(t),this.name="HttpClientError",this.statusCode=r,Object.setPrototypeOf(this,e.prototype)}};p.HttpClientError=ue;var ce=class{constructor(t){this.message=t}readBody(){return m(this,void 0,void 0,function*(){return new Promise(t=>m(this,void 0,void 0,function*(){let r=Buffer.alloc(0);this.message.on("data",n=>{r=Buffer.concat([r,n])}),this.message.on("end",()=>{t(r.toString())})}))})}};p.HttpClientResponse=ce;function Jr(e){return new URL(e).protocol==="https:"}p.isHttps=Jr;var Ee=class{constructor(t,r,n){this._ignoreSslError=!1,this._allowRedirects=!0,this._allowRedirectDowngrade=!1,this._maxRedirects=50,this._allowRetries=!1,this._maxRetries=1,this._keepAlive=!1,this._disposed=!1,this.userAgent=t,this.handlers=r||[],this.requestOptions=n,n&&(n.ignoreSslError!=null&&(this._ignoreSslError=n.ignoreSslError),this._socketTimeout=n.socketTimeout,n.allowRedirects!=null&&(this._allowRedirects=n.allowRedirects),n.allowRedirectDowngrade!=null&&(this._allowRedirectDowngrade=n.allowRedirectDowngrade),n.maxRedirects!=null&&(this._maxRedirects=Math.max(n.maxRedirects,0)),n.keepAlive!=null&&(this._keepAlive=n.keepAlive),n.allowRetries!=null&&(this._allowRetries=n.allowRetries),n.maxRetries!=null&&(this._maxRetries=n.maxRetries))}options(t,r){return m(this,void 0,void 0,function*(){return this.request("OPTIONS",t,null,r||{})})}get(t,r){return m(this,void 0,void 0,function*(){return this.request("GET",t,null,r||{})})}del(t,r){return m(this,void 0,void 0,function*(){return this.request("DELETE",t,null,r||{})})}post(t,r,n){return m(this,void 0,void 0,function*(){return this.request("POST",t,r,n||{})})}patch(t,r,n){return m(this,void 0,void 0,function*(){return this.request("PATCH",t,r,n||{})})}put(t,r,n){return m(this,void 0,void 0,function*(){return this.request("PUT",t,r,n||{})})}head(t,r){return m(this,void 0,void 0,function*(){return this.request("HEAD",t,null,r||{})})}sendStream(t,r,n,o){return m(this,void 0,void 0,function*(){return this.request(t,r,n,o)})}getJson(t,r={}){return m(this,void 0,void 0,function*(){r[y.Accept]=this._getExistingOrDefaultHeader(r,y.Accept,U.ApplicationJson);let n=yield this.get(t,r);return this._processResponse(n,this.requestOptions)})}postJson(t,r,n={}){return m(this,void 0,void 0,function*(){let o=JSON.stringify(r,null,2);n[y.Accept]=this._getExistingOrDefaultHeader(n,y.Accept,U.ApplicationJson),n[y.ContentType]=this._getExistingOrDefaultHeader(n,y.ContentType,U.ApplicationJson);let i=yield this.post(t,o,n);return this._processResponse(i,this.requestOptions)})}putJson(t,r,n={}){return m(this,void 0,void 0,function*(){let o=JSON.stringify(r,null,2);n[y.Accept]=this._getExistingOrDefaultHeader(n,y.Accept,U.ApplicationJson),n[y.ContentType]=this._getExistingOrDefaultHeader(n,y.ContentType,U.ApplicationJson);let i=yield this.put(t,o,n);return this._processResponse(i,this.requestOptions)})}patchJson(t,r,n={}){return m(this,void 0,void 0,function*(){let o=JSON.stringify(r,null,2);n[y.Accept]=this._getExistingOrDefaultHeader(n,y.Accept,U.ApplicationJson),n[y.ContentType]=this._getExistingOrDefaultHeader(n,y.ContentType,U.ApplicationJson);let i=yield this.patch(t,o,n);return this._processResponse(i,this.requestOptions)})}request(t,r,n,o){return m(this,void 0,void 0,function*(){if(this._disposed)throw new Error("Client has already been disposed.");let i=new URL(r),s=this._prepareRequest(t,i,o),u=this._allowRetries&&Hr.includes(t)?this._maxRetries+1:1,l=0,a;do{if(a=yield this.requestRaw(s,n),a&&a.message&&a.message.statusCode===P.Unauthorized){let d;for(let h of this.handlers)if(h.canHandleAuthentication(a)){d=h;break}return d?d.handleAuthentication(this,s,n):a}let c=this._maxRedirects;for(;a.message.statusCode&&Vr.includes(a.message.statusCode)&&this._allowRedirects&&c>0;){let d=a.message.headers.location;if(!d)break;let h=new URL(d);if(i.protocol==="https:"&&i.protocol!==h.protocol&&!this._allowRedirectDowngrade)throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");if(yield a.readBody(),h.hostname!==i.hostname)for(let j in o)j.toLowerCase()==="authorization"&&delete o[j];s=this._prepareRequest(t,h,o),a=yield this.requestRaw(s,n),c--}if(!a.message.statusCode||!Fr.includes(a.message.statusCode))return a;l+=1,l<u&&(yield a.readBody(),yield this._performExponentialBackoff(l))}while(l<u);return a})}dispose(){this._agent&&this._agent.destroy(),this._disposed=!0}requestRaw(t,r){return m(this,void 0,void 0,function*(){return new Promise((n,o)=>{function i(s,u){s?o(s):u?n(u):o(new Error("Unknown error"))}this.requestRawWithCallback(t,r,i)})})}requestRawWithCallback(t,r,n){typeof r=="string"&&(t.options.headers||(t.options.headers={}),t.options.headers["Content-Length"]=Buffer.byteLength(r,"utf8"));let o=!1;function i(l,a){o||(o=!0,n(l,a))}let s=t.httpModule.request(t.options,l=>{let a=new ce(l);i(void 0,a)}),u;s.on("socket",l=>{u=l}),s.setTimeout(this._socketTimeout||3*6e4,()=>{u&&u.end(),i(new Error(`Request timeout: ${t.options.path}`))}),s.on("error",function(l){i(l)}),r&&typeof r=="string"&&s.write(r,"utf8"),r&&typeof r!="string"?(r.on("close",function(){s.end()}),r.pipe(s)):s.end()}getAgent(t){let r=new URL(t);return this._getAgent(r)}_prepareRequest(t,r,n){let o={};o.parsedUrl=r;let i=o.parsedUrl.protocol==="https:";o.httpModule=i?Oe:ie;let s=i?443:80;if(o.options={},o.options.host=o.parsedUrl.hostname,o.options.port=o.parsedUrl.port?parseInt(o.parsedUrl.port):s,o.options.path=(o.parsedUrl.pathname||"")+(o.parsedUrl.search||""),o.options.method=t,o.options.headers=this._mergeHeaders(n),this.userAgent!=null&&(o.options.headers["user-agent"]=this.userAgent),o.options.agent=this._getAgent(o.parsedUrl),this.handlers)for(let u of this.handlers)u.prepareRequest(o.options);return o}_mergeHeaders(t){return this.requestOptions&&this.requestOptions.headers?Object.assign({},ae(this.requestOptions.headers),ae(t||{})):ae(t||{})}_getExistingOrDefaultHeader(t,r,n){let o;return this.requestOptions&&this.requestOptions.headers&&(o=ae(this.requestOptions.headers)[r]),t[r]||o||n}_getAgent(t){let r,n=At.getProxyUrl(t),o=n&&n.hostname;if(this._keepAlive&&o&&(r=this._proxyAgent),this._keepAlive&&!o&&(r=this._agent),r)return r;let i=t.protocol==="https:",s=100;if(this.requestOptions&&(s=this.requestOptions.maxSockets||ie.globalAgent.maxSockets),n&&n.hostname){let u={maxSockets:s,keepAlive:this._keepAlive,proxy:Object.assign(Object.assign({},(n.username||n.password)&&{proxyAuth:`${n.username}:${n.password}`}),{host:n.hostname,port:n.port})},l,a=n.protocol==="https:";i?l=a?se.httpsOverHttps:se.httpsOverHttp:l=a?se.httpOverHttps:se.httpOverHttp,r=l(u),this._proxyAgent=r}if(this._keepAlive&&!r){let u={keepAlive:this._keepAlive,maxSockets:s};r=i?new Oe.Agent(u):new ie.Agent(u),this._agent=r}return r||(r=i?Oe.globalAgent:ie.globalAgent),i&&this._ignoreSslError&&(r.options=Object.assign(r.options||{},{rejectUnauthorized:!1})),r}_performExponentialBackoff(t){return m(this,void 0,void 0,function*(){t=Math.min(Gr,t);let r=Kr*Math.pow(2,t);return new Promise(n=>setTimeout(()=>n(),r))})}_processResponse(t,r){return m(this,void 0,void 0,function*(){return new Promise((n,o)=>m(this,void 0,void 0,function*(){let i=t.message.statusCode||0,s={statusCode:i,result:null,headers:{}};i===P.NotFound&&n(s);function u(c,d){if(typeof d=="string"){let h=new Date(d);if(!isNaN(h.valueOf()))return h}return d}let l,a;try{a=yield t.readBody(),a&&a.length>0&&(r&&r.deserializeDates?l=JSON.parse(a,u):l=JSON.parse(a),s.result=l),s.headers=t.message.headers}catch{}if(i>299){let c;l&&l.message?c=l.message:a&&a.length>0?c=a:c=`Failed request: (${i})`;let d=new ue(c,i);d.result=s.result,o(d)}else n(s)}))})}};p.HttpClient=Ee;var ae=e=>Object.keys(e).reduce((t,r)=>(t[r.toLowerCase()]=e[r],t),{})});var Ct=b(S=>{"use strict";var Pe=S&&S.__awaiter||function(e,t,r,n){function o(i){return i instanceof r?i:new r(function(s){s(i)})}return new(r||(r=Promise))(function(i,s){function u(c){try{a(n.next(c))}catch(d){s(d)}}function l(c){try{a(n.throw(c))}catch(d){s(d)}}function a(c){c.done?i(c.value):o(c.value).then(u,l)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(S,"__esModule",{value:!0});S.PersonalAccessTokenCredentialHandler=S.BearerCredentialHandler=S.BasicCredentialHandler=void 0;var Te=class{constructor(t,r){this.username=t,this.password=r}prepareRequest(t){if(!t.headers)throw Error("The request has no headers");t.headers.Authorization=`Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`}canHandleAuthentication(){return!1}handleAuthentication(){return Pe(this,void 0,void 0,function*(){throw new Error("not implemented")})}};S.BasicCredentialHandler=Te;var xe=class{constructor(t){this.token=t}prepareRequest(t){if(!t.headers)throw Error("The request has no headers");t.headers.Authorization=`Bearer ${this.token}`}canHandleAuthentication(){return!1}handleAuthentication(){return Pe(this,void 0,void 0,function*(){throw new Error("not implemented")})}};S.BearerCredentialHandler=xe;var Re=class{constructor(t){this.token=t}prepareRequest(t){if(!t.headers)throw Error("The request has no headers");t.headers.Authorization=`Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`}canHandleAuthentication(){return!1}handleAuthentication(){return Pe(this,void 0,void 0,function*(){throw new Error("not implemented")})}};S.PersonalAccessTokenCredentialHandler=Re});var Mt=b($=>{"use strict";var qt=$&&$.__awaiter||function(e,t,r,n){function o(i){return i instanceof r?i:new r(function(s){s(i)})}return new(r||(r=Promise))(function(i,s){function u(c){try{a(n.next(c))}catch(d){s(d)}}function l(c){try{a(n.throw(c))}catch(d){s(d)}}function a(c){c.done?i(c.value):o(c.value).then(u,l)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty($,"__esModule",{value:!0});$.OidcClient=void 0;var Wr=kt(),zr=Ct(),Ut=Ae(),Se=class e{static createHttpClient(t=!0,r=10){let n={allowRetries:t,maxRetries:r};return new Wr.HttpClient("actions/oidc-client",[new zr.BearerCredentialHandler(e.getRequestToken())],n)}static getRequestToken(){let t=process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;if(!t)throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");return t}static getIDTokenUrl(){let t=process.env.ACTIONS_ID_TOKEN_REQUEST_URL;if(!t)throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");return t}static getCall(t){var r;return qt(this,void 0,void 0,function*(){let i=(r=(yield e.createHttpClient().getJson(t).catch(s=>{throw new Error(`Failed to get ID Token. 
 
        Error Code : ${s.statusCode}
 
        Error Message: ${s.message}`)})).result)===null||r===void 0?void 0:r.value;if(!i)throw new Error("Response json body do not have ID Token field");return i})}static getIDToken(t){return qt(this,void 0,void 0,function*(){try{let r=e.getIDTokenUrl();if(t){let o=encodeURIComponent(t);r=`${r}&audience=${o}`}Ut.debug(`ID token url is ${r}`);let n=yield e.getCall(r);return Ut.setSecret(n),n}catch(r){throw new Error(`Error message: ${r.message}`)}})}};$.OidcClient=Se});var Ue=b(_=>{"use strict";var ke=_&&_.__awaiter||function(e,t,r,n){function o(i){return i instanceof r?i:new r(function(s){s(i)})}return new(r||(r=Promise))(function(i,s){function u(c){try{a(n.next(c))}catch(d){s(d)}}function l(c){try{a(n.throw(c))}catch(d){s(d)}}function a(c){c.done?i(c.value):o(c.value).then(u,l)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(_,"__esModule",{value:!0});_.summary=_.markdownSummary=_.SUMMARY_DOCS_URL=_.SUMMARY_ENV_VAR=void 0;var Yr=require("os"),Ce=require("fs"),{access:Qr,appendFile:Xr,writeFile:Zr}=Ce.promises;_.SUMMARY_ENV_VAR="GITHUB_STEP_SUMMARY";_.SUMMARY_DOCS_URL="https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";var qe=class{constructor(){this._buffer=""}filePath(){return ke(this,void 0,void 0,function*(){if(this._filePath)return this._filePath;let t=process.env[_.SUMMARY_ENV_VAR];if(!t)throw new Error(`Unable to find environment variable for $${_.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);try{yield Qr(t,Ce.constants.R_OK|Ce.constants.W_OK)}catch{throw new Error(`Unable to access summary file: '${t}'. Check if the file has correct read/write permissions.`)}return this._filePath=t,this._filePath})}wrap(t,r,n={}){let o=Object.entries(n).map(([i,s])=>` ${i}="${s}"`).join("");return r?`<${t}${o}>${r}</${t}>`:`<${t}${o}>`}write(t){return ke(this,void 0,void 0,function*(){let r=!!t?.overwrite,n=yield this.filePath();return yield(r?Zr:Xr)(n,this._buffer,{encoding:"utf8"}),this.emptyBuffer()})}clear(){return ke(this,void 0,void 0,function*(){return this.emptyBuffer().write({overwrite:!0})})}stringify(){return this._buffer}isEmptyBuffer(){return this._buffer.length===0}emptyBuffer(){return this._buffer="",this}addRaw(t,r=!1){return this._buffer+=t,r?this.addEOL():this}addEOL(){return this.addRaw(Yr.EOL)}addCodeBlock(t,r){let n=Object.assign({},r&&{lang:r}),o=this.wrap("pre",this.wrap("code",t),n);return this.addRaw(o).addEOL()}addList(t,r=!1){let n=r?"ol":"ul",o=t.map(s=>this.wrap("li",s)).join(""),i=this.wrap(n,o);return this.addRaw(i).addEOL()}addTable(t){let r=t.map(o=>{let i=o.map(s=>{if(typeof s=="string")return this.wrap("td",s);let{header:u,data:l,colspan:a,rowspan:c}=s,d=u?"th":"td",h=Object.assign(Object.assign({},a&&{colspan:a}),c&&{rowspan:c});return this.wrap(d,l,h)}).join("");return this.wrap("tr",i)}).join(""),n=this.wrap("table",r);return this.addRaw(n).addEOL()}addDetails(t,r){let n=this.wrap("details",this.wrap("summary",t)+r);return this.addRaw(n).addEOL()}addImage(t,r,n){let{width:o,height:i}=n||{},s=Object.assign(Object.assign({},o&&{width:o}),i&&{height:i}),u=this.wrap("img",null,Object.assign({src:t,alt:r},s));return this.addRaw(u).addEOL()}addHeading(t,r){let n=`h${r}`,o=["h1","h2","h3","h4","h5","h6"].includes(n)?n:"h1",i=this.wrap(o,t);return this.addRaw(i).addEOL()}addSeparator(){let t=this.wrap("hr",null);return this.addRaw(t).addEOL()}addBreak(){let t=this.wrap("br",null);return this.addRaw(t).addEOL()}addQuote(t,r){let n=Object.assign({},r&&{cite:r}),o=this.wrap("blockquote",t,n);return this.addRaw(o).addEOL()}addLink(t,r){let n=this.wrap("a",t,{href:r});return this.addRaw(n).addEOL()}},Dt=new qe;_.markdownSummary=Dt;_.summary=Dt});var jt=b(w=>{"use strict";var en=w&&w.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),tn=w&&w.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),rn=w&&w.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&en(t,e,r);return tn(t,e),t};Object.defineProperty(w,"__esModule",{value:!0});w.toPlatformPath=w.toWin32Path=w.toPosixPath=void 0;var nn=rn(require("path"));function on(e){return e.replace(/[\\]/g,"/")}w.toPosixPath=on;function sn(e){return e.replace(/[/]/g,"\\")}w.toWin32Path=sn;function an(e){return e.replace(/[/\\]/g,nn.sep)}w.toPlatformPath=an});var Ae=b(f=>{"use strict";var un=f&&f.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),cn=f&&f.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),Bt=f&&f.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&un(t,e,r);return cn(t,e),t},It=f&&f.__awaiter||function(e,t,r,n){function o(i){return i instanceof r?i:new r(function(s){s(i)})}return new(r||(r=Promise))(function(i,s){function u(c){try{a(n.next(c))}catch(d){s(d)}}function l(c){try{a(n.throw(c))}catch(d){s(d)}}function a(c){c.done?i(c.value):o(c.value).then(u,l)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(f,"__esModule",{value:!0});f.getIDToken=f.getState=f.saveState=f.group=f.endGroup=f.startGroup=f.info=f.notice=f.warning=f.error=f.debug=f.isDebug=f.setFailed=f.setCommandEcho=f.setOutput=f.getBooleanInput=f.getMultilineInput=f.getInput=f.addPath=f.setSecret=f.exportVariable=f.ExitCode=void 0;var T=Ke(),D=wt(),L=ee(),Nt=Bt(require("os")),ln=Bt(require("path")),fn=Mt(),$t;(function(e){e[e.Success=0]="Success",e[e.Failure=1]="Failure"})($t=f.ExitCode||(f.ExitCode={}));function dn(e,t){let r=L.toCommandValue(t);if(process.env[e]=r,process.env.GITHUB_ENV||"")return D.issueFileCommand("ENV",D.prepareKeyValueMessage(e,t));T.issueCommand("set-env",{name:e},r)}f.exportVariable=dn;function hn(e){T.issueCommand("add-mask",{},e)}f.setSecret=hn;function pn(e){process.env.GITHUB_PATH||""?D.issueFileCommand("PATH",e):T.issueCommand("add-path",{},e),process.env.PATH=`${e}${ln.delimiter}${process.env.PATH}`}f.addPath=pn;function Me(e,t){let r=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!r)throw new Error(`Input required and not supplied: ${e}`);return t&&t.trimWhitespace===!1?r:r.trim()}f.getInput=Me;function mn(e,t){let r=Me(e,t).split(`
`).filter(n=>n!=="");return t&&t.trimWhitespace===!1?r:r.map(n=>n.trim())}f.getMultilineInput=mn;function gn(e,t){let r=["true","True","TRUE"],n=["false","False","FALSE"],o=Me(e,t);if(r.includes(o))return!0;if(n.includes(o))return!1;throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${e}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``)}f.getBooleanInput=gn;function vn(e,t){if(process.env.GITHUB_OUTPUT||"")return D.issueFileCommand("OUTPUT",D.prepareKeyValueMessage(e,t));process.stdout.write(Nt.EOL),T.issueCommand("set-output",{name:e},L.toCommandValue(t))}f.setOutput=vn;function yn(e){T.issue("echo",e?"on":"off")}f.setCommandEcho=yn;function _n(e){process.exitCode=$t.Failure,Lt(e)}f.setFailed=_n;function wn(){return process.env.RUNNER_DEBUG==="1"}f.isDebug=wn;function bn(e){T.issueCommand("debug",{},e)}f.debug=bn;function Lt(e,t={}){T.issueCommand("error",L.toCommandProperties(t),e instanceof Error?e.toString():e)}f.error=Lt;function On(e,t={}){T.issueCommand("warning",L.toCommandProperties(t),e instanceof Error?e.toString():e)}f.warning=On;function En(e,t={}){T.issueCommand("notice",L.toCommandProperties(t),e instanceof Error?e.toString():e)}f.notice=En;function Tn(e){process.stdout.write(e+Nt.EOL)}f.info=Tn;function Vt(e){T.issue("group",e)}f.startGroup=Vt;function Ft(){T.issue("endgroup")}f.endGroup=Ft;function xn(e,t){return It(this,void 0,void 0,function*(){Vt(e);let r;try{r=yield t()}finally{Ft()}return r})}f.group=xn;function Rn(e,t){if(process.env.GITHUB_STATE||"")return D.issueFileCommand("STATE",D.prepareKeyValueMessage(e,t));T.issueCommand("save-state",{name:e},L.toCommandValue(t))}f.saveState=Rn;function Pn(e){return process.env[`STATE_${e}`]||""}f.getState=Pn;function Sn(e){return It(this,void 0,void 0,function*(){return yield fn.OidcClient.getIDToken(e)})}f.getIDToken=Sn;var An=Ue();Object.defineProperty(f,"summary",{enumerable:!0,get:function(){return An.summary}});var kn=Ue();Object.defineProperty(f,"markdownSummary",{enumerable:!0,get:function(){return kn.markdownSummary}});var De=jt();Object.defineProperty(f,"toPosixPath",{enumerable:!0,get:function(){return De.toPosixPath}});Object.defineProperty(f,"toWin32Path",{enumerable:!0,get:function(){return De.toWin32Path}});Object.defineProperty(f,"toPlatformPath",{enumerable:!0,get:function(){return De.toPlatformPath}})});var Ht=require("https");var Zt=F(require("https"));var Y=(e,t)=>r=>t(r,e),Be=(e,t)=>(r,n)=>r?t(r):e(n),H=(e,t)=>e??t,R=(e,t,r,n)=>{e&&(t[r]=n)};var er=(e,t)=>{let r=JSON.stringify(H(e.payload,{})),n={"Content-length":H(r?.length,0)};R(e.payload,n,"Content-type","application/json"),R(e.token,n,"Authorization",`Bearer: ${e.token}`);let o=["GET","POST"],i={headers:n,method:H(e.method,o[+e.payload])};R(e.agent,i,"agent",e.agent);let s=H(e.http,Zt).request(e.url,i,Y(t,tr));e.baker?.bake(s),s.on("error",Y(void 0,t)),e.payload&&s.write(r),s.end()},Ie=e=>new Promise((t,r)=>er(e,Be(t,r))),tr=(e,t)=>{let r={};e.on("data",n=>r.data=r.data?Buffer.concat([r.data,n]):n),e.on("end",()=>r.data?t(void 0,JSON.parse(r.data.toString())):t(new Error("No data"),void 0)),e.on("error",Y(void 0,t))};var Q=class{visit(t,r){for(let n of r)if(this.handle(t,n))break}},M=class extends Q{constructor(r,n){super();this.preferredMethod=r;this.preferredKey=n}handle(r,n){let o=n.key===this.preferredKey;return o&&this.preferredMethod.bind(r)(n.value),o}},fe=class extends Q{handle(t,r){return t.accept(r),!1}},X=class{constructor(){this.fields={};this.common={Domain:void 0,Expires:void 0,Path:void 0}}accept(t){this.fields[t.key]=t.value}acceptDomain(t){this.common.Domain=t}acceptExpires(t){this.common.Expires=new Date(t)}acceptHttpOnly(t){this.common.HttpOnly=!0}acceptPath(t){this.common.Path=t}acceptSecure(t){this.common.Secure=!0}toString(){let t=0,r=new Array(this.fields.length);for(let n in this.fields)r[t++]=`${n}=${this.fields[n]}`;return r.join("; ").trim()}},G=new X,Ne=e=>{let t=new X,r=new Array;for(let n of e.split(";")){let o=n.split("="),i=o[0].trim(),s=o.slice(1).join("=");r.push({key:i,value:s})}for(let n of rr)n.visit(t,r);return t},rr=[new M(G.acceptDomain,"Domain"),new M(G.acceptExpires,"Expires"),new M(G.acceptHttpOnly,"HttpOnly"),new M(G.acceptPath,"Path"),new M(G.acceptSecure,"Secure"),new fe];var Z=class e{constructor(){this.cookies={}}static{this.theOne=new e}static get default(){return e.theOne}#e(t,r){"set-cookie"in r.headers&&(this.cookies[t.host]=r.headers["set-cookie"].map(Ne))}bake(t){let r=this.get(t.host)?.map(nr).join("; ").trim();return r?.length&&t.setHeader("Cookie",r),t.on("response",this.#e.bind(this,t)),t}get(t){if(t in this.cookies){let r=Date.now(),n=this.cookies[t].filter(o=>r<o.common.Expires.getTime());if(n.length)return this.cookies[t]=n;delete this.cookies[t]}}},nr=e=>e.toString();var $e=(e,t)=>{let r=t;return r.url=`https://hub.docker.com/v2/${e}`,Ie(r)},Le=e=>{let t={method:"POST",payload:{password:e.password,username:e.username}};return R(e.agent,t,"agent",e.agent),R(e.baker,t,"baker",e.baker),R(e.http,t,"http",e.http),$e("users/login",t)},Ve=e=>{let t={method:"PATCH",payload:{description:e.description,full_description:e.overview},token:e.token};return R(e.agent,t,"agent",e.agent),R(e.baker,t,"baker",e.baker),R(e.http,t,"http",e.http),$e(`repositories/${e.repo}`,t)};var x=F(Ae()),Gt=require("fs"),Cn=async()=>{let e=(0,x.getInput)("description",{required:!0}),t=(0,x.getInput)("overview")||(0,Gt.readFileSync)("README.md").toString(),r=(0,x.getInput)("password",{required:!0});(0,x.setSecret)(r);let n=(0,x.getInput)("repo",{required:!0}),o=(0,x.getInput)("username",{required:!0}),i=new Ht.Agent({keepAlive:!0}),s=Z.default,u=await Le({agent:i,baker:s,password:r,username:o});return"token"in u&&typeof u.token=="string"?await Ve({agent:i,baker:s,description:e,overview:t,repo:`${o}/${n}`,token:u.token}):Promise.reject(u)};Cn().catch(e=>(0,x.setFailed)(e)).then(e=>typeof e>"u"||(0,x.setOutput)("response",e));
