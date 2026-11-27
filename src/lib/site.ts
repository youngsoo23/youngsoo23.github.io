// 사이트 전역 설정. astro.config.mjs에서도 읽으므로 이 파일에서는 다른 모듈을 import하지 않는다.

export const SITE_NAME = '오영수';
export const AUTHOR_NAME = '오영수';
export const JOB_TITLE = '백엔드 개발자';
/** 홈 히어로에서 이름 옆에 표시하는 영문 직함 */
export const HERO_ROLE = 'Backend Developer';
export const TAGLINE = '복잡한 업무 흐름을 구조화하고, 운영 문제를 시스템으로 개선합니다.';
export const SITE_DESCRIPTION = 'Java·Spring 기반 백엔드 개발자 오영수의 포트폴리오';
export const SITE_URL = 'https://youngsoo23.github.io';

export const EMAIL = 'oh.youngsoo23@gmail.com';
export const GITHUB_URL = 'https://github.com/youngsoo23';
/** TODO: LinkedIn 주소. 비어 있으면 아이콘을 숨긴다. */
export const LINKEDIN_URL: string = '';
// AGPL-3.0 section 13: point this at the repository that builds your deployed site.
export const SOURCE_URL = 'https://github.com/youngsoo23/youngsoo23.github.io';

export const RESUME_PDF_PATH = '/backend_ohyoungsoo.pdf';

/** TODO: 프로필 사진. src/assets/home/ 에 넣은 파일 이름(예: 'profile.jpg'). 비어 있으면 폴라로이드를 숨긴다. */
export const PROFILE_PHOTO: string = '';
export const PROFILE_PHOTO_ALT = '오영수 프로필 사진';
/** 폴라로이드 아래 문구. 비어 있으면 표시하지 않는다. */
export const PROFILE_PHOTO_CAPTION: string = '';

/** 홈의 계절 효과(낙엽·눈·꽃잎, 여름의 햇살과 아지랑이). 본문 가독성을 위해 기본은 끔. */
export const SEASONAL_EFFECTS_ENABLED: boolean = false;

export const ABOUT_DESCRIPTION = '핵심 역량과 일하는 방식을 정리했습니다.';
export const EXPERIENCE_DESCRIPTION = '지금까지 일한 곳과 맡았던 일을 정리했습니다.';
export const PROJECTS_DESCRIPTION = '어떤 문제를 어떻게 풀었는지 정리했습니다.';
export const BLOG_DESCRIPTION = '기술적 판단과 문제 해결 과정을 정리합니다.';
export const TAGS_DESCRIPTION = '태그별로 모아 본 글입니다.';
export const RESUME_DESCRIPTION = '오영수의 이력서';
