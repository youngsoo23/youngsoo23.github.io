# 오영수 · 백엔드 개발자 포트폴리오

<https://youngsoo23.github.io> 의 소스입니다. [Astro](https://astro.build/)와 Tailwind CSS로 만들었고, [Seasons](https://github.com/nicomiguelino/astro-seasons) 테마를 바탕으로 합니다.

## 명령어

Node.js 24 이상을 권장합니다.

```sh
npm install
npm run dev           # 개발 서버 (:4321)
npm run build         # 빌드
npm run preview       # 빌드 결과 미리보기
npm run check         # Astro 타입 검사
npm run lint:check    # ESLint
npm run format:check  # Prettier
npm run test:e2e      # Playwright 동작 테스트와 스크린샷
```

`npm install`은 Husky pre-commit 훅(`lint:check`, `format:check`, `check`)을 설정합니다. Playwright 브라우저는 처음 한 번 `npx playwright install chromium`으로 설치합니다.

## 내용 고치기

| 바꿀 것                                                          | 파일                                                                      |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 이름, 직함, 한 줄 소개, 연락처, LinkedIn, 프로필 사진, 계절 효과 | `src/lib/site.ts`                                                         |
| 소개, 역량, 기술 스택, 학력                                      | `src/data/about.ts`                                                       |
| 경력 (총 경력 기간은 여기서 계산)                                | `src/data/career.ts`                                                      |
| 프로젝트 (카드 문구, 성과 지표, 링크)                            | `src/content/projects/*.md`                                               |
| 기술 글                                                          | `src/content/blog/*.md` (`title`, `description`, `date`, `tags`, `draft`) |
| 이력서 PDF                                                       | `public/backend_ohyoungsoo.pdf`                                           |
| 홈의 소개 문장                                                   | `src/pages/index.astro` (검색 본문 `src/lib/search.ts`도 함께)            |

- **성과 지표:** 프로젝트 frontmatter의 `metric.value`와 `metric.label`을 채우면 표시됩니다. `TODO`이거나 비어 있으면 숨깁니다.
- **링크:** 직접 쓰는 경로는 `src/lib/paths.ts`의 `withBase()`를 사용하고, Markdown에서는 상대 링크를 씁니다.
- **프로필 사진:** `src/assets/home/`에 파일을 넣고 `PROFILE_PHOTO`에 파일 이름을 적습니다.

## 계절 테마

방문한 날짜에 따라 팔레트가 바뀝니다(가을 9/22–12/21, 겨울 12/22–3/19, 봄 3/20–6/20, 여름 6/21–9/21). 상단의 테마 선택에서 고정할 수 있고, 라이트/다크는 별도 토글입니다. 모든 팔레트의 글자 대비는 `src/tests/e2e/contrast.spec.ts`가 확인합니다.

## 배포

`main`에 push하면 `.github/workflows/deploy.yml`이 GitHub Pages에 배포합니다. 도메인 루트 배포라 `BASE_PATH`는 쓰지 않습니다.

## License

코드는 [AGPL-3.0-or-later](LICENSE)입니다.

**콘텐츠 예외:** 글과 프로젝트 설명(`src/content/`), 이력·소개 데이터(`src/data/`), 이력서 PDF와 사진의 저작권은 오영수에게 있으며 AGPL 라이선스 대상이 아닙니다.

This project is a modified version of [Seasons (astro-seasons)](https://github.com/nicomiguelino/astro-seasons) by Nico Miguelino, which is itself a modified version of [astro-palette](https://github.com/joshruggles/astro-palette) by Josh Ruggles. Both are licensed under AGPL-3.0-or-later. Nico Miguelino's 2026 changes include the season-aware themes and seasonal effects, the neobrutalist design, Tailwind CSS, Fuse.js search, the added pages and components, and the linting, formatting, and testing setup.

Modified by 오영수 in November 2026: Korean content and typography, portfolio pages (about, career, projects, resume), posts routes, contrast adjustments, print styles, and tests.

If you deploy a modified version of this project as a website, [AGPL-3.0 section 13](https://www.gnu.org/licenses/agpl-3.0.html#section13) requires you to offer your users the corresponding source code. The site footer links to the source; set `SOURCE_URL` in `src/lib/site.ts` to the repository that builds your site.

With thanks to:

- [astro-palette](https://github.com/joshruggles/astro-palette) by Josh Ruggles (AGPL-3.0-or-later)
- [herdr](https://github.com/ogulcancelik/herdr) by Oğulcan Çelik, the website theme this one grew out of, and the reason it is AGPL-3.0-or-later
- Style: [Neubrutalism](https://neubrutalism.com/)
- Fonts: [Pretendard](https://github.com/orioncactus/pretendard), [JetBrains Mono](https://www.jetbrains.com/lp/mono/), Inter, Space Grotesk (SIL Open Font License 1.1)
- Icons: [Tabler Icons](https://tabler.io/icons) (MIT)
- Search: [Fuse.js](https://www.fusejs.io) (Apache-2.0)
