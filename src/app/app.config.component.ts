import { Injectable } from '@angular/core';
import { Configuration } from './model/configuration.model';
import { ConfigurationService } from './services/configuration.service';

@Injectable({
  providedIn: 'root',
})
export class AppConfig {
  public configuration: Configuration = {};

  constructor(private configurationService: ConfigurationService) {}

  async load() {
    this.configuration = await this.configurationService.getConfiguration();
  }

  public getConfiguration() {
    return this.configuration;
  }
}
