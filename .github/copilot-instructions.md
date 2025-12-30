## Purpose

This file equips AI coding agents to be immediately productive in this Next.js + TypeScript project. It documents the app structure, developer workflows, project-specific patterns, and concrete examples taken from the codebase.

## Quick Start (commands)

- **Dev:** `npm run dev` — runs `next dev` (see `package.json`).
- **Build:** `npm run build` — runs `next build`.
- **Start (prod):** `npm run start` — runs `next start`.
- **Lint:** `npm run lint` — runs `eslint` (project uses `eslint.config.mjs`).

Run these from the repository root where `package.json` lives.

## Big-picture architecture

- **Framework:** Next.js (App Router) with TypeScript. The project uses the `app/` directory (see `app/layout.tsx` and `app/page.tsx`).
- **UI & Styling:** Tailwind CSS configured via `postcss.config.mjs` and `tailwindcss` (devDependency). Global styles are in `app/globals.css`.
- **Fonts:** Project loads Google fonts in `app/layout.tsx` using `next/font` — e.g. `Geist` and `Geist_Mono` variables are applied to the `<body>`.
- **Assets:** Static assets live in `public/` (examples: `/next.svg`, `/vercel.svg`). `next/image` is used in `app/page.tsx`.

There are currently no API routes or serverless functions in the tree. If adding back-end endpoints, follow Next's App Router conventions and place them under `app/api/*`.

## Project-specific conventions & patterns

- **App Router (server-first):** Files in `app/` default to server components. If a component needs client-side behavior, put `"use client"` at the top of the file. Example: create `app/components/Interactive.tsx` and begin with:

```
"use client";
import React from 'react';
export default function Interactive(){ /* ... */ }
```

- **Where to change page content:** `app/page.tsx` is the main landing page — editing it updates the dev server immediately.
- **Global layout & metadata:** `app/layout.tsx` defines fonts, `<html>` and `<body>` wrappers and `metadata`; modify it for app-wide changes.
- **Styling classes:** Follow Tailwind utility classes in existing components (see usages throughout `app/page.tsx`).
- **Linting:** Linting is invoked via `npm run lint`. The project contains `eslint.config.mjs` and uses `eslint-config-next`.

## Integration points & external deps

- Core deps: `next@16`, `react@19`, `react-dom@19` (from `package.json`).
- Tailwind: `tailwindcss@^4` and `@tailwindcss/postcss` are configured — keep PostCSS/Tailwind versions aligned with the config files.
- Deployment target: Vercel is the obvious host (project scaffold references Vercel in `app/page.tsx`), but any Next.js-compatible platform will work.

## Examples for common agent tasks

- Edit the landing page text: update `app/page.tsx` (search for the string "To get started, edit the page.tsx file.").
- Add a global class/utility: edit `app/globals.css` and modify `tailwind.config` if needed (config may be implicit; update `postcss.config.mjs` if adding PostCSS plugins).
- Add a client component: create `app/components/MyButton.tsx` with `"use client"` and import it into `app/page.tsx`.

## What to avoid / be careful about

- Do not change the Next.js major in `package.json` without running the dev server and verifying behavior—project code uses App Router defaults.
- Do not assume tests exist — there are no test scripts in `package.json`; add tests explicitly and wire them into `package.json` if required.

## Where to look for configuration

- `next.config.ts` — project config (currently minimal).
- `tsconfig.json` — TypeScript settings.
- `eslint.config.mjs` — lint rules used by `npm run lint`.
- `postcss.config.mjs` — PostCSS and Tailwind integration.

## If you modify the repo

- Update `package.json` scripts if you add build/test automation.
- Keep changes minimal and prefer collocation: components and styles should live near the pages that use them inside `app/`.

## Feedback

If any part of the codebase is missing from these notes or you want additional examples (component conventions, routing, or deployment settings), tell me which area to expand and I will iterate.
