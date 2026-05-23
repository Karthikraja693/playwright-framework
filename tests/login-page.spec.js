const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage').default;

// This test uses the LoginPage page object model to perform a login flow.
test('should login successfully using LoginPage page object', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Use the reusable page object login method.
  await loginPage.login('tomsmith', 'SuperSecretPassword!');

  // Verify the secure area URL is displayed after a successful login.
  await expect(page).toHaveURL(/\/secure/);

  // Verify the success flash message contains the expected text.
  const flashText = await loginPage.getFlashMessage();
  expect(flashText).toContain('You logged into a secure area');
});
