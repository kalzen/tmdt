import{u as m,j as t,L as d}from"./app-CviGlDDy.js";import{c as a,a as i}from"./button-CLn9TqRh.js";import{H as h}from"./heading-small-05myq_aP.js";import{A as u}from"./app-layout-D9mqeadP.js";import{S as x}from"./layout-OVhhkl6r.js";import"./sonner-CBFdLw2j.js";import"./index-DcrmxLJM.js";import"./index-Coqoyhj1.js";import"./index-BUVTpqLt.js";import"./index-BkFTZKx5.js";import"./index-CigfzzEK.js";import"./app-logo-icon-gb4oxeO0.js";import"./list-C5lA8dfb.js";import"./store-Zms8d9yC.js";import"./breadcrumb-D_Wu7WpV.js";import"./separator-PhQ48S2l.js";import"./index-BaTZRh_d.js";/**
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
 */const f=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],j=a("Sun",f);function v({className:n="",...o}){const{appearance:r,updateAppearance:s}=m(),c=[{value:"light",icon:j,label:"Sáng"},{value:"dark",icon:b,label:"Tối"},{value:"system",icon:y,label:"Hệ thống"}];return t.jsx("div",{className:i("inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800",n),...o,children:c.map(({value:e,icon:p,label:l})=>t.jsxs("button",{onClick:()=>s(e),className:i("flex items-center rounded-md px-3.5 py-1.5 transition-colors",r===e?"bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100":"text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60"),children:[t.jsx(p,{className:"-ml-1 h-4 w-4"}),t.jsx("span",{className:"ml-1.5 text-sm",children:l})]},e))})}const M=[{title:"Cài đặt",href:route("profile.edit")},{title:"Giao diện",href:route("appearance")}];function B(){return t.jsxs(u,{breadcrumbs:M,children:[t.jsx(d,{title:"Cài đặt giao diện"}),t.jsx(x,{children:t.jsxs("div",{className:"space-y-6",children:[t.jsx(h,{title:"Cài đặt giao diện",description:"Cập nhật cài đặt giao diện tài khoản của bạn"}),t.jsx(v,{})]})})]})}export{B as default};
