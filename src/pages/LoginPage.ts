import type { Page } from "@playwright/test";
import { TestingUtil } from "../utils/TestingUtil";

export class LoginPage {
  private page: Page;
  private testingUtil: TestingUtil;

  constructor(page: Page, testingUtil: TestingUtil) {
    this.page = page;
    this.testingUtil = testingUtil;
  }

  async checkLoginTitleExist(): Promise<boolean> {
    try {
      const loginTitle = this.page.getByRole("heading", { name: "Login" });
      await loginTitle.waitFor({ state: "visible", timeout: 30000 });

      return loginTitle.isVisible();
    } catch (e) {
      await this.testingUtil.errorHandling(
        this.checkLoginTitleExist.name,
        e as Error
      );
      throw e;
    }
  }

  async setUsername(username: string) {
    try {
      const usernameInput = this.page.getByPlaceholder("username");
      await usernameInput.fill(username);
    } catch (e) {
      await this.testingUtil.errorHandling(this.setUsername.name, e as Error);
      throw e;
    }
  }

  async checkUsernameRequiredAlertExist(): Promise<Boolean> {
    try {
      const usernameRequiredAlert = this.page.locator(
        "div:has(input[placeholder='Username']) + span"
      );

      await usernameRequiredAlert.waitFor({ state: "visible", timeout: 30000 });

      return usernameRequiredAlert.isVisible();
    } catch (e) {
      await this.testingUtil.errorHandling(
        this.checkUsernameRequiredAlertExist.name,
        e as Error
      );
      throw e;
    }
  }

  async setPassword(password: string) {
    try {
      const passwordInput = this.page.getByPlaceholder("password");
      await passwordInput.fill(password);
    } catch (e) {
      await this.testingUtil.errorHandling(this.setPassword.name, e as Error);
      throw e;
    }
  }

  async checkPasswordRequiredAlertExist(): Promise<Boolean> {
    try {
      const passwordRequiredAlert = this.page.locator(
        "div:has(input[placeholder='Password']) + span"
      );

      await passwordRequiredAlert.waitFor({ state: "visible", timeout: 30000 });

      return passwordRequiredAlert.isVisible();
    } catch (e) {
      await this.testingUtil.errorHandling(
        this.checkPasswordRequiredAlertExist.name,
        e as Error
      );
      throw e;
    }
  }

  async clickLogin() {
    try {
      // const loginButton = this.page.getByRole("button", { name: "Loginnnn" });
      const loginButton = this.page.locator("button[type='submit']");

      await loginButton.click();
    } catch (e) {
      await this.testingUtil.errorHandling(this.clickLogin.name, e as Error);
      throw e;
    }
  }

  async checkInvalidCredentialsExist(): Promise<boolean> {
    try {
      const invalidCredentials = this.page.locator("p", {
        hasText: "Invalid credentials",
      });
      await invalidCredentials.waitFor({ state: "visible", timeout: 30000 });

      return invalidCredentials.isVisible();
    } catch (e) {
      await this.testingUtil.errorHandling(
        this.checkInvalidCredentialsExist.name,
        e as Error
      );
      throw e;
    }
  }
}
