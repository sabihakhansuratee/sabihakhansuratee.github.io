## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## This project

Full brief: `PLAN.md`. Client interview answers: `docs/brief.md`. This is a living
decisions log, added to as the build progresses — the full architecture writeup
happens at Phase 8 handover.

- **No Tailwind, no JS framework.** Plain Astro components and hand-written CSS only.
- **Image fields in content collections are plain strings, not Astro's `image()`
  schema helper.** Real images live in one shared `src/assets/media/` folder
  (decoupled from where each markdown entry lives) so Pages CMS uploads and
  hand-placed files resolve identically. `image()` resolves paths relative to the
  entry file, which doesn't fit a shared folder. Phase 4 builds the shared resolver
  (`import.meta.glob` over `src/assets/media`) that turns these strings into
  optimised `<Image>`/`<Picture>` output.
- **The client's real CV was provided early** (`cv/` — gitignored, contains a phone
  number that isn't meant to be published). The About page's bio and career history
  use this real content, not invented placeholder content — unlike case studies and
  the gallery, which are entirely fictional until the client replaces them. A couple
  of the CV's own unfinished bracketed notes (e.g. "[improving N]") were omitted
  rather than filled in with an invented number.
- **The downloadable CV file is still a placeholder** (`public/documents/cv-placeholder.pdf`,
  generated with `cupsfilter`, not `textutil` — textutil has no PDF output format on
  macOS). It needs replacing with a real, redacted PDF (no personal phone number)
  before launch — track this separately from the About page prose, which is already real.
- **Gallery supports a `video` type** (YouTube embed via `youtubeId`), in addition to
  images — an addition beyond PLAN.md's original image-only gallery, needed because
  the client's work includes video editing. The one placeholder video entry uses a
  fake `youtubeId` ("placeholder-000000") that won't actually embed — expected, and
  visibly wrong on purpose, same as the other placeholders.
- **Four placeholder case studies, not three.** PLAN.md's three length variants
  (short/medium/long) don't naturally produce a "no results block" edge case, so a
  fourth short entry (`solstice-regulatory-roundtable.md`) exists solely to stress-test
  that case — it mirrors the client's real closed-door-event scenario from Phase 0.
- **`scripts/make-placeholders.mjs`** (sharp-based) generates every placeholder image
  into `src/assets/media/`. Safe to re-run any time; safe to delete once real images
  have replaced every placeholder.
- **Design direction: "Quiet Gallery Walls"**, approved in Phase 3. Tokens live in
  `src/styles/tokens.css` (colour, type, spacing) — that's the one file to edit for a
  visual tweak. One typeface (Archivo), self-hosted from `public/fonts/archivo/`.
- **Any `<img>` CSS that overrides `width` must also set `height` (or use
  `width: auto; height: auto; max-width/max-height`)**. Browsers treat an image's
  `width`/`height` HTML attributes as low-priority presentational hints — CSS
  `aspect-ratio: attr(...)` does NOT override a hint left unaddressed on the other
  axis, so overriding only `width` leaves `height` pinned to the attribute's literal
  pixel value and the image visibly stretches. Fixed once at the root in
  `global.css`'s base `img, video` rule, but keep pairing them in any new CSS anyway.
- **This machine's `screencapture` can't take screenshots from this terminal**
  (macOS Screen Recording permission isn't granted to it) — visual QA needs a real
  browser. Working method: `npm install --no-save playwright` (temporary — restore
  `package.json`/`package-lock.json` from a backup copy afterward, don't commit it),
  `npx playwright install chromium`, then a throwaway `.mjs` script placed at the
  *project root* (not the scratchpad — Node resolves `node_modules` from the
  script's own location) that launches Chromium, hits the local preview server, and
  screenshots/evaluates the DOM. Delete the script and restore the package files
  when done.
