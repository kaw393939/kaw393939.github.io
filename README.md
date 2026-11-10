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

Publish the built static site with an authenticated GitHub CLI account:

```sh
npm run deploy
```

The deploy script builds VitePress and updates the `gh-pages` branch without a force push. GitHub Pages serves that branch from `/`. Source and issue templates live on `main`. Pushing source alone does not redeploy the website. This setup uses the existing repository permissions and does not require permission to create GitHub Actions workflows.

## Content and imagery

Homepage content lives in `docs/.vitepress/theme/Layout.vue`; styles live in `style.css`. The user-provided photograph of Keith Williams in the About section lives at `docs/public/images/keith-williams.jpg`. It retains its original pixels with private metadata removed (only display orientation is retained), and uses a responsive CSS crop, descriptive alt text, explicit dimensions, and lazy loading. The original AI-generated explorer and sage imagery also lives in `docs/public/images/`. The explorer landscape remains in the hero; these conceptual illustrations are distinct from the portrait photograph.

No analytics, tracking scripts, embedded contact forms, or external font requests are included.

## Public conversations

The website contact button opens GitHub's native issue form at:

https://github.com/kaw393939/kaw393939.github.io/issues/new?template=contact.yml

The form is defined in `.github/ISSUE_TEMPLATE/contact.yml`. It uses GitHub's required title input, one required message field, and a required public-visibility acknowledgment. There is no email field, backend, credential, or automatic submission. Replies stay in the issue under the visitor's GitHub account.

Both the website and issue form explain that messages and replies are public and that GitHub sign-in is required. Visitors should not include private information. `blank_issues_enabled: false` guides visitors toward this form; it is not a privacy or security boundary and maintainers can still create blank issues.

Issue templates become available only after they are on the default branch and repository Issues are enabled. This public contact flow belongs only to this website repository. It does not integrate with any other repository.
