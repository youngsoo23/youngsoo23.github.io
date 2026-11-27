import { expect, test } from '@playwright/test';
import { PAGE_PATHS } from '../pages';

const PALETTES: string[] = ['neon', 'autumn', 'winter', 'spring', 'summer'].flatMap((family) => [
  `${family}-light`,
  `${family}-dark`,
]);
const WCAG_AA = 4.5;

// 모든 계절 팔레트에서 화면의 글자와 배경 대비가 WCAG AA(4.5:1)를 넘는지 확인한다.
test('text meets WCAG AA contrast in every palette', async ({ page }) => {
  test.setTimeout(180_000);
  const failures: string[] = [];

  for (const path of PAGE_PATHS) {
    await page.goto(path);
    for (const palette of PALETTES) {
      const found = await page.evaluate(
        async ({ palette, minimum }) => {
          document.documentElement.setAttribute('data-palette', palette);
          // 색 전환이 끝나길 기다린다. 계절 효과의 무한 반복 애니메이션은 제외한다.
          const finite = document
            .getAnimations()
            .filter((animation) => animation.effect?.getComputedTiming().iterations !== Infinity);
          await Promise.all(finite.map((animation) => animation.finished.catch(() => undefined)));
          const context = document.createElement('canvas').getContext('2d', { willReadFrequently: true })!;
          const toRgba = (color: string): number[] => {
            context.clearRect(0, 0, 1, 1);
            context.fillStyle = color;
            context.fillRect(0, 0, 1, 1);
            const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
            return [r, g, b, a / 255];
          };
          const luminance = (color: number[]): number =>
            color
              .slice(0, 3)
              .map((value) => value / 255)
              .map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4))
              .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
          // 반투명 배경은 바깥 요소부터 차례로 겹쳐 실제 배경색을 구한다.
          const backgroundOf = (element: Element): number[] => {
            const layers: number[][] = [];
            for (let node: Element | null = element; node; node = node.parentElement) {
              layers.unshift(toRgba(getComputedStyle(node).backgroundColor));
            }
            return layers.reduce(
              (base, layer) => base.map((value, i) => layer[i] * layer[3] + value * (1 - layer[3])),
              [255, 255, 255],
            );
          };
          const low: string[] = [];
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          while (walker.nextNode()) {
            const text = walker.currentNode.textContent?.trim();
            const element = walker.currentNode.parentElement!;
            if (!text || !element.checkVisibility()) continue;
            if (element.closest('script, style, .skip-link, [aria-hidden="true"]')) continue;
            const foreground = luminance(toRgba(getComputedStyle(element).color));
            const background = luminance(backgroundOf(element));
            const ratio = (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
            if (ratio < minimum) low.push(`${ratio.toFixed(2)} "${text.slice(0, 30)}"`);
          }
          return [...new Set(low)];
        },
        { palette, minimum: WCAG_AA },
      );
      failures.push(...found.map((item) => `${path} ${palette}: ${item}`));
    }
  }

  expect(failures).toEqual([]);
});
