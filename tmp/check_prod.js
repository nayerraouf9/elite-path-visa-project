const {chromium} = require('@playwright/test');
const fs = require('fs');
(async ()=>{
  const url = 'https://elite-path-visa-project-lngxx848i-nayer-raoufs-projects.vercel.app/visas/united-states';
  const browser = await chromium.launch();
  const ctx = await browser.newContext({viewport:{width:1280,height:720}});
  const page = await ctx.newPage();
  try {
    await page.goto(url,{waitUntil:'networkidle', timeout:30000});
    const html = await page.content();
    const hasAdd = html.includes('Add to Cart');
    const hasVercel = html.includes('Sign in') || html.includes('Sign in to Vercel') || html.includes('Vercel') || html.includes('Continue with') || html.includes('Log in');
    let status = 'unknown';
    if (hasAdd && !hasVercel) status = 'public';
    else if (hasVercel) status = 'login';
    else status = 'public_no_add';
    fs.writeFileSync('tmp/prod_access_result.txt', status);
    console.log(status);
  } catch (e) {
    fs.writeFileSync('tmp/prod_access_result.txt', 'error:' + e.message);
    console.error('error', e.message);
  } finally {
    await browser.close();
  }
})();
