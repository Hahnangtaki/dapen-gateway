import { Moment } from 'moment';
import { IOtpHistoryMySuffix } from 'app/shared/model/otp-history-my-suffix.model';

export interface IVisitorMySuffix {
  id?: number;
  email?: string;
  mobilePhone?: string;
  encodedPassword?: string;
  memberStatus?: number;
  memberSince?: Moment;
  otpHistories?: IOtpHistoryMySuffix[];
}

export const defaultValue: Readonly<IVisitorMySuffix> = {};
