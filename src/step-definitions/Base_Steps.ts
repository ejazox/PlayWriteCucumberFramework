import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { CucumberWorld } from "./world/CucumberWorld";

// import { config as loadEnv } from "dotenv";
// const env = loadEnv({path: './env/.env'});
// const config = {
//     width: parseInt(env.parsed?.BROWSER_WIDTH || '1920'),
//     height: parseInt(env.parsed?.BROWSER_HIGHT || '1080'),
// }

// When('I switch to the new browser tab', async () => {
//     await pageFixture.context.waitForEvent("page");
//     const allPage = await pageFixture.context.pages();
//     /// Assign the most recent tab 
//     pageFixture.page = allPage[allPage.length - 1];

//     /// Bring the newly assigned tab to front
//     await pageFixture.page.bringToFront();
//     await pageFixture.page.setViewportSize({ width: config.width, height: config.height});
// });

When('I switch to the new browser tab', async function (this : CucumberWorld){ 
    await this.basePage.switchToNewTab();
})

Given('I wait for {int} seconds', async (seconds: number) => {
    await pageFixture.page.waitForTimeout(seconds * 10000);
})


