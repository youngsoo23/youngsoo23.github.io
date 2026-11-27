import { expect, test } from '@playwright/test';
import { RESUME_PDF_PATH } from '@/lib/site';

test('resume offers the PDF download', async ({ page, request }) => {
  await page.goto('/resume/');
  await expect(page.getByRole('link', { name: 'PDF 다운로드' })).toHaveAttribute('href', RESUME_PDF_PATH);
  expect((await request.get(RESUME_PDF_PATH)).status()).toBe(200);
});

test('printed resume drops the navigation, shadows, and dark colors', async ({ page }) => {
  await page.emulateMedia({ media: 'print', colorScheme: 'dark' });
  await page.goto('/resume/');
  for (const selector of ['.site-header', '.site-footer', '.print-hidden']) {
    await expect(page.locator(selector)).toBeHidden();
  }
  await expect(page.locator('.resume-sheet')).toHaveCSS('box-shadow', 'none');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(page.locator('.resume h1')).toHaveCSS('color', 'rgb(0, 0, 0)');
  await expect(page.locator('.content-shell')).toHaveCSS('padding-bottom', '0px');
  await expect(page.locator('body')).toHaveCSS('background-image', 'none');
});

test('printed resume fits on two A4 pages', async ({ page }) => {
  await page.goto('/resume/');
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  const pdf = (await page.pdf({ preferCSSPageSize: true, format: 'A4' })).toString('latin1');
  expect(pdf.match(/\/Type\s*\/Page(?!s)/g)?.length).toBeLessThanOrEqual(2);
});
