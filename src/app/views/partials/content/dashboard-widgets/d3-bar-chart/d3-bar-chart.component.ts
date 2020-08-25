                                            
import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'd3-bar-chart',
  templateUrl: './d3-bar-chart.component.html',
  styleUrls: []
})
export class D3BarChartComponent implements OnInit, OnChanges,AfterViewInit {
  @ViewChild('barChart')
  private chartContainer: ElementRef;

  @Input() data: any[] = [];
  @Input() chartid: string = "";
  @Input() chartTitle: string = "";
  @Input() chartSubHeader: string = "";

  margin = { top: 20, right: 20, bottom: 30, left: 40 };

  constructor() { }

  ngOnInit() {
  
  }

  ngOnChanges(): void {
    if (!this.data) { return; }

    this.createChart();
  }

  private createChart(): void {
    //d3.select('svg').remove();
    d3.select("#" + this.chartid).remove();

    const element =  document.getElementById("bar_" + this.chartid);;
    const data = this.data;

    const svg = d3.select(element).append('svg')
      .attr("id", this.chartid)
      .attr('width', element.offsetWidth)
      .attr("height", '100%')
    svg.select('svg').remove();
    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.3)
      .domain(data.map(d => d.letter));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.frequency)]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
      .attr("fill", "steelblue");





    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(5))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.letter))
      .attr('y', d => y(d.frequency))
      .attr('width', x.bandwidth())
      .attr('height', d => contentHeight - y(d.frequency));
  }

  ngAfterViewInit() {
    //this.data =  [{ letter: 'A', frequency: 0.50 },
    //{ letter: 'B', frequency: 0.22 },
    //{ letter: 'C', frequency: 0.56 }];
    //this.createChart();
  }

}
