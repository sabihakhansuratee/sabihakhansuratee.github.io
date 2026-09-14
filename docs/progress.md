# Progress — where we left off

Last updated: 2026-09-14. Read this first when resuming, alongside `PLAN.md`
(the full brief) and `docs/brief.md` (Phase 0 interview answers).

## Done

- **Phase 0 — Interview.** Complete, confirmed. Answers in `docs/brief.md`.
- **Phase 1 — Pipeline.** Astro site scaffolded, deploying via GitHub Actions to
  `https://sabihakhansuratee.github.io` on every push to `main`. Confirmed live.
- **Phase 2 — Content model.** `src/content.config.ts` defines four collections
  (case studies, gallery, pages, settings). Placeholder content written: 4 case
  studies, 12 gallery items, About page (using the client's **real** bio/CV, not
  fictional), `site.json` settings. 26 placeholder images generated via
  `scripts/make-placeholders.mjs`. Confirmed.
- **Phase 3 — Design.** Direction chosen: **"Quiet Gallery Walls"** (calm neutrals,
  one typeface — Archivo, images unboxed and full-width, restrained teal accent).
  Confirmed multi-page site structure (not a single-page scroller). Full palette/
  type/layout spec is in `AGENTS.md`'s decisions log and `src/styles/tokens.css`.
- **Phase 4 — Build. Complete.**
  - Base layout (`src/layouts/Layout.astro`), design tokens (`src/styles/tokens.css`),
    global reset (`src/styles/global.css`), self-hosted Archivo font files
    (`public/fonts/archivo/`), and the shared image component
    (`src/components/Media.astro`, resolving `src/assets/media/` path strings to
    optimised, responsive `<Picture>` output).
  - **Gallery** (`/gallery`) — confirmed working by the client. Fixed a real
    width/height CSS bug along the way (see `AGENTS.md` — any `<img>` CSS that
    overrides `width` must also set `height`, or images stretch).
  - **Case study index and detail** (`/work`, `/work/[slug]`) — confirmed working
    by the client. Results render from the frontmatter `results` field only.
  - **About** (`/about`) and **Contact** (`/contact`) — built, verified with
    screenshots, CV download link confirmed resolving. Not yet explicitly
    reviewed by the client (nothing flagged, but wasn't a separate STOP point).
  - **Home** (`/`) and **404** — built. Fixed a flexbox bug on the home page's
    featured-work rows (long title pushed the year label onto a misaligned new
    line — needed `min-width: 0` on the flex child). Verified with screenshots,
    desktop and mobile.
  - Nav/heading renamed from "Work" to **"My Work"** per the client's request.
  - **Visual QA method for this project**: this machine's `screencapture` can't
    take screenshots from this terminal (no Screen Recording permission granted
    to it), so every page was checked with a temporarily-installed Playwright
    instance instead — see the detailed recipe in `AGENTS.md`. Two real bugs
    were caught this way that would NOT have been caught by `npm run build`
    alone (the width/height stretch bug, and the flexbox min-width bug) — worth
    continuing to do this for any further visual changes, not just trusting a
    clean build.

**All of Phase 4 is built.** The client has explicitly confirmed the gallery and
case study pages (the two PLAN.md calls out as the most important). About, Contact,
Home, and 404 are built and self-verified but not yet explicitly walked through
with the client — worth a quick "does this all still look right to you" pass
before moving on, though nothing is blocking.

## Not started yet

- **Phase 5 — Pages CMS wiring.** `.pages.yml`, media path alignment (this is
  the phase PLAN.md calls "the whole ballgame" — check pagescms.org's current
  schema rather than working from memory), then a real test where the client
  replaces content through the CMS herself while being watched.
- **Phase 6 — Polish.** Contact form decision (mailto is already in place and
  matches the plan's first preference — probably nothing more to do here unless
  the client asks for a real form), SEO/OG tags, sitemap, robots.txt, JSON-LD,
  performance pass (Lighthouse), accessibility pass, favicon/touch icons, print
  stylesheet, and — important — the **placeholder guards**: `launched: false`
  flag already exists in `site.json` but the actual noindex/banner/
  `check:placeholders` script behavior described in PLAN.md hasn't been built yet.
- **Phase 7 — Custom domain.** Client said "later," not now.
- **Phase 8 — Handover docs.** Full `CLAUDE.md` architecture writeup and the
  client-facing `README.md` walkthrough (placeholder-replacement steps with
  CMS screenshots, launch checklist, etc.) — write this last, once the CMS
  (Phase 5) actually exists to document.

## Known open items (not blocking, just tracked)

- The downloadable CV on the About page is still a placeholder PDF
  (`public/documents/cv-placeholder.pdf`) — the client's real CV has a phone number
  that shouldn't be public. She needs to prepare a redacted version before launch.
- The one video gallery item (`northwind-symposium-recap-video.md`) has a fake
  `youtubeId: "placeholder-000000"` that won't actually embed — expected, swap in
  a real ID when the client has one.
