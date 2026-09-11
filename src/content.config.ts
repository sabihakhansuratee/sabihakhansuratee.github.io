import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Image fields below are plain strings, not Astro's `image()` schema helper.
// Reason: real images live in one shared src/assets/media/ folder (so Pages CMS
// uploads and hand-placed files resolve the same way), decoupled from where each
// content entry's markdown file happens to live. The image() helper resolves
// paths relative to the entry file, which doesn't fit a shared media folder.
// Phase 4 builds the shared resolver (import.meta.glob over src/assets/media)
// that turns these path strings into optimised <Image>/<Picture> output.

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    // Who the work was for. For internal programmes with no separate outside
    // client, this is the programme/event name itself.
    client: z.string(),
    role: z.string(),
    year: z.number(),
    summary: z.string(),
    coverImage: z.string(),
    tags: z.array(z.string()).default([]),
    results: z
      .array(
        z.object({
          metric: z.string(),
          value: z.string(),
        })
      )
      .default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
    // True while this entry is invented placeholder content, not the client's own work.
    placeholder: z.boolean().default(false),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    // For a video item, this is the poster/thumbnail shown in the grid.
    image: z.string(),
    type: z.enum(['image', 'video']).default('image'),
    // Required when type is 'video'. The YouTube video ID to embed (not a full URL).
    youtubeId: z.string().optional(),
    client: z.string().optional(),
    // Drives grouping — by project/event, per the client's preference.
    category: z.string().optional(),
    year: z.number().optional(),
    caption: z.string().optional(),
    order: z.number().default(0),
    placeholder: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    // Optional fields below exist only for the About page; a plain prose
    // page (like a future "colophon" or "now" page) just leaves them unset.
    headshot: z.string().optional(),
    cvFile: z.string().optional(),
    career: z
      .array(
        z.object({
          role: z.string(),
          org: z.string(),
          period: z.string(),
        })
      )
      .optional(),
    placeholder: z.boolean().default(false),
  }),
});

const settings = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/settings' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    tagline: z.string(),
    email: z.string(),
    social: z.object({
      linkedin: z.string().optional(),
    }),
    cvFile: z.string(),
    seo: z.object({
      defaultDescription: z.string(),
      ogImage: z.string().optional(),
    }),
    // Flips to true at launch. Drives the noindex/banner guards built in Phase 6.
    launched: z.boolean().default(false),
  }),
});

export const collections = { caseStudies, gallery, pages, settings };
