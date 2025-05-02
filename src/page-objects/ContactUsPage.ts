import { BasePage } from "./base/BasePage";

export class ContactUsPage extends BasePage {

    public async fillFirstName(firstName: string): Promise<void> {
        await this.page.getByPlaceholder('First Name').fill(firstName);
    }

    public async fillLastName(lastName: string): Promise<void> {
        await this.page.getByPlaceholder('Last Name').fill(lastName);
    }

    public async fillEmailAddress(emailAddress: string): Promise<void> {
        await this.page.getByPlaceholder('Email Address').fill(emailAddress);
    }

    public async fillComment(comment: string): Promise<void> {
        await this.page.getByPlaceholder('Comments').fill(comment);
    }

    public async clickOnSubmitButton(): Promise<void> {
        await this.page.click('input[value="SUBMIT"]');
        await this.page.getByRole('button', { name: 'SUBMIT' });
    }

    public async getSuccessfullMessage(): Promise<string> {
        await this.page.waitForSelector('#contact_reply h1', { timeout: 60000 });
        return await this.page.innerText('#contact_reply h1');
    }

    public async getErrorlMessage(): Promise<string> {
       await this.page.waitForSelector("body");
       const bodyElement = await this.page.locator("body");
       const bodyText = await bodyElement.textContent();
       return bodyText ?? '';
    }

    public async getHeaderText(message: string): Promise<string> {
         await this.page.waitForSelector("//h1 | //body", {state:'visible'});
                 const elements = await this.page.locator("//h1 | //body").elementHandles();
                
                 let foundElementtext = '';
        
                 for(let element of elements) {
                  let text = await element.innerText();
                  console.log("Please give me elemets" + text);
        
                  // if statement to check whether text includes expected text
                  if(text.includes(message)) {
                    foundElementtext = text;
                    break;
                  }
                 }
                 return foundElementtext;  
     }







}