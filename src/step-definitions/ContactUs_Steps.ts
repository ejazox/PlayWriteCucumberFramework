import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";
import { faker} from "@faker-js/faker";
import { CucumberWorld } from "./world/CucumberWorld";
import logger from "../logger/logger";

When('I type a first name', async function(this : CucumberWorld) {
    // Write code here that turns the phrase above into concrete actions
    logger.info(`Base URL in CUcumber World: ${this.getUrl()}`);
    await this.contactUsPage.fillFirstName("joe");
    //await pageFixture.page.getByPlaceholder("First Name").waitFor();
    //await pageFixture.page.getByPlaceholder('First Name').fill("Joe", {force:true});
  
  });

  When('I type a last name', async function (this: CucumberWorld) {
    await this.contactUsPage.fillLastName("Blogs");
    //await pageFixture.page.getByRole('textbox', { name: 'Last Name' }).fill("Joe");
  });


  When('I eneter an email address', async function (this: CucumberWorld)  {
    // Write code here that turns the phrase above into concrete actions
    await this.contactUsPage.fillEmailAddress("joe_blogs123@gmail.com"); 
    //await pageFixture.page.getByRole('textbox', { name: 'Email Address' }).fill("text@gmail.com");
    
  });


  When('I type a comment', async function (this: CucumberWorld) {
   await this.contactUsPage.fillComment("Hello world!");
    // await pageFixture.page.getByRole('textbox', { name: 'Comments' }).fill("Test hello Hi");
  });


  When('I click on the submit button', async function (this: CucumberWorld)  {
    await this.contactUsPage.clickOnSubmitButton();
    // await pageFixture.page.click('input[value="SUBMIT"]');
    
    //await pageFixture.page.getByRole('button', {name : 'SUBMIT'});  
  });


  Then('I should be presented with a successful contact us submission message', async function (this : CucumberWorld) {
    // Waiting for the header test element
    const successMessage = await this.contactUsPage.getSuccessfullMessage();
    //await pageFixture.page.waitForSelector('#contact_reply h1' , {timeout:60000});
    //const text = await pageFixture.page.innerText('#contact_reply h1');
    expect(successMessage).toBe('Thank You for your Message!');
  });

  Then('I should be presented with a Unsuccessful contact us message', async function (this : CucumberWorld) {
    // Waiting for the header test element
   // await pageFixture.page.waitForSelector("body");
    //const bodyElement = await pageFixture.page.locator("body");
   // const bodyText = await bodyElement.textContent();
    //console.log(bodyText);
   // await pageFixture.page.pause();
   const errorlMessage = await this.contactUsPage.getErrorlMessage();
   expect(errorlMessage).not.toBeNull();
    // console.log("Value of the body is " + bodyText);
    expect(errorlMessage).toMatch(/Error: all fields are required[\s\S]*Error: Invalid email address/);
  }); 

  //// Cucumber Expressions

  When('I type a Specific first name {string}', async function (this: CucumberWorld, firstName: string) {
   await this.contactUsPage.fillFirstName(firstName);
    //await pageFixture.page.getByPlaceholder('First Name').fill(firstName);
    //await pageFixture.page.getByPlaceholder('First Name').fill(firstName);
  });
  
  When('I type a last name {string}', async function (this: CucumberWorld, lastName: string) {
    await this.contactUsPage.fillLastName(lastName);
    //await pageFixture.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
  });
  
  When('I eneter an specifc email address {string}', async function (this: CucumberWorld, emailAddress: string) {
     await this.contactUsPage.fillEmailAddress(emailAddress);
    //await pageFixture.page.getByRole('textbox', { name: 'Email Address' }).fill(emailAddress);
  });
  
  When('I type a specific text {string} and a number {int} within the comment input field', async function (this: CucumberWorld, word: string, number: number) {
    await this.contactUsPage.fillComment("Hello world!");
    //await pageFixture.page.getByRole('textbox', { name: 'Comments' }).fill(word + " "+ number);
  });


  ///// Random Data - Faker

    When('I type a random first name', async function (this: CucumberWorld) {
      // Write code here that turns the phrase above into concrete actions
      const randomFirstName = faker.person.firstName();
      this.setFirstName(randomFirstName);
      await this.contactUsPage.fillFirstName(randomFirstName);
      //await pageFixture.page.getByPlaceholder('First Name').fill(randomFirstName);
  });
    

    When('I type a random last name', async function (this: CucumberWorld) {
      const randomLastName = faker.person.lastName();
      this.setLastName(randomLastName);
      await this.contactUsPage.fillLastName(randomLastName);
      //await pageFixture.page.getByPlaceholder('Last Name').fill(randomLastName);
    });


    When('I eneter an random email address', async function (this: CucumberWorld) {
      const randomEmail = faker.internet.email();
     //this.contactUsPage.page.pause();
      this.setEmailAddress(randomEmail);
      await this.contactUsPage.fillEmailAddress(randomEmail);
      //await pageFixture.page.getByPlaceholder('Email Address').fill(randomEmail);
    });

    /*When('I type a comment', async function (this: CucumberWorld) {
      await this.contactUsPage.fillComment("Hello world!");
       // await pageFixture.page.getByRole('textbox', { name: 'Comments' }).fill("Test hello Hi");
     });*/

    When('Type a first name {word} amd a last name {word}' , async function (this: CucumberWorld, firstName : string, lastName : string) {
      await this.contactUsPage.fillFirstName(firstName);
      await this.contactUsPage.fillLastName(lastName); 
      // await pageFixture.page.getByPlaceholder('First Name').fill(firstName);
       // await pageFixture.page.getByPlaceholder('Last Name').fill(lastName);
        //await pageFixture.page.pause();
    });
    When('I type a Specific first name {string} and a last name {string}', async function(this: CucumberWorld, firstName: string, lastName: string) {
      await this.contactUsPage.fillFirstName(firstName);
      await this.contactUsPage.fillLastName(lastName);  
      //await pageFixture.page.getByPlaceholder("First Name").fill(firstName);
        //await pageFixture.page.getByPlaceholder("Last Name").fill(lastName);
      });
      
      When('I type a email address {string} and a comment {string}', async function (this: CucumberWorld, email: string, comment: string) {
        await this.contactUsPage.fillEmailAddress(email);
        await this.contactUsPage.fillComment(comment);
        //await pageFixture.page.getByPlaceholder("Email Address").fill(email);
        //await pageFixture.page.getByPlaceholder("Comments").fill(comment);
      });

      Then('I should be presented with header text {string}', async function (this: CucumberWorld, message: string) {
       const headerText = await this.contactUsPage.getHeaderText(message);


       
        //  await pageFixture.page.waitForSelector("//h1 | //body", {state:'visible'});
        //  const elements = await pageFixture.page.locator("//h1 | //body").elementHandles();
        
        //  let foundElementtext = '';

        //  for(let element of elements) {
        //   let text = await element.innerText();
        //   console.log("Please give me elemets" + text);

        //   // if statement to check whether text includes expected text
        //   if(text.includes(message)) {
        //     foundElementtext = text;
        //     break;
        //   }
        //  }  
         expect(headerText).toContain(message);
        });
      



