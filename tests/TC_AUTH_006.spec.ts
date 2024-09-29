import { expect } from "@playwright/test";
import { test } from "../src/fixtures/Fixture";
import { Status } from "../src/utils/UtilTypes";

test.describe("Should Show Required On Username Field When Empty", () => {
  test.beforeEach(async ({ tars }) => {
    await tars.createReport("SCN_AUTH_BARU", "TC_AUTH_006");
  });

  test.afterEach(async ({ tars }) => {
    await tars.saveReport();
  });

  test("TC_AUTH_006", async ({ page, testingUtils, authFacade, loginPage }) => {
    await page.waitForLoadState("load");
    await authFacade.login("", "admin123");

    expect(await loginPage.checkUsernameRequiredAlertExist()).toBe(true);
    await testingUtils.screenshoot(
      "Expect Username Required",
      "Expected : Memastikan Terdapat Alert Required Pada Field Username\nActual : Terdapat Alert Required Pada Field Username",
      Status.Passed,
      1000
    );
  });
});
