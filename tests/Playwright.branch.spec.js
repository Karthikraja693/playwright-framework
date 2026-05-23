const { test, expect } = require('@playwright/test');

test('Google Title Test', async ({ page }) => {

  // Open website
  await page.goto('https://google.com');

  // Validate page title
  await expect(page).toHaveTitle(/Google/);

});