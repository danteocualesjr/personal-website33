# Personal Website

A modern, minimal personal website built with Next.js, TypeScript, and Tailwind
CSS. Includes a home, about, projects, blog, and contact section, plus a
four-theme switcher: Minimal, Minimal Dark, Modern, and Terminal.

## Stack

- [Next.js 15](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) + `@tailwindcss/typography`
- [next-themes](https://github.com/pacocoursey/next-themes) for the theme switcher
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) for blog posts
- [Framer Motion](https://www.framer.com/motion/) for subtle page transitions
- [lucide-react](https://lucide.dev) for icons

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Making it yours

All personal data lives in a single file: [`content/site.ts`](content/site.ts).
Open it and replace every placeholder. You'll find fields for:

- Name, role, location
- Short bio (used on the home page) and long bio (used on /about)
- Email and social links
- Skills
- Projects (mark a project with `featured: true` to surface it on the home page)
- Experience timeline
- Site metadata (title, description, canonical URL)

That's the only file you need to edit for personal content.

## Writing blog posts

Posts are MDX files in [`content/posts`](content/posts). Each file needs a
frontmatter block:

```md
---
title: "Your post title"
description: "A one-sentence summary."
date: "2025-01-15"
tags: ["engineering", "notes"]
---

Your post body goes here. You can use markdown and React components.
```

The filename (without extension) becomes the URL slug. For example,
`content/posts/hello-world.mdx` is served at `/blog/hello-world`.

## Themes

Click the **Theme** button in the top-right to cycle through four looks:

| Theme          | Vibe                                  |
| -------------- | ------------------------------------- |
| Minimal        | Clean, light, generous whitespace      |
| Minimal Dark   | Same minimal layout, inverted palette  |
| Modern         | Soft gradient background, glass cards  |
| Terminal       | Dark green-on-black, monospaced        |

Each theme is defined as a set of CSS variables in
[`app/globals.css`](app/globals.css) under a `[data-theme="..."]` selector.
Add your own by duplicating one of the blocks and registering it in
[`components/ThemeProvider.tsx`](components/ThemeProvider.tsx) and
[`components/ThemeSwitcher.tsx`](components/ThemeSwitcher.tsx).

## Project structure

```
app/                     # Next.js App Router pages
  layout.tsx             # Root layout, fonts, theme provider
  page.tsx               # Home
  about/page.tsx         # About
  projects/page.tsx      # Projects
  blog/page.tsx          # Blog index
  blog/[slug]/page.tsx   # Blog post
  contact/page.tsx       # Contact
  globals.css            # Theme CSS variables + base styles
components/              # Shared React components
content/
  site.ts                # Your personal data (edit me!)
  posts/                 # Blog posts (*.mdx)
lib/
  posts.ts               # MDX post loading helpers
```

## Deploying

The easiest option is [Vercel](https://vercel.com):

1. Push this repo to GitHub.
2. Import it in Vercel.
3. No environment variables are required — it just works.

You can also deploy anywhere that runs a Node server (Netlify, Render, Fly,
self-hosted). Run `npm run build && npm run start` for a production server.

## Scripts

| Command         | What it does                           |
| --------------- | -------------------------------------- |
| `npm run dev`   | Start the dev server on port 3000      |
| `npm run build` | Build for production                   |
| `npm run start` | Run the production build               |
| `npm run lint`  | Run ESLint                             |

## License

MIT — do whatever you like.
