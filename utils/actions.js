import config from '../config/env.js';
import { humanClick, humanType, humanWait } from './humanActions.js';

const DEFAULT_DEMO_WAIT_MS = 150;

const resolveLocator = (page, target) => {
  if (typeof target === 'string') {
    return page.locator(target).first();
  }

  return target;
};

export const click = async (page, target) => {
  if (config.demoMode) {
    await humanClick(page, target);
    return;
  }

  const locator = resolveLocator(page, target);
  await locator.click();
};

export const type = async (page, target, text) => {
  if (config.demoMode) {
    await humanType(page, target, text);
    return;
  }

  const locator = resolveLocator(page, target);
  const value = text == null ? '' : String(text);
  await locator.fill(value);
};

export const wait = async (ms = 0) => {
  const duration = Number.isFinite(ms) && ms >= 0 ? ms : 0;

  if (config.demoMode) {
    const demoDuration = duration > 0 ? duration : DEFAULT_DEMO_WAIT_MS;
    await humanWait(demoDuration);
    return;
  }

  if (duration > 0) {
    await new Promise((resolve) => setTimeout(resolve, duration));
  }
};

export default { click, type, wait };
