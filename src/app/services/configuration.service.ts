import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '../model/configuration.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor(private httpClient: HttpClient) {}

  async getConfiguration() {
    return await this.httpClient
      .get<Configuration>('./configuration.json')
      .toPromise();
  }
}
  