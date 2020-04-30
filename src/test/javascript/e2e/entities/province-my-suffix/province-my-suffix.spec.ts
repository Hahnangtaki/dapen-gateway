import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProvinceComponentsPage, { ProvinceDeleteDialog } from './province-my-suffix.page-object';
import ProvinceUpdatePage from './province-my-suffix-update.page-object';
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

describe('Province e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let provinceComponentsPage: ProvinceComponentsPage;
  let provinceUpdatePage: ProvinceUpdatePage;
  let provinceDeleteDialog: ProvinceDeleteDialog;
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

  it('should load Provinces', async () => {
    await navBarPage.getEntityPage('province-my-suffix');
    provinceComponentsPage = new ProvinceComponentsPage();
    expect(await provinceComponentsPage.title.getText()).to.match(/Provinces/);

    expect(await provinceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([provinceComponentsPage.noRecords, provinceComponentsPage.table]);

    beforeRecordsCount = (await isVisible(provinceComponentsPage.noRecords)) ? 0 : await getRecordsCount(provinceComponentsPage.table);
  });

  it('should load create Province page', async () => {
    await provinceComponentsPage.createButton.click();
    provinceUpdatePage = new ProvinceUpdatePage();
    expect(await provinceUpdatePage.getPageTitle().getAttribute('id')).to.match(/dapenApp.province.home.createOrEditLabel/);
    await provinceUpdatePage.cancel();
  });

  it('should create and save Provinces', async () => {
    await provinceComponentsPage.createButton.click();
    await provinceUpdatePage.setProvinceCodeInput('provinceCode');
    expect(await provinceUpdatePage.getProvinceCodeInput()).to.match(/provinceCode/);
    await provinceUpdatePage.setProvinceNameInput('provinceName');
    expect(await provinceUpdatePage.getProvinceNameInput()).to.match(/provinceName/);
    await provinceUpdatePage.countrySelectLastOption();
    await waitUntilDisplayed(provinceUpdatePage.saveButton);
    await provinceUpdatePage.save();
    await waitUntilHidden(provinceUpdatePage.saveButton);
    expect(await isVisible(provinceUpdatePage.saveButton)).to.be.false;

    expect(await provinceComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(provinceComponentsPage.table);

    await waitUntilCount(provinceComponentsPage.records, beforeRecordsCount + 1);
    expect(await provinceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Province', async () => {
    const deleteButton = provinceComponentsPage.getDeleteButton(provinceComponentsPage.records.last());
    await click(deleteButton);

    provinceDeleteDialog = new ProvinceDeleteDialog();
    await waitUntilDisplayed(provinceDeleteDialog.deleteModal);
    expect(await provinceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/dapenApp.province.delete.question/);
    await provinceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(provinceDeleteDialog.deleteModal);

    expect(await isVisible(provinceDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([provinceComponentsPage.noRecords, provinceComponentsPage.table]);

    const afterCount = (await isVisible(provinceComponentsPage.noRecords)) ? 0 : await getRecordsCount(provinceComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
