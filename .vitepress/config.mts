import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { SearchPlugin } from "vitepress-plugin-search"
import fs from 'fs';
import spawn from 'cross-spawn';
// https://vitepress.dev/reference/site-config
export default withPwa(defineConfig({
  vite: {
    logLevel: 'info',
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },   
    plugins: [SearchPlugin({
      preset:'score',
      tokenize:'full',
      buttonLabel: "搜索",
      placeholder: "输入搜索内容",
    })]
  },
  buildEnd: ( siteConfig) => {
    
   const baseURL = 'https://wangjunliang.com/JS-Algorithm';

   try {
     let siteMapStr = '';
     for (const page of siteConfig.pages) {
       if (page === 'index.md') continue;
       // 获取最后修改日期，基于git
       const filePath = siteConfig.srcDir + '/' + page;
       const date = new Date(
         parseInt(
           spawn.sync('git', ['log', '-1', '--format=%at', filePath]).stdout.toString('utf-8')
         ) * 1000
       );
       siteMapStr += `
       <url>
         <loc>${baseURL}/${page.replace(/\.md$/, '.html')}</loc>
         <lastmod>${date.toISOString()}</lastmod>
         <changefreq>weekly</changefreq>
         <priority>1.0</priority> 
       </url>
     `;
     }

     const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
       ${siteMapStr}
       </urlset>
     `;
     fs.writeFileSync(`${siteConfig.outDir}/sitemap.xml`, xmlStr);
   } catch (err) {
     console.log('create sitemap.txt failed!', err);
   }
  },
  title: "JS每日一算法",
  description: "Learn a JS algorithm every day",
  lang: "zh-CN",
  base: '/JS-Algorithm/',
  srcExclude: ['**/README.md', '**/TODO.md'],
  outDir: './public',
  srcDir: 'src',
  lastUpdated: true,
  head: [
    [
      'link',
      { rel: 'icon', href: './logo.png' }
    ],
    [
      'script',
      {
        async: 'true',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-62G6TPBXSW'
      }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-62G6TPBXSW');`

    ],
    [
      'script',
      {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?92e568bf422499874640dbee88096c2d";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`
    ]


  ],
  themeConfig: {
    siteTitle: 'JS每日一算法',
    lastUpdatedText: '最后更新',
    darkModeSwitchLabel: '切换模式',
    sidebarMenuLabel: "菜单",
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: 'deep',
    returnToTopLabel: '返回顶部',
    langMenuLabel: '切换语言',
    outlineTitle: '目录',
    footer: {
      message: '请勿将本站文章用作商业用途 | 转载请标明来源',
      copyright: 'Copyright © 2023-present JunLiangWang'
    },
    editLink: {
      text: "在Github编辑此页",
      pattern: 'https://github.com/JunLiangWangX/JS-Algorithm/edit/main/src/:path'
    },
    nav: [
      { text: '关注作者', link: 'https://wangjunliang.com/wechat' },
      { text: '支持作者', link: 'https://wangjunliang.com/#/supportBloggers' },
      { text: '了解作者', link: 'https://wangjunliang.com/' },
    ],
    sidebar: [
      {
        text: '前置知识',
        link: '/docs/prerequisite-knowledge'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JunLiangWangX/JS-Algorithm/' }
    ]
  },
  /* Vite PWA Options */
  pwa: {
    outDir: '../public',
    base: '/JS-Algorithm/',
    scope: '/JS-Algorithm/',
    includeAssets: ['logo.png'],
    manifest: {
      name: 'JS每日一算法',
      short_name: 'JS每日一算法',
      description: "每天学习一个JS算法",  //描述
      theme_color: '#ffffff',
      icons: [
        {
          src: 'logo.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          src: 'logo-64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'logo-128.png',
          sizes: '128x128',
          type: 'image/png',
        },
        {
          src: 'logo-256.png',
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: 'logo-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
    },
  }
}))
