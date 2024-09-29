import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { AuthFacade } from "../facades/authFacade";
import { TestingUtil } from "../utils/TestingUtil";
import { TARS } from "../utils/Tars";
import dotenv from "dotenv";

dotenv.config();

type NewFixture = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authFacade: AuthFacade;
  testingUtils: TestingUtil;
  tars: TARS;
};

export const test = base.extend<NewFixture>({
  page: async ({ baseURL, page }, use) => {
    await page.goto(baseURL as string);
    await use(page);
  },
  // TARS
  tars: async ({}, use) => {
    const reportUrl = process.env.REPORT_URL;
    const projectName = process.env.PROJECT_NAME;
    const toolName = process.env.TOOL_NAME;
    const activity = process.env.ACTIVITY;
    const author = process.env.AUTHOR;

    if (!reportUrl || !projectName || !toolName || !activity || !author) {
      throw new Error("SOME ENVIRONMENT VALUE MISSING");
    }

    const tars = new TARS(reportUrl, projectName, toolName, activity, author);

    await use(tars);
  },
  // TESTING UTIL
  testingUtils: async ({ page, tars }, use) => {
    const testingUtil = new TestingUtil(page, tars);
    await use(testingUtil);
  },
  // PAGE OBJECT
  loginPage: async ({ page, testingUtils }, use) => {
    const loginPage = new LoginPage(page, testingUtils);
    await use(loginPage);
  },
  dashboardPage: async ({ page, testingUtils }, use) => {
    const dashboardPage = new DashboardPage(page, testingUtils);
    await use(dashboardPage);
  },
  // FACADE
  authFacade: async ({ page, testingUtils, loginPage, dashboardPage }, use) => {
    const authFacade = new AuthFacade(
      page,
      testingUtils,
      loginPage,
      dashboardPage
    );
    await use(authFacade);
  },
});
