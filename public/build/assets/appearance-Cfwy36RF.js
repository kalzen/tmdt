import{u as d,j as e,L as m}from"./app-BXEVKu8S.js";import{a,c as n}from"./app-logo-icon-eA7Sa6_S.js";import{H as h}from"./heading-small-CJkaQd_g.js";import{A as u}from"./app-layout-FUQVz8B4.js";import{S as x}from"./layout-CexZpFCn.js";import"./index-BVUcwr4W.js";import"./index-DqbdpqtQ.js";import"./index-BscCV4Ym.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],y=a("Monitor",k);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],b=a("Moon",g);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],j=a("Sun",f);function v({className:i="",...o}){const{appearance:r,updateAppearance:s}=d(),c=[{value:"light",icon:j,label:"Sáng"},{value:"dark",icon:b,label:"Tối"},{value:"system",icon:y,label:"Hệ thống"}];return e.jsx("div",{className:n("inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800",i),...o,children:c.map(({value:t,icon:l,label:p})=>e.jsxs("button",{onClick:()=>s(t),className:n("flex items-center rounded-md px-3.5 py-1.5 transition-colors",r===t?"bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100":"text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60"),children:[e.jsx(l,{className:"-ml-1 h-4 w-4"}),e.jsx("span",{className:"ml-1.5 text-sm",children:p})]},t))})}const M=[{title:"Cài đặt",href:route("profile.edit")},{title:"Giao diện",href:route("appearance")}];function T(){return e.jsxs(u,{breadcrumbs:M,children:[e.jsx(m,{title:"Cài đặt giao diện"}),e.jsx(x,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsx(h,{title:"Cài đặt giao diện",description:"Cập nhật cài đặt giao diện tài khoản của bạn"}),e.jsx(v,{})]})})]})}export{T as default};
