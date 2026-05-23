class LoginPage {
  /**
   * Create reusable page object locators and store the Playwright page.
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Reusable locators for the login page fields and button
    this.usernameField = page.getByLabel('Username');
    this.passwordField = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.flashMessage = page.locator('#flash');
  }

  /**
   * Open the login page URL.
   */
  async open() {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  /**
   * Enter the username into the username field.
   * @param {string} username
   */
  async enterUsername(username) {
    await this.usernameField.fill(username);
  }

  /**
   * Enter the password into the password field.
   * @param {string} password
   */
  async enterPassword(password) {
    await this.passwordField.fill(password);
  }

  /**
   * Click the login button.
   */
  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Perform the full login flow using username and password.
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.open();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Return the text from the flash message element.
   * This helps verify login results in tests.
   */
  async getFlashMessage() {
    return this.flashMessage.textContent();
  }
}

export default { LoginPage };