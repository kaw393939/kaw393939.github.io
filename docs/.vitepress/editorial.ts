type Frontmatter = Record<string, any>

export interface ImageAsset {
  path: string
  alt: string
  width: number
  height: number
}

export const writingDesk: ImageAsset = {
  path: '/images/editorial/social-field-desk.jpg',
  alt: 'An open notebook with hand-drawn diagrams and a red pencil on a blue desk',
  width: 1200, height: 630
}

const coach: ImageAsset = {
  path: '/images/teaching/studio-coach-pause.jpg',
  alt: 'An open hand gestures toward a worked example while a learner holds a pencil over a blank card.',
  width: 1080, height: 720
}

const articleImageDescriptions: Record<string, string> = {
  'ai-careers': 'Brass compass on a map beside blue strips of engineering drawings.',
  'life-tracker': 'A red index card moves between two wire trays of task cards.',
  'dissertation-proposal': 'Three wooden study models stand behind a measured red baseline.',
  'english-software-engineering': 'A blue block matches a pencil outline beside a square and a caliper.',
  'human-attention-kanban': 'A metal inspection ring hovers over the first tile in a narrow queue.',
  'literature-and-faculty': 'Open books with red bookmarks share a reading table with reference cards.',
  'metavis-evidence-and-evaluation': 'A loupe and three differently colored image samples rest on a light table.',
  'personalized-knowledge-artifacts': 'A notebook, film strip and folded booklet sit together in an archive box.',
  'provenance-knowledge-graphs': 'A red cord connects archival photographs and paper records through brass eyelets.',
  'race-track-pit-stop': 'A small red race car sits in the pit lane beside a curving track.',
  'uap-research-testbed': 'A red oval marks a faint streak on a sky contact sheet beside a film loupe.',
  'vision-and-interface': 'Cutouts in stacked blue map layers reveal a red point beneath.'
}

export const deskOrder = ['Teaching', 'Careers', 'Field guides', 'Research']

export function pageRoute(path: string) {
  return '/' + path.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1')
}

export function articleDesk(path: string, frontmatter: Frontmatter) {
  if (path === '404.md' || /(^|\/)index\.md$/.test(path)) return ''
  if (path.startsWith('teaching/')) return 'Teaching'
  if (path.startsWith('research/systems/')) return 'Research'
  if (path === 'ai-careers.md') return 'Careers'
  if (path === 'life-tracker.md') return 'Field guides'
  if (frontmatter.kind === 'article' || path.startsWith('writing/')) return frontmatter.desk || 'Field guides'
  return ''
}

export function articleMedia(path: string, frontmatter: Frontmatter) {
  const slug = path.split('/').pop()!.replace(/\.md$/, '')
  const alt = articleImageDescriptions[slug]
  let cover = writingDesk
  let share = writingDesk
  if (path === 'teaching/when-ai-helps-write-the-code.md') {
    cover = {
      path: '/images/teaching/studio-rock-paper-tests.jpg',
      alt: 'Folded red paper covers a dark stone beside a strip of green check marks.',
      width: 1280, height: 853
    }
    share = { ...cover, path: '/images/editorial/social-rock-paper.jpg', width: 1200, height: 630 }
  } else if (path === 'teaching/the-question-i-want-students-to-ask.md') {
    cover = {
      path: '/images/editorial/field-desk.jpg',
      alt: 'An open notebook and a red pencil on a blue workbench in angled sunlight.',
      width: 1440, height: 960
    }
  } else if (path === 'teaching/studio-field-notes.md') {
    cover = coach
    share = { ...coach, path: '/images/articles/studio-field-notes.jpg', width: 1200, height: 630 }
  } else if (alt) {
    cover = share = { path: '/images/articles/' + slug + '.jpg', alt, width: 1200, height: 630 }
  }
  if (frontmatter.coverImage) {
    cover = {
      path: frontmatter.coverImage, alt: frontmatter.coverAlt || '',
      width: Number(frontmatter.coverWidth) || 0, height: Number(frontmatter.coverHeight) || 0
    }
    share = cover
  }
  if (frontmatter.socialImage) {
    const same = frontmatter.socialImage === share.path
    share = {
      path: frontmatter.socialImage, alt: frontmatter.socialImageAlt || cover.alt,
      width: Number(frontmatter.socialImageWidth) || (same ? share.width : 0),
      height: Number(frontmatter.socialImageHeight) || (same ? share.height : 0)
    }
  }
  return { cover, share }
}
