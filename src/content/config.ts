import { defineCollection, z } from 'astro:content';

const dateValue = z.preprocess((value) => {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'string') {
    return new Date(value);
  }

  return value;
}, z.date());

const orderedItem = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number(),
});

const datedItem = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: dateValue,
  tags: z
    .array(z.string())
    .nullable()
    .transform((tags) => tags ?? [])
    .default([]),
  draft: z.boolean().default(false),
});

const noteItem = datedItem.extend({
  layout: z.string().optional(),
  lang: z.string().optional(),
});

export const collections = {
  projects: defineCollection({
    schema: orderedItem.extend({
      tags: z.array(z.string()).default([]),
      repo: z.string().url().optional(),
      demo: z.string().url().optional(),
    }),
  }),
  notes: defineCollection({ schema: noteItem }),
  blog: defineCollection({ schema: datedItem }),
  world: defineCollection({ schema: orderedItem }),
  novels: defineCollection({ schema: orderedItem }),
  commissions: defineCollection({ schema: orderedItem }),
};
