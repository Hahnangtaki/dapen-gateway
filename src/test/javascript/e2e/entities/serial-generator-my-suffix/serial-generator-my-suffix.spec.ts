import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SerialGeneratorComponentsPage, { SerialGeneratorDeleteDialog } from './serial-generator-my-suffix.page-object';
import SerialGeneratorUpdatePage from './serial-generator-my-suffix-update.page-object';
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

describe('SerialGenerator e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let serialGeneratorComponentsPage: SerialGeneratorComponentsPage;
  let serialGeneratorUpdatePage: SerialGeneratorUpdatePage;
  let serialGeneratorDeleteDialog: SerialGeneratorDeleteDialog;
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

  it('should load SerialGenerators', async () => {
    await navBarPage.getEntityPage('serial-generator-my-suffix');
    serialGeneratorComponentsPage = new SerialGeneratorComponentsPage();
    expect(await serialGeneratorComponentsPage.title.getText()).to.match(/Serial Generators/);

    expect(await serialGeneratorComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([serialGeneratorComponentsPage.noRecords, serialGeneratorComponentsPage.table]);

    beforeRecordsCount = (await isVisible(serialGeneratorComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(serialGeneratorComponentsPage.table);
  });

  it('should load create SerialGenerator page', async () => {
    await serialGeneratorComponentsPage.createButton.click();
    serialGeneratorUpdatePage = new SerialGeneratorUpdatePage();
    expect(await serialGeneratorUpdatePage.getPageTitle().getAttribute('id')).to.match(/dapenApp.serialGenerator.home.createOrEditLabel/);
    await serialGeneratorUpdatePage.cancel();
  });

  it('should create and save SerialGenerators', async () => {
    await serialGeneratorComponentsPage.createButton.click();
    await serialGeneratorUpdatePage.setProcessCodeInput('processCode');
    expect(await serialGeneratorUpdatePage.getProcessCodeInput()).to.match(/processCode/);
    await serialGeneratorUpdatePage.setProcessNameInput('processName');
    expect(await serialGeneratorUpdatePage.getProcessNameInput()).to.match(/processName/);
    await serialGeneratorUpdatePage.setCounterInput('5');
    expect(await serialGeneratorUpdatePage.getCounterInput()).to.eq('5');
    await waitUntilDisplayed(serialGeneratorUpdatePage.saveButton);
    await serialGeneratorUpdatePage.save();
    await waitUntilHidden(serialGeneratorUpdatePage.saveButton);
    expect(await isVisible(serialGeneratorUpdatePage.saveButton)).to.be.false;

    expect(await serialGeneratorComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(serialGeneratorComponentsPage.table);

    await waitUntilCount(serialGeneratorComponentsPage.records, beforeRecordsCount + 1);
    expect(await serialGeneratorComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last SerialGenerator', async () => {
    const deleteButton = serialGeneratorComponentsPage.getDeleteButton(serialGeneratorComponentsPage.records.last());
    await click(deleteButton);

    serialGeneratorDeleteDialog = new SerialGeneratorDeleteDialog();
    await waitUntilDisplayed(serialGeneratorDeleteDialog.deleteModal);
    expect(await serialGeneratorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/dapenApp.serialGenerator.delete.question/);
    await serialGeneratorDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(serialGeneratorDeleteDialog.deleteModal);

    expect(await isVisible(serialGeneratorDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([serialGeneratorComponentsPage.noRecords, serialGeneratorComponentsPage.table]);

    const afterCount = (await isVisible(serialGeneratorComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(serialGeneratorComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
