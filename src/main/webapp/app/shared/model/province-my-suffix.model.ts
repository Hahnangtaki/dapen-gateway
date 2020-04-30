import { ICityMySuffix } from 'app/shared/model/city-my-suffix.model';

export interface IProvinceMySuffix {
  id?: number;
  provinceCode?: string;
  provinceName?: string;
  cities?: ICityMySuffix[];
  countryId?: number;
}

export const defaultValue: Readonly<IProvinceMySuffix> = {};
