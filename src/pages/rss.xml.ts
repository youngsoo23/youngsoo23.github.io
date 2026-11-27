import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts } from '@/lib/content';
import { withBase } from '@/lib/paths';
import { postSlug } from '@/lib/posts';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: `${SITE_NAME} 기술 글`,
    description: SITE_DESCRIPTION,
    site: new URL(withBase('/'), context.site!).toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `posts/${postSlug(post)}/`,
    })),
    customData: '<language>ko-kr</language>',
  });
}
