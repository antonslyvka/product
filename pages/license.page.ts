import { Page  } from '@playwright/test';

export class LicensePage {
    licensePageUrl = 'https://store.cpanel.net/store/cpanel-licenses';

    constructor(readonly page: Page) {
      }

    async selectLicense(licenseName:string) {
        await this.page.locator('.product').filter({ hasText: licenseName}).locator('.btn-order-now').click();
    }
    }