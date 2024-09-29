import { Page } from "@playwright/test";
import { TARS } from "./Tars";
import { Status } from "./UtilTypes";
import path from "path";
import fs from "fs";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

export class TestingUtil {
  private page: Page;
  private tars: TARS;

  constructor(page: Page, tars: TARS) {
    this.page = page;
    this.tars = tars;
  }

  async screenshoot(
    title: string,
    description: string,
    result: Status,
    timeoutMs?: number
  ) {
    const screenshootEnv = process.env.SCREENSHOOT_PATH;

    if (!screenshootEnv) {
      throw new Error("SCREESHOOT_PATH NOT FOUND IN ENV");
    }

    const screenshootPath = path.join(__dirname, "..", "..", screenshootEnv);
    const fullPathScreenshoot = path.join(
      screenshootPath,
      Date.now().toString() + ".png"
    );

    fs.mkdirSync(screenshootPath, { recursive: true });

    if (timeoutMs) {
      await this.delay(timeoutMs);
    }

    await this.page.screenshot({ path: fullPathScreenshoot });

    const formData = new FormData();

    formData.append("image", fs.createReadStream(fullPathScreenshoot));
    formData.append("title", title);
    formData.append("description", description);
    formData.append("result", result);

    await this.tars.addTestStep(formData);
  }

  async delay(timeoutMs: number) {
    await new Promise((resolve) => setTimeout(resolve, timeoutMs));
  }

  async errorHandling(title: string, e: Error): Promise<void> {
    await this.screenshoot(title, e.message, Status.Failed, 1000);
  }
}
