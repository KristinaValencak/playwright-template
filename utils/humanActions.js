const DEFAULT_WAIT_MS = 90;
const TYPE_DELAY_MIN_MS = 20;
const TYPE_DELAY_MAX_MS = 45;

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const resolveLocator = (page, selectorOrLocator) => {
  if (typeof selectorOrLocator === 'string') {
    return page.locator(selectorOrLocator).first();
  }

  return selectorOrLocator;
};

export const humanWait = async (ms = DEFAULT_WAIT_MS) => {
  const duration = Number.isFinite(ms) && ms >= 0 ? ms : DEFAULT_WAIT_MS;
  await new Promise((resolve) => setTimeout(resolve, duration));
};

export const humanClick = async (page, selectorOrLocator) => {
  const locator = resolveLocator(page, selectorOrLocator);

  await locator.waitFor({ state: 'visible' });
  await locator.scrollIntoViewIfNeeded();

  const box = await locator.boundingBox();

  if (box) {
    const targetX = box.x + box.width / 2;
    const targetY = box.y + box.height / 2;
    const steps = randomInt(8, 18);

    await page.mouse.move(targetX, targetY, { steps });
    await humanWait(randomInt(30, 90));
  }

  await locator.click();
};

export const humanType = async (page, selectorOrLocator, text) => {
  const locator = resolveLocator(page, selectorOrLocator);
  const value = text == null ? '' : String(text);

  await locator.waitFor({ state: 'visible' });
  await locator.scrollIntoViewIfNeeded();
  await locator.click();

  await locator.fill('');

  for (const char of value) {
    await locator.type(char, { delay: randomInt(TYPE_DELAY_MIN_MS, TYPE_DELAY_MAX_MS) });
  }
};
