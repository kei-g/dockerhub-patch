var w=Object.create;var g=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var q=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,I=Object.prototype.hasOwnProperty;var l=e=>g(e,"__esModule",{value:!0});var v=(e,t,n,u)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of q(t))!I.call(e,r)&&(n||r!=="default")&&g(e,r,{get:()=>t[r],enumerable:!(u=f(t,r))||u.enumerable});return e},m=(e,t)=>v(l(g(e!=null?w(y(e)):{},"default",!t&&e&&e.__esModule?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);var k=(e,t,n)=>new Promise((u,r)=>{var c=i=>{try{o(n.next(i))}catch(d){r(d)}},a=i=>{try{o(n.throw(i))}catch(d){r(d)}},o=i=>i.done?u(i.value):Promise.resolve(i.value).then(c,a);o((n=n.apply(e,t)).next())});var s=m(require("@actions/core")),A=m(require("http")),p=require("..");const T=()=>k(exports,null,function*(){const e=s.getInput("description",{required:!0}),t=s.getInput("overview",{required:!0}),n=s.getInput("password",{required:!0});s.setSecret(n);const u=s.getInput("repo",{required:!0}),r=s.getInput("username",{required:!0}),c=new A.Agent({keepAlive:!0}),a=p.CookieBaker.default,o=yield(0,p.loginAsync)({agent:c,baker:a,password:n,username:r});return"token"in o&&typeof o.token=="string"?yield(0,p.setDescriptionAsync)({agent:c,baker:a,description:e,overview:t,repo:`${r}/${u}`,token:o.token}):Promise.reject(o)});T().catch(e=>s.setFailed(e)).then(e=>typeof e=="undefined"||s.setOutput("response",e));
