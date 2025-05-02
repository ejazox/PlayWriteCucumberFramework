import { Given,When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import logger from "../logger/logger";
import { CucumberWorld } from "./world/CucumberWorld";

const url = "https://www.webdriveruniversity.com/";

Given('I navigate to WebdriverUniversity homepage', async function (this : CucumberWorld) {
   
   try {
   // await pageFixture.page.goto(url);
   //await this.basePage.navigate(url);
    await this.homePage.navigate(url);
    logger.info('Accessing URL: ' + url);
    this.setUrl(url);
     //throw new Error('Simulating en error during navigation');
   } catch (error : any) {
    logger.error('An error has occurred: ' + error.message);
   }    
});

When('I click on the contact us botton', async function (this: CucumberWorld)  {
    //await page.pause();
    //const contactUs_Button=await pageFixture.page.getByRole('link', { name: 'CONTACT US Contact Us Form' });
   // const contactUs_Button=await pageFixture.page.getByRole('link', { name: 'CONTACT US' });
    //await contactUs_Button.click();
    //console.log("Step 2");
   // this.basePage.waitAndClickByRole("link", "Contact Us Form");
    //this.homePage.waitAndClickByRole("link", "Contact Us Form");
    this.homePage.clickOnContactUsButton();
});

When('I click on the login portal button', async function (this: CucumberWorld) {
    this.homePage.clickOnLoginPortalButton();
    // this.homePage.waitAndClickByRole("link", "Login Portal");
    //await page.pause();
    //const login_Button=await pageFixture.page.getByRole('link', { name: 'LOGIN PORTAL' });
    //await login_Button.click();
    //console.log("Step 2");
});


/*When('I switch to the new browser tab', async () => {
    await pageFixture.context.waitForEvent("page");
    const allPage = await pageFixture.context.pages();
   // await pageFixture.page.pause();

    /// Assign the most recent tab 
    pageFixture.page = allPage[allPage.length - 1];

    /// Bring the newly assigned tab to front
    await pageFixture.page.bringToFront();
    await pageFixture.page.setViewportSize({ width:1920, height:1080});
    //await pageFixture.page.pause();
});*/


