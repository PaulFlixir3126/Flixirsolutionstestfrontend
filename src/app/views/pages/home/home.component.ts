// Angular
import { Component, OnInit, Output, EventEmitter, AfterViewInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DateActionService } from '../../../core/services/dateaction';
@Component({
  selector: 'pt-home',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @Output() change: EventEmitter<MatSliderChange>
  activityList: any[] = [];
  deviationList: any[] = [];

  timelineValue: number = 0;
  timelineString: string = "Today";
  modelFirst = {
    left: true,
    middle: false,
    right: false
  };
  loading_bp: boolean = false;
  loading_gl: boolean = false;
  loading_bw: boolean = false;
  loading_hr: boolean = false;
  loading_activities: boolean = false;
  loading_anamoly: boolean = false;

  fullWidth: boolean = false;

glucoseDetails :any = {};
bodyWeight: any = {};
heartRate: any = {};
  bloodPressure: any = {};
  todayString: string = "";
  fromString: string = "";

  constructor(private http: HttpClient,
    public dateAction: DateActionService,
    private cdr: ChangeDetectorRef,
 @Inject('BASE_URL') public baseUrl: string) {

  }

  ngOnInit(): void {

    this.activityList = [{
      date: '01-02-2020',
      closedtime: '',
      time: '03:15 PM',
      biocategory: 'Glucose',
      action: 'Open',
      indicator: 54,
      icon: 'arrow_upward',
      css: 'text-success'
    },
    {
      date: '01-02-2020',
      time: '03:15 PM',
      biocategory: 'Heart Rate',
      action: 'Closed',
      closedtime: '01-02-2020 03:15 PM',
      indicator: 54,
      icon: 'arrow_downward',
      css: 'text-danger'
    },
    {
      date: '01-02-2020',
      time: '03:15 PM',
      biocategory: 'Glucose',
      action: 'Open',
      closedtime: '',
      indicator: 54,
      icon: 'arrow_upward',
      css: 'text-success'
    },
    {
      date: '01-02-2020',
      time: '03:15 PM',
      biocategory: 'Heart Rate',
      closedtime: '01-02-2020 03:15 PM',
      action: 'Closed',
      indicator: 54,
      icon: 'arrow_downward',
      css: 'text-danger'
    },
    {
      date: '01-02-2020',
      time: '03:15 PM',
      biocategory: 'Glucose',
      closedtime: '01-02-2020 03:15 PM',
      action: 'Closed',
      indicator: 54,
      icon: 'arrow_upward',
      css: 'text-success'
    }
    ];
  }

  deviationFullWidth(data) {
    this.fullWidth = data.fullWidth;

  }

  changeSlider() {
    var date = new Date();
    //switch (this.timelineValue) {
    //  case 0:
    //    this.timelineString = "Today";
    //    break;
    //  case 5:
    //      this.timelineString = "Yesterday";
    //      date.setDate(date.getDate() - 1);
    //    break;
    //  case 10:
    //    this.timelineString = "Last 1 Week";
    //      date.setDate(date.getDate() - 7);
    //    break;
    //  case 15:
    //    this.timelineString = "Last 2 Weeks";
    //    date.setDate(date.getDate() - 14);
    //    break;
    //  case 20:
    //    this.timelineString = "Month to Date";
    //    date = new Date(date.getFullYear(), date.getMonth(), 1);
    //    break;
    //  case 25:
    //    this.timelineString = "Year to Date";
    //    date = new Date(date.getFullYear(), 0, 1);
    //    break;
    //}

    if (this.timelineValue == 0) {
      this.timelineString = "Today";
    }
    else {
      this.timelineString = this.timelineValue.toString() +"d";
      date.setDate(date.getDate() - this.timelineValue);
    }

    this.fromString = this.dateAction.getDateString(date);

    this.loadPanelDetails(this.fromString, this.todayString);

  }

  typeChange(type) {

  }

  loadPanelDetails(fromDate,toDate) {
    this.glucoseDetails = { chartAverage:0};
    this.bodyWeight = { chartAverage: 0};
    this.heartRate = { chartAverage: 0};
    this.bloodPressure = { chartAverage: 0};

    var url = "api/bmm/bp?chartType=bloodPressure&chartLabel=average&fromDate=" + fromDate + "&toDate=" + toDate;
      ;
    this.loading_bp = true;
    this.http.get<any>(this.baseUrl + url).subscribe(result => {
      this.loading_bp = false;
      if (result.status && result.data && result.data.length > 0) {
        this.bloodPressure = result.data[0];
        this.bloodPressure.chartAverage = Math.round(this.bloodPressure.chartAverage);
        this.cdr.markForCheck();
      }
      else {

      }
    },
      error => {
        this.loading_bp = false;
      });


    url = "api/bmm/glucose?chartType=glucose&chartLabel=average&fromDate=" + fromDate + "&toDate=" + toDate;
    this.loading_gl = true;
    this.http.get<any>(this.baseUrl + url).subscribe(result => {
      this.loading_gl = false;
      if (result.status && result.data && result.data.length > 0) {
        this.glucoseDetails = result.data[0];
        this.glucoseDetails.chartAverage = Math.round(this.glucoseDetails.chartAverage);
        this.cdr.markForCheck();
      }
      else {

      }
    },
      error => {
        this.loading_gl = false;
      });


    url = "api/bmm/heartrate?chartType=heartRate&chartLabel=average&fromDate=" + fromDate + "&toDate=" + toDate;
    this.loading_hr = true;
    this.http.get<any>(this.baseUrl + url).subscribe(result => {
      this.loading_hr = false;
      if (result.status && result.data && result.data.length > 0) {
        this.heartRate = result.data[0];
        this.heartRate.chartAverage = Math.round(this.heartRate.chartAverage);
        this.cdr.markForCheck();
      }
      else {

      }
    },
      error => {
        this.loading_hr = false;
      });


    url = "api/bmm/bodyweight?chartType=bodyWeight&chartLabel=average&fromDate=" + fromDate + "&toDate=" + toDate;
    this.loading_bw = true;
    this.http.get<any>(this.baseUrl + url).subscribe(result => {
      this.loading_bw = false;
      if (result.status && result.data && result.data.length > 0) {
        this.bodyWeight = result.data[0];
        this.bodyWeight.chartAverage = Math.round(this.bodyWeight.chartAverage);
        this.cdr.markForCheck();
      }
    },
      error => {
        this.loading_bw = false;
      });

  }

  loadActivityList() {
    this.activityList = [];
    var id = localStorage["userid"];
    if (id) {
      var url = "api/user/action?userRefId="+id;
      this.loading_activities = true;
      this.http.get<any>(this.baseUrl + url).subscribe(result => {
        this.loading_activities = false;
        if (result.status && result.data && result.data.length > 0) {
          var list = result.data;
          list.forEach(item => {
            item.createdAtString = this.dateAction.getDateString(new Date(item.createdAt));
            if (item.isdeleted) {
              item.updatedAtString = this.dateAction.getDateString(new Date(item.updatedAt));
            }
          });
          this.activityList = list;
          this.cdr.markForCheck();
        }
        else {

        }
      },
        error => {
          this.loading_activities = false;
          this.cdr.markForCheck();
        });

    }
    

  }

  loadDeviationList() {
    this.deviationList = [];
    var url = "api/user/deviation?userRefId=5f3f8f08dfc3340017c5773c";
    this.loading_anamoly = true;
    this.http.get<any>(this.baseUrl + url).subscribe(result => {
      this.loading_anamoly = false;
      if (result.status && result.data && result.data.length > 0) {
        var list  = result.data;
        list.forEach(item => {
          var obj = this.dateAction.getDateTimeString(new Date(item.createdAt));
          item.date = obj.date;
          item.time= obj.time;
        });



        this.deviationList = list;
        console.log(this.deviationList);
        this.cdr.markForCheck();
      }
      else {

      }
    },
      error => {
        this.loading_anamoly = false;
        this.cdr.markForCheck();
      });
  }



  ngAfterViewInit() {

    this.todayString = this.dateAction.getDateString(new Date);
    this.loadPanelDetails(this.todayString, this.todayString);
    this.loadActivityList();
    this.loadDeviationList();


    //this.activityList = [{
    //  date: '01-02-2020',
    //  closedtime: '01-02-2020 03:15 PM',
    //  time: '03:15 PM',
    //  biocategory: 'Glucose',
    //  action: 'Open',
    //  indicator: 54,
    //  icon: 'arrow_upward',
    //  css: 'text-success'
    //},
    //{
    //  date: '01-02-2020',
    //  time: '03:15 PM',
    //  biocategory: 'Heart Rate',
    //  action: 'Closed',
    //  closedtime: '01-02-2020 03:15 PM',
    //  indicator: 54,
    //  icon: 'arrow_downward',
    //  css: 'text-danger'
    //},
    //{
    //  date: '01-02-2020',
    //  time: '03:15 PM',
    //  biocategory: 'Glucose',
    //  action: 'Closed',
    //  closedtime: '01-02-2020 03:15 PM',
    //  indicator: 54,
    //  icon: 'arrow_upward',
    //  css: 'text-success'
    //},
    //{
    //  date: '01-02-2020',
    //  time: '03:15 PM',
    //  biocategory: 'Heart Rate',
    //  closedtime: '01-02-2020 03:15 PM',
    //  action: 'Closed',
    //  indicator: 54,
    //  icon: 'arrow_downward',
    //  css: 'text-danger'
    //},
    //{
    //  date: '01-02-2020',
    //  time: '03:15 PM',
    //  biocategory: 'Glucose',
    //  closedtime: '01-02-2020 03:15 PM',
    //  action: 'Closed',
    //  indicator: 54,
    //  icon: 'arrow_upward',
    //  css: 'text-success'
    //}
    //];

    this.deviationList = [{
      date: '01-02-2020',
      time: '03:15 PM',
      biomarker: 'Glucose',
      ct: 22,
      indicator: 54,
      icon: 'arrow_upward',
      css: 'text-success'
    },
    {
      date: '01-02-2020',
      time: '03:15 PM',
      biomarker: 'Heart Rate',
      ct: 22,
      indicator: 54,
      icon: 'arrow_downward',
      css: 'text-danger'
    },
    {
      date: '01-02-2020',
      time: '03:15 PM',
      biomarker: 'Glucose',
      ct: 22,
      indicator: 54,
      icon: 'arrow_upward',
      css: 'text-success'
    },
    {
      date: '01-02-2020',
      time: '03:15 PM',
      biomarker: 'Heart Rate',
      ct: 22,
      indicator: 54,
      icon: 'arrow_downward',
      css: 'text-danger'
    },
    {
      date: '01-02-2020',
      time: '03:15 PM',
      biomarker: 'Blood Pressure',
      ct: 22,
      indicator: 54,
      icon: 'arrow_upward',
      css: 'text-success'
    },
    {
      date: '01-02-2020',
      time: '03:15 PM',
      biomarker: 'Glucose',
      ct: 22,
      indicator: 54,
      icon: 'arrow_downward',
      css: 'text-danger'
      }];


  }
}
