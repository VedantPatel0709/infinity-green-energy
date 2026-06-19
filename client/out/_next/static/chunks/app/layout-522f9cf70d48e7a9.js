(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{2898:function(e,r,n){"use strict";n.d(r,{Z:function(){return createLucideIcon}});var d=n(2265),c={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let toKebabCase=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),createLucideIcon=(e,r)=>{let n=(0,d.forwardRef)(({color:n="currentColor",size:f=24,strokeWidth:h=2,absoluteStrokeWidth:y,children:b,...x},g)=>(0,d.createElement)("svg",{ref:g,...c,width:f,height:f,stroke:n,strokeWidth:y?24*Number(h)/Number(f):h,className:`lucide lucide-${toKebabCase(e)}`,...x},[...r.map(([e,r])=>(0,d.createElement)(e,r)),...(Array.isArray(b)?b:[b])||[]]));return n.displayName=`${e}`,n}},2549:function(e,r,n){"use strict";n.d(r,{Z:function(){return c}});var d=n(2898);let c=(0,d.Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},83:function(e,r,n){Promise.resolve().then(n.t.bind(n,2853,23)),Promise.resolve().then(n.bind(n,8280)),Promise.resolve().then(n.t.bind(n,8326,23)),Promise.resolve().then(n.t.bind(n,82,23)),Promise.resolve().then(n.t.bind(n,2142,23)),Promise.resolve().then(n.bind(n,5925))},8280:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return components_Navbar}});var d=n(7437),c=n(1396),f=n.n(c),h=n(2265),y=n(2549),b=n(2898);let x=(0,b.Z)("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]),LeafIcon=e=>{let{className:r}=e;return(0,d.jsxs)("svg",{className:r,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,d.jsx)("path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"}),(0,d.jsx)("path",{d:"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"})]})};var components_Navbar=()=>{let[e,r]=(0,h.useState)(!1),[n,c]=(0,h.useState)(!1);(0,h.useEffect)(()=>{let handleScroll=()=>{c(window.scrollY>10)};return window.addEventListener("scroll",handleScroll),()=>window.removeEventListener("scroll",handleScroll)},[]);let b=[{name:"Home",href:"/"},{name:"Solutions",href:"/solutions"},{name:"Industry Network",href:"/industry-network"},{name:"Insights",href:"/insights"},{name:"About Us",href:"/about"},{name:"Contact",href:"/contact"},{name:"Client Portal",href:"/portal"}];return(0,d.jsxs)("nav",{className:"sticky top-0 z-50 transition-all duration-300 ".concat(n?"bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-lg":"bg-slate-900/90 backdrop-blur-md border-b border-slate-800/50"," text-white"),children:[(0,d.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,d.jsxs)("div",{className:"flex justify-between h-20 items-center",children:[(0,d.jsxs)(f(),{href:"/",className:"flex items-center gap-3 group",children:[(0,d.jsx)("div",{className:"w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300 border border-primary/30",children:(0,d.jsx)(LeafIcon,{className:"w-6 h-6 fill-primary"})}),(0,d.jsxs)("div",{className:"flex flex-col",children:[(0,d.jsx)("span",{className:"text-xl font-bold tracking-tight text-white font-heading leading-tight",children:"INFINITY GREEN"}),(0,d.jsx)("span",{className:"text-[10px] tracking-widest text-primary font-bold uppercase leading-none mt-0.5",children:"ENERGY PLATFORM"})]})]}),(0,d.jsxs)("div",{className:"hidden md:flex items-center space-x-3 lg:space-x-5",children:[b.map(e=>(0,d.jsx)(f(),{href:e.href,className:"font-semibold text-xs lg:text-sm transition-colors duration-200 ".concat("Client Portal"===e.name?"text-primary hover:text-primary-light bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/25":"text-slate-300 hover:text-primary"),children:e.name},e.name)),(0,d.jsx)(f(),{href:"/contact?proposal=true",className:"btn-primary py-2 px-5 text-xs font-bold uppercase tracking-wider",children:"Request Proposal"})]}),(0,d.jsx)("div",{className:"md:hidden",children:(0,d.jsx)("button",{onClick:()=>r(!e),className:"text-slate-300 hover:text-primary focus:outline-none transition-colors p-2",children:e?(0,d.jsx)(y.Z,{className:"w-6 h-6"}):(0,d.jsx)(x,{className:"w-6 h-6"})})})]})}),e&&(0,d.jsxs)("div",{className:"md:hidden bg-slate-900 border-b border-slate-800 p-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-5 duration-200",children:[b.map(e=>(0,d.jsx)(f(),{href:e.href,onClick:()=>r(!1),className:"block text-slate-300 hover:text-primary font-semibold text-lg transition-colors py-2",children:e.name},e.name)),(0,d.jsx)("div",{className:"pt-4",children:(0,d.jsx)(f(),{href:"/contact?proposal=true",onClick:()=>r(!1),className:"btn-primary w-full py-3",children:"Request Proposal"})})]})]})}},2853:function(){},82:function(e){e.exports={style:{fontFamily:"'__Inter_f367f3', '__Inter_Fallback_f367f3'",fontStyle:"normal"},className:"__className_f367f3",variable:"__variable_f367f3"}},2142:function(e){e.exports={style:{fontFamily:"'__Plus_Jakarta_Sans_646807', '__Plus_Jakarta_Sans_Fallback_646807'",fontStyle:"normal"},className:"__className_646807",variable:"__variable_646807"}},622:function(e,r,n){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d=n(2265),c=Symbol.for("react.element"),f=Symbol.for("react.fragment"),h=Object.prototype.hasOwnProperty,y=d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,b={key:!0,ref:!0,__self:!0,__source:!0};function q(e,r,n){var d,f={},x=null,g=null;for(d in void 0!==n&&(x=""+n),void 0!==r.key&&(x=""+r.key),void 0!==r.ref&&(g=r.ref),r)h.call(r,d)&&!b.hasOwnProperty(d)&&(f[d]=r[d]);if(e&&e.defaultProps)for(d in r=e.defaultProps)void 0===f[d]&&(f[d]=r[d]);return{$$typeof:c,type:e,key:x,ref:g,props:f,_owner:y.current}}r.Fragment=f,r.jsx=q,r.jsxs=q},7437:function(e,r,n){"use strict";e.exports=n(622)},1396:function(e,r,n){e.exports=n(8326)},5925:function(e,r,n){"use strict";let d,c;n.r(r),n.d(r,{CheckmarkIcon:function(){return J},ErrorIcon:function(){return M},LoaderIcon:function(){return U},ToastBar:function(){return es},ToastIcon:function(){return $},Toaster:function(){return Fe},default:function(){return ei},resolveValue:function(){return dist_h},toast:function(){return dist_n},useToaster:function(){return dist_w},useToasterStore:function(){return V}});var f=n(2265);let h={data:""},t=e=>{if("object"==typeof window){let r=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return r.nonce=window.__nonce__,r.parentNode||(e||document.head).appendChild(r),r.firstChild}return e||h},y=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,b=/\/\*[^]*?\*\/|  +/g,x=/\n+/g,o=(e,r)=>{let n="",d="",c="";for(let f in e){let h=e[f];"@"==f[0]?"i"==f[1]?n=f+" "+h+";":d+="f"==f[1]?o(h,f):f+"{"+o(h,"k"==f[1]?"":r)+"}":"object"==typeof h?d+=o(h,r?r.replace(/([^,])+/g,e=>f.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,r=>/&/.test(r)?r.replace(/&/g,e):e?e+" "+r:r)):f):null!=h&&(f=/^--/.test(f)?f:f.replace(/[A-Z]/g,"-$&").toLowerCase(),c+=o.p?o.p(f,h):f+":"+h+";")}return n+(r&&c?r+"{"+c+"}":c)+d},g={},s=e=>{if("object"==typeof e){let r="";for(let n in e)r+=n+s(e[n]);return r}return e},i=(e,r,n,d,c)=>{var f;let h=s(e),v=g[h]||(g[h]=(e=>{let r=0,n=11;for(;r<e.length;)n=101*n+e.charCodeAt(r++)>>>0;return"go"+n})(h));if(!g[v]){let r=h!==e?e:(e=>{let r,n,d=[{}];for(;r=y.exec(e.replace(b,""));)r[4]?d.shift():r[3]?(n=r[3].replace(x," ").trim(),d.unshift(d[0][n]=d[0][n]||{})):d[0][r[1]]=r[2].replace(x," ").trim();return d[0]})(e);g[v]=o(c?{["@keyframes "+v]:r}:r,n?"":"."+v)}let k=n&&g.g?g.g:null;return n&&(g.g=g[v]),f=g[v],k?r.data=r.data.replace(k,f):-1===r.data.indexOf(f)&&(r.data=d?f+r.data:r.data+f),v},p=(e,r,n)=>e.reduce((e,d,c)=>{let f=r[c];if(f&&f.call){let e=f(n),r=e&&e.props&&e.props.className||/^go/.test(e)&&e;f=r?"."+r:e&&"object"==typeof e?e.props?"":o(e,""):!1===e?"":e}return e+d+(null==f?"":f)},"");function u(e){let r=this||{},n=e.call?e(r.p):e;return i(n.unshift?n.raw?p(n,[].slice.call(arguments,1),r.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(r.p):n),{}):n,t(r.target),r.g,r.o,r.k)}u.bind({g:1});let v,k,N,j=u.bind({k:1});function m(e,r,n,d){o.p=r,v=e,k=n,N=d}function w(e,r){let n=this||{};return function(){let d=arguments;function a(c,f){let h=Object.assign({},c),y=h.className||a.className;n.p=Object.assign({theme:k&&k()},h),n.o=/ *go\d+/.test(y),h.className=u.apply(n,d)+(y?" "+y:""),r&&(h.ref=f);let b=e;return e[0]&&(b=h.as||e,delete h.as),N&&b[0]&&N(h),v(b,h)}return r?r(a):a}}var Z=e=>"function"==typeof e,dist_h=(e,r)=>Z(e)?e(r):e,C=(d=0,()=>(++d).toString()),E=()=>{if(void 0===c&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");c=!e||e.matches}return c},I="default",H=(e,r)=>{let{toastLimit:n}=e.settings;switch(r.type){case 0:return{...e,toasts:[r.toast,...e.toasts].slice(0,n)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===r.toast.id?{...e,...r.toast}:e)};case 2:let{toast:d}=r;return H(e,{type:e.toasts.find(e=>e.id===d.id)?1:0,toast:d});case 3:let{toastId:c}=r;return{...e,toasts:e.toasts.map(e=>e.id===c||void 0===c?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===r.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==r.toastId)};case 5:return{...e,pausedAt:r.time};case 6:let f=r.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+f}))}}},O=[],L={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},A={},Y=(e,r=I)=>{A[r]=H(A[r]||L,e),O.forEach(([e,n])=>{e===r&&n(A[r])})},_=e=>Object.keys(A).forEach(r=>Y(e,r)),Q=e=>Object.keys(A).find(r=>A[r].toasts.some(r=>r.id===e)),S=(e=I)=>r=>{Y(r,e)},D={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},V=(e={},r=I)=>{let[n,d]=(0,f.useState)(A[r]||L),c=(0,f.useRef)(A[r]);(0,f.useEffect)(()=>(c.current!==A[r]&&d(A[r]),O.push([r,d]),()=>{let e=O.findIndex(([e])=>e===r);e>-1&&O.splice(e,1)}),[r]);let h=n.toasts.map(r=>{var n,d,c;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||(null==(n=e[r.type])?void 0:n.removeDelay)||(null==e?void 0:e.removeDelay),duration:r.duration||(null==(d=e[r.type])?void 0:d.duration)||(null==e?void 0:e.duration)||D[r.type],style:{...e.style,...null==(c=e[r.type])?void 0:c.style,...r.style}}});return{...n,toasts:h}},ie=(e,r="blank",n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:r,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...n,id:(null==n?void 0:n.id)||C()}),P=e=>(r,n)=>{let d=ie(r,e,n);return S(d.toasterId||Q(d.id))({type:2,toast:d}),d.id},dist_n=(e,r)=>P("blank")(e,r);dist_n.error=P("error"),dist_n.success=P("success"),dist_n.loading=P("loading"),dist_n.custom=P("custom"),dist_n.dismiss=(e,r)=>{let n={type:3,toastId:e};r?S(r)(n):_(n)},dist_n.dismissAll=e=>dist_n.dismiss(void 0,e),dist_n.remove=(e,r)=>{let n={type:4,toastId:e};r?S(r)(n):_(n)},dist_n.removeAll=e=>dist_n.remove(void 0,e),dist_n.promise=(e,r,n)=>{let d=dist_n.loading(r.loading,{...n,...null==n?void 0:n.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let c=r.success?dist_h(r.success,e):void 0;return c?dist_n.success(c,{id:d,...n,...null==n?void 0:n.success}):dist_n.dismiss(d),e}).catch(e=>{let c=r.error?dist_h(r.error,e):void 0;c?dist_n.error(c,{id:d,...n,...null==n?void 0:n.error}):dist_n.dismiss(d)}),e};var R=1e3,dist_w=(e,r="default")=>{let{toasts:n,pausedAt:d}=V(e,r),c=(0,f.useRef)(new Map).current,h=(0,f.useCallback)((e,r=R)=>{if(c.has(e))return;let n=setTimeout(()=>{c.delete(e),y({type:4,toastId:e})},r);c.set(e,n)},[]);(0,f.useEffect)(()=>{if(d)return;let e=Date.now(),c=n.map(n=>{if(n.duration===1/0)return;let d=(n.duration||0)+n.pauseDuration-(e-n.createdAt);if(d<0){n.visible&&dist_n.dismiss(n.id);return}return setTimeout(()=>dist_n.dismiss(n.id,r),d)});return()=>{c.forEach(e=>e&&clearTimeout(e))}},[n,d,r]);let y=(0,f.useCallback)(S(r),[r]),b=(0,f.useCallback)(()=>{y({type:5,time:Date.now()})},[y]),x=(0,f.useCallback)((e,r)=>{y({type:1,toast:{id:e,height:r}})},[y]),g=(0,f.useCallback)(()=>{d&&y({type:6,time:Date.now()})},[d,y]),v=(0,f.useCallback)((e,r)=>{let{reverseOrder:d=!1,gutter:c=8,defaultPosition:f}=r||{},h=n.filter(r=>(r.position||f)===(e.position||f)&&r.height),y=h.findIndex(r=>r.id===e.id),b=h.filter((e,r)=>r<y&&e.visible).length;return h.filter(e=>e.visible).slice(...d?[b+1]:[0,b]).reduce((e,r)=>e+(r.height||0)+c,0)},[n]);return(0,f.useEffect)(()=>{n.forEach(e=>{if(e.dismissed)h(e.id,e.removeDelay);else{let r=c.get(e.id);r&&(clearTimeout(r),c.delete(e.id))}})},[n,h]),{toasts:n,handlers:{updateHeight:x,startPause:b,endPause:g,calculateOffset:v}}},T=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,F=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,z=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,M=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${T} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${z} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,B=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,U=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${B} 1s linear infinite;
`,W=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,G=j`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,J=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${W} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${G} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,K=w("div")`
  position: absolute;
`,X=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=j`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,$=({toast:e})=>{let{icon:r,type:n,iconTheme:d}=e;return void 0!==r?"string"==typeof r?f.createElement(et,null,r):r:"blank"===n?null:f.createElement(X,null,f.createElement(U,{...d}),"loading"!==n&&f.createElement(K,null,"error"===n?f.createElement(M,{...d}):f.createElement(J,{...d})))},Re=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ee=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,er=w("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,ea=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ke=(e,r)=>{let n=e.includes("top")?1:-1,[d,c]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Re(n),Ee(n)];return{animation:r?`${j(d)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(c)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},es=f.memo(({toast:e,position:r,style:n,children:d})=>{let c=e.height?ke(e.position||r||"top-center",e.visible):{opacity:0},h=f.createElement($,{toast:e}),y=f.createElement(ea,{...e.ariaProps},dist_h(e.message,e));return f.createElement(er,{className:e.className,style:{...c,...n,...e.style}},"function"==typeof d?d({icon:h,message:y}):f.createElement(f.Fragment,null,h,y))});m(f.createElement);var we=({id:e,className:r,style:n,onHeightUpdate:d,children:c})=>{let h=f.useCallback(r=>{if(r){let l=()=>{d(e,r.getBoundingClientRect().height)};l(),new MutationObserver(l).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,d]);return f.createElement("div",{ref:h,className:r,style:n},c)},Me=(e,r)=>{let n=e.includes("top"),d=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${r*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...d}},eo=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Fe=({reverseOrder:e,position:r="top-center",toastOptions:n,gutter:d,children:c,toasterId:h,containerStyle:y,containerClassName:b})=>{let{toasts:x,handlers:g}=dist_w(n,h);return f.createElement("div",{"data-rht-toaster":h||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...y},className:b,onMouseEnter:g.startPause,onMouseLeave:g.endPause},x.map(n=>{let h=n.position||r,y=Me(h,g.calculateOffset(n,{reverseOrder:e,gutter:d,defaultPosition:r}));return f.createElement(we,{id:n.id,key:n.id,onHeightUpdate:g.updateHeight,className:n.visible?eo:"",style:y},"custom"===n.type?dist_h(n.message,n):c?c(n):f.createElement(es,{toast:n,position:h}))}))},ei=dist_n}},function(e){e.O(0,[326,971,472,744],function(){return e(e.s=83)}),_N_E=e.O()}]);