import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config.component';
import { Schedule } from '../utils/DateUtil';
import { Hours } from '../utils/hours';
import { CalendarService } from './calendar.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public static HEADERS: Schedule[];

  constructor(private configGlobal: AppConfig, private calendarService: CalendarService) {
  }

  public loadHeaders() {
    let today = this.calendarService.getToday();
    let yesterday =  this.calendarService.getYesterday();
    let anteyesterday =  this.calendarService.getAnteYesterday();
    
    ChartService.HEADERS = Hours.getScheduleLimit(
      anteyesterday,
      yesterday,
      today,
      this.configGlobal.getConfiguration().times_to_show
    );
    
  }

  getDateTime() {
    return this.calendarService.getDateTime();
  }

  public getData(body: any, tc: number) {
    this.getDatasets(body, tc);
    return body;
  }

  public getDatasets(body: any, tc: number) {
    this.loadHeaders();
    ChartService.HEADERS.forEach((hour) => {
      body.forEach((b: any) => {
        let total = null;
        b.value.forEach((v: any) => {
          if (hour.startHour == v.hour) {
            total = v.total / tc;
          }
        });
        b.data.push(total);
      });
    });
    return body;
  }

  public getOptions() {
    return {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };
  }
}
