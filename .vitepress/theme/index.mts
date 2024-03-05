// .vitepress/theme/index.js
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ReloadPrompt from './components/ReloadPrompt.vue'
import './custom.css'
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';


export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);
        // ...
    },
    setup() {
        // Get frontmatter and route
        const { frontmatter } = useData();
        const route = useRoute();
        
        // Obtain configuration from: https://giscus.app/
        giscusTalk({
            repo: 'JunLiangWangX/FrontEnd-Engineering-Guide',
            repoId: 'R_kgDOLNYjIg',
            category: 'Announcements', // default: `General`
            categoryId: 'DIC_kwDOLNYjIs4Cc6t4',
            mapping: 'pathname', // default: `pathname`
            inputPosition: 'top', // default: `top`
            lang: 'zh-CN', // default: `zh-CN`
            lightTheme: 'light', // default: `light`
            darkTheme: 'transparent_dark', // default: `transparent_dark`
            // ...
        }, {
            frontmatter, route
        },
            // Whether to activate the comment area on all pages.
            // The default is true, which means enabled, this parameter can be ignored;
            // If it is false, it means it is not enabled.
            // You can use `comment: true` preface to enable it separately on the page.
            true
        );
    },
    Layout() {
      return h(DefaultTheme.Layout, null, {
        'layout-bottom': () => h(ReloadPrompt)
      })
    }
}