import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Keith Williams',
  description: 'AI educator and explorer. Keith Williams connects emerging technology, clear specifications, and human judgment.',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: false,
  sitemap: { hostname: 'https://kaw393939.github.io' },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#f3f0e8' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Keith Williams · AI educator & explorer' }],
    ['meta', { property: 'og:description', content: 'Exploring AI. Building understanding. A practice grounded in education, clear intent, and human judgment.' }],
    ['meta', { property: 'og:image', content: 'https://kaw393939.github.io/images/explorer-horizon.webp' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }]
  ],
  vite: { server: { host: '127.0.0.1' } }
})
