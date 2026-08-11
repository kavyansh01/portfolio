const puppeteer = require('puppeteer');

const sites = [
  { url: 'http://localhost:3000/projects/novabites', file: 'ss-novabites' },
  { url: 'http://localhost:3000/projects/cloudsync', file: 'ss-cloudsync' },
  { url: 'http://localhost:3000/projects/luxecart', file: 'ss-luxecart' },
  { url: 'http://localhost:3000/projects/greenspace', file: 'ss-greenspace' },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const site of sites) {
    console.log(`Screenshotting ${site.url}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({
      path: `/Users/kavyansh/Projects/portfolio/public/images/${site.file}.png`,
      type: 'png',
      clip: { x: 0, y: 0, width: 1280, height: 800 }
    });
    await page.close();
    console.log(`  ✓ Saved ${site.file}.png`);
  }

  await browser.close();
  console.log('All screenshots done!');
})();
