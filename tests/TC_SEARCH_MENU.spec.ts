import { expect } from "@playwright/test";
import { test } from "../src/fixtures/Fixture";
import { Status } from "../src/utils/UtilTypes";

const testData = [
  { TCID: "TC_MENU_011", menu: "Admin" },
  { TCID: "TC_MENU_012", menu: "PIM" },
  { TCID: "TC_MENU_013", menu: "Leave" },
  { TCID: "TC_MENU_014", menu: "Time" },
  { TCID: "TC_MENU_015", menu: "Recruitment" },
  { TCID: "TC_MENU_016", menu: "My Info" },
  { TCID: "TC_MENU_017", menu: "Performance" },
  { TCID: "TC_MENU_018", menu: "Dashboard" },
  { TCID: "TC_MENU_019", menu: "Directory" },
  { TCID: "TC_MENU_020", menu: "Claim" },
  { TCID: "TC_MENU_021", menu: "Buzz" },
];

test.beforeEach(async ({ page, tars, authFacade }, testInfo) => {
  await tars.createReport("SCN_MENU", testInfo.title);
  await page.waitForLoadState("load");
  await authFacade.loginWithoutScreenshoot("Admin", "admin123");
});

test.afterEach(async ({ tars, authFacade }) => {
  await authFacade.logoutWithoutScreenshoot();
  await tars.saveReport();
});

testData.forEach(({ TCID, menu }) => {
  test(TCID, async ({ testingUtils, dashboardPage }) => {
    await testingUtils.screenshoot(
      "After Login",
      "after login page",
      Status.Done,
      1000
    );
    await dashboardPage.setSearchMenu(menu);
    await testingUtils.screenshoot(
      "Search Menu",
      `Expected : Memastikan Berhasil Search Menu ${menu}\nActual : Berhasil Search Menu ${menu}`,
      Status.Done,
      1000
    );

    expect(await dashboardPage.checkMenuExist(menu)).toBe(true);
    await testingUtils.screenshoot(
      "Check Menu",
      `Expected : Memastikan Menampilkan Menu ${menu}\nActual : Berhasil Menampilkan Menu ${menu}`,
      Status.Done
    );
  });
});
