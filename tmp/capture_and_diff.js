const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const pixelmatch = require('pixelmatch').default || require('pixelmatch');
const { PNG } = require('pngjs');

(async () => {
  const baseDir = path.resolve(__dirname, '..');
  const prodUrl = 'https://elite-path-visa-project-lngxx848i-nayer-raoufs-projects.vercel.app/visas/united-states';
  const outDir = path.resolve(__dirname);
  try {
    const browser = await chromium.launch();
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();

    console.log('Navigating to', prodUrl);
    await page.goto(prodUrl, { waitUntil: 'networkidle', timeout: 30000 });

    const addBtn = page.locator('button:has-text("Add to Cart")').first();
    await addBtn.waitFor({ state: 'visible', timeout: 10000 });
    await addBtn.click();
    console.log('Clicked Add to Cart');

    const cartBtn = page.locator('button[aria-label="Cart"]');
    await cartBtn.waitFor({ state: 'visible', timeout: 10000 });
    await cartBtn.click();
    console.log('Opened cart');

    const modal = page.locator('div.fixed.inset-0.z-50');
    await modal.waitFor({ state: 'visible', timeout: 10000 });
    const dialog = modal.locator('div.relative').first();
    await dialog.waitFor({ state: 'visible', timeout: 10000 });

    const desktopPath = path.join(outDir, 'checkout-modal-desktop-prod.png');
    const mobilePath = path.join(outDir, 'checkout-modal-mobile-prod.png');

    console.log('Capturing desktop screenshot...');
    await page.setViewportSize({ width: 1280, height: 720 });
    await dialog.screenshot({ path: desktopPath });
    console.log('Saved', desktopPath);

    console.log('Capturing mobile screenshot...');
    await page.setViewportSize({ width: 375, height: 667 });
    await modal.waitFor({ state: 'visible', timeout: 5000 });
    await dialog.screenshot({ path: mobilePath });
    console.log('Saved', mobilePath);

    await browser.close();

    // Baseline paths (committed snapshots)
    const baselineDesktop = path.join(baseDir, 'e2e', 'visual.spec.ts-snapshots', 'checkout-modal-desktop-chromium-win32.png');
    const baselineMobile = path.join(baseDir, 'e2e', 'visual.spec.ts-snapshots', 'checkout-modal-mobile-chromium-win32.png');

    const results = [];

    // Compare helper
    function compareImages(imgPathA, imgPathB, outDiffPath) {
      if (!fs.existsSync(imgPathA)) throw new Error('Missing image: ' + imgPathA);
      if (!fs.existsSync(imgPathB)) throw new Error('Missing image: ' + imgPathB);
      const a = PNG.sync.read(fs.readFileSync(imgPathA));
      const b = PNG.sync.read(fs.readFileSync(imgPathB));
      if (a.width !== b.width || a.height !== b.height) {
        return { equal: false, reason: 'size-mismatch', a: {w: a.width, h: a.height}, b: {w: b.width, h: b.height} };
      }
      const diff = new PNG({ width: a.width, height: a.height });
      const numDiff = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.12 });
      fs.writeFileSync(outDiffPath, PNG.sync.write(diff));
      const total = a.width * a.height;
      const percent = (numDiff / total) * 100;
      return { equal: numDiff === 0, numDiff, total, percent, diffPath: outDiffPath };
    }

    try {
      const desktopDiffOut = path.join(outDir, 'diff-desktop.png');
      const desktopRes = compareImages(baselineDesktop, desktopPath, desktopDiffOut);
      results.push({ name: 'desktop', baseline: baselineDesktop, captured: desktopPath, ...desktopRes });
    } catch (e) {
      results.push({ name: 'desktop', error: e.message });
    }

    try {
      const mobileDiffOut = path.join(outDir, 'diff-mobile.png');
      const mobileRes = compareImages(baselineMobile, mobilePath, mobileDiffOut);
      results.push({ name: 'mobile', baseline: baselineMobile, captured: mobilePath, ...mobileRes });
    } catch (e) {
      results.push({ name: 'mobile', error: e.message });
    }

    const report = { url: prodUrl, time: new Date().toISOString(), results };
    fs.writeFileSync(path.join(outDir, 'capture_diff_report.json'), JSON.stringify(report, null, 2));
    console.log('Report written to', path.join(outDir, 'capture_diff_report.json'));
    console.log(JSON.stringify(report, null, 2));

  } catch (err) {
    console.error('Error during capture/diff:', err);
    process.exitCode = 1;
  }
})().catch(e=>{ console.error(e); process.exit(1); });
