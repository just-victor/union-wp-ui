import {CalendarDateFormatter, DateFormatterParams} from 'angular-calendar';
import {DatePipe} from '@angular/common';
import {Injectable, InjectionToken} from '@angular/core';

export const MOMENT: InjectionToken<string> = new InjectionToken('Moment');

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  // you can override any of the methods defined in the parent class

  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'E', locale);
  }

  public monthViewTitle({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'MMM y', locale);
  }

  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'HH:mm', locale);
  }

  public dayViewTitle({date, locale}: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'dd MMM', locale);
  }
}
