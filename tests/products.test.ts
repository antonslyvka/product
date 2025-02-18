import { test,  expect } from '@playwright/test';
import {CheckoutPage} from '../pages/checkout.page'
import { LicensePage } from '../pages/license.page';
import { IndexPage } from '../pages/index.page';
import { ConfigurePage } from '../pages/configure.page';
import { ReviewPage } from '../pages/review.page'; 

let checkoutPage: CheckoutPage;
let licensePage : LicensePage;
let indexPage : IndexPage;
let configurePage : ConfigurePage;
let reviewPage : ReviewPage;


test.beforeEach(async ({ page }) => {
  checkoutPage = new CheckoutPage(page);
  licensePage = new LicensePage(page);
  indexPage = new IndexPage(page);
  configurePage = new ConfigurePage(page);
  reviewPage = new ReviewPage(page);
    await page.goto('https://store.cpanel.net/');
  });

test.afterEach(async ({ page }) => {
  await page.close();
});



test('Verify Product and Addon addition to cart', async ({ page }) => {

  test.setTimeout(60000);

  const licenseName = 'cPanel Solo® Cloud (1 Account)';
  const addonName = 'Monthly CloudLinux';
  const ipAddress = '2.2.2.2';
  let licenseCost:number;
  let prorataLicenseCost:number;
  let addonCost:number;
  let prorataAddonCost:number;

    await test.step('Navigate to the cPanel store', async () => { 
        await page.goto(licensePage.licensePageUrl);
      });
  
    await test.step('Verify user is not logged in', async () => {  
      await indexPage.logo.click();
      await expect(page).toHaveURL(indexPage.indexPageUrl);
      await indexPage.accountDropbox.click();
      await expect(indexPage.accountMenu).toBeVisible();
      await expect(indexPage.registerLink).toBeVisible();
      await expect(indexPage.loginLink).toBeVisible();
      });

    await test.step('Order a Product', async () => {  
      await page.goBack();
      await expect(page).toHaveURL(licensePage.licensePageUrl);
      await expect(indexPage.cartItemCount).toHaveText('0');
      licenseCost = parseFloat((await page.locator('.product').filter({ hasText: licenseName}).locator('.price').innerText()).split('$')[1]);
      await licensePage.selectLicense(licenseName);
      //issue1
      //await expect(indexPage.cartItemCount).toHaveText('1');
      await expect(configurePage.pageHeading).toBeVisible();
      await expect(configurePage.orderedSummaryValue.first()).toContainText(licenseName);
      await expect(configurePage.orderedSummaryCost.first()).toContainText(licenseCost.toString());
      await expect(configurePage.orderedSummaryCost.nth(2)).toContainText(licenseCost.toString());
      await expect(configurePage.billingCycle).toContainText(licenseCost.toString());
      prorataLicenseCost = parseFloat((await page.locator('.amt').innerText()).split('$')[1]);
    });

    await test.step('Enter IP Address', async () => { 
      await expect(configurePage.continueButton).toBeDisabled();
      await configurePage.ipAddressTextField.fill(ipAddress);
      await configurePage.additionalInfoTitle.click();
      await expect(configurePage.ipConfigureLoader).toBeVisible();
      await expect(configurePage.ipConfigureLoader).toBeHidden({timeout: 15000});
      await expect(configurePage.continueButton).toBeEnabled();
    });

    await test.step('Select Addons', async () => {  
      addonCost = parseFloat((await page.locator('.panel-addon').filter({hasText: addonName }).first().locator('.panel-price').innerText()).split('$')[1]);
      await configurePage.selectAddon(addonName);
      //issue1
      //await expect(indexPage.cartItemCount).toHaveText('2');
    });

    await test.step('Continue to Checkout', async () => {  
      await expect(configurePage.orderedSummaryValue.nth(1)).toContainText(addonName);
      await expect(configurePage.orderedSummaryCost.nth(1)).toContainText(addonCost.toString());
      prorataAddonCost = parseFloat((parseFloat((await page.locator('.amt').innerText()).split('$')[1]) - prorataLicenseCost).toFixed(2));
      await configurePage.continueButton.click();
      await expect(reviewPage.pageTittle).toBeVisible({timeout : 10000});
      await expect(indexPage.cartItemCount).toHaveText('2');
      });

    await test.step('Verify Product and Price', async () => {   
      await expect(page.locator('.item').nth(0)).toContainText(licenseName);
      expect(parseFloat((await reviewPage.price.nth(0).innerText()).split('$')[1])).toStrictEqual(prorataLicenseCost);
      //issue2
      //expect(parseFloat((await reviewPage.price.nth(0).locator('.cycle').innerText()).split('$')[1])).toStrictEqual(licenseCost);
      await expect(page.locator('.item').nth(1)).toContainText(addonName);
      expect(parseFloat((await reviewPage.price.nth(1).innerText()).split('$')[1])).toStrictEqual(prorataAddonCost);
      expect(parseFloat((await reviewPage.price.nth(1).locator('.cycle').innerText()).split('$')[1])).toStrictEqual(addonCost);
     });

    await test.step('Proceed to Checkout', async () => {  
      await reviewPage.checkoutLink.click();
      await expect(checkoutPage.pageTitle).toBeVisible({timeout : 10000});
    });

    await test.step('Verify Checkout Information', async () => {
      //issue3
      //await checkoutPage.validateOrderedPruducts(1,licenseName,ipAddress,licenseCost,prorataLicenseCost);
      await checkoutPage.validateOrderedPruducts(2,addonName,ipAddress,addonCost,prorataAddonCost);
      await checkoutPage.verifyPersonalInformationFieldsAvailability();
      await checkoutPage.verifyBillingAddressFieldsAvailability();
      await checkoutPage.verifyAccountSecurityFieldsAvailability();
      await checkoutPage.verifyTermsConditionsFieldsAvailability();
      await checkoutPage.verifyPaymentDetailsFieldsAvailability();
    });
});
  