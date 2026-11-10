import { defineConfig } from 'vitepress'
import { site } from './site'

export default defineConfig({
  title: site.name,
  description: site.description,
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: false,
  appearance: false,
  sitemap: {
    hostname: site.url,
    transformItems: items => items.filter(item => !/(^|\/)404(?:\.html)?$/.test(item.url))
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#f3f0e8' }]
  ],
  transformHead({ pageData }) {
    if (pageData.relativePath !== 'index.md') return []
    return [
      ['link', { rel: 'canonical', href: `${site.url}/` }],
      ['meta', { property: 'og:type', content: 'profile' }],
      ['meta', { property: 'og:url', content: `${site.url}/` }],
      ['meta', { property: 'og:title', content: site.title }],
      ['meta', { property: 'og:description', content: site.description }],
      ['meta', { property: 'og:image', content: `${site.url}${site.socialImage}` }],
      ['meta', { property: 'og:image:alt', content: 'An imagined mountain horizon with contour lines and a vermilion sun' }],
      ['meta', { property: 'og:image:width', content: '1254' }],
      ['meta', { property: 'og:image:height', content: '1254' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        '@id': `${site.url}/#profile`,
        url: `${site.url}/`,
        name: site.title,
        mainEntity: {
          '@type': 'Person',
          '@id': `${site.url}/#keith-williams`,
          name: site.name,
          url: `${site.url}/`,
          image: `${site.url}${site.portrait}`,
          jobTitle: 'Senior University Lecturer',
          worksFor: { '@type': 'CollegeOrUniversity', name: 'New Jersey Institute of Technology' },
          sameAs: [site.github, site.faculty]
        }
      })]
    ]
  },
  vite: { server: { host: '127.0.0.1' } }
})
