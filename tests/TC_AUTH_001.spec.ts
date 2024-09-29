import { expect } from "@playwright/test";
import { test } from "../src/fixtures/Fixture";
import { Status } from "../src/utils/UtilTypes";

test.describe("Should Login With Correct User", () => {
  test.beforeEach(async ({ tars }) => {
    await tars.createReport("SCN_AUTH_BARU", "TC_AUTH_001");
  });

  test.afterEach(async ({ tars }) => {
    await tars.saveReport();
  });

  test("TC_AUTH_001", async ({
    page,
    testingUtils,
    authFacade,
    dashboardPage,
  }) => {
    await page.waitForLoadState("load");
    await authFacade.login("Admin", "admin123");

    expect(await dashboardPage.checkDashboardTitleExist()).toBe(true);
    await testingUtils.screenshoot(
      "Expect Login Success",
      "Expected : Memastikan Berhasil Login\nActual : Berhasil Login",
      Status.Passed
    );
  });
});
