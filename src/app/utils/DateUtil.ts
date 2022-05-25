import { DatePipe } from '@angular/common';

export enum Day {
  'Dom',
  'Lun',
  'Mar',
  'Mié',
  'Jue',
  'Vie',
  'Sáb',
}

export interface DayCalendar {
  name?: string;
  month?: string;
  day?: number;
  date?: string;
}

export interface Schedule {
  name?: string;
  startHour?: string;
  date?: string;
}

export class DateUtil {
  public formatYearMonthDay = 'yyyy-MM-dd';
  public formatHourMinutes = 'HH:mm';
  public formatHourMinutesSeconds = 'HH:mm:ss';
  public formatDayName = 'dd MMMM';
  public formatStandar = `${this.formatYearMonthDay} ${this.formatHourMinutes}`;
  public formatOnlyMonth = 'MMMM';
  public formatFullDateName = 'EEEE d {} MMMM ';

  constructor(public datepipe: DatePipe) {}

  public getDayName(date: Date): string {
    return Day[date.getDay()];
  }

  public getDayNumber(date: Date): number {
    return date.getDay();
  }

  public getMonthName(date: Date) {
    return `${this.datepipe.transform(date, this.formatOnlyMonth)!}`;
  }

  public getFormatYearMonthDay(date: Date) {
    return this.datepipe.transform(date, this.formatYearMonthDay);
  }

  public getFormatHour(date: Date) {
    return this.datepipe.transform(date, this.formatHourMinutes);
  }

  public getFormatStandar(date: Date) {
    return this.datepipe.transform(date, this.formatStandar);
  }

  public getWeekName(date: Date) {
    return `${this.datepipe
      .transform(date, this.formatDayName)!
      .replace('{}', 'de')}`;
  }

  public getFullDateName(date: Date) {
    return `${this.datepipe
      .transform(date, this.formatFullDateName)!
      .replace('{}', 'de')}`;
  }

  public getFormatStandarFull(date: Date) {
    return `${this.getDayName(date)} ${this.datepipe.transform(
      date,
      this.formatDayName
    )!}`;
  }
}
