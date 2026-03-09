#!/usr/bin/env node
const { chromium } = require('playwright');

const baseUrl = process.env.QUNIT_BASE_URL || 'http://127.0.0.1:4174';
const path = process.env.QUNIT_PATH || '/battle-calculator-tests/';

function fail(message) {
  console.error(message);
  process.exit(1);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    page.on('console', (msg) => {
      console.log(`[Browser ${msg.type()}] ${msg.text()}`);
    });

    await page.addInitScript(() => {
      window.qunitFailures = [];
      const checkQUnit = setInterval(() => {
        if (window.QUnit) {
          QUnit.log((details) => {
            if (!details.result) {
              window.qunitFailures.push(details);
            }
          });
          clearInterval(checkQUnit);
        }
      }, 10);
    });

    await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' });

    await page.waitForFunction(() => {
      if (!window.QUnit || !window.QUnit.config) return false;
      return window.QUnit.config.stats && typeof window.QUnit.config.stats.all === 'number';
    }, { timeout: 15000 });

    const result = await page.evaluate(() => {
      const stats = window.QUnit.config.stats;
      const details = document.querySelector('#qunit-testresult')?.textContent || '';
      return {
        all: stats.all,
        bad: stats.bad,
        details: details.trim(),
        failures: window.qunitFailures || []
      };
    });

    if (typeof result.all !== 'number') fail('QUnit did not report test totals.');
    if (typeof result.bad !== 'number') fail('QUnit did not report failure totals.');
    
    if (result.bad > 0) {
      await page.screenshot({ path: 'qunit-failures.png', fullPage: true });
      console.error(`\n--- QUnit Failures (${result.bad}/${result.all}) ---`);
      
      result.failures.forEach((f, i) => {
        console.error(`${i+1}. ${f.module ? f.module + ': ' : ''}${f.name}`);
        console.error(`   Message:  ${f.message || 'No message'}`);
        console.error(`   Expected: ${JSON.stringify(f.expected)}`);
        console.error(`   Actual:   ${JSON.stringify(f.actual)}`);
        if (f.source) console.error(`   Source:   ${f.source.split('\n')[0]}`);
        console.error('');
      });

      console.error('Screenshot saved to qunit-failures.png');
      fail(`QUnit failed (${result.bad}/${result.all}): ${result.details}`);
    }

    console.log(`QUnit passed (${result.all} assertions). ${result.details}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
});
