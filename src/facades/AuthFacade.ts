import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { TestingUtil } from "../utils/TestingUtil";
import { Status } from "../utils/UtilTypes";

export class AuthFacade {
  private page: Page;
  private testingUtil: TestingUtil;
  private loginPage: LoginPage;
  private dashboardPage: DashboardPage;

  constructor(
    page: Page,
    testingUtil: TestingUtil,
    loginPage: LoginPage,
    dashboarPage: DashboardPage
  ) {
    this.page = page;
    this.testingUtil = testingUtil;
    this.loginPage = loginPage;
    this.dashboardPage = dashboarPage;
  }

  async login(username: string, password: string) {
    await this.loginPage.setUsername(username);
    await this.testingUtil.screenshoot(
      "Set Username",
      "Expected : Memastikan Berhasil Input Username\nActual : Berhasil Input Username",
      Status.Done
    );
    await this.loginPage.setPassword(password);
    await this.testingUtil.screenshoot(
      "Set Password",
      "Expected : Memastikan Berhasil Input Password\nActual : Berhasil Input Password",
      Status.Done
    );
    await this.loginPage.clickLogin();
    await this.testingUtil.screenshoot(
      "Click Login",
      "Expected : Memastikan Berhasil Click Login\nActual : Berhasil Click Login",
      Status.Done,
      2000
    );
  }

  async logout() {
    await this.dashboardPage.clickUserArea();
    await this.testingUtil.screenshoot(
      "Click User Area",
      "Expected : Memastikan Berhasil Click User Area\nActual : Berhasil Click User Area",
      Status.Done
    );
    await this.dashboardPage.clickLogout();
    await this.testingUtil.screenshoot(
      "Click Logout",
      "Expected : Memastikan Berhasil Click Logout\nActual : Berhasil Click Logout",
      Status.Done,
      2000
    );
  }

  async loginWithoutScreenshoot(username: string, password: string) {
    await this.loginPage.setUsername(username);
    await this.loginPage.setPassword(password);
    await this.loginPage.clickLogin();
  }

  async logoutWithoutScreenshoot() {
    await this.dashboardPage.clickUserArea();
    await this.dashboardPage.clickLogout();
  }
}
