import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const BLOG_DIRECTORY: string = process.env.USE_FIXTURE_POSTS ? './src/tests/fixtures/blog' : './src/content/blog';

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: BLOG_DIRECTORY }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z
      .array(z.string())
      .default([])
      .transform((tags: string[]): string[] => [...new Set(tags)]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    company: z.string(),
    period: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    type: z.enum(['flagship', 'case', 'personal']),
    order: z.number().default(0),
    /** 카드에 쓰는 짧은 이름. 없으면 title을 쓴다. */
    name: z.string().optional(),
    /** 홈 대표 프로젝트 카드의 Tabler 아이콘 이름 */
    icon: z.string().optional(),
    card: z.object({ problem: z.string(), action: z.string(), result: z.string() }).optional(),
    metric: z
      .object({
        value: z.union([z.string(), z.number()]).nullish(),
        label: z.string().nullish(),
      })
      .optional(),
    links: z.array(z.object({ kind: z.enum(['github', 'demo']), url: z.url() })).default([]),
  }),
});

export const collections = { blog, projects };
