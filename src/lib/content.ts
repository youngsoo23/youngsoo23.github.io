import { getCollection, type CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;

const byOrder = (a: Project, b: Project): number => a.data.order - b.data.order;

/** 대표 프로젝트(회사)와 사이드 프로젝트(개인) */
export async function getProjectGroups(): Promise<{ flagship: Project[]; side: Project[] }> {
  const projects = await getCollection('projects');
  return {
    flagship: projects.filter((p) => p.data.type === 'flagship').sort(byOrder),
    side: projects.filter((p) => p.data.type === 'personal').sort(byOrder),
  };
}

export function projectName(project: Project): string {
  return project.data.name ?? project.data.title;
}

/** title에서 이름을 뺀 나머지 설명 */
export function projectSubtitle(project: Project): string {
  const prefix = `${projectName(project)} — `;
  return project.data.title.startsWith(prefix) ? project.data.title.slice(prefix.length) : '';
}

export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog');
  return posts.filter((post) => !post.data.draft).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
