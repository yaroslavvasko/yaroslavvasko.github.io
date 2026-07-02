# Yaroslav Vasko — Personal Website

This repository hosts the source and deployment setup for Yaroslav Vasko’s personal web page.
The website is built with Vite, React, TypeScript, and Tailwind CSS, and it is published to GitHub Pages from the `site/` app.

## Structure

- `site/` — the frontend app root
- `site/src/` — React application source files
- `site/public/` — static public assets
- `site/package.json` — build, run, lint, and deploy scripts

## Prerequisites

- Node.js (recommended 18+)
- npm

## Setup

```bash
cd site
npm install
```

## Local development

Start the Vite dev server:

```bash
cd site
npm run dev
```

Then open the local address shown in the terminal.

## Build

Build the production app:

```bash
cd site
npm run build
```

Preview the compiled production build locally:

```bash
cd site
npm run preview
```

## Lint

Run ESLint across the frontend source:

```bash
cd site
npm run lint
```

## Deploy to GitHub Pages

This repository is configured to deploy the built app to GitHub Pages using `gh-pages`.
The deployment target is set in `site/package.json` via the `homepage` field:

- `https://yaroslavvasko.github.io`

To deploy:

```bash
cd site
npm run deploy
```

The deploy script runs `npm run build` first, then publishes the `dist/` folder to the `gh-pages` branch.
