import { expect } from "@playwright/test";
import { test } from "../src/fixtures/Fixture";
import { Status } from "../src/utils/UtilTypes";

test.describe("Should Success Logout", () => {
  test.beforeEach(async ({ tars }) => {
    await tars.createReport("SCN_AUTH_BARU", "TC_AUTH_003");
  });

  test.afterEach(async ({ tars }) => {
    await tars.saveReport();
  });

  test("TC_AUTH_003", async ({ page, testingUtils, authFacade, loginPage }) => {
    await page.waitForLoadState("load");
    await authFacade.login("Admin", "admin123");
    await authFacade.logout();

    expect(await loginPage.checkLoginTitleExist()).toBe(true);
    await testingUtils.screenshoot(
      "Expect Logout Success",
      "Expected : Memastikan Berhasil Logout\nActual : Berhasil Logout",
      Status.Passed
    );
  });
});
