import { Locator,Page  } from '@playwright/test';

export class ReviewPage {
    readonly pageTittle: Locator;
    readonly checkoutLink: Locator;
    readonly price: Locator;

    constructor(readonly page: Page) {
        this.pageTittle = page.getByRole('heading',{name: 'Review & Checkout'});
        this.checkoutLink = page.getByRole('link', {name: 'Checkout'});
        this.price = page.locator('.item-price');
      }
    }