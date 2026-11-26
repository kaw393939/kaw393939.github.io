import { defineConfig, type HeadConfig } from 'vitepress'
import { site } from './site'
import { articleDesk, articleMedia, pageRoute, writingDesk } from './editorial'

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
  markdown: {
    config(md) {
      md.renderer.rules.table_open = (tokens, index) => {
        let heading = ''
        for (let i = index - 1; i >= 0; i--) {
          if (tokens[i].type === 'heading_open') {
            heading = (tokens[i + 1].children || [])
              .filter(token => token.type === 'text' || token.type === 'code_inline')
              .map(token => token.content).join('').trim()
            break
          }
        }
        const label = heading ? 'Table: ' + heading : 'Data table'
        return '<ReaderTable label="' + md.utils.escapeHtml(label) + '"><table>\n'
      }
      md.renderer.rules.table_close = () => '</table></ReaderTable>\n'
      md.core.ruler.after('inline', 'article-introduction', state => {
        const path = state.env.relativePath || ''
        if (!articleDesk(path, state.env.frontmatter || {})) return
        const h1 = state.tokens.findIndex(token => token.type === 'heading_close' && token.tag === 'h1')
        if (h1 < 0) return
        const intro = new state.Token('html_block', '', 0)
        intro.content = '<ArticleHeader />\n'
        state.tokens.splice(h1 + 1, 0, intro)
      })
    }
  },
  sitemap: {
    hostname: site.url,
    transformItems: items => items
      .filter(item => !/(^|\/)404(?:\.html)?\/?$/.test(item.url))
      .map(({ lastmod, ...item }) => item)
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#f3f0e8' }]
  ],
  transformPageData(page) {
    // Keep editorial dates out of the client-side navigation payload as well as the page itself.
    for (const key of ['date', 'dateLabel', 'datePublished', 'dateModified', 'lastUpdated']) {
      delete page.frontmatter[key]
    }
    delete page.lastUpdated
  },
  transformHead({ pageData }) {
    const path = pageData.relativePath
    if (path === '404.md') return [] // The error page sets noindex in its own frontmatter.

    const home = path === 'index.md'
    const url = site.url + pageRoute(path)
    const profile = home || path === 'about.md'
    const collection = collections.has(path) || (!home && path.endsWith('/index.md'))
    const desk = articleDesk(path, pageData.frontmatter)
    const article = Boolean(desk)
    const title = home ? pageData.title || site.title : `${pageData.title} | ${site.name}`
    const description = pageData.description || site.description
    const shareDescription = pageData.frontmatter.teaser || description
    const sectionImage = path === 'about.md'
      ? { path: site.portrait, alt: 'Portrait of Keith Williams', width: 0, height: 0 }
      : writingDesk
    const social = article ? articleMedia(path, pageData.frontmatter).share : sectionImage
    const imageUrl = new URL(social.path, homeUrl).href
    const imageAlt = social.alt
    const author = { '@type': 'Person', '@id': person['@id'], name: site.name, url: homeUrl }
    const head: HeadConfig[] = [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:type', content: profile ? 'profile' : article ? 'article' : 'website' }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:site_name', content: site.name }],
      ['meta', { property: 'og:locale', content: 'en_US' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: shareDescription }],
      ['meta', { property: 'og:image', content: imageUrl }],
      ['meta', { property: 'og:image:alt', content: imageAlt }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: shareDescription }],
      ['meta', { name: 'twitter:image', content: imageUrl }],
      ['meta', { name: 'twitter:image:alt', content: imageAlt }]
    ]
    if (social.width && social.height) {
      head.push(
        ['meta', { property: 'og:image:type', content: /\.webp$/i.test(social.path) ? 'image/webp' : /\.png$/i.test(social.path) ? 'image/png' : 'image/jpeg' }],
        ['meta', { property: 'og:image:width', content: String(social.width) }],
        ['meta', { property: 'og:image:height', content: String(social.height) }]
      )
    }
    const common = { url, description, inLanguage: 'en-US', isPartOf: { '@id': websiteId } }
    if (profile) {
      head.push(jsonLd({ '@type': 'ProfilePage', '@id': `${url}#profile`, ...common, name: title, mainEntity: person }))
    } else if (article) {
      head.push(jsonLd({
        '@type': 'Article', '@id': `${url}#article`, ...common, headline: pageData.title,
        author, image: imageUrl, mainEntityOfPage: url, articleSection: desk,
        abstract: shareDescription, publisher: author
      }))
      head.push(
        ['meta', { name: 'author', content: site.name }],
        ['meta', { property: 'article:author', content: site.url + '/about' }],
        ['meta', { property: 'article:section', content: desk }]
      )
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
