import { Schedule } from './DateUtil';

export class Hours {
  static getDate() {
    return new Date();
  }

  static getScheduleLimit(
    anteyesterday: string,
    yesterday: string,
    today: string,
    maxTimes: number
  ) {
    let schedules = Hours.buildScheduleList();

    let currentDay = Hours.getDate();
    let currentMinutes = currentDay.getMinutes();

    let currentMax = currentDay.getHours() * 2 + (currentMinutes >= 30 ? 1 : 0);
    let currentMin = currentMax > maxTimes ? currentMax - maxTimes : 0;

    let todayHours = this.getHours(schedules, today, currentMin, currentMax);

    let yesterdayHours:any[] =[];
    let anteyesterdayHours: any[] = [];
    if (todayHours.length < maxTimes) {
      let empty = maxTimes - todayHours.length;
      let xd = schedules.length - empty;
      if (xd < 0) {
        yesterdayHours = this.getHours(
          schedules,
          yesterday,
          0,
          schedules.length
        );
         
        

        anteyesterdayHours = this.getHours(
          schedules,
          anteyesterday,
          xd,
          schedules.length
        );
      } else {
        yesterdayHours = this.getHours(
          schedules,
          yesterday,
          schedules.length - empty,
          schedules.length
        );
      }
    }

    let hours = [...anteyesterdayHours, ...yesterdayHours, ...todayHours];
    return hours;
  }

  static getHours(
    schedules: Schedule[],
    date: string,
    currentMin: number,
    currentMax: number
  ) {
    let s = JSON.parse(JSON.stringify(schedules.slice(currentMin, currentMax)));
    return s.map((h: any) => this.mapDateTime(date, h));
  }

  static mapDateTime(today: string, schedule: Schedule): Schedule {
    schedule.startHour = `${today} ${schedule.startHour}`;
    return schedule;
  }

  static buildScheduleList() {
    let schedules = [];
    let currentHour = 0;

    let maxHour = 24;

    while (currentHour < maxHour) {
      let time = `${currentHour < 10 ? '0' + currentHour : currentHour}:00`;
      let time2 = `${currentHour < 10 ? '0' + currentHour : currentHour}:30`;
      if (currentHour != 0) {
        schedules.push({ name: time, startHour: `${time}:00` });
      }
      schedules.push({ name: time2, startHour: `${time2}:00` });

      if (currentHour == 23) {
        let time3 = `${currentHour}:59`;
        schedules.push({ name: time3, startHour: `${time3}:00` });
      }
      currentHour++;
    }

    return schedules;
  }
}
