import { test, expect } from '@playwright/test';

test('checkout modal focus trap keeps focus inside dialog', async ({ page }) => {
  // open local app visa page (dev server assumed)
  await page.goto('http://localhost:3000/visas/united-states');
  await page.waitForLoadState('networkidle');

  // Click Add to Cart (first one)
  const addBtn = page.locator('button:has-text("Add to Cart")').first();
  await addBtn.waitFor({ state: 'visible', timeout: 5000 });
  await addBtn.click();

  // Open cart
  const cartBtn = page.locator('button[aria-label="Cart"]');
  await cartBtn.waitFor({ state: 'visible', timeout: 5000 });
  await cartBtn.click();

  // Wait for dialog
  const dialog = page.locator('div[role="dialog"]');
  await dialog.waitFor({ state: 'visible', timeout: 5000 });

  // Helper to check activeElement is inside dialog
  const isActiveInside = async () => {
    return await page.evaluate(() => {
      const dialogEl = document.querySelector('div[role="dialog"]');
      if (!dialogEl) return false;
      const active = document.activeElement;
      if (!active) return false;
      return dialogEl.contains(active);
    });
  };

  // initial active element should be inside
  expect(await isActiveInside()).toBeTruthy();

  // press Tab many times and ensure focus never leaves dialog
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press('Tab');
    expect(await isActiveInside()).toBeTruthy();
  }

  // test Shift+Tab backwards
  for (let i = 0; i < 10; i++) {
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    expect(await isActiveInside()).toBeTruthy();
  }

});
