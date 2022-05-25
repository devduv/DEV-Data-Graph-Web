import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config.component';
import { Configuration } from '../model/configuration.model';
import { Hours } from '../utils/hours';

@Injectable({
  providedIn: 'root',
})
export class ReaderService {
  /*   colors = [
    '#f15123',
    '#3491dd',
    '#f4b138',
    '#3d57a7',
    '#fd7b23',
    '#000000',
    '#6fb766',
    '#4dd4af',
  ]; */

  constructor(private http: HttpClient, private config: AppConfig) {}

  getData() {
    let config = this.config.getConfiguration();
    return this.readFile(config).then((d) => this.parserToJSON(d));
  }

  readFile(config: Configuration) {
    return this.http
      .get(`${config.file}`, {
        responseType: 'text' as 'json',
      })
      .toPromise();
  }

  parserToJSON(data: any) {
    let split_data = data.split('\n');
    let headers = this.getHeaders(split_data);
    split_data.shift();
    let body = this.getBody(split_data);

    return {
      headers,
      body,
    };
  }

  getHeaders(split_data: any[]) {
    return this.spliter(split_data[0]);
  }

  spliter(data: any) {
    return data.split(',').map((d: any) => d.replace('\r', ''));
  }

  newDataset(
    label: string,
    borderColor: string,
    hour: string,
    total: any,
    data: any
  ) {
    return {
      label: label,
      borderColor: borderColor,
      backgroundColor: borderColor,
      data: data,
      value: [
        {
          hour,
          total,
        },
      ],
    };
  }

  randomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
  }
  getBody(split_data: any[]) {
    let data: any[] = [];
    let i = 0;
    split_data.forEach((d) => {
      if (d != '') {
        let data_element = this.spliter(d);

        let label = data_element[1];
        let hour = data_element[0];
        let total = data_element[2];
        let borderColor = '#' + this.randomColor();

        let find = data?.find((d: any) => d.label == label);

        if (find == undefined) {
          data.push(this.newDataset(label, borderColor, hour, total, []));
          i++;
        } else {
          find.value.push({ hour, total });
        }
      }
    });
    return data;
  }

  onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }
}
