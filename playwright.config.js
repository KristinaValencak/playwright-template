import { BASE_URL, BROWSER, HEADLESS, SLOWMO_MS } from './config/env.js';

const config = {
  timeout: 30_000,
  use: {
    baseURL: BASE_URL,
    browserName: BROWSER,
    headless: HEADLESS,
    launchOptions: {
      headless: HEADLESS,
      slowMo: SLOWMO_MS,
    },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
};

export default config;
