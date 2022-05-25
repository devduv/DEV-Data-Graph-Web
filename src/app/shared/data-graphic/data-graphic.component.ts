import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AppConfig } from 'src/app/app.config.component';
import { CalendarService } from 'src/app/services/calendar.service';
import { ChartService } from 'src/app/services/chart.service';
import { ReaderService } from 'src/app/services/reader.service';
import { TypeLine } from 'src/app/utils/chart';

Chart.register(...registerables);

@Component({
  selector: 'app-data-graphic',
  templateUrl: './data-graphic.component.html',
  styleUrls: ['./data-graphic.component.scss'],
})
export class DataGraphicComponent implements OnInit, AfterViewInit {
  @Input()
  public dataset: any;

  @ViewChild('chartCanvas', { static: false }) chartCanvas: ElementRef;

  public chart: any;

  public today: string;

  constructor(
    @Inject(DOCUMENT) private _document: any,
    private readerService: ReaderService,
    private chartService: ChartService,
    private configGlobal: AppConfig,
    private cdref: ChangeDetectorRef
  ) {}

  public config: any;

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnInit() {}

  init() {
    this.loadChartConfig();
    this.chart = new Chart(
      this._document.getElementById('canvasId'),
      this.config
    );
    this.loadDataFormFile();
    setInterval(() => {
      this.updateDataset();
    }, this.configGlobal.getConfiguration().refresh_time * 1000);
  }

  async loadDataFormFile() {
    this.loadDate();
    let data = await this.readerService.getData();
    let datasets = this.chartService.getData(data.body);
    this.chart.data.labels = this.getLabels();
    this.chart.data.datasets = datasets;
    this.chart.update();
  }

  loadDate() {
    this.today = this.chartService.getDateTime();
    this.cdref.detectChanges();
  }

  getLabels() {
    return ChartService.HEADERS.map((h) => h.startHour.substring(0, h.startHour.length - 3));
  }

  async updateDataset() {
    this.loadDate();
    let data = await this.readerService.getData();
    let datasetsNew = this.chartService.getDatasets(data.body);
    this.chart.data.labels = this.getLabels();

    datasetsNew.forEach((datasetNew: any) => {
      let datasetFind = this.chart.data.datasets.find(
        (d: any) => d.label == datasetNew.label
      );

      if (datasetFind != undefined) {
        datasetFind.data = datasetNew.data;
      } else {

        this.addNewDataset(
          this.readerService.newDataset(
            datasetNew.label,
            datasetNew.borderColor,
            datasetNew.hour,
            datasetNew.total,
            datasetNew.data
          )
        );
      }
    });
    this.chart.update();
  }

  addNewDataset(newDataset: any) {
    this.chart.data.datasets.push(newDataset);
  }

  loadChartConfig() {
    this.config = {
      type: TypeLine.LINE,
      options: this.chartService.getOptions(),
    };
  }
}
