const { test, expect } = require('@playwright/test');

test('Google Search should execute successfully', async ({ page }) => {
  // Navigate to Google
  await page.goto('https://www.google.com/?hl=en');

  // Accept consent if shown
  const consentButton = page.locator('button:has-text("I agree"), button:has-text("Accept all")');
  if (await consentButton.count()) {
    await consentButton.first().click();
  }

  // Fill search box with "Playwright"
  await page.locator('textarea[name="q"]').fill('Playwright');
  
  // Press Enter to search
  await page.keyboard.press('Enter');

  // Wait for page to load and check stable indicators
  await page.waitForLoadState('networkidle');
  
  // Verify search was executed by checking URL contains query parameter
  await expect(page).toHaveURL(/search\?q=Playwright/i);
  
  // Verify page content contains search results (stable assertion)
  await expect(page.locator('body')).toContainText('Playwright');
});