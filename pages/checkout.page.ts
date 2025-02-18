import { expect,Locator,Page  } from '@playwright/test';

export class CheckoutPage {
    readonly pageTitle: Locator;

    constructor(readonly page: Page) {
        this.pageTitle = page.getByRole('heading',{name: 'Checkout'});
      }

    async validateOrderedPruducts(row:number, productType:string, ipAddress:string, recurringPrice:number, dueTodayPrice:number) {
        await expect(this.page.getByRole('row').nth(row).getByRole('cell').nth(0)).toHaveText(productType);
        await expect(this.page.getByRole('row').nth(row).getByRole('cell').nth(2)).toHaveText(ipAddress);
        await expect(this.page.getByRole('row').nth(row).getByRole('cell').nth(3)).toContainText(recurringPrice.toString());
        await expect(this.page.getByRole('row').nth(row).getByRole('cell').nth(4)).toContainText(dueTodayPrice.toString());
    }

    async verifyPersonalInformationFieldsAvailability() {
        await expect(this.page.locator('.sub-heading').getByText('Personal Information')).toBeVisible();
        await expect(this.page.locator('#inputFirstName')).toBeVisible();
        await expect(this.page.locator('#inputLastName')).toBeVisible();
        await expect(this.page.locator('#inputEmail')).toBeVisible();
        await expect(this.page.locator('#inputPhone')).toBeVisible();
    }

    async verifyBillingAddressFieldsAvailability() {
        await expect(this.page.locator('.sub-heading').getByText('Billing Address')).toBeVisible();
        await expect(this.page.locator('#inputCompanyName')).toBeVisible();
        await expect(this.page.locator('#inputAddress1')).toBeVisible();
        await expect(this.page.locator('#inputAddress2')).toBeVisible();
        await expect(this.page.locator('#inputCity')).toBeVisible();
        await expect(this.page.locator('#stateselect')).toBeVisible();
        await expect(this.page.locator('#inputPostcode')).toBeVisible();
        await expect(this.page.locator('#inputCountry')).toBeVisible();
        await expect(this.page.locator('#inputTaxId')).toBeVisible();
    }

    async verifyAccountSecurityFieldsAvailability() {
        await expect(this.page.locator('.sub-heading').getByText('Account Security')).toBeVisible();
        await expect(this.page.locator('#inputNewPassword1')).toBeVisible();
        await expect(this.page.locator('#inputNewPassword2')).toBeVisible();
        await expect(this.page.locator('.generate-password')).toBeVisible();
    }

    async verifyTermsConditionsFieldsAvailability() {
        await expect(this.page.locator('.sub-heading').getByText('Terms & Conditions')).toBeVisible();
       await expect(this.page.locator('#iCheck-accepttos_custom').getByRole('insertion')).toBeVisible();
    }

    async verifyPaymentDetailsFieldsAvailability() {
        await expect(this.page.locator('.sub-heading').getByText('Payment Details')).toBeVisible();
        await expect(this.page.locator('#stripeCreditCard')).toBeVisible();
        await expect(this.page.locator('#stripeExpiryDate')).toBeVisible();
        await expect(this.page.locator('#stripeCvc')).toBeVisible();
        await expect(this.page.locator('#inputDescription')).toBeVisible();
    }

}
