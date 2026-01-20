import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['app', 'web']),
    platforms: z.array(z.object({
      name: z.string(),
      status: z.enum(['active', 'development', 'maintenance', 'archived']),
    })),
    icon: z.string().optional(),
    storeUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    siteUrl: z.string().url().optional(),
    summary: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const support = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/support' }),
  schema: z.object({
    appName: z.string(),
    contactEmail: z.string().email(),
    responseTime: z.string(),
  }),
});

const privacy = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/privacy' }),
  schema: z.object({
    appName: z.string(),
    effectiveDate: z.string(),
    contactEmail: z.string().email(),
    dataCollected: z.array(z.string()),
    thirdParties: z.array(z.string()),
  }),
});

export const collections = { projects, support, privacy };
