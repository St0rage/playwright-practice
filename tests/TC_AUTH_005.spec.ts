import { expect } from "@playwright/test";
import { test } from "../src/fixtures/Fixture";
import { Status } from "../src/utils/UtilTypes";

test.describe("Should Show Required On Password Field When Empty", () => {
  test.beforeEach(async ({ tars }) => {
    await tars.createReport("SCN_AUTH_BARU", "TC_AUTH_005");
  });

  test.afterEach(async ({ tars }) => {
    await tars.saveReport();
  });

  test("TC_AUTH_005", async ({ page, testingUtils, authFacade, loginPage }) => {
    await page.waitForLoadState("load");
    await authFacade.login("Admin", "");

    expect(await loginPage.checkPasswordRequiredAlertExist()).toBe(true);
    await testingUtils.screenshoot(
      "Expect Password Required",
      "Expected : Memastikan Terdapat Alert Required Pada Field Password\nActual : Terdapat Alert Required Pada Field Password",
      Status.Passed
    );
  });
});
