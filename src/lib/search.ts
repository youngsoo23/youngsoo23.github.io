// 정적 페이지의 검색 본문. 화면과 같은 데이터에서 만들어, 내용을 고치면 검색도 따라 바뀐다.
// 화면에만 직접 적은 문구를 바꿨다면 여기도 함께 고친다.
import { approach, education, intro, learning, skillGroups, strengths } from '@/data/about';
import { career, totalExperience } from '@/data/career';
import { formatPeriod } from '@/lib/career';
import { withRo } from '@/lib/korean';
import {
  ABOUT_DESCRIPTION,
  AUTHOR_NAME,
  BLOG_DESCRIPTION,
  EXPERIENCE_DESCRIPTION,
  HERO_ROLE,
  PROJECTS_DESCRIPTION,
  RESUME_DESCRIPTION,
  SITE_DESCRIPTION,
  TAGLINE,
  TAGS_DESCRIPTION,
} from '@/lib/site';

export type SearchEntry = {
  title: string;
  description: string;
  tags: string[];
  body: string;
  url: string;
};

export interface SearchProject {
  name: string;
  title: string;
  summary: string;
  company: string;
  type: 'flagship' | 'case' | 'personal';
  tags: string[];
  card?: { problem: string; action: string; result: string };
}

export function getPageSearchEntries(projects: SearchProject[]): SearchEntry[] {
  const latest = career[0];
  const flagship = projects.filter((project) => project.type === 'flagship');
  const side = projects.filter((project) => project.type === 'personal');
  const skills = skillGroups.flatMap((group) => group.items);
  const careerText = career
    .map((entry) => `${entry.company} ${entry.role} (${formatPeriod(entry)}). ${entry.summary}`)
    .join(' ');

  return [
    {
      title: '홈',
      description: SITE_DESCRIPTION,
      tags: ['포트폴리오', '백엔드'],
      body: [
        `${AUTHOR_NAME} ${HERO_ROLE}. ${TAGLINE}`,
        `${intro.role}로 ${totalExperience} 동안 보험·결제 플랫폼의 레거시 리빌드와 운영 구조 개선을 담당했습니다.`,
        `${latest.end ? '최근에는' : '현재'} ${latest.company}에서 ${withRo(latest.role)} ${latest.end ? '재직했습니다' : '재직 중입니다'}.`,
        `대표 프로젝트: ${flagship.map((project) => project.title).join(', ')}.`,
        `사이드 프로젝트: ${side.map((project) => project.title).join(', ')}.`,
      ].join(' '),
      url: '/',
    },
    {
      title: '소개',
      description: ABOUT_DESCRIPTION,
      tags: skills,
      body: [
        intro.summary,
        '핵심 역량.',
        ...strengths.map((item) => `${item.title}: ${item.detail}`),
        '업무 방식.',
        ...approach.map((item) => `${item.title}. ${item.detail}`),
        `기술 스택: ${skills.join(', ')}.`,
        '학습 기록.',
        ...learning.map((item) => `${item.title} ${item.detail}`),
        '학력.',
        ...education.map((item) => `${item.school} ${item.degree}`),
      ].join(' '),
      url: '/about/',
    },
    {
      title: '경력',
      description: EXPERIENCE_DESCRIPTION,
      tags: career.map((entry) => entry.company),
      body: `총 경력 ${totalExperience}. ${careerText}`,
      url: '/career/',
    },
    {
      title: '프로젝트',
      description: PROJECTS_DESCRIPTION,
      tags: [...new Set(projects.flatMap((project) => project.tags))],
      body: [...flagship, ...side]
        .map((project) =>
          [
            project.title,
            project.company,
            project.card
              ? `문제: ${project.card.problem} 내가 한 일: ${project.card.action} 결과: ${project.card.result}`
              : project.summary,
          ].join(' '),
        )
        .join(' '),
      url: '/projects/',
    },
    { title: '글', description: BLOG_DESCRIPTION, tags: [], body: '기술 글 목록', url: '/posts/' },
    { title: '태그', description: TAGS_DESCRIPTION, tags: [], body: '태그별 글 목록', url: '/tags/' },
    {
      title: '이력서',
      description: RESUME_DESCRIPTION,
      tags: ['resume', 'PDF'],
      body: `${intro.role} 경력 ${totalExperience}. 이력서 PDF 다운로드.`,
      url: '/resume/',
    },
  ];
}
