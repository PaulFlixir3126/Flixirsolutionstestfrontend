                                            
import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, AfterViewInit, ChangeDetectorRef, Inject } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DateActionService } from '../../../../../core/services/dateaction';

@Component({
  selector: 'd3-timeseries-chart',
  templateUrl: './d3-timeseries-chart.component.html',
  styleUrls: []
})
export class D3TimeseriesChartComponent implements OnInit, OnChanges,AfterViewInit {



  @Input() chartid: string = "";
  @Input() chartTitle: string = "";
  @Input() chartSubHeader: string = "";

  @Input() fromDate: string = "";
  @Input() toDate: string = "";

  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  avgData: any[] = [];
  data: any[] = [];
  chart: any = {};
  loading_bpchart: boolean = false;
  constructor(private http: HttpClient,
    public dateAction: DateActionService,
    private cdr: ChangeDetectorRef,
    @Inject('BASE_URL') public baseUrl: string) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    if (!this.data) { return; }

    else {
      if (this.fromDate && this.toDate)
        this.callChartApi();
    }
  }

  private createChart(): void {
    // 2. Use the margin convention practice
    var date = new Date();
    //var data = [{ letter: "9-Apr-12", y: 0.3 },
    //  { letter: "10-Apr-12", y: 0.1 },
    //  { letter: "11-Apr-12", y: 0.1 },
    //  { letter: "12-Apr-12", y: 0.7 },
    //  { letter: "13-Apr-12", y: 0.4 },
    //  { letter: "14-Apr-12", y: 0.5 },
    //  { letter: "15-Apr-12", y: 0.3 },
    //  { letter: "16-Apr-12", y: 0.6 }];

    var data = this.data;



    var margin = { top: 20, right: 20, bottom: 30, left: 40 }
      , width = window.innerWidth - margin.left - margin.right // Use the window's width 
      , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

    // The number of datapoints
    var n = 8;

    d3.select("#" + this.chartid).remove();
    const element = document.getElementById("time_" + this.chartid);

    var h2 = element.offsetHeight - 50;

    // parse the date / time
    var parseTime = d3.timeParse("%d-%b-%y");
    var xFormat = "%d-%b-%Y";;

    // format the data
    data.forEach(function (d) {
      //console.log(parseTime(new Date(d.letter)));
      //d.letter = parseTime(new Date(d.letter));
    });

    console.log(data);


    // 5. X scale will use the index of our data
    var xScale2 = d3.scaleLinear()
      .domain([0, n - 1]) // input
      .range([0, element.offsetWidth]); // output

 

    var xScale = 
        d3.scaleTime()
      .range([0, element.offsetWidth-100])

      

    // 6. Y scale will use the randomly generate number 
    var yScale2 = d3.scaleLinear()
      .domain([0, 1]) // input 
      .range([h2, 0]); // output

    var yScale = d3.scaleLinear()
       .rangeRound([h2, 0])
      .domain([d3.min(data, d => d.y) -10, d3.max(data, d => d.y)]);

    var area = d3.area()
      .x(function (d) { return xScale(d.letter); })
      .y0(h2)
      .y1(function (d) { return yScale(d.y); })
      .curve(d3.curveMonotoneX);

    // 7. d3's line generator
    var line = d3.line()
      .x(function (d, i) { console.log(xScale(d.letter)); return xScale(d.letter); }) // set the x values for the line generator
      .y(function (d) { return yScale(d.y); }) // set the y values for the line generator 
      .curve(d3.curveMonotoneX) // apply smoothing to the line

    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    var dataset = d3.range(n).map(function (d) { return { "y": d3.randomUniform(1)() } })

    //dataset = [];
    //data.forEach(x => {
    //  dataset.push({ "y": x.y });
    //})
    //console.log(dataset);
    // 1. Add the SVG to the page and employ #2

    xScale.domain(d3.extent(data, function (d) { return d.letter; }));

    var svg = d3.select(element).append("svg")
      .attr("id", this.chartid)
      .attr('width', element.offsetWidth)
      .attr("height", '100%')
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 3. Call the x axis in a group tag
     var xAxis =svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + h2 + ")")
      .call(d3.axisBottom(xScale).ticks(8)); // Create an axis component with d3.axisBottom



    // 4. Call the y axis in a group tag
    svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft


    svg.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);


    // 9. Append the path, bind the data, and call the line generator 

    //svg.append("path")
    //  .datum(data) // 10. Binds data to the line 
    //  .attr("class", "line") // Assign a class for styling 
    //  .attr("d", line); // 11. Calls the line generator 

    // 12. Appends a circle for each datapoint 


    //svg.selectAll(".dot")
    //  .data(data)
    //  .enter().append("circle") // Uses the enter().append() method
    //  .attr("class", "dot") // Assign a class for styling
    //  .attr("cx", function (d, i) { return xScale(d.letter) })
    //  .attr("cy", function (d) { return yScale(d.y) })
    //  .attr("r", 5)
    //  .on("mouseover", function (a, b, c) {
    //    console.log(a)
    //    this.attr('class', 'focus')
    //  })
    //  .on("mouseout", function () { })


    // Add a clipPath: everything out of this area won't be drawn.
    var clip = svg.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", element.offsetWidth)
      .attr("height", h2)
      .attr("x", 0)
      .attr("y", 0);

    // Add brushing
    var brush = d3.brushX()                   // Add the brush feature using the d3.brush function
      .extent([[0, 0], [element.offsetWidth, h2]])  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("end", updateChart)               // Each time the brush selection changes, trigger the 'updateChart' function

    // Create the line variable: where both the line and the brush take place
    var line2 = svg.append('g')
      .attr("clip-path", "url(#clip)")

    // Add the line
    line2.append("path")
      .datum(data)
      .attr("class", "line")  // I add the class line to be able to modify this line later on.
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line
      )

    // Add the brushing
    line2
      .append("g")
      .attr("class", "brush")
      .call(brush);

    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function (d, i) { return xScale(d.letter) })
      .attr("cy", function (d) { return yScale(d.y) })
      .attr("r", 5)
      .on("mouseover", function (a, b, c) {
        console.log(a)
        this.attr('class', 'focus')
      })
      .on("mouseout", function () { })

    // A function that set idleTimeOut to null
    var idleTimeout
    function idled() { idleTimeout = null; }

    // A function that update the chart for given boundaries
    function updateChart() {

      // What are the selected boundaries?
      var extent = d3.event.selection

      // If no selection, back to initial coordinate. Otherwise, update X axis domain
      if (!extent) {
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        xScale.domain([4, 8])
      } else {
        xScale.domain([xScale.invert(extent[0]), xScale.invert(extent[1])])
        line2.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
      }

      // Update axis and line position
     var x2= xAxis.transition().duration(1000).call(d3.axisBottom(xScale).ticks(4))

      svg
        .select('.area')
        .transition()
        .duration(1000)
        .attr("d", area);


      line2
        .select('.line')
        .transition()
        .duration(1000)
        .attr("d", line
      )

      svg.selectAll(".dot")
        .attr("cx", function (d, i) { return xScale(d.letter) })
        .attr("cy", function (d) { return yScale(d.y) })
    }

    // If user double click, reinitialize the chart
    svg.on("dblclick", function () {
      xScale.domain(d3.extent(data, function (d) { return d.letter; }))
      xAxis.transition().call(d3.axisBottom(xScale).ticks(8))
      line2
        .select('.line')
        .transition()
        .attr("d", line
        )
    });

  }

  callChartApi() {
    var id = localStorage["userid"];
    var url = "api/bmm/bp/scoreboard/chart?userRefId=" + id + "&chartType=bloodPressure&chartLabel=average&fromDate=" + this.fromDate + "&toDate=" + this.toDate;
    this.loading_bpchart = true;
    this.http.get<any>(this.baseUrl + url).subscribe(result => {
      this.loading_bpchart = false;
   
      if (result.status && result.data && result.data.length > 0) {
        var data = result.data;
        this.data = [];
        data.forEach(item => {
          this.data.push({ letter: new Date(item.date) , y: item.chartValue });
        })
        console.log(this.data);

        this.data.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return <any>new Date(b.letter) - <any>new Date(a.letter);
        });
        this.createChart();
        this.cdr.markForCheck();
      }
      else {

      }
    },
      error => {
        this.loading_bpchart = false;
      });

  }

  ngAfterViewInit() {
    //this.data =  [{ letter: 'A', frequency: 0.50 },
    //{ letter: 'B', frequency: 0.22 },
    //{ letter: 'C', frequency: 0.56 }];
    //this.createChart();

    this.chart.charttitle = "Average By Range";
    this.chart.subheader = "A classification of patients based on their average BG range";


    this.callChartApi();
  }

}



/* example
 *
 * https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89
 * https://datawanderings.com/2019/10/28/tutorial-making-a-line-chart-in-d3-js-v-5/
 * https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
 *
 * */
