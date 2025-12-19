# Repository Guidelines

This repo is a Vite + React + TypeScript app with Tailwind and shadcn/ui, also packaged for Capacitor mobile builds. Use this guide to keep contributions consistent and shippable.

## Project Structure & Module Organization
- App code lives in `src`: `components` (shadcn/ui wrappers and shared UI), `pages` (React Router views), `hooks` (state/auth), `lib` (helpers), `assets` (static media), and `integrations/supabase` (generated client/types). Absolute imports use `@/`.
- `public` holds static assets served as-is; `dist` is the production build output.
- Capacitor mobile artifacts sit under `ios/` and platform config in `capacitor.config.ts`; Supabase SQL/config lives in `supabase/`.

## Build, Test, and Development Commands
- Install: `npm install` (respects `package-lock.json`; `bun install` also supported via `bun.lockb`).
- Develop: `npm run dev` starts Vite locally; `npm run preview` serves the built app.
- Build: `npm run build` outputs to `dist/` (use `npm run build:dev` for development-mode builds).
- Lint: `npm run lint` uses the repo ESLint config.

## Coding Style & Naming Conventions
- TypeScript-first; 2-space indent, double quotes, and semicolons as seen in existing files.
- Components use PascalCase filenames (e.g., `LabsOptimization.tsx`); hooks start with `use*`; utility modules stay in `lib/`.
- Prefer functional components with hooks, typed props/interfaces, and Tailwind classes for styling. Keep shadcn/ui primitives in `components/ui`.

## Testing Guidelines
- No automated test harness exists yet; add new coverage alongside features (e.g., `Feature.test.tsx` near the component) using Vitest + React Testing Library if introduced.
- For manual verification, exercise key flows: auth, router navigation (`/dashboard`, `/data-entry`), and Supabase-backed interactions.

## Commit & Pull Request Guidelines
- Follow the existing history: short, imperative, sentence-case subjects (e.g., `Fix edge function errors`, `Refactor HTML head for SEO`); keep scope focused.
- PRs should include: a concise summary, linked issue/ticket, before/after notes or screenshots for UI changes, and steps to validate. Ensure `npm run lint` (and any added tests) pass before review.

## Security & Configuration Tips
- Supabase anon URL/key are currently generated in `src/integrations/supabase/client.ts`; treat them as public-only. For new secrets, use Vite `VITE_` env vars in an untracked `.env.local`.
- When targeting mobile, run `npm run build` then sync assets with Capacitor (e.g., `npx cap copy ios` after installs/builds). Keep platform configs (`capacitor.config.ts`, `ios/`) consistent with web changes.
