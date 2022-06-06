import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/app.config.component';
import { Configuration } from 'src/app/model/configuration.model';
import { ReaderService } from 'src/app/services/reader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public configuration: Configuration;
  constructor(private configGlobal: AppConfig) {
    this.configuration = this.configGlobal.getConfiguration();
  }

  async ngOnInit() {}
}
