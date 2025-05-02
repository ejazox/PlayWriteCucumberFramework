import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HomePage } from "../HomePage";
import { pageFixture } from "../../step-definitions/hooks/browserContextFixture";
import { ContactUsPage } from "../ContactUsPage";
import { LoginPage } from "../LoginPage";

export class PageManager {
    get page(): Page {
        return pageFixture.page;
    }
    createBasePage() : BasePage {
        return new BasePage();
    }
    createHomePage() {
        return new HomePage();
    }
    createContactUsPage() {
        return new ContactUsPage();
    }
    createLoginPage() {
        return new LoginPage();
    }
}