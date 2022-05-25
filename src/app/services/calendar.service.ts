import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { DateUtil } from '../utils/DateUtil';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private dateUtil: DateUtil;

  constructor(private datePipe: DatePipe) {
    this.dateUtil = new DateUtil(this.datePipe);
  }

  getDateTime() {
    let today = this.getTodayExact();
    return this.dateUtil.getFormatStandar(today);
  }

  getTodayExact() {
    let date = new Date();
    return date;
  }

  getAnteYesterday() {
    let anteyesterday = this.getDate(2);
    return this.dateUtil.getFormatYearMonthDay(anteyesterday);
  }
  getYesterday() {
    let yesterday = this.getDate(1);
    return this.dateUtil.getFormatYearMonthDay(yesterday);
  }

  getToday() {
    let today = this.getDate(0);
    return this.dateUtil.getFormatYearMonthDay(today);
  }

  getDate(days: number) {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - days);
    return date;
  }
}
