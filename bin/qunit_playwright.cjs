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
      if (msg.type() === 'error') {
        console.error(`Browser console error: ${msg.text()}`);
      }
    });

    await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' });

    await page.waitForFunction(() => {
      if (!window.QUnit || !window.QUnit.config) return false;
      return window.QUnit.config.stats && typeof window.QUnit.config.stats.all === 'number';
    }, { timeout: 15000 });

    const result = await page.evaluate(() => {
      const stats = window.QUnit && window.QUnit.config && window.QUnit.config.stats;
      const details = document.querySelector('#qunit-testresult')?.textContent || '';
      return {
        all: stats ? stats.all : null,
        bad: stats ? stats.bad : null,
        details: details.trim(),
      };
    });

    if (typeof result.all !== 'number') fail('QUnit did not report test totals.');
    if (typeof result.bad !== 'number') fail('QUnit did not report failure totals.');
    if (result.bad > 0) fail(`QUnit failed (${result.bad}/${result.all}): ${result.details}`);

    console.log(`QUnit passed (${result.all} assertions). ${result.details}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
});
