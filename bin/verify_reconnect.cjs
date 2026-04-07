const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const baseUrl = 'https://phalanxduel.com';

  console.log(`Verifying reconnect behavior at ${baseUrl}...`);

  try {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    // 1. Find the iframe
    const frameElement = await page.waitForSelector('iframe[title="Phalanx Duel Playable Embed"]');
    const frame = await frameElement.contentFrame();
    
    if (!frame) throw new Error('Could not access iframe content frame');

    // 2. Start a match in the iframe
    console.log('Initializing match in iframe...');
    await frame.fill('[data-testid="lobby-name-input"]', 'Reconnect Tester');
    await frame.click('[data-testid="create-bot-match"]');

    // Wait for match load
    await frame.waitForSelector('[data-testid="game-layout"]', { timeout: 15000 });
    console.log('Match started successfully.');

    const initialPhase = await frame.textContent('[data-testid="phase-indicator"]');
    console.log(`Initial Phase: ${initialPhase}`);

    // 3. Refresh the parent page
    console.log('Refreshing parent page...');
    await page.reload({ waitUntil: 'networkidle' });

    // 4. Re-check the iframe
    const newFrameElement = await page.waitForSelector('iframe[title="Phalanx Duel Playable Embed"]');
    const newFrame = await newFrameElement.contentFrame();
    if (!newFrame) throw new Error('Could not access iframe content frame after refresh');

    console.log('Waiting for session recovery...');
    // The client should auto-reconnect if session exists in localStorage
    await newFrame.waitForSelector('[data-testid="game-layout"]', { timeout: 15000 });
    
    const recoveredPhase = await newFrame.textContent('[data-testid="phase-indicator"]');
    console.log(`Recovered Phase: ${recoveredPhase}`);

    if (initialPhase === recoveredPhase) {
      console.log('SUCCESS: Session persisted through refresh.');
    } else {
      console.log('FAILURE: Session lost or phase mismatch.');
    }

  } catch (err) {
    console.error('Verification failed:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();
