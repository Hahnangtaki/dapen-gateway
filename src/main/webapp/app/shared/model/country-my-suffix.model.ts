import { IProvinceMySuffix } from 'app/shared/model/province-my-suffix.model';

export interface ICountryMySuffix {
  id?: number;
  countryCodeDigits?: string;
  countryName?: string;
  nationality?: string;
  provinces?: IProvinceMySuffix[];
}

export const defaultValue: Readonly<ICountryMySuffix> = {};
