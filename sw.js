if(!self.define){let e,s={};const i=(i,f)=>(i=new URL(i+".js",f).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(f,r)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(s[d])return;let c={};const a=e=>i(e,d),n={module:{uri:d},exports:c,require:a};s[d]=Promise.all(f.map((e=>n[e]||a(e)))).then((e=>(r(...e),c)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"404.html",revision:"6baf5a9b32c58cd1159a6cb1ba2919d6"},{url:"assets/app.DCtl5gMm.js",revision:"188730444e371bb4425e89ae331f7a8e"},{url:"assets/chunks/framework.F873Q9VK.js",revision:"66a3f0e49de9a3fb9b19d78784c8e513"},{url:"assets/chunks/giscus-aTimukGI.CKTvSCx2.js",revision:"49998312474e73b233dd9f9e68b41341"},{url:"assets/chunks/theme.BDeXjMMo.js",revision:"b404661acd79853843566827588475f9"},{url:"assets/chunks/virtual_pwa-register.Dm8zxJGk.js",revision:"b59323600b16bbd8d3d16d0e9be0c416"},{url:"assets/chunks/virtual_search-data.wbQyYkqR.js",revision:"aba956cd93c0f31ad2e3070c4f998fa6"},{url:"assets/chunks/workbox-window.prod.es5.DFjpnwFp.js",revision:"ed0c862094c41f455cdef837aa7dafd2"},{url:"assets/docs_prerequisite-knowledge.md.LumlKfhO.js",revision:"6233995079c27ec153ca4e77ee77f9db"},{url:"assets/docs_prerequisite-knowledge.md.LumlKfhO.lean.js",revision:"b4789845ec95dcbbec61f74c1388783c"},{url:"assets/flex-logo.BJA2J7hW.svg",revision:"53f5c816391f84f3bfc2ab819dbfee0a"},{url:"assets/index.md.CfmcKfq6.js",revision:"97acdeab4f972d1d7cecfdf08ac4e620"},{url:"assets/index.md.CfmcKfq6.lean.js",revision:"97acdeab4f972d1d7cecfdf08ac4e620"},{url:"assets/inter-italic-cyrillic-ext.5XJwZIOp.woff2",revision:"c34a4b273af8d28811f6c40141e64ce4"},{url:"assets/inter-italic-cyrillic.D6csxwjC.woff2",revision:"1fcb37c55573855157fabd546d56f9df"},{url:"assets/inter-italic-greek-ext.CHOfFY1k.woff2",revision:"4f0e339be115b8fefc6df107b4c6ea5a"},{url:"assets/inter-italic-greek.9J96vYpw.woff2",revision:"929d4ea5f4d362cd34c1d389c0ff7ecc"},{url:"assets/inter-italic-latin-ext.BGcWXLrn.woff2",revision:"97f0862694a5a8489491ee93004813b4"},{url:"assets/inter-italic-latin.DbsTr1gm.woff2",revision:"f6f45d0dd1036d6b2dbcb03a0bb9469e"},{url:"assets/inter-italic-vietnamese.DHNAd7Wr.woff2",revision:"6f7af14b73de1fbfa7d576382fd496f4"},{url:"assets/inter-roman-cyrillic-ext.DxP3Awbn.woff2",revision:"e2227fe65624f3bb8f581e7ef05d5038"},{url:"assets/inter-roman-cyrillic.CMhn1ESj.woff2",revision:"27e63f02d75f8c136f2f671fcc484c0f"},{url:"assets/inter-roman-greek-ext.D0mI3NpI.woff2",revision:"da7d4bd2834134dde92b2b36b7e61dde"},{url:"assets/inter-roman-greek.JvnBZ4YD.woff2",revision:"8d9d2649d31d7082c3f7b108fa895356"},{url:"assets/inter-roman-latin-ext.ZlYT4o7i.woff2",revision:"35c420b0366d7799db82cb6917fba106"},{url:"assets/inter-roman-latin.Bu8hRsVA.woff2",revision:"f9223d91e9ebc494fad9e270fa475f0c"},{url:"assets/inter-roman-vietnamese.ClpjcLMQ.woff2",revision:"8a9ec3091d7f5c613d6893b2b36535c7"},{url:"assets/style.DUn5sZBb.css",revision:"8959e6d092930376d7a4910f1d271294"},{url:"docs/prerequisite-knowledge.html",revision:"05e01bd21d69cf00918e4b6dce88ddab"},{url:"index.html",revision:"a83d70d5b26a8acdf8f5c14feed71768"},{url:"logo-128.png",revision:"dafdf4e01dbdcb9f751fe033b2b07afe"},{url:"logo-256.png",revision:"dd099c57720e85e57b24927d005316df"},{url:"logo-512.png",revision:"3bec3ccef65d665bf086daff61cf51e5"},{url:"logo-64.png",revision:"812fdb251ce3bae39fa1096248c706b7"},{url:"logo.png",revision:"9a2ee7470fcbf9b5583269d85da41020"},{url:"logo.png",revision:"9a2ee7470fcbf9b5583269d85da41020"},{url:"logo-64.png",revision:"812fdb251ce3bae39fa1096248c706b7"},{url:"logo-128.png",revision:"dafdf4e01dbdcb9f751fe033b2b07afe"},{url:"logo-256.png",revision:"dd099c57720e85e57b24927d005316df"},{url:"logo-512.png",revision:"3bec3ccef65d665bf086daff61cf51e5"},{url:"manifest.webmanifest",revision:"e8bf4836469ab9b643002c43d9c78ffd"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
