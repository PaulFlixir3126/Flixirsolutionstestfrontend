// Angular
import { Component, Input, OnInit } from '@angular/core';
import { LayoutConfigService } from '../../../../../core/_base/layout';

@Component({
  selector: 'kt-widget7-weekly-sales',
  templateUrl: './widget7-weekly-sales.component.html'
})
export class Widget7WeeklySalesComponent implements OnInit {
  @Input() cssClasses = '';
  @Input() charttype = '';
  @Input() curve = '';
  @Input() charttitle = '';
  chartOptions: any = {};
  fontFamily = '';
  colorsGrayGray500 = '';
  colorsGrayGray200 = '';
  colorsGrayGray300 = '';
  colorsThemeBaseDanger = '';
  colorsThemeBasePrimary = '';
  colorsThemeLightPrimary = '';
  colorsThemeBaseSuccess = '';
  colorsThemeLightSuccess = '';

  constructor(private layoutConfigService: LayoutConfigService) {
    this.fontFamily = this.layoutConfigService.getConfig('js.fontFamily');
    this.colorsGrayGray500 = this.layoutConfigService.getConfig('js.colors.gray.gray500');
    this.colorsGrayGray200 = this.layoutConfigService.getConfig('js.colors.gray.gray200');
    this.colorsGrayGray300 = this.layoutConfigService.getConfig('js.colors.gray.gray300');
    this.colorsThemeBaseDanger = this.layoutConfigService.getConfig('js.colors.theme.base.danger');
    this.colorsThemeBasePrimary = this.layoutConfigService.getConfig('js.colors.theme.base.primary');
    this.colorsThemeLightPrimary = this.layoutConfigService.getConfig('js.colors.theme.light.primary');
    this.colorsThemeBaseSuccess = this.layoutConfigService.getConfig('js.colors.theme.base.success');
    this.colorsThemeLightSuccess = this.layoutConfigService.getConfig('js.colors.theme.light.success');
  }

  ngOnInit(): void {
    this.chartOptions = this.getChartOptions();
  }

  getChartOptions() {
    return {
      series: [
        {
          name: 'Yearly Chart',
          data: [30, 45, 32, 300, 40]
        }
      ],
      chart: {
        type: this.charttype,
        height: 180,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {},
      legend: {
        show: false
      },
      dataLabels: {
        enabled: true
      },
      fill: {
        type: 'solid',
        opacity: 1
      },
      stroke: {
        curve: this.curve,
        show: true,
        width: 3,
        colors: [this.colorsThemeBasePrimary]
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
        },
        labels: {
          show: true,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        },
        crosshairs: {
          show: true,
          position: 'front',
          stroke: {
            color: this.colorsGrayGray300,
            width: 1,
            dashArray: 3
          }
        },
        tooltip: {
          enabled: false,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        }
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        }
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0
          }
        }
      },
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: this.fontFamily
        },
        y: {
          // tslint:disable-next-line
          formatter: function (val) {
            return val;
          }
        }
      },
      colors: [this.colorsThemeBasePrimary],
      markers: {
        colors: this.colorsThemeBasePrimary,
        strokeColor: [this.colorsThemeBasePrimary],
        strokeWidth: 3
      }
    };
  }
}
