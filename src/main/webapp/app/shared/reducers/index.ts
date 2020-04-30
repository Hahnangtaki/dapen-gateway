import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import country, {
  CountryMySuffixState
} from 'app/entities/country-my-suffix/country-my-suffix.reducer';
// prettier-ignore
import province, {
  ProvinceMySuffixState
} from 'app/entities/province-my-suffix/province-my-suffix.reducer';
// prettier-ignore
import city, {
  CityMySuffixState
} from 'app/entities/city-my-suffix/city-my-suffix.reducer';
// prettier-ignore
import visitor, {
  VisitorMySuffixState
} from 'app/entities/visitor-my-suffix/visitor-my-suffix.reducer';
// prettier-ignore
import otpHistory, {
  OtpHistoryMySuffixState
} from 'app/entities/otp-history-my-suffix/otp-history-my-suffix.reducer';
// prettier-ignore
import serialGenerator, {
  SerialGeneratorMySuffixState
} from 'app/entities/serial-generator-my-suffix/serial-generator-my-suffix.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly country: CountryMySuffixState;
  readonly province: ProvinceMySuffixState;
  readonly city: CityMySuffixState;
  readonly visitor: VisitorMySuffixState;
  readonly otpHistory: OtpHistoryMySuffixState;
  readonly serialGenerator: SerialGeneratorMySuffixState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  country,
  province,
  city,
  visitor,
  otpHistory,
  serialGenerator,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
