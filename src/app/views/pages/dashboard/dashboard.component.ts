// Angular
import { Component, OnInit, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DateActionService } from '../../../core/services/dateaction';

@Component({
  selector: 'kt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @Output() change: EventEmitter<MatSliderChange>

  healthList: any[] = [];
  timelineValue: number = 0;
  timelineString: string = "Today";
  requesttype: string = "Blood Pressure";
  avgData: any[] = [];
  chart: any = {};
  modelFirst = {
    left: true,
    middle: false,
    right: false
  };
  selectedType: string = "Blood Pressure";
  todayString: string = "";
  fromString: string = "";

  slideConfig = { "slidesToShow": 4, "slidesToScroll": 4, "arrows": true };
  loading_bpchart: boolean = false;
  hideChart: boolean = true;
  constructor(private http: HttpClient,
    public dateAction: DateActionService,
    private cdr: ChangeDetectorRef,
    @Inject('BASE_URL') public baseUrl: string) {

  }

  ngOnInit(): void {

    this.healthList = [{ name: "Blood Pressure" },
      { name: "Glucose" },
      { name: "Heart Rate" }]


  }

  changeSlider() {
    this.hideChart = true;
    var date = new Date();
    switch (this.timelineValue) {
      case 0:
        this.timelineString = "Today";
        break;
      case 5:
          this.timelineString = "Yesterday";
          date.setDate(date.getDate() - 1);
        break;
      case 10:
        this.timelineString = "Last 1 Week";
          date.setDate(date.getDate() - 7);
        break;
      case 15:
        this.timelineString = "Last 2 Weeks";
        date.setDate(date.getDate() - 14);
        break;
      case 20:
        this.timelineString = "Month to Date";
        date = new Date(date.getFullYear(), date.getMonth(), 1);
        break;
      case 25:
        this.timelineString = "Year to Date";
        date = new Date(date.getFullYear(), 0, 1);
        break;
    }

    if (this.timelineValue == 0) {
      this.timelineString = "Today";
    }
    else {
      this.timelineString = this.timelineValue.toString() + "d";
      date.setDate(date.getDate() - this.timelineValue);
    }

    this.fromString = this.dateAction.getDateString(date);

    this.loadChart();
  }

  typeChange(type) {
    this.requesttype = type;
    this.selectedType = this.requesttype;

    this.loadChart();

  }

  loadChart() {

    /* API to call chart Type */
    this.avgData = [];
    this.chart = {};
    this.chart.charttitle = "Average By Range";
    this.chart.subheader = "A classification of patients based on their average HR range";
    this.hideChart = false;

  }

  ngAfterViewInit() {
    this.todayString = this.dateAction.getDateString(new Date);
    this.fromString = this.dateAction.getDateString(new Date);
    this.avgData = [];
    this.chart = {};
    this.chart.charttitle = "Average By Range";
    this.chart.subheader = "A classification of patients based on their average HR range";

  }
}
