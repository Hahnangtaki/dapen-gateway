import { element, by, ElementFinder } from 'protractor';

export default class OtpHistoryUpdatePage {
  pageTitle: ElementFinder = element(by.id('dapenApp.otpHistory.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  reffNoInput: ElementFinder = element(by.css('input#otp-history-my-suffix-reffNo'));
  encodedOtpInput: ElementFinder = element(by.css('input#otp-history-my-suffix-encodedOtp'));
  createdTimeInput: ElementFinder = element(by.css('input#otp-history-my-suffix-createdTime'));
  executedTimeInput: ElementFinder = element(by.css('input#otp-history-my-suffix-executedTime'));
  expiredTimeInput: ElementFinder = element(by.css('input#otp-history-my-suffix-expiredTime'));
  retryMaxInput: ElementFinder = element(by.css('input#otp-history-my-suffix-retryMax'));
  retryCountInput: ElementFinder = element(by.css('input#otp-history-my-suffix-retryCount'));
  visitorSelect: ElementFinder = element(by.css('select#otp-history-my-suffix-visitor'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReffNoInput(reffNo) {
    await this.reffNoInput.sendKeys(reffNo);
  }

  async getReffNoInput() {
    return this.reffNoInput.getAttribute('value');
  }

  async setEncodedOtpInput(encodedOtp) {
    await this.encodedOtpInput.sendKeys(encodedOtp);
  }

  async getEncodedOtpInput() {
    return this.encodedOtpInput.getAttribute('value');
  }

  async setCreatedTimeInput(createdTime) {
    await this.createdTimeInput.sendKeys(createdTime);
  }

  async getCreatedTimeInput() {
    return this.createdTimeInput.getAttribute('value');
  }

  async setExecutedTimeInput(executedTime) {
    await this.executedTimeInput.sendKeys(executedTime);
  }

  async getExecutedTimeInput() {
    return this.executedTimeInput.getAttribute('value');
  }

  async setExpiredTimeInput(expiredTime) {
    await this.expiredTimeInput.sendKeys(expiredTime);
  }

  async getExpiredTimeInput() {
    return this.expiredTimeInput.getAttribute('value');
  }

  async setRetryMaxInput(retryMax) {
    await this.retryMaxInput.sendKeys(retryMax);
  }

  async getRetryMaxInput() {
    return this.retryMaxInput.getAttribute('value');
  }

  async setRetryCountInput(retryCount) {
    await this.retryCountInput.sendKeys(retryCount);
  }

  async getRetryCountInput() {
    return this.retryCountInput.getAttribute('value');
  }

  async visitorSelectLastOption() {
    await this.visitorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async visitorSelectOption(option) {
    await this.visitorSelect.sendKeys(option);
  }

  getVisitorSelect() {
    return this.visitorSelect;
  }

  async getVisitorSelectedOption() {
    return this.visitorSelect.element(by.css('option:checked')).getText();
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
