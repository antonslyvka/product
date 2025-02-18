import { expect,Locator,Page  } from '@playwright/test';

export class ConfigurePage {
    readonly pageHeading: Locator;
    readonly ipAddressTextField: Locator;
    readonly additionalInfoTitle: Locator;
    readonly ipConfigureLoader: Locator;
    readonly continueButton: Locator;
    readonly orderSummarySection: Locator;
    readonly orderedSummaryValue: Locator;
    readonly orderedSummaryCost: Locator;
    readonly billingCycle: Locator;

    constructor(readonly page: Page) {
        this.pageHeading = page.getByRole('heading',{name: 'Configure'});
        this.ipAddressTextField = page.getByRole('textbox', { name: 'IP Address' });
        this.additionalInfoTitle = page.getByText('Additional Information');
        this.ipConfigureLoader = page.getByText('Validating IP Address');
        this.continueButton = page.getByRole('button', {name: 'Continue'});
        this.orderSummarySection = page.locator('.order-summary');
        this.orderedSummaryValue = this.orderSummarySection.locator('.pull-left.float-left');
        this.orderedSummaryCost = this.orderSummarySection.locator('.pull-right.float-right');
        this.billingCycle = page.getByLabel('Choose Billing Cycle');
      }

      async selectAddon(addonName: string) {
        await this.page.locator('.panel-addon').filter({ hasText: addonName }).first().getByText('Add to Cart').click();
      }

    }