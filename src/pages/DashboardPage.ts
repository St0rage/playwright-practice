import { Page } from "@playwright/test";
import { TestingUtil } from "../utils/TestingUtil";

export class DashboardPage {
  private page: Page;
  private testingUtil: TestingUtil;

  constructor(page: Page, testingUtil: TestingUtil) {
    this.page = page;
    this.testingUtil = testingUtil;
  }

  async checkDashboardTitleExist(): Promise<boolean> {
    try {
      const dashboardTitle = this.page.getByRole("heading", {
        name: "Dashboard",
      });
      await dashboardTitle.waitFor({ state: "visible", timeout: 30000 });

      return dashboardTitle.isVisible();
    } catch (e) {
      await this.testingUtil.errorHandling(
        this.checkDashboardTitleExist.name,
        e as Error
      );
      throw e;
    }
  }

  async clickUserArea() {
    try {
      const userArea = this.page.locator("li.oxd-userdropdown");

      await userArea.click();
    } catch (e) {
      await this.testingUtil.errorHandling(this.clickUserArea.name, e as Error);
      throw e;
    }
  }

  async clickLogout() {
    try {
      const logoutLink = this.page.locator("a", { hasText: "Logout" });

      await logoutLink.click();
    } catch (e) {
      await this.testingUtil.errorHandling(this.clickLogout.name, e as Error);
      throw e;
    }
  }

  async setSearchMenu(menu: string) {
    try {
      const searchMenuInput = this.page
        .locator("div")
        .getByPlaceholder("Search");

      await searchMenuInput.fill(menu);
    } catch (e) {
      await this.testingUtil.errorHandling(this.setSearchMenu.name, e as Error);
      throw e;
    }
  }

  async selectMenu(menu: string) {
    try {
      // const menuElement = this.page.locator(
      //   `//li[@class='oxd-main-menu-item-wrapper']/a[span[text()='${menu}']]`
      // );
      const menuElement = this.page
        .getByRole("listitem")
        .locator("a", { has: this.page.locator("span", { hasText: menu }) });

      await menuElement.click();
    } catch (e) {
      await this.testingUtil.errorHandling(this.selectMenu.name, e as Error);
      throw e;
    }
  }

  async checkMenuExist(menu: string): Promise<Boolean> {
    try {
      const menuElement = this.page
        .getByRole("listitem")
        .locator("a", { has: this.page.locator("span", { hasText: menu }) });
      await menuElement.waitFor({ state: "visible", timeout: 30000 });

      return menuElement.isVisible();
    } catch (e) {
      await this.testingUtil.errorHandling(this.selectMenu.name, e as Error);
      throw e;
    }
  }

  async checkMenuTitleExist(title: string): Promise<boolean> {
    try {
      const menuTitle = this.page.getByRole("heading", { name: title }).nth(0);
      await menuTitle.waitFor({ state: "visible", timeout: 30000 });

      return menuTitle.isVisible();
    } catch (e) {
      await this.testingUtil.errorHandling(
        this.checkMenuTitleExist.name,
        e as Error
      );
      throw e;
    }
  }
}
