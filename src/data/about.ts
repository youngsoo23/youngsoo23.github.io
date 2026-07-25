export const intro = {
  role: 'Java·Spring 기반 7년차 백엔드 개발자',
  mission: '복잡한 업무 흐름을 구조화하고, 운영 문제를 시스템으로 개선합니다.',
  summary:
    '7년간 보험·결제 플랫폼에서 레거시 시스템을 리빌드하고 운영 구조를 개선해왔습니다. ' +
    '외주 PHP 기반 플랫폼을 Spring Boot로 전면 재구축하며 API·DB·백오피스 구조를 재설계했고, ' +
    '결제·실명인증 같은 외부 연동에서는 장애와 비용 리스크를 격리하는 방향으로 판단해왔습니다.',
};

export const strengths = [
  {
    title: '레거시 시스템 리빌드',
    detail:
      'PHP 기반 레거시 플랫폼을 Spring Boot로 전면 재구축한 경험이 세 차례 있습니다. API·DB·서비스 구조를 처음부터 다시 설계합니다.',
  },
  {
    title: '결제·외부 API 연동',
    detail:
      'Stripe, PortOne, 해외 보험사 API 등 외부 시스템과의 연동에서 idempotency와 Webhook 기반 비동기 처리를 설계합니다.',
  },
  {
    title: '백오피스·운영 자동화',
    detail: '운영팀이 개발자 개입 없이 업무를 처리할 수 있도록 백오피스와 권한 체계를 구축합니다.',
  },
  {
    title: 'DB·도메인 설계',
    detail: 'JPA·QueryDSL 기반으로 ORM을 일관화하고, Liquibase로 스키마 변경 이력을 관리합니다.',
  },
  {
    title: '배포·운영 안정화',
    detail: 'AWS ECS·Jenkins·CodePipeline 기반 CI/CD를 구성하고, Slack 장애 알림으로 사전 대응 체계를 만듭니다.',
  },
];

export const approach = [
  {
    title: '외부 연동은 별도 레이어로 분리합니다',
    detail:
      '결제·인증·알림처럼 외부 기관에 의존하는 기능은 별도 서비스로 분리해, 장애나 비용 문제가 생겨도 전체 서비스로 번지지 않도록 설계합니다.',
  },
  {
    title: '반복되는 운영 업무는 시스템으로 만듭니다',
    detail:
      '개발자가 매번 수작업으로 처리하던 운영 요청을 백오피스와 자동화로 대체해, 개발 리소스가 핵심 기능에 집중되도록 합니다.',
  },
  {
    title: '장애는 사전에 감지합니다',
    detail: 'Slack 알림 등으로 장애 징후를 미리 포착해, 운영팀이 문제가 커지기 전에 대응할 수 있는 체계를 우선합니다.',
  },
  {
    title: '속도와 유지보수성 사이에서 실용적으로 판단합니다',
    detail: '이상적인 아키텍처보다, 지금 필요한 검증 속도와 이후 유지보수 비용을 함께 고려해 구조를 선택합니다.',
  },
];

export const skillGroups = [
  { label: 'Core', items: ['Java', 'Spring Boot', 'JPA'] },
  { label: 'Data', items: ['MySQL', 'Redis', 'MongoDB'] },
  { label: 'Infra & Tools', items: ['Docker', 'AWS', 'Jenkins', 'Git', 'GitHub'] },
  { label: 'Collaboration', items: ['RESTful API', 'JIRA', 'Slack', 'HTML5', 'jQuery'] },
];

export const education = [
  {
    school: 'California State University, Bakersfield',
    degree: 'Computer Science · Cum Laude, GPA 3.57 / 4.0',
    period: '2015.08 – 2018.05',
  },
  {
    school: 'Bakersfield College',
    degree: 'Associate Degree · STEM (Computer Science, Mathematics)',
    period: '2011.08 – 2015.03',
  },
];

export const contact = {
  email: 'oh.youngsoo23@gmail.com',
  github: 'https://github.com/youngsoo23',
};
