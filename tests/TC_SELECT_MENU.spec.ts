import { expect } from "@playwright/test";
import { test } from "../src/fixtures/Fixture";
import { Status } from "../src/utils/UtilTypes";

const testData = [
  { TCID: "TC_MENU_001", menu: "Admin", title: "Admin" },
  { TCID: "TC_MENU_002", menu: "PIM", title: "PIM" },
  { TCID: "TC_MENU_003", menu: "Leave", title: "Leave" },
  { TCID: "TC_MENU_004", menu: "Time", title: "Time" },
  { TCID: "TC_MENU_005", menu: "Recruitment", title: "Recruitment" },
  { TCID: "TC_MENU_006", menu: "My Info", title: "PIM" },
  { TCID: "TC_MENU_007", menu: "Performance", title: "Performance" },
  { TCID: "TC_MENU_008", menu: "Dashboard", title: "Dashboard" },
  { TCID: "TC_MENU_009", menu: "Claim", title: "Claim" },
  { TCID: "TC_MENU_010", menu: "Buzz", title: "Buzz" },
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

testData.forEach(({ TCID, menu, title }) => {
  test(TCID, async ({ testingUtils, dashboardPage }) => {
    await testingUtils.screenshoot(
      "After Login",
      "after login page",
      Status.Done,
      1000
    );
    await dashboardPage.selectMenu(menu);
    await testingUtils.screenshoot(
      "Select Menu",
      `Expected : Memastikan Click Menu ${menu}\nActual : Berhasil Click Menu ${menu}`,
      Status.Done,
      2000
    );

    expect(await dashboardPage.checkMenuTitleExist(title)).toBe(true);
    await testingUtils.screenshoot(
      "Expect Menu Title",
      `Expected : Memastikan Terdapat Menu Title ${title}\nActual : Terdapat Menu Title ${title}`,
      Status.Passed
    );
  });
});
