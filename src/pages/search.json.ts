import { getCollection } from 'astro:content';
import { getPublishedPosts, projectName } from '@/lib/content';
import { withBase } from '@/lib/paths';
import { postSlug } from '@/lib/posts';
import { getPageSearchEntries, type SearchEntry } from '@/lib/search';

export async function GET(): Promise<Response> {
  const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
  const pageEntries = getPageSearchEntries(
    projects.map((project) => ({ ...project.data, name: projectName(project) })),
  );
  const projectEntries: SearchEntry[] = projects.map((project) => ({
    title: project.data.title,
    description: project.data.summary,
    tags: project.data.tags,
    body: `${project.data.company} ${project.body ?? ''}`,
    url: `/projects/${project.id}/`,
  }));
  const postEntries: SearchEntry[] = (await getPublishedPosts()).map((post) => ({
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    body: post.body ?? '',
    url: `/posts/${postSlug(post)}/`,
  }));

  const entries: SearchEntry[] = [...pageEntries, ...projectEntries, ...postEntries].map((entry) => ({
    ...entry,
    url: withBase(entry.url),
  }));

  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json' },
  });
}
