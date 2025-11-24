import { test, expect } from '@playwright/test';

test('checkout modal snapshots (desktop + mobile)', async ({ page }) => {
  // Update URL if you run dev server on a different port
  await page.goto('http://localhost:3000/visas/united-states');
  await page.waitForLoadState('networkidle');

  // Click the Add to Cart button on the visa page
  const addBtn = page.getByRole('button', { name: 'Add to Cart' });
  await addBtn.click();

  // Open the cart via the header cart button (aria-label="Cart")
  const cartBtn = page.locator('button[aria-label="Cart"]');
  await cartBtn.waitFor({ state: 'visible' });
  await cartBtn.click();

  // Wait for the checkout modal root to be visible
  const modal = page.locator('div.fixed.inset-0.z-50');
  await modal.waitFor({ state: 'visible' });

  // Target the dialog content inside the modal and snapshot it
  const dialog = modal.locator('div.relative').first();
  await expect(await dialog.screenshot()).toMatchSnapshot('checkout-modal-desktop.png');

  // Mobile viewport snapshot
  await page.setViewportSize({ width: 375, height: 667 });
  // Ensure modal still visible and capture mobile snapshot
  await modal.waitFor({ state: 'visible' });
  await expect(await dialog.screenshot()).toMatchSnapshot('checkout-modal-mobile.png');
});
