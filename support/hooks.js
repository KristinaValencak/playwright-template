import path from 'node:path';
import { mkdir } from 'node:fs/promises';
import { After, Before, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from 'playwright';
import config from '../config/env.js';

const browserTypeMap = {
  chromium,
  firefox,
  webkit,
};

const screenshotsDir = path.resolve('test-results', 'screenshots');
const videosDir = path.resolve('test-results', 'videos');
const demoSlowMoFallbackMs = 200;
const defaultStepTimeoutMs = config.demoMode ? 120_000 : 30_000;

const getBrowserType = () => browserTypeMap[config.browser] ?? chromium;

setDefaultTimeout(defaultStepTimeoutMs);

Before(async function () {
  const browserType = getBrowserType();
  const headless = config.demoMode ? false : config.headless;
  const slowMo =
    config.demoMode && config.slowMo === 0 ? demoSlowMoFallbackMs : config.slowMo;

  this.browser = await browserType.launch({
    headless,
    slowMo,
  });

  if (config.video) {
    await mkdir(videosDir, { recursive: true });
  }

  this.context = await this.browser.newContext(
    config.video
      ? {
        ignoreHTTPSErrors: config.ignoreHttpsErrors,
        recordVideo: {
          dir: videosDir,
        },
      }
      : {
        ignoreHTTPSErrors: config.ignoreHttpsErrors,
      }
  );
  this.page = await this.context.newPage();
});

After(async function (scenario) {
  const isFailed = scenario?.result?.status === Status.FAILED;

  // Uncomment this block if you want screenshots on failed scenarios.
  /*
  if (isFailed && this.page) {
    await mkdir(screenshotsDir, { recursive: true });
    const scenarioName = (scenario?.pickle?.name ?? 'scenario')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const screenshotPath = path.join(
      screenshotsDir,
      `${scenarioName || 'scenario'}-${Date.now()}.png`
    );
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
  }
  */

  if (this.page) {
    await this.page.close();
    this.page = null;
  }

  if (this.context) {
    await this.context.close();
    this.context = null;
  }

  if (this.browser) {
    await this.browser.close();
    this.browser = null;
  }
});
