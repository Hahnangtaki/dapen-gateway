import { element, by, ElementFinder } from 'protractor';

export default class ProvinceUpdatePage {
  pageTitle: ElementFinder = element(by.id('dapenApp.province.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  provinceCodeInput: ElementFinder = element(by.css('input#province-my-suffix-provinceCode'));
  provinceNameInput: ElementFinder = element(by.css('input#province-my-suffix-provinceName'));
  countrySelect: ElementFinder = element(by.css('select#province-my-suffix-country'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setProvinceCodeInput(provinceCode) {
    await this.provinceCodeInput.sendKeys(provinceCode);
  }

  async getProvinceCodeInput() {
    return this.provinceCodeInput.getAttribute('value');
  }

  async setProvinceNameInput(provinceName) {
    await this.provinceNameInput.sendKeys(provinceName);
  }

  async getProvinceNameInput() {
    return this.provinceNameInput.getAttribute('value');
  }

  async countrySelectLastOption() {
    await this.countrySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async countrySelectOption(option) {
    await this.countrySelect.sendKeys(option);
  }

  getCountrySelect() {
    return this.countrySelect;
  }

  async getCountrySelectedOption() {
    return this.countrySelect.element(by.css('option:checked')).getText();
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
