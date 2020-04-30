import { element, by, ElementFinder } from 'protractor';

export default class CountryUpdatePage {
  pageTitle: ElementFinder = element(by.id('dapenApp.country.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  countryCodeDigitsInput: ElementFinder = element(by.css('input#country-my-suffix-countryCodeDigits'));
  countryNameInput: ElementFinder = element(by.css('input#country-my-suffix-countryName'));
  nationalityInput: ElementFinder = element(by.css('input#country-my-suffix-nationality'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCountryCodeDigitsInput(countryCodeDigits) {
    await this.countryCodeDigitsInput.sendKeys(countryCodeDigits);
  }

  async getCountryCodeDigitsInput() {
    return this.countryCodeDigitsInput.getAttribute('value');
  }

  async setCountryNameInput(countryName) {
    await this.countryNameInput.sendKeys(countryName);
  }

  async getCountryNameInput() {
    return this.countryNameInput.getAttribute('value');
  }

  async setNationalityInput(nationality) {
    await this.nationalityInput.sendKeys(nationality);
  }

  async getNationalityInput() {
    return this.nationalityInput.getAttribute('value');
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
