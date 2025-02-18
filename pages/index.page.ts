import { Locator,Page  } from '@playwright/test';

export class IndexPage {
    readonly accountDropbox: Locator;
    readonly accountMenu: Locator;
    readonly registerLink: Locator;
    readonly loginLink: Locator;
    readonly cartItemCount: Locator;
    readonly logo: Locator;

    indexPageUrl = 'https://store.cpanel.net/index.php';


    constructor(readonly page: Page) {
        this.accountDropbox = page.getByRole('link', { name: 'Account', exact: true });
        this.accountMenu =  page.getByText('Login Register Forgot');
        this.registerLink =  page.getByRole('link', { name: 'Register' });
        this.loginLink =  page.getByRole('link', { name: 'Login' });
        this.cartItemCount = page.locator('#cartItemCount');
        this.logo = page.getByRole('link', { name: 'cPanel Store' });
      }
    }