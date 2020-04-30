import { element, by, ElementFinder } from 'protractor';

export default class SerialGeneratorUpdatePage {
  pageTitle: ElementFinder = element(by.id('dapenApp.serialGenerator.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  processCodeInput: ElementFinder = element(by.css('input#serial-generator-my-suffix-processCode'));
  processNameInput: ElementFinder = element(by.css('input#serial-generator-my-suffix-processName'));
  counterInput: ElementFinder = element(by.css('input#serial-generator-my-suffix-counter'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setProcessCodeInput(processCode) {
    await this.processCodeInput.sendKeys(processCode);
  }

  async getProcessCodeInput() {
    return this.processCodeInput.getAttribute('value');
  }

  async setProcessNameInput(processName) {
    await this.processNameInput.sendKeys(processName);
  }

  async getProcessNameInput() {
    return this.processNameInput.getAttribute('value');
  }

  async setCounterInput(counter) {
    await this.counterInput.sendKeys(counter);
  }

  async getCounterInput() {
    return this.counterInput.getAttribute('value');
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
