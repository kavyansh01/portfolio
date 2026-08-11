const puppeteer = require('puppeteer');
const path = require('path');

const delay = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 15000 });
  
  // Wait for preloader to finish
  await delay(4000);
  
  const dir = path.join(__dirname, 'audit-screenshots');
  const fs = require('fs');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // Full page screenshot
  await page.screenshot({ path: path.join(dir, '01-full-page.png'), fullPage: true });
  console.log('✓ Full page screenshot');

  // Scroll to each section and screenshot
  const sections = ['#hero', '#about', '#services', '#projects', '#testimonials', '#contact'];
  
  for (let i = 0; i < sections.length; i++) {
    try {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }, sections[i]);
      await delay(800);
      await page.screenshot({ path: path.join(dir, `0${i+2}-${sections[i].replace('#','')}.png`) });
      console.log(`✓ ${sections[i]}`);
    } catch(e) {
      console.log(`✗ ${sections[i]}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('Done! Screenshots in audit-screenshots/');
})();
