var B=Object.defineProperty,w=Object.defineProperties;var I=Object.getOwnPropertyDescriptors;var g=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,D=Object.prototype.propertyIsEnumerable;var k=(t,n,r)=>n in t?B(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,c=(t,n)=>{for(var r in n||(n={}))N.call(n,r)&&k(t,r,n[r]);if(g)for(var r of g(n))D.call(n,r)&&k(t,r,n[r]);return t},l=(t,n)=>w(t,I(n));import{j as y,r as h,R as M,a as P}from"./vendor.fa8b170c.js";const _=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}};_();const i=y.exports.jsx,K=y.exports.jsxs,m={breakLength:5,sessionLength:25},d="PAUSE",S="SESSION",U="BREAK";function x(t){return t="0"+t,t.substr(t.length-2,2)}function q(t){return x(Math.floor(t/60))+":"+x(t%60)}let L=null;function F(){const[t,n]=h.exports.useState(m),[r,a]=h.exports.useState({state:d,timeLeft:m.sessionLength*60}),[s,o]=h.exports.useState("Session"),u=h.exports.useRef(null);function v(){n(e=>e.breakLength===1||r.state!=d?e:l(c({},e),{breakLength:e.breakLength-1}))}function A(){n(e=>e.breakLength===60||r.state!=d?e:l(c({},e),{breakLength:e.breakLength+1}))}function E(){n(e=>e.sessionLength===1||r.state!=d?e:(a(f=>l(c({},f),{timeLeft:(e.sessionLength-1)*60})),l(c({},e),{sessionLength:e.sessionLength-1})))}function C(){n(e=>e.sessionLength===60||r.state!=d?e:(a(f=>l(c({},f),{timeLeft:(e.sessionLength+1)*60})),l(c({},e),{sessionLength:e.sessionLength+1})))}function O(){u.current.play()}function R(){L=setInterval(()=>{a(e=>{let f=e.state,p=e.timeLeft;return e.timeLeft===0?(O(),e.state===S?(o("Break"),p=t.breakLength*60,f=U):(o("Session"),p=t.sessionLength*60,f=S)):p-=1,{timeLeft:p,state:f}})},1e3)}function b(){u.current.pause(),u.current.currentTime=0,L&&(clearInterval(L),L=null)}function T(){r.state===d?(a(e=>l(c({},e),{state:S})),R()):(a(e=>l(c({},e),{state:d})),b())}function j(){n(m),o("Session"),b(),a(e=>({state:d,timeLeft:m.sessionLength*60}))}return h.exports.useEffect(()=>()=>{b()},[]),i("div",{className:"App",children:K("header",{className:"App-header",children:[i("label",{id:"break-label",children:"Break Length"}),i("input",{id:"break-length",type:"text",readOnly:!0,value:t.breakLength}),i("button",{id:"break-decrement",onClick:v,children:"-"}),i("button",{id:"break-increment",onClick:A,children:"+"}),i("label",{id:"session-label",children:"Session Length"}),i("input",{id:"session-length",type:"text",readOnly:!0,value:t.sessionLength}),i("button",{id:"session-decrement",onClick:E,children:"-"}),i("button",{id:"session-increment",onClick:C,children:"+"}),i("div",{id:"timer-label",children:s}),i("div",{id:"time-left",children:q(r.timeLeft)}),i("button",{id:"start_stop",onClick:T,children:"Start/Stop"}),i("button",{id:"reset",onClick:j,children:"Reset"}),i("audio",{id:"beep",ref:u,src:"https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"})]})})}M.render(i(P.StrictMode,{children:i(F,{})}),document.getElementById("root"));
