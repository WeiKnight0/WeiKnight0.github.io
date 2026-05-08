import { defineCollection, z } from 'astro:content';

const orderedItem = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number(),
});

const datedItem = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
});

export const collections = {
  projects: defineCollection({ schema: orderedItem.extend({ tags: z.array(z.string()) }) }),
  notes: defineCollection({ schema: datedItem }),
  blog: defineCollection({ schema: datedItem }),
  world: defineCollection({ schema: orderedItem }),
  novels: defineCollection({ schema: orderedItem }),
  commissions: defineCollection({ schema: orderedItem }),
};
