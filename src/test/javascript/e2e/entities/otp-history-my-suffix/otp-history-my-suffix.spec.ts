import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OtpHistoryComponentsPage, { OtpHistoryDeleteDialog } from './otp-history-my-suffix.page-object';
import OtpHistoryUpdatePage from './otp-history-my-suffix-update.page-object';
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

describe('OtpHistory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let otpHistoryComponentsPage: OtpHistoryComponentsPage;
  let otpHistoryUpdatePage: OtpHistoryUpdatePage;
  let otpHistoryDeleteDialog: OtpHistoryDeleteDialog;
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

  it('should load OtpHistories', async () => {
    await navBarPage.getEntityPage('otp-history-my-suffix');
    otpHistoryComponentsPage = new OtpHistoryComponentsPage();
    expect(await otpHistoryComponentsPage.title.getText()).to.match(/Otp Histories/);

    expect(await otpHistoryComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([otpHistoryComponentsPage.noRecords, otpHistoryComponentsPage.table]);

    beforeRecordsCount = (await isVisible(otpHistoryComponentsPage.noRecords)) ? 0 : await getRecordsCount(otpHistoryComponentsPage.table);
  });

  it('should load create OtpHistory page', async () => {
    await otpHistoryComponentsPage.createButton.click();
    otpHistoryUpdatePage = new OtpHistoryUpdatePage();
    expect(await otpHistoryUpdatePage.getPageTitle().getAttribute('id')).to.match(/dapenApp.otpHistory.home.createOrEditLabel/);
    await otpHistoryUpdatePage.cancel();
  });

  it('should create and save OtpHistories', async () => {
    await otpHistoryComponentsPage.createButton.click();
    await otpHistoryUpdatePage.setReffNoInput('reffNo');
    expect(await otpHistoryUpdatePage.getReffNoInput()).to.match(/reffNo/);
    await otpHistoryUpdatePage.setEncodedOtpInput('encodedOtp');
    expect(await otpHistoryUpdatePage.getEncodedOtpInput()).to.match(/encodedOtp/);
    await otpHistoryUpdatePage.setCreatedTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await otpHistoryUpdatePage.getCreatedTimeInput()).to.contain('2001-01-01T02:30');
    await otpHistoryUpdatePage.setExecutedTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await otpHistoryUpdatePage.getExecutedTimeInput()).to.contain('2001-01-01T02:30');
    await otpHistoryUpdatePage.setExpiredTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await otpHistoryUpdatePage.getExpiredTimeInput()).to.contain('2001-01-01T02:30');
    await otpHistoryUpdatePage.setRetryMaxInput('5');
    expect(await otpHistoryUpdatePage.getRetryMaxInput()).to.eq('5');
    await otpHistoryUpdatePage.setRetryCountInput('5');
    expect(await otpHistoryUpdatePage.getRetryCountInput()).to.eq('5');
    await otpHistoryUpdatePage.visitorSelectLastOption();
    await waitUntilDisplayed(otpHistoryUpdatePage.saveButton);
    await otpHistoryUpdatePage.save();
    await waitUntilHidden(otpHistoryUpdatePage.saveButton);
    expect(await isVisible(otpHistoryUpdatePage.saveButton)).to.be.false;

    expect(await otpHistoryComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(otpHistoryComponentsPage.table);

    await waitUntilCount(otpHistoryComponentsPage.records, beforeRecordsCount + 1);
    expect(await otpHistoryComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last OtpHistory', async () => {
    const deleteButton = otpHistoryComponentsPage.getDeleteButton(otpHistoryComponentsPage.records.last());
    await click(deleteButton);

    otpHistoryDeleteDialog = new OtpHistoryDeleteDialog();
    await waitUntilDisplayed(otpHistoryDeleteDialog.deleteModal);
    expect(await otpHistoryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/dapenApp.otpHistory.delete.question/);
    await otpHistoryDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(otpHistoryDeleteDialog.deleteModal);

    expect(await isVisible(otpHistoryDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([otpHistoryComponentsPage.noRecords, otpHistoryComponentsPage.table]);

    const afterCount = (await isVisible(otpHistoryComponentsPage.noRecords)) ? 0 : await getRecordsCount(otpHistoryComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
