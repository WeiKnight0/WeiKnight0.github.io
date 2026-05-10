# WeiKnight's Homepage

Personal homepage for WeiKnight, currently under development.

The site is being rebuilt as a two-sided personal space:

- Real side: resume, projects, notes, and blog.
- Fiction side: original characters, worldbuilding, stories, and commissions.

The homepage currently experiments with a Real/Fiction contrast, Japanese title styling, ruby text, and separate visual languages for technical and fictional content.

## Status

Work in progress. Content, layout, and visual direction are still changing.

## Tech Stack

- Astro
- React
- Tailwind CSS
- TypeScript

## Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build the site:

```bash
npm run build
```

Deploy with GitHub Pages via GitHub Actions.

Required repository setup:

- Rename the GitHub repository to `weiknight0.github.io`
- In GitHub, open `Settings -> Pages`
- Under `Build and deployment`, set `Source` to `GitHub Actions`

The workflow file is:

```text
.github/workflows/deploy.yml
```

Deployment runs automatically when you push to `master`.

The production site URL is configured in `astro.config.mjs`:

```js
site: 'https://weiknight0.github.io/'
```

If you need a manual run, trigger the workflow from the GitHub Actions tab.

Preview the production build locally:

```bash
npm run preview
```

## Notes

This project started from an Astro boilerplate, but the structure and content are being customized for a personal homepage.
