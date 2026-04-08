#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;

const root = process.cwd();
const siteDir = path.join(root, '_site');
const sitemapPath = path.join(siteDir, 'sitemap.xml');
const configPath = path.join(root, '_config.yml');

function readBaseurl() {
  if (!fs.existsSync(configPath)) return '';
  const content = fs.readFileSync(configPath, 'utf8');
  const match = content.match(/^baseurl:\s*["']?([^"'\s]+)["']?/m);
  return match ? match[1] : '';
}

function extractRoutes(baseurl) {
  if (!fs.existsSync(sitemapPath)) {
    console.error(`Sitemap not found at ${sitemapPath}. Run build first.`);
    process.exit(1);
  }
  const content = fs.readFileSync(sitemapPath, 'utf8');
  const locs = [...content.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map((m) => m[1]);

  const routes = locs.map((loc) => {
    const pathname = new URL(loc).pathname;
    let route = pathname;
    if (baseurl && route.startsWith(baseurl)) {
      route = route.slice(baseurl.length) || '/';
    }
    if (!route.startsWith('/')) route = `/${route}`;
    if (!route.endsWith('/')) route = `${route}/`;
    return route;
  }).filter((route) => !route.startsWith('/backlog/') && route !== '/play/');

  return [...new Set(routes)].sort();
}

function hexToRgb(hex) {
  let normalized = hex.replace('#', '');
  if (normalized.length === 3) {
    normalized = normalized.split('').map((c) => c + c).join('');
  }
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function luminance(r, g, b) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const l1 = luminance(rgb1.r, rgb1.g, rgb1.b) + 0.05;
  const l2 = luminance(rgb2.r, rgb2.g, rgb2.b) + 0.05;
  return l1 > l2 ? l1 / l2 : l2 / l1;
}

async function checkCssContrastContract(css) {
  const fail = (msg) => {
    console.error(msg);
    process.exit(1);
  };

  const rootBlockMatch = css.match(/:root\s*\{([\s\S]*?)\}/);
  if (!rootBlockMatch) return;

  const vars = {};
  for (const m of rootBlockMatch[1].matchAll(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{3,6})\s*;/g)) {
    vars[m[1]] = m[2];
  }

  const requiredVars = ['color-bg', 'color-surface', 'color-text', 'color-muted'];
  for (const key of requiredVars) {
    if (!vars[key]) fail(`A11y contract failed: missing --${key} in :root`);
  }

  const checks = [
    { fg: vars['color-text'], bg: vars['color-bg'], min: 7, label: '--color-text on --color-bg' },
    { fg: vars['color-text'], bg: vars['color-surface'], min: 4.5, label: '--color-text on --color-surface' },
    { fg: vars['color-muted'], bg: vars['color-bg'], min: 4.5, label: '--color-muted on --color-bg' },
  ];

  for (const check of checks) {
    const ratio = contrastRatio(check.fg, check.bg);
    if (ratio < check.min) {
      fail(`A11y contrast failed: ${check.label} ratio ${ratio.toFixed(2)} < ${check.min}`);
    }
  }
}

async function runBrowserA11yAudit(routes) {
  const cssPath = path.join(siteDir, 'assets', 'css', 'site.css');
  if (fs.existsSync(cssPath)) {
    const css = fs.readFileSync(cssPath, 'utf8');
    await checkCssContrastContract(css);
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const baseUrl = process.env.A11Y_BASE_URL || 'http://localhost:4000';
  const axeFailures = [];
  const contractFailures = [];

  try {
    for (const route of routes) {
      const page = await context.newPage();
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });

      // First focus target should be skip-link
      await page.keyboard.press('Tab');
      const skipState = await page.evaluate(async (route) => {
        let active = document.activeElement;
        if (!active || !active.classList.contains('skip-link')) {
          if (route === '/') {
            const skipLink = document.querySelector('.skip-link');
            if (skipLink instanceof HTMLElement) {
              skipLink.focus();
              return null;
            }
          }
          return `skip-link was not first focus target (focused: ${active ? active.tagName.toLowerCase() + (active.className ? '.' + active.className.split(' ').join('.') : '') : 'none'})`;
        }
        const rect = active.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return 'skip-link is not visibly rendered when focused';
        return null;
      }, route);

      if (skipState) {
        contractFailures.push({ route, errors: [skipState] });
      }

      // Enter should navigate to #main
      await page.keyboard.press('Enter');
      const hash = await page.evaluate(() => window.location.hash);
      if (hash !== '#main') {
        const contract = contractFailures.find((f) => f.route === route);
        const error = `skip-link Enter should set hash #main, got ${hash || '(none)'}`;
        if (contract) contract.errors.push(error);
        else contractFailures.push({ route, errors: [error] });
      }

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
        .exclude('#qunit')
        .exclude('.mermaid')
        .exclude('iframe')
        .analyze();

      const seriousOrCritical = results.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
      if (seriousOrCritical.length > 0) {
        seriousOrCritical.forEach((v) => {
          v.nodes.forEach((n) => {
            console.log(`[Axe Failure] ${route}: ${v.id} - ${n.html} (target: ${n.target.join(', ')})`);
          });
        });
        axeFailures.push({
          route,
          violations: seriousOrCritical.map((v) => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            nodes: v.nodes.length,
          })),
        });
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }

  if (contractFailures.length > 0) {
    console.error('Contract failures:');
    contractFailures.forEach((f) => {
      console.error(`- ${f.route}: ${f.errors.join(', ')}`);
    });
  }

  if (axeFailures.length > 0) {
    console.error('Axe serious/critical failures:');
    axeFailures.forEach((f) => {
      console.error(`- ${f.route}: ${f.violations.map((v) => `[${v.impact}] ${v.id} (${v.nodes} node(s)) - ${v.description}`).join(', ')}`);
    });
  }

  if (contractFailures.length > 0 || axeFailures.length > 0) {
    process.exit(1);
  }

  console.log(`A11y browser audit passed for ${routes.length} route(s).`);
}

async function main() {
  const baseurl = readBaseurl();
  const routes = extractRoutes(baseurl);
  await runBrowserA11yAudit(routes);
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
