# CLAUDE.md

## Project Overview

Ryo Okada's portfolio website built with Astro. Data is sourced from YAML files in the LIFE repository.

## Tech Stack

- **Framework**: Astro v6 (static site generation)
- **Animation**: p5.js (cosmic network particle system)
- **Styling**: CSS custom properties, glassmorphism, Inter + JetBrains Mono fonts
- **Icons**: FontAwesome 6
- **Data**: YAML files symlinked from LIFE repo (`src/data/`)

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production (output: dist/)
npm run preview  # Preview production build
```

## Data Flow

```
LIFE/portfolio/*.yaml  →  symlink  →  src/data/*.yaml  →  Astro components
                                       (CI: fetched via GitHub API)
```

## Project Structure

```
src/
├── components/     # Astro components (Nav, Hero, Gallery, Projects, etc.)
├── data/           # YAML data (symlinks, gitignored)
├── layouts/        # BaseLayout
├── pages/          # index.astro
└── utils/          # loadData.ts (YAML loader + TypeScript types)
public/
└── images/         # Portfolio images and GIFs
```

## Deployment

- GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- On push to main: fetches YAML from LIFE repo → builds → deploys
- Requires `LIFE_REPO_TOKEN` secret (Personal Access Token with repo scope)
