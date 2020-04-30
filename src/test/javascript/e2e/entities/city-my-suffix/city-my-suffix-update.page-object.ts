import { element, by, ElementFinder } from 'protractor';

export default class CityUpdatePage {
  pageTitle: ElementFinder = element(by.id('dapenApp.city.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  cityCodeInput: ElementFinder = element(by.css('input#city-my-suffix-cityCode'));
  cityNameInput: ElementFinder = element(by.css('input#city-my-suffix-cityName'));
  provinceSelect: ElementFinder = element(by.css('select#city-my-suffix-province'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCityCodeInput(cityCode) {
    await this.cityCodeInput.sendKeys(cityCode);
  }

  async getCityCodeInput() {
    return this.cityCodeInput.getAttribute('value');
  }

  async setCityNameInput(cityName) {
    await this.cityNameInput.sendKeys(cityName);
  }

  async getCityNameInput() {
    return this.cityNameInput.getAttribute('value');
  }

  async provinceSelectLastOption() {
    await this.provinceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async provinceSelectOption(option) {
    await this.provinceSelect.sendKeys(option);
  }

  getProvinceSelect() {
    return this.provinceSelect;
  }

  async getProvinceSelectedOption() {
    return this.provinceSelect.element(by.css('option:checked')).getText();
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