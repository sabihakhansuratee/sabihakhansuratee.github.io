# Progress — where we left off

Last updated: end of session, 2026-09-12. Read this first when resuming, alongside
`PLAN.md` (the full brief) and `docs/brief.md` (Phase 0 interview answers).

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
- **Phase 4 — Build, in progress:**
  - Base layout (`src/layouts/Layout.astro`) — header, nav, footer, skip link — done.
  - Design tokens (`src/styles/tokens.css`) and global reset (`src/styles/global.css`) — done.
  - Self-hosted Archivo font files in `public/fonts/archivo/` — done.
  - Shared image component (`src/components/Media.astro`) resolving
    `src/assets/media/` path strings to optimised, responsive `<Picture>` output — done.
  - **Gallery page** (`src/pages/gallery.astro`) — done and confirmed working by
    the client, after fixing a real width/height CSS bug (see `AGENTS.md` — any
    future `<img>` CSS must pair `width` overrides with `height`, or images stretch).
    Verified with real Playwright screenshots: desktop, mobile width, and the
    lightbox (open/close/arrow-keys/focus-return) all correct.
  - **Case study index** (`/work`) and **case study detail** (`/work/[slug]`) —
    done. Results render from the frontmatter `results` field only (the long case
    study's body originally also had a duplicate markdown results table — removed,
    since the template renders results uniformly regardless of case study length).
    Verified with Playwright: desktop, mobile, the no-results edge case (section
    correctly omitted), and prev/next at both list boundaries. **Awaiting the
    client's own look — this is a STOP point per PLAN.md** ("this and the gallery
    are the two templates the client will live with").

  - **About** (`/about`) and **Contact** (`/contact`) — done, verified with
    Playwright screenshots (desktop + mobile), CV download link confirmed resolving.

## Next up (still Phase 4)

In the order PLAN.md specifies:

1. **Home** — build last, now that the above exist to pull from. Hero, 2-3 featured
   case studies, a strip of gallery work, one clear call to action.
2. **404 page.**

Reuse `Media.astro` for every image. Reuse the token variables in `tokens.css` —
don't hardcode colours/sizes in a page's `<style>` block.

## Not started yet

Phase 5 (Pages CMS wiring), Phase 6 (contact form decision, SEO/OG tags, performance,
accessibility pass, placeholder guards / launch checklist), Phase 7 (custom domain —
client said "later"), Phase 8 (handover docs).

## Known open items (not blocking, just tracked)

- The downloadable CV on the About page is still a placeholder PDF
  (`public/documents/cv-placeholder.pdf`) — the client's real CV has a phone number
  that shouldn't be public. She needs to prepare a redacted version before launch.
- The one video gallery item (`northwind-symposium-recap-video.md`) has a fake
  `youtubeId: "placeholder-000000"` that won't actually embed — expected, swap in
  a real ID when the client has one.
