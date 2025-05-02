import { Page,Locator } from "@playwright/test";
import { pageFixture } from "../../step-definitions/hooks/browserContextFixture";

import { config as loadEnv } from "dotenv";
import { th } from "@faker-js/faker/.";
const env = loadEnv({path: './env/.env'});
const config = {
    width: parseInt(env.parsed?.BROWSER_WIDTH || '1920'),
    height: parseInt(env.parsed?.BROWSER_HIGHT || '1080'),
}

export class BasePage {
    get page() {
        return pageFixture.page;
    }

    public async navigate(url: string){
        await this.page.goto(url);
    }

public async waitAndClickByRole(role: string, name: string): Promise<void> {
    const element = this.page.getByRole(role as any, { name:name });
    await element.click();
}

public async waitAndClick(locator: Locator) : Promise<void> {
    await locator.isVisible();
    await locator.click();
}

public async waitAndClickSelector(selector: string) : Promise<void> {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
}

public async switchToNewTab(): Promise <void> {
      await this.page.context().waitForEvent("page");
      const allPages = await this.page.context().pages();

    //await pageFixture.context.waitForEvent("page");
       //const allPage = await pageFixture.context.pages();
       const allPage = await pageFixture.context.pages();
       /// Assign the most recent tab 
       pageFixture.page = allPage[allPage.length - 1];
   
       /// Bring the newly assigned tab to front
       await pageFixture.page.bringToFront();
       await this.page.bringToFront();
       //await pageFixture.page.bringToFront();
       //await pageFixture.page.setViewportSize({ width: config.width, height: config.height}); 
       await this.page.setViewportSize({ width: config.width, height: config.height});       
}
}