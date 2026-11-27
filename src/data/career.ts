import { formatDuration, totalMonths, type Span } from '@/lib/career';

export interface CareerEntry extends Span {
  company: string;
  role: string;
  /** 고용 형태 등 덧붙일 말 */
  note?: string;
  summary: string;
  tags: string[];
  projectSlugs?: string[];
}

export const career: CareerEntry[] = [
  {
    company: '주식회사 아치서울',
    start: '2026.02',
    end: '2026.05',
    role: '백엔드 파트장',
    summary:
      'Qbile 차세대 기기 관리 Backoffice에서 Spring Security·JWT 기반 관리자 인증/인가 시스템을 구축하고, ADMIN/CS/EXTERNAL 권한별 접근 제어와 QR Device 관리·접근 이력 추적 기능을 개발했습니다.',
    tags: ['Java 21', 'Spring Boot 4.x', 'JPA', 'QueryDSL', 'PostgreSQL', 'Spring Security'],
    projectSlugs: ['qbile-backoffice'],
  },
  {
    company: '오픈플랜주식회사',
    start: '2022.11',
    end: '2026.01',
    role: '백엔드 매니저',
    summary:
      '레거시 PHP 플랫폼(토글 1.0)을 Spring Boot로 전면 리빌드하고(Toggle 3.0), Stripe·해외 보험사 API 기반 글로벌 신규 플랫폼(Global MVP)을 런칭했습니다.',
    tags: [],
    projectSlugs: ['toggle-3-0', 'global-mvp'],
  },
  {
    company: '게임스카우트',
    start: '2022.09',
    end: '2023.02',
    note: '프리랜서',
    role: '백엔드',
    summary:
      '게임 채용 플랫폼의 회원가입·로그인·채용공고·매칭 지원 기능과 관리자 백오피스를 개발했습니다. QueryDSL 기반 다중 조건 검색·매칭 로직을 최적화하고, Gradle 멀티모듈 구조로 공통 로직을 모듈화했습니다.',
    tags: ['Java 17', 'Spring Boot 2.x', 'JPA', 'QueryDSL', 'MySQL', 'Gradle'],
    projectSlugs: ['gamescout-multi-module'],
  },
  {
    company: '주식회사 휴니크',
    start: '2021.08',
    end: '2022.10',
    role: '백엔드 매니저',
    summary:
      'PHP 외주 프로젝트였던 매장 매출관리 플랫폼(Zelotek 2.0)을 Spring Boot로 전면 마이그레이션하고, AWS ECS·CodePipeline으로 무중단 배포 체계를 마련했습니다. 이어서 바코드 기반 출입·예약 서비스(Banny)를 Bitbucket Pipelines로 배포했고, 두 서비스 간 공통 유틸·응답 스키마·에러 핸들링 구조를 공유해 협업 효율을 높였습니다.',
    tags: ['Java 17', 'Spring Boot 2.x', 'Spring Security', 'JPA', 'QueryDSL', 'MySQL', 'AWS'],
    projectSlugs: ['huniq-common-module'],
  },
  {
    company: '주식회사 호두랩스',
    start: '2019.11',
    end: '2021.08',
    role: '백엔드 프로',
    summary:
      '아동 영어 학습 플랫폼(호두잉글리시)의 결제·회원 관리 기능을 개발하고, 간편 로그인(카카오/네이버)과 Siren24 실명인증을 통합했습니다. 이후 교육 콘텐츠·도서 판매·학습관리시스템(LMS, 땅콩 홈페이지)의 진도·결제·통계 기능을 고도화했습니다.',
    tags: ['Java 8', 'Spring Boot 2.x', 'JPA', 'Gradle', 'Thymeleaf', 'jQuery'],
    projectSlugs: ['hoodu-easy-login'],
  },
];

export const totalExperience = formatDuration(totalMonths(career));
