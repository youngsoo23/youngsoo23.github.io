import { expect, test } from '@playwright/test';
import { LINKEDIN_URL, PROFILE_PHOTO, SEASONAL_EFFECTS_ENABLED, TAGLINE } from '@/lib/site';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('home page shows the hero with its calls to action', async ({ page }) => {
  await expect(page).toHaveTitle('오영수 | Backend Developer');
  await expect(page.locator('h1')).toHaveText('오영수 | Backend Developer');
  await expect(page.getByText(TAGLINE)).toBeVisible();
  await expect(page.getByRole('link', { name: '이력서 보기' })).toHaveAttribute('href', '/resume/');
  await expect(page.getByRole('link', { name: '프로젝트 보기', exact: true })).toHaveAttribute('href', '/projects/');
});

test('home page summarizes the career with three highlighted keywords', async ({ page }) => {
  const about = page.getByRole('region', { name: '소개' });
  await expect(about).toContainText('최근에는 주식회사 아치서울에서 백엔드 파트장으로 재직했습니다.');
  await expect(about.locator('.highlight')).toHaveText(['6년 7개월', '레거시 리빌드', '운영 구조 개선']);
});

test('home page features the three flagship projects', async ({ page }) => {
  const cards = page.getByRole('region', { name: '대표 프로젝트' }).getByRole('heading', { level: 3 });
  await expect(cards).toHaveText(['Toggle 3.0', 'Global MVP', 'Qbile Backoffice']);
});

test('empty optional settings stay hidden', async ({ page }) => {
  await expect(page.locator('figure')).toHaveCount(PROFILE_PHOTO ? 1 : 0);
  await expect(page.locator('a[aria-label="LinkedIn"]')).toHaveCount(LINKEDIN_URL ? 1 : 0);
  await expect(page.locator('body')).not.toContainText('TODO');
});

test('seasonal effects follow the site setting', async ({ page }) => {
  await expect(page.locator('.falling-particles')).toHaveCount(SEASONAL_EFFECTS_ENABLED ? 3 : 0);
  await expect(page.locator('[data-shimmer]')).toHaveCount(SEASONAL_EFFECTS_ENABLED ? 1 : 0);
});
