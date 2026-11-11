# Keith Williams

Personal professional homepage, built with VitePress and a custom Vue theme.

## Development

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

The main navigation and project card link to the **published** [Ordo Knowledge Lab](https://kaw393939.github.io/knowledge-lab/). The portfolio Pages site hosts a **pinned, built mirror of its VitePress source** at `/knowledge-lab/`. Legacy `/is373-rag/` links redirect to the published site. Its source stays in [kaw393939/is373-rag](https://github.com/kaw393939/is373-rag); this repository pins its exact public revision in `scripts/build-knowledge-lab.mjs`, verifies the subpath, and deploys both websites together. Update the pin deliberately to promote later project changes.

On `main`, GitHub Actions builds and checks both sites, then attempts publication to the existing `gh-pages` branch. A push is not proof of a Pages rebuild; inspect the live site separately. You can also publish manually with an authenticated GitHub CLI account:

```sh
npm run deploy
```

The deploy script builds both VitePress sites and updates the `gh-pages` branch without a force push. GitHub Pages serves that branch from `/`. Source and issue templates live on `main`. Main-branch pushes invoke the publishing workflow. A deployment is complete only after the public site is verified. This setup uses the existing repository permissions and does not require permission to create GitHub Actions workflows.

## Content and imagery

Homepage structure lives in `docs/.vitepress/theme/Layout.vue`; repeatable content lives in `theme/content.ts`, shared identity and URLs in `.vitepress/site.ts`, icons in `theme/components/SiteIcon.vue`, and styles in `theme/style.css`. The user-provided photograph of Keith Williams in the About section lives at `docs/public/images/keith-williams.jpg`. It retains its original pixels with private metadata removed (only display orientation is retained), and uses a responsive CSS crop, descriptive alt text, explicit dimensions, and lazy loading. The original AI-generated explorer and sage imagery also lives in `docs/public/images/`. The explorer landscape remains in the hero; these conceptual illustrations are distinct from the portrait photograph.

No analytics, tracking scripts, embedded contact forms, or external font requests are included.

The Selected Projects and Zambia field-experience sections are driven by `theme/content.ts`. Project summaries distinguish published foundations, alpha software, and a teaching template from unfinished work. Their public evidence is recorded in [CONTENT_SOURCES.md](CONTENT_SOURCES.md). Recheck release status and capabilities before updating these claims; do not present a roadmap, classroom exercise, or proposed outcome as delivered work.

## Public conversations

The website contact button opens GitHub's native issue form at:

https://github.com/kaw393939/kaw393939.github.io/issues/new?template=contact.yml

The form is defined in `.github/ISSUE_TEMPLATE/contact.yml`. It uses GitHub's required title input, one required message field, and a required public-visibility acknowledgment. There is no email field, backend, credential, or automatic submission. Replies stay in the issue under the visitor's GitHub account.

Both the website and issue form explain that messages and replies are public and that GitHub sign-in is required. Visitors should not include private information. `blank_issues_enabled: false` guides visitors toward this form; it is not a privacy or security boundary and maintainers can still create blank issues.

Issue templates become available only after they are on the default branch and repository Issues are enabled. This public contact flow belongs only to this website repository. It does not integrate with any other repository.

## Quality checks

Run `npm test` before publishing. It builds the production site and checks pre-rendered content, SEO metadata, JSON-LD, sitemap/noindex behavior, image references and size budgets, accessibility markup, and muted-text contrast. These checks do not replace browser keyboard, responsive-layout, screen-reader, or real-device testing.

The portrait and landscape have responsive WebP derivatives. Originals are retained unchanged. Regenerate derivatives with `python scripts/optimize-images.py` (Python 3 and Pillow required). The script applies display orientation, preserves the photograph's content, and does not carry private metadata into web derivatives.

The navigation supports Escape dismissal, outside-click dismissal, and resets across layout breakpoints. The page uses SVG arrow icons rather than platform-dependent text glyphs.

## Life Tracker guide

`docs/life-tracker.md` explains the general private-repository workflow, practical setup steps, and human–AI collaboration at `/life-tracker`. It is linked from Selected Projects. The public starter checklist is `docs/public/life-tracker-starter.txt`; article styling lives in `theme/guide.css`. The fictional example and starter contain no private records. Do not copy private records or private source links into this public site.

The guide describes a working method, not an installable app or an automatic reminder service. Preserve that distinction when updating it.
