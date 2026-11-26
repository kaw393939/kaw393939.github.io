import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import ReaderTable from './components/ReaderTable.vue'
import ArticleHeader from './components/ArticleHeader.vue'
import ArticleIndex from './components/ArticleIndex.vue'
import './style.css'
import './guide.css'
import './social.css'

export default {
  Layout,
  enhanceApp({ app }) {
    app.component('ReaderTable', ReaderTable)
    app.component('ArticleHeader', ArticleHeader)
    app.component('ArticleIndex', ArticleIndex)
  }
} satisfies Theme
