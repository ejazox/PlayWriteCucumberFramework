import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser,BrowserType,chromium, firefox, webkit } from "@playwright/test";
import { pageFixture } from "./browserContextFixture";
import { setGlobalSettings } from "../../utils/playwright-timeouts";
import { PageManager } from "../../page-objects/base/PageManager";

import { config as loadEnv } from "dotenv";
const env = loadEnv({path: './env/.env'});

// Create a configuration object for easy access to env variable

const config = {
    headless: true ,
    browser: env.parsed?.UI_AUTOMATION_BROWSER || 'chromium',
    width: parseInt(env.parsed?.BROWSER_WIDTH || '1920'),
    height: parseInt(env.parsed?.BROWSER_HIGHT || '1080'),
}

// Create dictionary maping browser name to their launch function
const browsers: { [key: string]: BrowserType } = {
    'chromiumn' : chromium,
    'firefox' : firefox,
    'webkit' : webkit
};


let browserInstance : Browser | null = null;

async function intializeBrowserContext(selectedBrowser: string): Promise<Browser>  {
    const launchBrowser = browsers[selectedBrowser];
    if(!launchBrowser) {
        throw new Error(`Invalid browser selected: ${selectedBrowser}`);
    }
    return await launchBrowser.launch({headless: config.headless});
}


async function intializePage(): Promise<void>  {
    if(!browserInstance) {
        throw new Error('Browser instance is null');
    }
    pageFixture.context = await browserInstance.newContext({ignoreHTTPSErrors : true});
    pageFixture.page = await pageFixture.context.newPage();
    setGlobalSettings(pageFixture.page);
    await pageFixture.page.setViewportSize({width: config.width, height: config.height});
}

BeforeAll(async function() {
    console.log("Executing all scenarios");
})

AfterAll(async function () {
    console.log("Finished execuation of test suites");  
})

Before(async function () {
   // browserInstance = await chromium.launch({headless:false});
  try {
        browserInstance = await intializeBrowserContext(config.browser);     
        await intializePage();
        this.pageManager = new PageManager();
        this.basepage = this.pageManager.createBasePage();
        this.homepage = this.pageManager.createHomePage();
        this.contactUsPage = this.pageManager.createContactUsPage();
        this.loginPage = this.pageManager.createLoginPage();
  } catch (error) {
        console.error('Browser context intilization failed', error);
  }
})

After(async function ({pickle, result}) {
    if(result?.status === Status.FAILED) {
        if(pageFixture.page) {
            const screenshotPath= `./cucumber-report/screenshots/${pickle.name}-${Date.now()}.png`; 
            const image = await pageFixture.page.screenshot({
                path: screenshotPath,
                type: "png"
            });
            await this.attach(image, 'image/png');
        } else {
            console.error('pageFixture.page is undefined');
        }

    }
    if(browserInstance) {
        await pageFixture.page?.close();
        await browserInstance.close();
    }
})