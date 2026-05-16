# AGENTS.md

## Cursor Cloud specific instructions

This is a Next.js 15 personal portfolio/blog site with no external services, databases, or environment variables.

**Running the app:** `npm run dev` starts the dev server on port 3000. No `.env` file needed.

**Available scripts** (see `package.json`):
- `npm run dev` — dev server
- `npm run lint` — ESLint via `next lint`
- `npm run typecheck` — `tsc --noEmit`
- `npm run build` — production build

**Content:** All personal data is in `content/site.ts`. Blog posts are MDX files in `content/posts/`.

**Themes:** The site has 4 themes controlled via CSS variables in `app/globals.css` under `[data-theme="..."]` selectors. Theme configuration lives in `components/ThemeProvider.tsx` and `components/ThemeSwitcher.tsx`.

**Node version:** CI uses Node 20; Node 22 also works without issue.
