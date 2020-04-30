import { element, by, ElementFinder } from 'protractor';

export default class VisitorUpdatePage {
  pageTitle: ElementFinder = element(by.id('dapenApp.visitor.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  emailInput: ElementFinder = element(by.css('input#visitor-my-suffix-email'));
  mobilePhoneInput: ElementFinder = element(by.css('input#visitor-my-suffix-mobilePhone'));
  encodedPasswordInput: ElementFinder = element(by.css('input#visitor-my-suffix-encodedPassword'));
  memberStatusInput: ElementFinder = element(by.css('input#visitor-my-suffix-memberStatus'));
  memberSinceInput: ElementFinder = element(by.css('input#visitor-my-suffix-memberSince'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setMobilePhoneInput(mobilePhone) {
    await this.mobilePhoneInput.sendKeys(mobilePhone);
  }

  async getMobilePhoneInput() {
    return this.mobilePhoneInput.getAttribute('value');
  }

  async setEncodedPasswordInput(encodedPassword) {
    await this.encodedPasswordInput.sendKeys(encodedPassword);
  }

  async getEncodedPasswordInput() {
    return this.encodedPasswordInput.getAttribute('value');
  }

  async setMemberStatusInput(memberStatus) {
    await this.memberStatusInput.sendKeys(memberStatus);
  }

  async getMemberStatusInput() {
    return this.memberStatusInput.getAttribute('value');
  }

  async setMemberSinceInput(memberSince) {
    await this.memberSinceInput.sendKeys(memberSince);
  }

  async getMemberSinceInput() {
    return this.memberSinceInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
