import { expect } from "@playwright/test";
import { test } from "../src/fixtures/Fixture";
import { Status } from "../src/utils/UtilTypes";

test.describe("Should Show Invalid Credential When Login With Invalid User", () => {
  test.beforeEach(async ({ tars }) => {
    await tars.createReport("SCN_AUTH_BARU", "TC_AUTH_002");
  });

  test.afterEach(async ({ tars }) => {
    await tars.saveReport();
  });

  test("TC_AUTH_002", async ({ page, testingUtils, authFacade, loginPage }) => {
    await page.waitForLoadState("load");
    await authFacade.login("adsdsa", "sdswas");

    expect(await loginPage.checkInvalidCredentialsExist()).toBe(true);
    await testingUtils.screenshoot(
      "Check Invalid Credentials Exist",
      "Expected : Memastikan Terdapat Alert Invalid Credential\nActual : Terdapat Alert Invalid Credentials",
      Status.Passed,
      2000
    );
  });
});
