import { defineConfig, type HeadConfig } from 'vitepress'
import { site } from './site'

const homeUrl = `${site.url}/`
const websiteId = `${homeUrl}#website`
const person = {
  '@type': 'Person',
  '@id': `${homeUrl}#keith-williams`,
  name: site.name,
  url: homeUrl,
  image: `${site.url}${site.portrait}`,
  jobTitle: 'Senior University Lecturer',
  worksFor: { '@type': 'CollegeOrUniversity', name: 'New Jersey Institute of Technology' },
  sameAs: [site.github, site.faculty, site.linkedin]
}

const portrait = { path: site.portrait, alt: 'Portrait of Keith Williams' }
const fieldDesk = { path: '/images/editorial/social-field-desk.jpg', alt: 'An open notebook with hand-drawn diagrams and a red pencil on a blue desk' }
const studioImage = { path: '/images/editorial/social-rock-paper.jpg', alt: 'Red paper covers a rock beside a row of green check marks' }
const standardCards = new Set([fieldDesk.path, studioImage.path].map(path => new URL(path, homeUrl).href))
const covers: Record<string, { path: string; alt: string }> = {
  'about.md': portrait,
  'teaching/when-ai-helps-write-the-code.md': studioImage,
  'teaching/studio-field-notes.md': { path: '/images/teaching/studio-coach-pause.jpg', alt: 'An illustration for teaching an AI coach when to pause' }
}
const collections = new Set(['writing.md', 'teaching.md', 'research.md', 'research/systems/index.md'])

function jsonLd(data: Record<string, unknown>): HeadConfig {
  return ['script', { type: 'application/ld+json' }, JSON.stringify({
    '@context': 'https://schema.org', ...data
  }).replace(/</g, '\\u003c')]
}

export default defineConfig({
  title: site.name,
  description: site.description,
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: false,
  appearance: false,
  sitemap: {
    hostname: site.url,
    transformItems: items => items.filter(item => !/(^|\/)404(?:\.html)?\/?$/.test(item.url))
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#f3f0e8' }]
  ],
  transformHead({ pageData }) {
    const path = pageData.relativePath
    if (path === '404.md') return [] // The error page sets noindex in its own frontmatter.

    const home = path === 'index.md'
    const route = path.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1')
    const url = `${homeUrl}${route}`
    const profile = home || path === 'about.md'
    const collection = collections.has(path) || (!home && path.endsWith('/index.md'))
    const article = !collection && (path.startsWith('teaching/') || path.startsWith('research/systems/') ||
      path === 'life-tracker.md' || path === 'ai-careers.md')
    const title = home ? pageData.title || site.title : `${pageData.title} | ${site.name}`
    const description = pageData.description || site.description
    const image = covers[path] || fieldDesk
    const imageUrl = new URL(pageData.frontmatter.socialImage || image.path, homeUrl).href
    const imageAlt = pageData.frontmatter.socialImageAlt || image.alt
    const author = { '@type': 'Person', '@id': person['@id'], name: site.name, url: homeUrl }
    const published = pageData.frontmatter.datePublished
    const modified = pageData.frontmatter.dateModified
    const head: HeadConfig[] = [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:type', content: profile ? 'profile' : article ? 'article' : 'website' }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:site_name', content: site.name }],
      ['meta', { property: 'og:locale', content: 'en_US' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:image', content: imageUrl }],
      ['meta', { property: 'og:image:alt', content: imageAlt }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: imageUrl }],
      ['meta', { name: 'twitter:image:alt', content: imageAlt }]
    ]
    if (standardCards.has(imageUrl)) {
      head.push(
        ['meta', { property: 'og:image:type', content: 'image/jpeg' }],
        ['meta', { property: 'og:image:width', content: '1200' }],
        ['meta', { property: 'og:image:height', content: '630' }]
      )
    }
    const common = { url, description, inLanguage: 'en-US', isPartOf: { '@id': websiteId } }
    if (profile) {
      head.push(jsonLd({ '@type': 'ProfilePage', '@id': `${url}#profile`, ...common, name: title, mainEntity: person }))
    } else if (article) {
      head.push(jsonLd({
        '@type': 'Article', '@id': `${url}#article`, ...common, headline: pageData.title,
        author, image: imageUrl, mainEntityOfPage: url,
        ...(published ? { datePublished: published } : {}),
        ...(modified ? { dateModified: modified } : {})
      }))
      if (published) head.push(['meta', { property: 'article:published_time', content: String(published) }])
      if (modified) head.push(['meta', { property: 'article:modified_time', content: String(modified) }])
    } else {
      head.push(jsonLd({ '@type': collection ? 'CollectionPage' : 'WebPage', ...common, name: pageData.title, author }))
    }
    if (home) {
      head.push(jsonLd({
        '@type': 'WebSite', '@id': websiteId, name: site.name, url: homeUrl,
        description, inLanguage: 'en-US', publisher: { '@id': person['@id'] }
      }))
    }
    return head
  },
  vite: { server: { host: '127.0.0.1' } }
})
