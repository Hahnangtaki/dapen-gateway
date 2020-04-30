import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VisitorComponentsPage, { VisitorDeleteDialog } from './visitor-my-suffix.page-object';
import VisitorUpdatePage from './visitor-my-suffix-update.page-object';
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

describe('Visitor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let visitorComponentsPage: VisitorComponentsPage;
  let visitorUpdatePage: VisitorUpdatePage;
  let visitorDeleteDialog: VisitorDeleteDialog;
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

  it('should load Visitors', async () => {
    await navBarPage.getEntityPage('visitor-my-suffix');
    visitorComponentsPage = new VisitorComponentsPage();
    expect(await visitorComponentsPage.title.getText()).to.match(/Visitors/);

    expect(await visitorComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([visitorComponentsPage.noRecords, visitorComponentsPage.table]);

    beforeRecordsCount = (await isVisible(visitorComponentsPage.noRecords)) ? 0 : await getRecordsCount(visitorComponentsPage.table);
  });

  it('should load create Visitor page', async () => {
    await visitorComponentsPage.createButton.click();
    visitorUpdatePage = new VisitorUpdatePage();
    expect(await visitorUpdatePage.getPageTitle().getAttribute('id')).to.match(/dapenApp.visitor.home.createOrEditLabel/);
    await visitorUpdatePage.cancel();
  });

  it('should create and save Visitors', async () => {
    await visitorComponentsPage.createButton.click();
    await visitorUpdatePage.setEmailInput('email');
    expect(await visitorUpdatePage.getEmailInput()).to.match(/email/);
    await visitorUpdatePage.setMobilePhoneInput('mobilePhone');
    expect(await visitorUpdatePage.getMobilePhoneInput()).to.match(/mobilePhone/);
    await visitorUpdatePage.setEncodedPasswordInput('encodedPassword');
    expect(await visitorUpdatePage.getEncodedPasswordInput()).to.match(/encodedPassword/);
    await visitorUpdatePage.setMemberStatusInput('5');
    expect(await visitorUpdatePage.getMemberStatusInput()).to.eq('5');
    await visitorUpdatePage.setMemberSinceInput('01-01-2001');
    expect(await visitorUpdatePage.getMemberSinceInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(visitorUpdatePage.saveButton);
    await visitorUpdatePage.save();
    await waitUntilHidden(visitorUpdatePage.saveButton);
    expect(await isVisible(visitorUpdatePage.saveButton)).to.be.false;

    expect(await visitorComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(visitorComponentsPage.table);

    await waitUntilCount(visitorComponentsPage.records, beforeRecordsCount + 1);
    expect(await visitorComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Visitor', async () => {
    const deleteButton = visitorComponentsPage.getDeleteButton(visitorComponentsPage.records.last());
    await click(deleteButton);

    visitorDeleteDialog = new VisitorDeleteDialog();
    await waitUntilDisplayed(visitorDeleteDialog.deleteModal);
    expect(await visitorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/dapenApp.visitor.delete.question/);
    await visitorDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(visitorDeleteDialog.deleteModal);

    expect(await isVisible(visitorDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([visitorComponentsPage.noRecords, visitorComponentsPage.table]);

    const afterCount = (await isVisible(visitorComponentsPage.noRecords)) ? 0 : await getRecordsCount(visitorComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
