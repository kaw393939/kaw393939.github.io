import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import ReaderTable from './components/ReaderTable.vue'
import ArticleHeader from './components/ArticleHeader.vue'
import ArticleIndex from './components/ArticleIndex.vue'
import './style.css'
import './guide.css'
import './social.css'
import './editorial-type.css'
import './identity.css'

export default {
  Layout,
  enhanceApp({ app, router }) {
    // The Lab is built separately and has its own VitePress page manifest.
    if (typeof window !== 'undefined') {
      router.onBeforeRouteChange = href => {
        const url = new URL(href, window.location.href)
        if (url.href !== window.location.href && url.origin === window.location.origin &&
          /^\/(?:knowledge-lab|is373-rag)(?:\/|$)/.test(url.pathname)) {
          window.location.assign(url.href)
          return false
        }
      }
    }
    app.component('ReaderTable', ReaderTable)
    app.component('ArticleHeader', ArticleHeader)
    app.component('ArticleIndex', ArticleIndex)
  }
} satisfies Theme
