function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{Y as E}from"./framework.F873Q9VK.js";function f(g={}){const{immediate:m=!1,onNeedRefresh:s,onOfflineReady:t,onRegistered:o,onRegisteredSW:d,onRegisterError:l}=g;let e,c,r;const w=async(p=!0)=>{await c,await(r==null?void 0:r())};async function u(){if("serviceWorker"in navigator){const{Workbox:p}=await E(()=>import("./workbox-window.prod.es5.DFjpnwFp.js"),__vite__mapDeps([]));e=new p("/JS-Algorithm/sw.js",{scope:"/JS-Algorithm/",type:"classic"}),r=async()=>{await(e==null?void 0:e.messageSkipWaiting())};{let i=!1;const n=()=>{i=!0,e==null||e.addEventListener("controlling",a=>{a.isUpdate&&window.location.reload()}),s==null||s()};e.addEventListener("installed",a=>{typeof a.isUpdate>"u"?typeof a.isExternal<"u"?a.isExternal?n():!i&&(t==null||t()):a.isExternal?window.location.reload():!i&&(t==null||t()):a.isUpdate||t==null||t()}),e.addEventListener("waiting",n),e.addEventListener("externalwaiting",n)}e.register({immediate:m}).then(i=>{d?d("/JS-Algorithm/sw.js",i):o==null||o(i)}).catch(i=>{l==null||l(i)})}}return c=u(),w}export{f as registerSW};
