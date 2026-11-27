// 유지해야 하는 주소. 글 상세는 테스트에서 고정용 글을 쓴다.
export const PROJECT_SLUGS: string[] = [
  'toggle-3-0',
  'global-mvp',
  'qbile-backoffice',
  'resume-matcher',
  'gamescout-multi-module',
  'huniq-common-module',
  'hoodu-easy-login',
];

export const PAGE_PATHS: string[] = [
  '/',
  '/about/',
  '/career/',
  '/projects/',
  '/posts/',
  '/posts/fixture-post-one/',
  '/resume/',
  '/tags/',
  '/tags/fixtures/',
  ...PROJECT_SLUGS.map((slug) => `/projects/${slug}/`),
];
