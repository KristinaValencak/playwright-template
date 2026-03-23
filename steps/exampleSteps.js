import { Given, Then, When } from '@cucumber/cucumber';
import { click, type } from '../utils/actions.js';
import { BASE_URL } from '../config/env.js';

const UI_WAIT_TIMEOUT_MS = 30_000;
const SUCCESS_WAIT_TIMEOUT_MS = 45_000;

Given('I open the website', async function () {
  await this.page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
});

When('I click the "Contact us" button in the header', async function () {
  const contactCta = this.page.locator('button:has-text("Contact us")').first();

  if (await contactCta.isVisible().catch(() => false)) {
    await contactCta.click();
  } else {
    const menuBtn = this.page.locator('button[aria-label="Open menu"]');
    await menuBtn.waitFor({ state: 'visible', timeout: UI_WAIT_TIMEOUT_MS });
    await menuBtn.click();

    await this.page
      .locator('nav button:has-text("Contact us")')
      .first()
      .click();
  }
  const formSection = this.page.locator('#kontaktni-obrazec');
  await formSection.scrollIntoViewIfNeeded();
  await formSection.waitFor({ state: 'visible', timeout: UI_WAIT_TIMEOUT_MS });

  await this.page.locator('#name').waitFor({ state: 'visible', timeout: UI_WAIT_TIMEOUT_MS });
  await this.page.locator('#email').waitFor({ state: 'visible', timeout: UI_WAIT_TIMEOUT_MS });
  await this.page.locator('#message').waitFor({ state: 'visible', timeout: UI_WAIT_TIMEOUT_MS });
});

When('I fill the contact form with name {string} email {string} message {string}', async function (name, email, message) {
  await type(this.page, '#name', name);
  await type(this.page, '#email', email);
  await type(this.page, '#message', message);
});

When('I submit the contact form', async function () {
  await click(this.page, 'button[type="submit"]');
});

Then('I should see the success message {string}', async function (message) {
  await this.page.getByText(message).waitFor({
    state: 'visible',
    timeout: SUCCESS_WAIT_TIMEOUT_MS,
  });
});