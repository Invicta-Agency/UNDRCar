(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&f(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function f(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const r=document.getElementById("main");let s=!1,l=0;r.addEventListener("wheel",n=>{if(n.preventDefault(),s)return;const o=window.innerWidth,i=r.scrollWidth-r.clientWidth;n.deltaY>0?(l!==i&&(s=!0),l=Math.min(r.scrollLeft+o,i)):(l!==0&&(s=!0),l=Math.max(r.scrollLeft-o,0)),r.scrollTo({left:l,behavior:"smooth"})});r.addEventListener("scroll",()=>{Math.abs(r.scrollLeft-l)<1&&(s=!1)});