import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CityComponentsPage, { CityDeleteDialog } from './city-my-suffix.page-object';
import CityUpdatePage from './city-my-suffix-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible
} from '../../util/utils';

const expect = chai.expect;

describe('City e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cityComponentsPage: CityComponentsPage;
  let cityUpdatePage: CityUpdatePage;
  let cityDeleteDialog: CityDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load Cities', async () => {
    await navBarPage.getEntityPage('city-my-suffix');
    cityComponentsPage = new CityComponentsPage();
    expect(await cityComponentsPage.title.getText()).to.match(/Cities/);

    expect(await cityComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([cityComponentsPage.noRecords, cityComponentsPage.table]);

    beforeRecordsCount = (await isVisible(cityComponentsPage.noRecords)) ? 0 : await getRecordsCount(cityComponentsPage.table);
  });

  it('should load create City page', async () => {
    await cityComponentsPage.createButton.click();
    cityUpdatePage = new CityUpdatePage();
    expect(await cityUpdatePage.getPageTitle().getAttribute('id')).to.match(/dapenApp.city.home.createOrEditLabel/);
    await cityUpdatePage.cancel();
  });

  it('should create and save Cities', async () => {
    await cityComponentsPage.createButton.click();
    await cityUpdatePage.setCityCodeInput('cityCode');
    expect(await cityUpdatePage.getCityCodeInput()).to.match(/cityCode/);
    await cityUpdatePage.setCityNameInput('cityName');
    expect(await cityUpdatePage.getCityNameInput()).to.match(/cityName/);
    await cityUpdatePage.provinceSelectLastOption();
    await waitUntilDisplayed(cityUpdatePage.saveButton);
    await cityUpdatePage.save();
    await waitUntilHidden(cityUpdatePage.saveButton);
    expect(await isVisible(cityUpdatePage.saveButton)).to.be.false;

    expect(await cityComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(cityComponentsPage.table);

    await waitUntilCount(cityComponentsPage.records, beforeRecordsCount + 1);
    expect(await cityComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last City', async () => {
    const deleteButton = cityComponentsPage.getDeleteButton(cityComponentsPage.records.last());
    await click(deleteButton);

    cityDeleteDialog = new CityDeleteDialog();
    await waitUntilDisplayed(cityDeleteDialog.deleteModal);
    expect(await cityDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/dapenApp.city.delete.question/);
    await cityDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(cityDeleteDialog.deleteModal);

    expect(await isVisible(cityDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([cityComponentsPage.noRecords, cityComponentsPage.table]);

    const afterCount = (await isVisible(cityComponentsPage.noRecords)) ? 0 : await getRecordsCount(cityComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
