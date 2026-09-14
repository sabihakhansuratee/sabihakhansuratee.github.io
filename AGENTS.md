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
- **For a "fixed height, variable width" row of images** (e.g. a horizontal
  scroll strip where every item shares one exact height and keeps its own
  aspect ratio) — don't use `width: auto; height: 100%` inside a flex row and
  trust the browser to infer width from the image's real aspect ratio. In
  this project that combination (flexbox + responsive `sizes` + `aspect-ratio`)
  did not reliably size correctly — confirmed with Playwright measurements,
  not just suspected. Instead, `Media.astro` accepts a `height` prop for
  exactly this case: it computes the real pixel width server-side from the
  source's actual aspect ratio and sets both dimensions via **inline style**
  (not just HTML attributes) — inline style is the one thing guaranteed to
  beat every external stylesheet rule, including this project's own global
  `img { height: auto; max-width: 100% }` reset, either of which would
  otherwise silently override a plain width/height attribute and resize the
  image wrong. `max-width: none` has to be set inline too, separately — it's
  a different property from `width` and always wins over it when they'd
  conflict, so overriding `width` alone doesn't stop `max-width: 100%` from
  still capping the result.
- **Gallery `category` is a plain text field in the CMS, not a select list**,
  despite PLAN.md's general preference for select lists over free text on
  category-like fields. Reason: category values here are project/event titles
  (an open-ended, ever-growing set as the client adds real work), not a fixed
  taxonomy — a hardcoded select list would need editing by a developer every
  time she starts a new project, defeating the point of the CMS. A `reference`
  field pointing at the case-studies collection would be the ideal fix (no
  typos possible, always in sync), but would require reworking the Zod schema
  and the gallery/home page grouping logic to resolve a reference instead of
  a plain string — worth doing later if mis-typed categories become a real
  problem, not before.
- **Two CMS saves in quick succession can cause one GitHub Pages deploy to
  fail outright** (a 409-style conflict, not a build/content problem — the
  build step itself succeeds, only the deploy step fails) rather than
  queueing politely. If a change doesn't appear live after a minute or two,
  check `gh api repos/sabihakhansuratee/sabihakhansuratee.github.io/actions/runs`
  (or the Actions tab) for a failed run on the latest commit; the fix is just
  triggering one more clean deploy — either an empty commit
  (`git commit --allow-empty`) or re-running the failed job from GitHub's UI.
- **There are two places the CV file could theoretically be configured, but
  only one is real.** The About page entry (`src/content/pages/about.md`,
  `cvFile`) drives the actual "Download CV" button. A duplicate `cvFile` field
  used to exist on `settings`/`site.json` too, left over from an early Phase 2
  draft — it was never wired to anything, but its CMS description made it
  *sound* like the right place to edit, and the client understandably edited
  it, then found downloading the CV still served the old file. Removed the
  dead field entirely (schema, `site.json`, `.pages.yml`) rather than trying
  to keep two fields in sync — if a field isn't consumed by any template,
  delete it, don't leave it looking legitimate in the CMS.
- **Git history was rewritten once, 2026-09-14**, to strip a since-replaced
  version of the client's CV that briefly contained her phone number
  (uploaded through the CMS, caught, replaced with a clean version, then the
  old blob was purged from history with `git filter-repo
  --strip-blobs-with-ids` and force-pushed — done with the client's explicit
  go-ahead). Commit hashes before `0ac71cf` on `main` no longer match what a
  pre-existing local clone would have. Not expected to matter again, but if a
  future session's local `git log` looks like it diverges oddly from
  `origin/main` around that date, this is why — `git fetch && git reset --hard
  origin/main` is the fix, same as after any rewrite.
- **This machine's `screencapture` can't take screenshots from this terminal**
  (macOS Screen Recording permission isn't granted to it) — visual QA needs a real
  browser. Working method: `npm install --no-save playwright` (temporary — restore
  `package.json`/`package-lock.json` from a backup copy afterward, don't commit it),
  `npx playwright install chromium`, then a throwaway `.mjs` script placed at the
  *project root* (not the scratchpad — Node resolves `node_modules` from the
  script's own location) that launches Chromium, hits the local preview server, and
  screenshots/evaluates the DOM. Delete the script and restore the package files
  when done.
