import { Moment } from 'moment';

export interface IOtpHistoryMySuffix {
  id?: number;
  reffNo?: string;
  encodedOtp?: string;
  createdTime?: Moment;
  executedTime?: Moment;
  expiredTime?: Moment;
  retryMax?: number;
  retryCount?: number;
  visitorId?: number;
}

export const defaultValue: Readonly<IOtpHistoryMySuffix> = {};
