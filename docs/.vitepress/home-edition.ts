import { createContentLoader, type ContentData } from 'vitepress'
import { articleDesk, articleMedia, type ImageAsset } from './editorial'

interface Promotion {
  headline?: string
  teaser?: string
  label?: string
  caption?: string
  linkLabel?: string
}

interface EditionSettings {
  lead: string
  supporting: string[]
  overrides?: Record<string, Promotion>
}

interface HomeStory {
  url: string
  headline: string
  teaser: string
  label: string
  caption: string
  credit: string
  linkLabel?: string
  image: ImageAsset
  shareImage: ImageAsset
}

export interface HomeEdition {
  lead: HomeStory
  supporting: HomeStory[]
}

function resolveEdition(pages: ContentData[]): HomeEdition {
  const settings: EditionSettings | undefined = pages.find(page => page.url === '/')?.frontmatter.edition
  if (!settings?.lead || !Array.isArray(settings.supporting)) {
    throw new Error('Choose a lead article and supporting articles in docs/index.md.')
  }
  const paths = [settings.lead, ...settings.supporting]
  if (new Set(paths).size !== paths.length) throw new Error('Each homepage position needs a different article.')

  function getStory(url: string): HomeStory {
    const article = pages.find(page => page.url === url)
    const path = url.slice(1) + '.md'
    const desk = article && articleDesk(path, article.frontmatter)
    if (!article || !desk) throw new Error('Homepage selection must name a published article: ' + url)
    const fm = article.frontmatter
    const override = settings?.overrides?.[url]
    const { cover, share } = articleMedia(path, fm)
    return {
      url, headline: override?.headline || fm.title,
      teaser: override?.teaser || fm.teaser || fm.description,
      label: override?.label || desk,
      caption: override?.caption ?? fm.imageCaption ?? '',
      credit: fm.imageCredit || 'AI-generated illustration',
      linkLabel: override?.linkLabel, image: cover, shareImage: share
    }
  }

  return { lead: getStory(settings.lead), supporting: settings.supporting.map(getStory) }
}

// Called inside the VitePress build, after its source directory is resolved.
export function homeEditionLoader() {
  return createContentLoader('**/*.md', { transform: resolveEdition })
}
