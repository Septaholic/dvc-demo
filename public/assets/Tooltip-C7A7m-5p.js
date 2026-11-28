import{r as t,j as e,h as m}from"./index-DXjvarUE.js";import{r as T}from"./index-DMeG4mV3.js";const B=({title:s,content:r,children:b,position:n="top",maxWidth:w="max-w-xs",className:y="",classNameWrapper:v="w-full",contentStyle:j=""})=>{const[i,x]=t.useState(!1),[N,f]=t.useState(!1),[g,E]=t.useState({}),c=t.useRef(null),p=t.useRef(null);t.useEffect(()=>{if(!i||!c.current||!p.current||!r&&!s)return;const d=c.current.getBoundingClientRect(),o=p.current.getBoundingClientRect(),h=window.innerWidth,a=8;let l=o.left+o.width/2-d.width/2;l<a&&(l=a),l+d.width>h-a&&(l=h-d.width-a);let u=n==="top"?o.top-d.height-8:o.bottom+8;n==="top"&&u<a&&(u=o.bottom+8),E({left:`${l}px`,top:`${u}px`})},[i,n,r,s]);const R=()=>{x(!0),setTimeout(()=>f(!0),10)},$=()=>{f(!1),setTimeout(()=>x(!1),150)},S=i?e.jsxs("div",{ref:c,className:m(`
                fixed z-[9999] px-3 py-2 text-sm text-white bg-primary rounded shadow-md break-words
                transition-all duration-150 ease-out pointer-events-none min-h-[36px]
                ${w} ${y}
                ${N?"opacity-100 translate-y-0":"opacity-0 translate-y-1"}
            `),style:g,children:[e.jsxs("div",{className:"text-center",children:[s&&e.jsx("div",{className:"text-sm",children:s}),s&&r&&e.jsx("hr",{className:"border-white/30 my-1"}),r&&e.jsx("div",{className:`text-sm ${j}`,children:r})]}),e.jsx("span",{className:m(`
                    absolute left-1/2 -translate-x-1/2 w-0 h-0
                    border-l-6 border-r-6 border-transparent
                    ${n==="top"?"border-b-0 border-t-[6px] border-t-primary top-full":"border-t-0 border-b-[6px] border-b-primary bottom-full"}
                `)})]}):null;return e.jsx("div",{className:"w-full",onMouseEnter:R,onMouseLeave:$,children:e.jsxs("div",{ref:p,className:m("relative inline-block",v),children:[b,i&&T.createPortal(S,document.body)]})})};export{B as T};
