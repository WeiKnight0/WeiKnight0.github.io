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

Deploy the built site to a target repository with a Hexo-style deploy worktree.

Deployment is configured in `deploy.config.json`:

```json
{
  "repo": "git@github.com:WeiKnight0/WeiKnight0.github.io.git",
  "branch": "main",
  "message": "deploy homepage"
}
```

Then deploy:

```bash
npm run deploy
```

The deploy command builds `dist/`, copies it into `.deploy_git/`, commits changes, and pushes normally without force push.

Preview the production build:

```bash
npm run preview
```

## Notes

This project started from an Astro boilerplate, but the structure and content are being customized for a personal homepage.
