const { test, expect } = require('@playwright/test');

// Test: Login to the demo website and validate successful login
test('should login successfully with valid credentials', async ({ page }) => {
  // Step 1: Navigate to the login page
  // This opens the demo website provided by the-internet.herokuapp.com
  await page.goto('https://the-internet.herokuapp.com/login');

  // Step 2: Verify the page title to ensure we're on the correct page
  // This is a good practice to confirm the page loaded correctly
  await expect(page).toHaveTitle(/The Internet/i);

  // Step 3: Find and fill the username field
  // Using getByRole is the best practice (accessible and semantic)
  // We're looking for a textbox with label "Username"
  const usernameField = page.getByRole('textbox', { name: /username/i });
  await usernameField.fill('tomsmith');

  // Step 4: Find and fill the password field
  // Note: getByLabel doesn't work well for password fields, so we use getByRole
  const passwordField = page.locator('input[type="password"]');
  await passwordField.fill('SuperSecretPassword!');

  // Step 5: Click the Login button
  // Using getByRole with type 'button' is the best practice
  const loginButton = page.getByRole('button', { name: /login/i });
  await loginButton.click();

  // Step 6: Wait for page to load after login
  // This ensures all elements are ready before we check for success
  await page.waitForLoadState('networkidle');

  // Step 7: Verify successful login by checking for the success message
  // The-internet shows a success message after login
  const successMessage = page.locator('.flash.success');
  await expect(successMessage).toBeVisible();

  // Step 8: Verify the success message contains expected text
  // This confirms the login was actually successful
  await expect(successMessage).toContainText(/You logged into a secure area/i);

  // Step 9: Additional verification - check that we're on a different page
  // This confirms we've been redirected after login
  await expect(page).toHaveURL(/\/secure/);
});

// Test: Verify login fails with invalid credentials
test('should show error message with invalid credentials', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://the-internet.herokuapp.com/login');

  // Fill in incorrect credentials
  await page.getByRole('textbox', { name: /username/i }).fill('invaliduser');
  await page.locator('input[type="password"]').fill('wrongpassword');

  // Click login button
  await page.getByRole('button', { name: /login/i }).click();

  // Wait for page load
  await page.waitForLoadState('networkidle');

  // Verify error message is displayed
  const errorMessage = page.locator('.flash.error');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText(/Your username is invalid/i);
});

// Test: Verify login form is displayed with all required fields
test('should display login form with username and password fields', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://the-internet.herokuapp.com/login');

  // Verify username field exists and is visible
  const usernameField = page.getByRole('textbox', { name: /username/i });
  await expect(usernameField).toBeVisible();

  // Verify password field exists and is visible
  const passwordField = page.locator('input[type="password"]');
  await expect(passwordField).toBeVisible();

  // Verify login button exists and is visible
  const loginButton = page.getByRole('button', { name: /login/i });
  await expect(loginButton).toBeVisible();
});
