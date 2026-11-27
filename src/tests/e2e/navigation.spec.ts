import { expect, test } from '@playwright/test';
import { PAGE_PATHS } from '../pages';

const MENU: string[] = ['홈', '소개', '경력', '프로젝트', '글', '이력서'];

test('primary navigation lists the Korean menu', async ({ page }) => {
  await page.goto('/career/');
  const links = page.locator('.nav-links a');
  await expect(links).toHaveText(MENU);
  await expect(links.filter({ hasText: '경력' })).toHaveAttribute('aria-current', 'page');
});

test('phone navigation keeps the header icons and the menu', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await page.goto('/');
  for (const selector of ['#search-open', '#theme-picker summary', '#theme-toggle']) {
    await expect(page.locator(selector)).toBeVisible();
  }
  await page.locator('summary[aria-label="메뉴 열기"]').click();
  await expect(page.locator('.nav-menu-panel a')).toHaveText(MENU);
});

test('every internal link resolves', async ({ page, request }) => {
  const targets = new Set<string>(PAGE_PATHS);
  for (const path of PAGE_PATHS) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href')))) {
      targets.add(href!);
    }
  }
  for (const target of targets) expect((await request.get(target)).status(), target).toBe(200);
});

test('removed template pages are gone', async ({ request }) => {
  for (const path of ['/colors/', '/blog/', '/experience/']) expect((await request.get(path)).status(), path).toBe(404);
});

for (const width of [320, 375, 1280]) {
  test(`pages do not scroll sideways at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    for (const path of PAGE_PATHS) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready.then(() => undefined));
      expect(await page.evaluate(() => document.documentElement.scrollWidth), path).toBe(width);
    }
  });
}

test('project cards without links have no link row', async ({ page }) => {
  await page.goto('/projects/');
  await expect(page.locator('[data-project-links]')).toHaveCount(0);
  await expect(page.locator('[data-metric]')).toHaveCount(0);
  await expect(page.getByText('개인 프로젝트', { exact: false })).toHaveCount(1);
});

test('header controls keep working after moving between pages', async ({ page }) => {
  await page.goto('/');
  await page.locator('.nav-links a', { hasText: '경력' }).click();
  await expect(page).toHaveURL('/career/');

  const palette = await page.locator('html').getAttribute('data-palette');
  await page.locator('#theme-toggle').click();
  await expect(page.locator('html')).not.toHaveAttribute('data-palette', palette!);
  await page.locator('#search-open').click();
  await expect(page.locator('#search-overlay')).toBeVisible();
});
