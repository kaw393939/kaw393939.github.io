import { createContentLoader } from 'vitepress'
import { articleDesk, articleMedia, deskOrder, type ImageAsset } from '../editorial'

export interface Story {
  url: string
  title: string
  teaser: string
  desk: string
  image: ImageAsset
}

declare const data: Story[]
export { data }

// Discover new articles from their Markdown frontmatter when VitePress builds the site.
export default createContentLoader('**/*.md', {
  transform(pages): Story[] {
    const stories: Story[] = []
    for (const { url, frontmatter } of pages) {
      if (url.endsWith('/')) continue
      const path = url.slice(1) + '.md'
      const desk = articleDesk(path, frontmatter)
      if (!desk) continue
      stories.push({
        url, desk, title: frontmatter.title,
        teaser: frontmatter.teaser || frontmatter.description,
        image: articleMedia(path, frontmatter).share
      })
    }
    const lead = pages.find(page => page.url === '/')?.frontmatter.edition?.lead
    return stories.sort((a, b) => {
      if (a.url === lead || b.url === lead) return a.url === lead ? -1 : 1
      return deskOrder.indexOf(a.desk) - deskOrder.indexOf(b.desk) || a.title.localeCompare(b.title, 'en')
    })
  }
})
