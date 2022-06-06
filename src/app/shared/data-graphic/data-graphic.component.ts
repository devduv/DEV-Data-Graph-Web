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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { Configuration } from 'src/app/model/configuration.model';
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

  @Input()
  public configuration: Configuration;

  @ViewChild('chartCanvas', { static: false }) chartCanvas: ElementRef;

  public chart: any;

  public today: string;

  public formTC: FormGroup;

  public tc: number = 1.00;

  constructor(
    @Inject(DOCUMENT) private _document: any,
    private readerService: ReaderService,
    private chartService: ChartService,
    private fb: FormBuilder,
    private cdref: ChangeDetectorRef
  ) {}

  public config: any;

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnInit() {
    this.createFormTC();
  }

  private createFormTC() {
    this.formTC = this.fb.group({
      tc: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+\.?[0-9]*$/),
        Validators.maxLength(9),
      ]),
    });
  }

  init() {
    this.loadChartConfig();
    this.chart = new Chart(
      this._document.getElementById('canvasId'),
      this.config
    );
    this.loadDataFormFile();
    setInterval(() => {
      this.updateDataset();
    }, this.configuration.refresh_time * 1000);
  }

  async loadDataFormFile() {
    this.loadDate();
    let data = await this.readerService.getData();
    let datasets = this.chartService.getData(data.body, this.tc);
    this.chart.data.labels = this.getLabels();
    this.chart.data.datasets = datasets;
    this.chart.update();
  }

  loadDate() {
    this.today = this.chartService.getDateTime();
    this.cdref.detectChanges();
  }

  getLabels() {
    return ChartService.HEADERS.map((h) =>
      h.startHour.substring(0, h.startHour.length - 3)
    );
  }

  async updateDataset() {
    this.loadDate();
    let data = await this.readerService.getData();
    let datasetsNew = this.chartService.getDatasets(data.body, this.tc);
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

  public onKeyPress(event: any) {
    let patt = /^[0-9]*\.?[0-9]*$/;
    return patt.test(event.key);
  }

  update() {
    if (this.formTC.valid) {
      if (this.formTC.get('tc').value != 0) {
        this.tc = this.formTC.get('tc').value;
        console.log(this.tc);
        
        this.updateDataset();
      }
     
      
    }
  }
}
