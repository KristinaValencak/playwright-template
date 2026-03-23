import dotenv from 'dotenv';

dotenv.config();

const SUPPORTED_BROWSERS = new Set(['chromium', 'firefox', 'webkit']);

const toBoolean = (value, fallback = false) => {
  if (typeof value !== 'string') return fallback;
  const normalized = value.trim().toLowerCase();
  if (['true', '1', 'yes', 'y', 'on'].includes(normalized)) return true;
  if (['false', '0', 'no', 'n', 'off'].includes(normalized)) return false;
  return fallback;
};

const toNumber = (value, fallback = 0) => {
  const parsed = Number.parseInt(value ?? '', 10);
  if (Number.isNaN(parsed)) return fallback;
  return Math.max(parsed, 0);
};

const toBrowser = (value, fallback = 'chromium') => {
  const normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
  return SUPPORTED_BROWSERS.has(normalized) ? normalized : fallback;
};

const isCI = toBoolean(process.env.CI, false);

const config = {
  baseUrl: process.env.BASE_URL?.trim() || 'http://localhost:3000',
  headless: isCI ? true : toBoolean(process.env.HEADLESS, true),
  slowMo: isCI ? 0 : toNumber(process.env.SLOWMO_MS, 0),
  demoMode: isCI ? false : toBoolean(process.env.DEMO_MODE, false),
  video: toBoolean(process.env.VIDEO, false),
  browser: toBrowser(process.env.BROWSER, 'chromium'),
  ignoreHttpsErrors: toBoolean(process.env.IGNORE_HTTPS_ERRORS, false),
};

const { baseUrl, headless, slowMo, demoMode, video, browser, ignoreHttpsErrors } = config;

export { baseUrl, headless, slowMo, demoMode, video, browser, ignoreHttpsErrors, config };

export const BASE_URL = baseUrl;
export const HEADLESS = headless;
export const SLOWMO_MS = slowMo;
export const DEMO_MODE = demoMode;
export const VIDEO = video;
export const BROWSER = browser;
export const IGNORE_HTTPS_ERRORS = ignoreHttpsErrors;

export default config;
