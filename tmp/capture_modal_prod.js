const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  try {
    // Desktop
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();
    await page.goto('https://elite-path-visa-project-lngxx848i-nayer-raoufs-projects.vercel.app/visas/united-states', { waitUntil: 'networkidle' });
    const add = page.locator('button:has-text("Add to Cart")').first();
    await add.waitFor({ state: 'visible', timeout: 15000 });
    await add.click();
    const cart = page.locator('button[aria-label="Cart"]');
    await cart.waitFor({ state: 'visible', timeout: 5000 });
    await cart.click();
    const modal = page.locator('div.fixed.inset-0.z-50');
    await modal.waitFor({ state: 'visible', timeout: 5000 });
    const dialog = modal.locator('div.relative').first();
    await dialog.screenshot({ path: 'tmp/modal-dialog-desktop-prod.png' });
    await context.close();

    // Mobile
    const context2 = await browser.newContext({ viewport: { width: 375, height: 667 }, isMobile: true });
    const page2 = await context2.newPage();
    await page2.goto('https://elite-path-visa-project-lngxx848i-nayer-raoufs-projects.vercel.app/visas/united-states', { waitUntil: 'networkidle' });
    const add2 = page2.locator('button:has-text("Add to Cart")').first();
    await add2.waitFor({ state: 'visible', timeout: 15000 });
    await add2.click();
    const cart2 = page2.locator('button[aria-label="Cart"]');
    await cart2.waitFor({ state: 'visible', timeout: 5000 });
    await cart2.click();
    const modal2 = page2.locator('div.fixed.inset-0.z-50');
    await modal2.waitFor({ state: 'visible', timeout: 5000 });
    const dialog2 = modal2.locator('div.relative').first();
    await dialog2.screenshot({ path: 'tmp/modal-dialog-mobile-prod.png' });
    await context2.close();

    console.log('Captured modal screenshots to tmp/');
  } catch (err) {
    console.error('Error capturing modal:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
