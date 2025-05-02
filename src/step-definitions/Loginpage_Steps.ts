import { When, Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CucumberWorld } from "./world/CucumberWorld";
let alertText: string;

Given('I navigate to the WebdriverUniversity login page', async function (this: CucumberWorld) {
   await this.loginPage.navigateToLoginPage();
    // await pageFixture.page.goto("https://www.webdriveruniversity.com/Login-Portal/index.html?");
});

When('I type a username {word}', async function (this: CucumberWorld, username: string) {
    // Write code here that turns the phrase above into concrete actions
    await this.loginPage.fillUsername(username);
    //await pageFixture.page.getByPlaceholder("Username").fill(username);
});

When('I type a password {word}', async function (this: CucumberWorld, password: string) {
    // Write code here that turns the phrase above into concrete actions
    await this.loginPage.fillPassword(password);
    //await pageFixture.page.getByPlaceholder("Password").fill(password);
    //await pageFixture.page.waitForTimeout(2000);
});

When('I click on the login button', async function(this: CucumberWorld) {
    // Write code here that turns the phrase above into concrete actions
    this.loginPage.page.on("dialog", async (alert) => {
        alertText = alert.message();
        await alert.accept();
        // console.log(alertText);
    })
    await this.loginPage.clickOnLoginButton();
    /*const loginButton = await pageFixture.page.locator("#login-button");
    await loginButton.hover();
    await loginButton.click({ force: true });
    await pageFixture.page.waitForTimeout(2000);*/
    //await  pageFixture.page.pause();
});
Then('I should be presented with an alert box which contains text {string}', async function (this: CucumberWorld, expectedAlertText: string) {
    expect(alertText).toBe(expectedAlertText);
});