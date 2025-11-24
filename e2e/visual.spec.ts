import { test, expect } from '@playwright/test';

test('homepage snapshot', async ({ page }) => {
  // Update URL if you run dev server on a different port
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  // full page screenshot
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('home-full.png');
});
