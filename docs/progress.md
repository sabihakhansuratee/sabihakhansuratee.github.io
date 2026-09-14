# Progress — where we left off

Last updated: 2026-09-14 (evening). Read this first when resuming, alongside
`PLAN.md` (the full brief) and `docs/brief.md` (Phase 0 interview answers).

## Done

- **Phase 0 — Interview.** Complete, confirmed. Answers in `docs/brief.md`.
- **Phase 1 — Pipeline.** Astro site scaffolded, deploying via GitHub Actions to
  `https://sabihakhansuratee.github.io` on every push to `main`. Confirmed live.
- **Phase 2 — Content model.** `src/content.config.ts` defines four collections
  (case studies, gallery, pages, settings). Confirmed.
- **Phase 3 — Design.** Direction: **"Quiet Gallery Walls"**. Confirmed multi-page
  site structure. Full spec in `AGENTS.md`'s decisions log and `src/styles/tokens.css`.
- **Phase 4 — Build. Complete.** Every page built (Home, My Work index + detail,
  Gallery, About, Contact, 404), confirmed by the client. Two real CSS bugs were
  found and fixed post-launch-of-this-phase (see "Real bugs found" below).
- **Phase 5 — Pages CMS. Connected and tested successfully.**
  - `.pages.yml` written: all four collections + settings mapped, media output
    aligned with `Media.astro`'s resolver, plain-language `description` text on
    every field. Gallery `category` deliberately kept as plain text rather than
    a select list — reasoning logged in `AGENTS.md`.
  - Client signed into `app.pagescms.org` with GitHub, authorized the one repo,
    connected successfully — the config parsed with no errors on first real test.
  - **Client has now published multiple real, unaided edits through the CMS**,
    each confirmed live on the real site — this satisfies PLAN.md's Phase 5 STOP
    ("the client must successfully publish a change through the CMS, unaided").
    Specifically: rewrote a case study into real content (the "Halyard" entry is
    now "CoRE Scientific Conference" — real, not placeholder), added a real
    YouTube video to a gallery entry, uploaded her real headshot to the About page.

### Real bugs the client's testing caught (all fixed and deployed)

1. **Gallery strip images distorted on the home page.** A "fixed height, auto
   width" flexbox pattern doesn't reliably size from an image's real aspect
   ratio in this project's combination of flexbox + responsive `sizes` +
   `aspect-ratio`. Fixed by giving `Media.astro` an explicit `height` prop that
   computes the real pixel width server-side and sets both dimensions via
   inline style (the one thing that reliably beats every external stylesheet
   rule, including our own `img { height: auto; max-width: 100% }` reset).
2. **CMS media paths broke the build.** Pages CMS writes image/file paths with
   a leading slash (root-relative), but `Media.astro`'s resolver expected a
   path with no prefix, relative to `src/assets/media/` directly. This broke
   the client's very first real CMS edit — safely (a failed build just means
   the live site stays on the last good version, nothing was ever visibly
   broken) but it needed fixing. Fixed by stripping a leading slash before
   resolution, in `Media.astro` and the About page's CV link.
3. **Homepage subtitle wasn't connected to the CMS at all** — it was a
   hardcoded string in `index.astro`. The client found this by looking for a
   way to edit it and not finding one. Added as a proper `homeSubtitle` field
   on settings, wired through the schema, the template, and `.pages.yml`.
4. **Two rapid CMS saves can fail one GitHub Pages deploy** (a 409-style
   conflict — the build succeeds, only the deploy step fails, and it doesn't
   queue politely the way you'd hope). Not a content bug. Recognized and fixed
   live by pushing an empty commit to trigger one clean deploy. Documented in
   `AGENTS.md` so this is recognized quickly if it recurs, rather than
   mistaken for something being broken.

All four are documented in detail in `AGENTS.md`'s decisions log.

## Content status (as of now)

- **Case studies:** "Halyard Regulatory Fellows Programme" has been replaced by
  the client with her real first case study ("CoRE Scientific Conference",
  `placeholder: false`). The other three (Meridian, Northwind, Solstice) are
  still the original invented placeholders.
- **Gallery:** one entry (originally "Halyard Fellows completion certificate")
  has been replaced with a real YouTube video ("CoRE 10th Anniversary") — note
  its `placeholder` flag is still `true` even though the content is real; worth
  the client flipping that when she's next in the CMS. Its thumbnail is still
  the old placeholder graphic (she swapped in a video, not a new poster image).
  The other eleven gallery entries are still original placeholders.
- **About page:** real bio (already was, since Phase 2), now also has the
  client's real headshot (was a placeholder image before today).
- **Settings:** real name/email/LinkedIn (since Phase 2); homepage tagline and
  subtitle have been lightly edited by the client through the CMS.

## Next up

- **Phase 6 — Polish.** Not started. This covers:
  - Contact: mailto + LinkedIn is already in place (the plan's first
    preference) — probably nothing more needed here unless the client wants a
    real form later.
  - SEO/OG tags per page, `@astrojs/sitemap`, `robots.txt`, JSON-LD `Person`
    schema on the home page.
  - Performance pass (Lighthouse) and a plain-language report to the client.
  - Accessibility pass: keyboard nav including the lightbox, heading order,
    contrast, images-disabled test.
  - Favicon, Apple touch icon, print stylesheet for case study pages.
  - Cross-browser / real-phone check.
  - **Placeholder guards** — not built yet: `launched: false` already exists in
    `site.json`, but the actual noindex meta tag + robots.txt block, the
    dev-only "not live yet" banner, and the `npm run check:placeholders` script
    described in PLAN.md all still need building.
- **Phase 7 — Custom domain.** Client said "later," not now.
- **Phase 8 — Handover docs.** Full `CLAUDE.md` architecture writeup (note:
  this project actually uses `AGENTS.md`, symlinked as `CLAUDE.md` — see that
  file's growing decisions log, which already covers most of what Phase 8
  wants) and the client-facing `README.md` walkthrough (placeholder-replacement
  steps with CMS screenshots, launch checklist). Write this last.

## Known open items (not blocking, just tracked)

- The downloadable CV on the About page is still a placeholder PDF — the
  client's real CV has a phone number that shouldn't be public. She needs to
  prepare a redacted version and upload it through the CMS (Prose pages →
  About → CV file) before launch.
- The "CoRE 10th Anniversary" gallery video's `placeholder` flag is still
  `true` despite being real content — a one-toggle fix whenever she's next in
  the CMS.
- Three of four case studies and eleven of twelve gallery items are still
  invented placeholder content, same as at the end of Phase 2 — expected,
  this happens on the client's own schedule per PLAN.md Section 4.
