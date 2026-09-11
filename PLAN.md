# Portfolio Site — Development Plan

**For: a marketing executive, non-developer, working with Claude Code in the terminal.**

---

## 0. How to use this document

1. Make a new empty folder on your computer, e.g. `~/Sites/portfolio`.
2. Save this file inside it as `PLAN.md`.
3. Open a terminal in that folder and run `claude`.
4. Paste this as your first message:

> Read `PLAN.md` in this folder. That's the full brief for a portfolio website we're
> building together. Start with Phase 0 — interview me. Do not write any code until
> Phase 0 is complete and I've confirmed the answers. Work one phase at a time and
> stop at every checkpoint marked **STOP** so I can look at it before you continue.

That's it. Everything below is written for Claude Code to follow, but in plain enough
language that you can follow along too.

---

## 1. Before you start (things only you can do)

Claude Code can't create accounts for you. Do these first:

- [ ] **A GitHub account** — github.com. Free. Note your username; it becomes part of your web address.
- [ ] **Node.js** — nodejs.org, download the LTS version. This is the engine that builds the site.
- [ ] **Git** — on a Mac, run `xcode-select --install`. On Windows, git-scm.com.
**You do not need any content ready.** The site gets built with realistic placeholder
case studies, gallery images, and an About page, which you replace with your own later —
one piece at a time, at your own pace. See Phase 2 for how the placeholders are made and
Section 4 for how to swap them out.

If you happen to have a headshot or a CV PDF lying around, drop them in — but nothing
is blocked on them.

You do **not** need to understand Node, Git, or the terminal beyond copy-pasting.
If a command fails, paste the error back to Claude Code.

---

## 2. The stack, and why (read this once, then forget it)

| Piece | What it is | Why it's the right call here |
|---|---|---|
| **Astro** | The site builder | Produces plain, fast HTML. Best-in-class automatic image handling — critical for a screenshot-heavy portfolio. Content lives in simple text files, not a database. |
| **Markdown files** | Where your writing lives | Plain text with a few labels at the top. Readable by you, by Claude Code, and by the CMS. |
| **Pages CMS** (`app.pagescms.org`) | Your visual editor | Free, open source. Log in with GitHub, get proper form fields and an image uploader. Saves straight into your repo. No server to run or pay for. |
| **GitHub** | Where the files live | Free storage, full version history, and it's what everything else plugs into. |
| **GitHub Pages** | The hosting | Free. Publishes automatically about a minute after any change — whether the change came from the CMS or from Claude Code. |

**The key idea:** there is one set of files. The CMS edits them through a nice interface.
Claude Code edits them from the terminal. Both trigger the same automatic republish.
You are never locked into one or the other.

### Non-negotiable technical decisions

These exist to avoid specific traps that bite non-developers later. Claude Code should
follow them unless it has a concrete reason not to, and should say so if it does.

- **Name the GitHub repository `<your-username>.github.io`** (all lowercase). This makes
  the site live at `https://<your-username>.github.io` with no sub-path. Any other repo
  name forces a `base` path in the Astro config, which is the single most common cause
  of images and links mysteriously breaking. Avoid it entirely.
- **No `base` in `astro.config.mjs`.** Set only `site`.
- **No JavaScript framework.** No React, Vue, or Svelte. Astro components and plain CSS only.
  Fewer moving parts means fewer things that can break while you're not looking.
- **No Tailwind.** Hand-written CSS in one place, so the design is readable and editable.
  A non-developer can find and change `--color-ink` in a variables file; they cannot
  decode `text-slate-900/80 lg:tracking-tight`.
- **No contact form that needs a server.** See Phase 6.
- **Dependencies stay minimal.** Astro plus, at most, its official sitemap integration.
  Every extra package is a future maintenance obligation you can't evaluate.

---

## 3. What the site contains

Four things, confirmed by the client:

1. **Case studies / project write-ups** — the substance. Individual pages.
2. **Gallery** — screenshots of design work. Visual, browsable, minimal text.
3. **About + CV/resume** — who they are, career history, downloadable CV.
4. **Contact** — email and professional profile links.

Plus a **home page** that pulls from the above.

**Design constraint from the client:** the site should lead with images and screenshots.
They explicitly rejected an editorial/magazine direction — this is not a publication,
it's a body of visual and strategic work. The pictures carry the page; the typography
should be confident but should get out of the way.

---

## 4. Swapping placeholders for your real content

The site launches complete, with invented work in it. You then replace that work piece by
piece, whenever you have something ready. Nothing has to happen all at once, and nothing
breaks half-finished.

**The rule that makes this painless:** replace the *contents* of an entry, never delete
the entry and start fresh. The placeholder is a correctly-shaped container. Change the
words and swap the image; leave the structure alone.

Three ways to do it, all equally valid:

1. **In Pages CMS** — open the case study, type over the text, click the image field,
   upload yours. This is the path for most edits, most of the time.
2. **Ask Claude Code** — "Replace the Northwind Coffee case study with this: [paste your
   notes]." Good when you have rough material that needs shaping, or when you're replacing
   several at once.
3. **Both** — draft with Claude Code, tidy in the CMS later.

**Image sizes.** Whatever you upload gets resized and optimised automatically. Upload the
largest version you have; don't try to prepare files first. The only thing worth matching
is rough shape — a wide screenshot where a wide placeholder was.

**As you go**, set `placeholder: false` on anything you've replaced. That's what the
launch checklist in Phase 6 counts.

---

## Phase 0 — Interview

**Claude Code: do not write code in this phase.** Ask these questions conversationally,
a few at a time, not as one wall of text. Wait for answers. Summarise back what you heard
and get a yes before moving on.

**Identity**
- Full name as it should appear on the site, and preferred professional title.
- One sentence: what you do and who for.
- Current employer — and should it be named on the site? (Check whether they're job-hunting quietly.)
- City / market you operate in.

**Work** — the client has no written content yet, so these questions are about the
*shape* of the work, not the specifics. You need enough to build placeholders that match
what will eventually replace them. Don't push for detail they don't have.

- What kinds of projects will eventually go here — campaigns, brand launches, go-to-market,
  rebrands, product marketing, growth? Name two or three real ones loosely, even vaguely.
- Roughly how long is a typical write-up going to be: a tight 200 words, or 800 with
  sections and images? This determines the template more than anything else.
- What sorts of results do they usually report — percentage lifts, revenue, reach,
  awards, qualitative outcomes? How many numbers per project, typically?
- Are the eventual clients household-name brands, B2B companies, or a mix? (Changes how
  much a logo or client name carries the card.)
- What will the gallery hold — campaign creative, deck pages, brand systems, social
  assets, web or app work? What mix of shapes: mostly landscape, mostly square, mostly
  tall phone screens?
- Roughly how many gallery items eventually — 10, 40, 100? Grid behaviour differs.
- Should the gallery be grouped (by client? by type?) or one flat stream?
- Anything likely to be under NDA, so the template needs a graceful way to show work
  without naming the client?

**Audience and job**
- Who is the site for: recruiters, prospective clients, speaking organisers, peers?
- What should happen after someone reads it — an email, a call booking, a LinkedIn follow?
- Is there a competitor or peer site they admire? Ask for URLs. Also ask for one they
  actively dislike; that's usually more informative.

**Practical**
- GitHub username.
- Contact email to publish (consider a forwarding alias rather than a personal address).
- Profile links: LinkedIn, X, Instagram, Behance, Substack?
- Custom domain now, later, or never?
- Do they have a CV as a PDF, or a headshot? Fine if not — both get placeholders.
- Roughly when do they expect to have real content in? (Affects nothing technical, but
  tells you how long the placeholder guards in Phase 6 need to stay in place.)

**STOP.** Write the answers to `docs/brief.md`, show it, get confirmation.

---

## Phase 1 — Get something published before building anything

Counter-intuitive but important: prove the whole pipeline works while the site is still
an empty page. Debugging a deploy is much easier when there's nothing else to blame.

1. `npm create astro@latest` — minimal/empty template, TypeScript, install dependencies.
2. Set `site: 'https://<username>.github.io'` in `astro.config.mjs`. No `base`.
3. Make `src/pages/index.astro` say nothing but the client's name.
4. `git init`, first commit.
5. Walk the client through creating the `<username>.github.io` repo on GitHub — give them
   click-by-click instructions, don't assume they know where anything is. Then push.
6. Add `.github/workflows/deploy.yml` using the official `withastro/action` and
   `actions/deploy-pages`. Fetch the current workflow from
   `https://docs.astro.build/en/guides/deploy/github/` rather than writing it from memory —
   action versions change.
7. Commit the lockfile (`package-lock.json`). The action needs it to detect the package manager.
8. Tell the client to go to **Settings → Pages** in the repo and set Source to **GitHub Actions**.
9. Watch the Actions tab until it goes green.

**STOP.** The client should open `https://<username>.github.io` in a browser and see
their name. Do not proceed until they confirm they've seen it live.

Then teach them exactly three commands, and write them into `README.md`:

```bash
npm run dev     # preview locally at localhost:4321 — changes appear instantly
npm run build   # check it builds cleanly before publishing
git add -A && git commit -m "describe the change" && git push   # publish
```

---

## Phase 2 — Content model

Set up Astro content collections in `src/content/`. Define schemas in `src/content.config.ts`.
Fields should be few and obvious — every optional field is a decision the client has to
make again each time they add work.

**`case-studies`** — one Markdown file per project
```
title            text, required
client           text, required
role             text, required          e.g. "Campaign lead"
year             number, required
summary          text, required          one or two sentences, used on cards
coverImage       image, required         16:9, the card and hero image
tags             list of text            e.g. brand strategy, paid social
results          list of { metric, value }  optional but encouraged
featured         boolean                 controls home page placement
order            number                  manual sort control
draft            boolean, default false  hidden from the live site when true
body             Markdown                the write-up itself
```

**`gallery`** — one file per image, or per grouped set
```
title            text, required
image            image, required
client           text, optional
category         text, optional          drives the filter, if there is one
year             number, optional
caption          text, optional
order            number
```

**`pages`** — `about.md`, plus anything else that's just prose.

**`settings`** — a single `site.json` for name, title, tagline, email, social links,
CV filename, SEO defaults. Everything the client might want to change without touching
a template. **No contact details, social URLs, or names hard-coded in templates.**

Add a `placeholder: true` field to every collection, defaulting to `false`. It drives the
safety guards in Phase 6 and gives you a one-word way to find everything that still needs
replacing.

### Placeholder content

The client has nothing written yet, so you're writing it. Two rules govern this:

**No lorem ipsum, ever.** Fake Latin hides layout problems until the day real words go in
and the design falls apart. Placeholders must be plausible English at plausible lengths.

**Nothing that could be mistaken for a real claim.** Invented companies only — `Northwind
Coffee`, `Halyard Financial`, `Meridian Health` — never a real brand, and never a
metric that could be read as something this person actually achieved. If a fake number
survives to launch, it isn't an embarrassing typo, it's a false claim on a marketing
executive's professional site. Prefix every invented metric's label with `Sample` in the
placeholder data, so it's visibly wrong rather than quietly wrong.

Produce:

- **Three case studies**, deliberately different in size so the templates get stress-tested:
  one short (~200 words, two results, one image), one medium (~600 words, subheadings,
  three inline images, four results), and one long (~1,200 words, pull quote, six images,
  a results table). Match the shape the client described in Phase 0.
- **Twelve gallery items**, spanning the aspect ratios they mentioned — include at least
  one very wide, one very tall, and one square. A grid that only ever sees 16:9 will
  break the first time it meets a phone screenshot.
- **An About page** with a real-length bio (~250 words), five career entries, and a
  placeholder CV PDF.
- **Edge cases on purpose:** one case study with no results block, one with an absurdly
  long title, one gallery item with no caption, one client name long enough to wrap.
  These are the cases that break layouts, and it's cheaper to find them now.

Write the copy in a neutral professional register — close to how a marketing executive
actually writes, so the client can read it and think "I'd say it differently, but that's
the right length and shape." That reaction is the goal.

### Placeholder images

No screenshots exist yet, so generate them locally. Do **not** use picsum.photos, Unsplash
hotlinks, or any remote URL — a placeholder that only exists on someone else's server
means you never actually test the image pipeline, and it breaks the day that server changes.

Write a throwaway script (`scripts/make-placeholders.mjs`) using `sharp`, which Astro
already depends on, to generate real image files into `src/assets/media/`:

- The real aspect ratios and pixel dimensions the client's work will use, including at
  least one deliberately oversized file (~4000px wide, several MB) so image optimisation
  is genuinely exercised rather than assumed.
- Flat, muted neutral fills — greys and desaturated tones — so they don't fight whatever
  palette Phase 3 lands on, and so nobody mistakes them for design work.
- Each one labelled in-image with its filename and dimensions. Unmistakably a placeholder
  at a glance, which is the point.

Commit the generated images, and keep the script — regenerating at a different size later
is useful. Note it in `CLAUDE.md` as safe to delete once real images are in.

**STOP.** Show the client the files. Ask whether anything is missing or over-engineered.

---

## Phase 3 — Design

Follow a two-pass process. **Present, then build.** Do not skip to code.

**Pass 1 — propose.** Give the client **two or three distinct directions**, each as a short
written concept plus a compact token set:
- 4–6 named hex colours
- Typefaces and their roles (one family, or two clearly different ones — not three)
- A layout concept, with a rough ASCII wireframe of the home page and a case study page
- One line on what makes it specific to *this* person's work

Describe them in plain language — "quiet gallery walls", "confident and graphic" — not
in CSS terms. Then build a single static HTML preview of the winning direction's home page
so the client sees it rather than imagines it.

**The brief's own constraints, which override anything below:**
- Images lead. Screenshots should render large, crisp, and uncropped where possible.
  Chrome around them stays quiet.
- Not editorial. No magazine columns, no big drop caps, no hairline-rule broadsheet grid.
- Marketing work is judged on results as much as craft, so numbers need a treatment —
  but a restrained one, not a dashboard.

**Avoid these, they're the visual signature of a generated site:**
- Cream background (#F4F1EA-ish) + high-contrast serif + terracotta accent
- Tracked-out ALL-CAPS eyebrow labels above every heading
- Identical rounded cards with identical soft grey shadows, everywhere
- `01 / 02 / 03` numbered markers on things that aren't a sequence
- Arrows appended to every link and button
- Fade-and-slide-up animation on every section as you scroll
- Accenting one word of a headline in a different colour

Spend boldness in exactly one place — most likely the home page hero or the gallery's
grid behaviour — and keep everything else disciplined.

**Implementation rules:**
- All design tokens in `src/styles/tokens.css` as CSS custom properties, grouped and
  commented in plain English so the client can safely change a colour.
- Self-host fonts in `public/fonts/` with `font-display: swap`. No Google Fonts CDN call —
  it's a privacy and a performance issue, and it breaks if the CDN does.
- Fluid type with `clamp()`. Body line length under 75 characters.
- Mobile first. Most people will open this on a phone from a LinkedIn link.
- Visible keyboard focus states. Respect `prefers-reduced-motion`. Contrast at WCAG AA.

**STOP.** Client approves a direction before any page gets built.

---

## Phase 4 — Build the pages

Order matters — build the thing that carries the most weight first.

1. **Base layout** — header, footer, skip link, meta tags, one shared `<Layout>`.
2. **Gallery** (`/gallery`) — the hardest and most important piece. A masonry or
   justified grid handling mixed aspect ratios without awkward gaps. Click opens a
   lightbox with caption and keyboard navigation (arrows, Escape) and a focus trap.
   Lazy-load everything below the fold. If a category filter is warranted, it must work
   without JavaScript as a fallback.
3. **Case study index** (`/work`) — cards: cover image, client, title, year, one-line summary.
4. **Case study page** (`/work/[slug]`) — hero image, metadata block, the write-up,
   results treatment, inline images at full width, previous/next navigation at the foot.
5. **About** (`/about`) — headshot, bio, career history, CV download button.
6. **Contact** (`/contact`) — see Phase 6.
7. **Home** — build it *last*, once you know what the pieces look like. It should be a
   curated edit: a hero, two or three featured case studies, a strip of gallery work,
   one clear call to action. Not a table of contents for the whole site.
8. **404 page** — with a route back.

**Images — the part that most often goes wrong.**
Store uploads in `src/assets/media/` (not `public/`) so Astro can optimise them.
Frontmatter stores a path string, so resolve those strings to optimised assets using
`import.meta.glob('/src/assets/media/**/*.{jpg,jpeg,png,webp,avif}')` and pass the result
to Astro's `<Image>` / `<Picture>` component. Serve modern formats with responsive
`srcset`, width and height always set to prevent layout shift.

Build a small reusable wrapper component for this so there's exactly one place where
image handling lives. Verify it works end to end — including with an image that Pages CMS
uploaded, not just one you placed by hand — before moving on. If the glob approach fights
you, fall back to `public/media/` with a build-time compression step, and document the
trade-off in `CLAUDE.md`.

Every image needs meaningful `alt` text. For screenshots, describe what the work *is*,
not "screenshot".

**STOP** after the gallery, and again after the first case study page. These are the two
templates the client will live with.

---

## Phase 5 — Wire up the visual editor

1. Write `.pages.yml` in the repo root: content collections mapped to form fields, media
   folder set to `src/assets/media`, and the media output path configured so the strings
   Pages CMS writes match what Phase 4's image resolver expects. **This alignment is the
   whole ballgame** — check the current schema at `https://pagescms.org/docs` rather than
   working from memory, then test it for real.
2. Use sensible field types: rich text for bodies, image pickers for images, select lists
   for categories rather than free text (free text guarantees typos and orphaned filters),
   and a `draft` toggle on everything.
3. Write `description` text on every field, addressed to the client in plain language —
   "The image that shows on cards and at the top of the page. Landscape works best."
4. Walk the client through signing in at `app.pagescms.org` with GitHub and granting the
   Pages CMS app access to this one repository.
5. **Test it as the client, not as yourself.** Have *them* replace one placeholder gallery
   image with a real file of their own and rewrite a case study headline, through the CMS,
   while you watch. Then confirm it appears live. This is a rehearsal for the work they'll
   be doing for the next few weeks, so anything confusing here is a bug in the field
   labels, not a user error.

**STOP.** The client must successfully publish a change through the CMS, unaided,
before this phase is done.

---

## Phase 6 — Polish

**Contact.** No server means no traditional form. In order of preference:
1. A prominent `mailto:` link and profile links. Honest, zero maintenance, zero cost.
2. If they want a real form: Formspree or Formspark free tier, ~10 lines, no backend.
   Flag that it's a third party receiving messages, and add a honeypot field for spam.

**SEO and sharing.** Unique `<title>` and meta description per page, driven by content.
Open Graph and Twitter card tags — a LinkedIn share that renders a blank grey box is a
wasted impression, so verify the OG image actually resolves to an absolute URL. Add
`@astrojs/sitemap`, a `robots.txt`, and JSON-LD `Person` schema on the home page.

**Performance.** Target: home page under 1MB, largest contentful paint under 2 seconds on
4G. Run Lighthouse. Report the numbers to the client in plain terms.

**Accessibility pass.** Keyboard-navigate the entire site including the lightbox. Check
heading order. Check contrast. Test with images disabled.

**Details.** Favicon and Apple touch icon. `CNAME` if using a custom domain. Print
stylesheet for the case study pages — recruiters do print things.

**Cross-browser.** Check on a real phone, not just a narrow browser window.

**Placeholder guards.** The site goes live containing invented client names and sample
metrics. That's fine while nobody's looking, and a problem the moment someone is. Build
three guards:

1. **Keep the site out of search results until launch.** Add `noindex` to the robots meta
   tag and a blocking `robots.txt`, controlled by a single `launched: false` flag in
   `site.json`. Flipping it to `true` is the entire launch action. GitHub Pages on the
   free tier can't serve from a private repo, so the URL is technically public — this is
   what keeps it from being *found*.
2. **A dev-only banner.** When `launched` is false, show a fixed bar on every page:
   "Placeholder content — not live yet." Visible to anyone the client shares the link
   with, so a recruiter sent an early look doesn't read fake numbers as real.
3. **A pre-launch check.** A script, `npm run check:placeholders`, that lists every entry
   still marked `placeholder: true` and every `Sample` metric label. Wire it into the
   build so it prints a count on every deploy. The client should see that number fall
   over the coming weeks — it's a progress bar as much as a safety net.

**The launch checklist**, written into `README.md`:
- [ ] Every case study replaced, or the leftovers deleted
- [ ] Every gallery image replaced, or deleted
- [ ] About page and CV are yours
- [ ] `npm run check:placeholders` returns zero
- [ ] Real name, email, and social links in `site.json`
- [ ] Search the whole repo for the invented brand names — zero hits
- [ ] Set `launched: true`, push, confirm the banner is gone and `noindex` has lifted
- [ ] Share the link

---

## Phase 7 — Custom domain (optional)

If they want `theirname.com`: buy it (Cloudflare Registrar or Namecheap, roughly $10–15/year),
then in the repo Settings → Pages add the custom domain, create the `CNAME` file, and set the
DNS records GitHub specifies. Change `site` in `astro.config.mjs` to the new domain.
Enable "Enforce HTTPS" once the certificate provisions — it can take up to 24 hours,
which is normal and not a fault.

Worth doing. `theirname.com` on a business card beats `theirname.github.io`.

---

## Phase 8 — Handover

Two documents. They serve different readers.

**`CLAUDE.md`** — for future Claude Code sessions. Architecture, content model, the image
resolution pattern and why, the CMS config contract, conventions, known quirks, and a
list of things not to change without asking.

**`README.md`** — for the client. Written for someone who has never opened a terminal.
Lead with the placeholder workflow, because that's what they're about to spend weeks on:
- **Replacing a placeholder case study**, step by step, with a screenshot of the CMS screen
- **Replacing a gallery image**
- How to add a *new* case study once the placeholders are used up
- How to change your email or a social link
- The launch checklist from Phase 6
- How to check the site published successfully
- What to do when something looks broken — including: every change is reversible, GitHub
  keeps full history, and nothing you do in the CMS can permanently destroy the site
- The three terminal commands, with what each one is for

**Do not delete the placeholder content at handover.** It's the client's working template
and their reference for tone and length — deleting it leaves them with an empty site and
a blank page problem. It goes when they replace it, on their schedule, guarded by the
Phase 6 checks.

Finally: confirm the client can replace a placeholder case study end to end without help,
and do a final Lighthouse run.

---

## Working agreement for Claude Code

- **Explain in outcomes, not implementation.** "Your images will load about three times
  faster now" — not "I've configured sharp with AVIF output."
- **Never ask the client to choose between technical options** they have no basis to
  evaluate. Make the call, state it in one sentence, move on. Reserve their attention
  for design and content, where their judgement is genuinely better than yours.
- **Stop at every STOP.** These are the points where a wrong turn gets expensive.
- **Never invent a credential.** Placeholder content uses fictional companies and clearly
  labelled sample metrics. Never write a real brand name, a real award, or a plausible
  achievement into the client's site — not even temporarily. A fake line that survives to
  launch is a false claim on a professional's portfolio, and neither of you will spot it
  after the tenth read.
- **Commit often, with messages in plain English.** "Add gallery lightbox" not "feat(ui): impl modal."
- **Run `npm run build` before every push.** A broken build means a stale site.
- **Never commit secrets**, API keys, or the client's personal documents.
- **Check current docs for Astro, the deploy action, and Pages CMS** rather than relying
  on memory. These tools move.
- **If the client asks for something that will be fragile or hard to maintain, say so**
  before building it. Their long-term ability to run this site alone matters more than
  any single feature.
