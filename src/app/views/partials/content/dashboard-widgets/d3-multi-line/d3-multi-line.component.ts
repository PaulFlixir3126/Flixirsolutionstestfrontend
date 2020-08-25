                                            
import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, AfterViewInit, ChangeDetectorRef, Inject } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DateActionService } from '../../../../../core/services/dateaction';

@Component({
  selector: 'd3-multi-line',
  templateUrl: './d3-multi-line.component.html',
  styleUrls: []
})
export class D3MultiLineChartComponent implements OnInit, OnChanges,AfterViewInit {



  @Input() chartid: string = "";
  @Input() chartTitle: string = "";
  @Input() chartSubHeader: string = "";

  @Input() fromDate: string = "";
  @Input() toDate: string = "";

  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  avgData: any[] = [];
  data: any[] = [];
  chart: any = {};
  loading_chart: boolean = false;
  constructor(private http: HttpClient,
    public dateAction: DateActionService,
    private cdr: ChangeDetectorRef,
    @Inject('BASE_URL') public baseUrl: string) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    if (!this.data) { return; }

    else {
      //if (this.fromDate && this.toDate)
        //this.callChartApi();
    }
  }
  private createChart3() {


    const element = document.getElementById("time_" + this.chartid);
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = element.offsetWidth - 80,
      height = element.offsetHeight - 80;

    // parse the date / time
    var parseTime = d3.timeParse("%d-%b-%y");

    // set the ranges
    var x =
      d3.scalePoint()
        .padding(0.6)
        .range([0, width]);



    var y = d3.scaleLinear().range([height, 0]);

    // define the 1st line
    var valueline = d3.line()
      .curve(d3.curveLinear)
      .x(function (d) { return x(d.date); })
      .y(function (d) { return y(d.ct); });

    // define the 2nd line
    var valueline2 = d3.line()
      .curve(d3.curveLinear)
      .x(function (d) { return x(d.date); })
      .y(function (d) { return y(d.pt); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select(element).append("svg")
      .attr("id", this.chartid)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.csv("http://localhost:4200/assets/data2.csv").then(function (data) {

      // format the data
      data.forEach(function (d) {
        d.date = parseTime(d.date);
        d.close = +d.close;
        d.open = +d.open;
      });

      console.log(data);

      var data2 = [{ date: 'a', ct: 22, pt: 33 },
      { date: 'b', ct: 11, pt: 25 },
      { date: 'c', ct: 56, pt: 45 },
        { date: 'd', ct: 34, pt: 2 },
        { date: 'e', ct: 22, pt: 33 },
        { date: 'f', ct: 11, pt: 25 },
        { date: 'g', ct: 56, pt: 45 },
        { date: 'h', ct: 34, pt: 2 }];

      // Scale the range of the data
      x.domain(data2.map(d => d.date));

      y.domain([0, d3.max(data2, function (d) {
        return Math.max(d.ct, d.pt);
      })]);

      // Add the valueline path.
      svg.append("path")
        .data([data2])
        .style("stroke", "green")
        .attr("class", "line")
        .attr("d", valueline);

      // Add the valueline2 path.
      svg.append("path")
        .data([data2])
        .attr("class", "line")
        .style("stroke", "red")
        .attr("d", valueline2);


      var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


      svg.append("g").selectAll("circle")
        .data(data2)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function (d, i) { return x(d.date) })
        .attr("cy", function (d) { return y(d.ct) })
        .attr("r", 5)
        .on("mouseover", function (d, i) {
          div.transition()
            .duration(200)
            .style("opacity", .9);
          div.html("Biomarker Value:" + d.ct)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");

        })
        .on("mouseout", function (d) {
          div.transition()
            .duration(500)
            .style("opacity", 0);
        });




      svg.append("g").selectAll("circle")
        .data(data2)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function (d, i) { return x(d.date) })
        .attr("cy", function (d) { return y(d.pt) })
        .attr("r", 5)
        .attr('transform', 'translate(0, 0)')
        .on("mouseover", function (d, i) {
          div.transition()
            .duration(200)
            .style("opacity", .9);
          div.html("Biomarker Value:"  + d.pt)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");	

        })
          .on("mouseout", function (d) {
          div.transition()
            .duration(500)
            .style("opacity", 0);
        });

      //svg.append("g").selectAll("circle")
      //  .data(function (d) { return d.values })
      //  .enter()
      //  .append("circle")
      //  .attr("r", 2)
      //  .attr("cx", function (dd) { return x(dd.date) })
      //  .attr("cy", function (dd) { return y(dd.temperature) })
      //  .attr("fill", "none")
      //  .attr("stroke", "black")

      // Add the X Axis
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g")
        .call(d3.axisLeft(y));



      function handleMouseOver(d, i) {  // Add interactivity

        // Use D3 to select element, change color and size
        d3.select(this).attr({
          fill: "orange",
          r: 6 * 2
        });

        alert("ok");
        // Specify where to put label of text
        svg.append("text").attr({
          id: "t" + d.date + "-" + d.pt + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
          x: function () { return x(d.date) - 30; },
          y: function () { return x(d.pt) - 15; }
        })
          .text(function () {
            return [d.date, d.pt];  // Value of the text
          });

        alert("ok2");
      }

      function handleMouseOut(d, i) {
        // Use D3 to select element, change color back to normal
        d3.select(this).attr({
          fill: "black",
          r: 6
        });

        // Select text by id and then remove
        d3.select("#t" + d.date + "-" + d.pt + "-" + i).remove();  // Remove text location
      }






    });

  }


  private createChart2() {
 

    const element = document.getElementById("time_" + this.chartid);
    var margin = { top: 20, right: 20, bottom: 30, left: 40},
      width = element.offsetWidth-80,
      height = element.offsetHeight - 80;

    // parse the date / time
    var parseTime = d3.timeParse("%d-%b-%y");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the 1st line
    var valueline = d3.line()
      .x(function (d) { return x(d.date); })
      .y(function (d) { return y(d.close); });

    // define the 2nd line
    var valueline2 = d3.line()
      .x(function (d) { return x(d.date); })
      .y(function (d) { return y(d.open); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select(element).append("svg")
      .attr("id", this.chartid)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.csv("http://localhost:4200/assets/data2.csv").then(function (data) {

      // format the data
      data.forEach(function (d) {
        d.date = parseTime(d.date);
        d.close = +d.close;
        d.open = +d.open;
      });

      // Scale the range of the data
      x.domain(d3.extent(data, function (d) { return d.date; }));
      y.domain([0, d3.max(data, function (d) {
        return Math.max(d.close, d.open);
      })]);

      // Add the valueline path.
      svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

      // Add the valueline2 path.
      svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "red")
        .attr("d", valueline2);



      svg.append("g").selectAll("circle")
        .data(data)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function (d, i) { return x(d.date) })
        .attr("cy", function (d) { return y(d.open) })
        .attr("r", 5)

      svg.append("g").selectAll("circle")
        .data(data)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function (d, i) { return x(d.date) })
        .attr("cy", function (d) { return y(d.close) })
        .attr("r", 5)

      //svg.append("g").selectAll("circle")
      //  .data(function (d) { return d.values })
      //  .enter()
      //  .append("circle")
      //  .attr("r", 2)
      //  .attr("cx", function (dd) { return x(dd.date) })
      //  .attr("cy", function (dd) { return y(dd.temperature) })
      //  .attr("fill", "none")
      //  .attr("stroke", "black")

      // Add the X Axis
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g")
        .call(d3.axisLeft(y));

    });

  }

  private createChart(): void {

    alert("ok1");
    //var data = this.data;

    var data = {
      "y": "% Unemployment",
      "series": [{
        "name": "Bethesda-Rockville-Frederick MD",
        "values": [2.6, 2.6, 2.6, 2.6, 2.7, 2.7]
      },
      {
        "name": "Sam",
        "values": [2.2, 2.1, 2.2, 2.2, 2.3, 2.4]
      }
      ],
      dates: []
    };

    var parser = d3.utcParse("%Y-%m");

    var temp = ["2000-01-01", "2000-02-01", "2000-03-01", "2000-04-01", "2000-05-01", "2000-06-01"];
    temp.forEach(iem => {
      data.dates.push(parser(iem));

    });

 
    console.log(data);

    d3.select("#" + this.chartid).remove();
    const element = document.getElementById("time_" + this.chartid);

    var h2 = element.offsetHeight - 50;

    alert("ok");

   


    var margin = { top: 0, right: 20, bottom: 30, left: 40 }
      , width = window.innerWidth - margin.left - margin.right // Use the window's width 
      , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

    // The number of datapoints
    var n = 8;



    // parse the date / time
    var parseTime = d3.timeParse("%d-%b-%y");
    var xFormat = "%d-%b-%Y";;


    var xScale = 
        d3.scaleTime()
      .range([0, element.offsetWidth-100])

    var x = d3.scaleUtc()
      .domain(d3.extent(data.dates))
      .range([0, element.offsetWidth - 100])

    // 6. Y scale will use the randomly generate number 


    var yScale = d3.scaleLinear()
       .rangeRound([h2, 0])
      .domain([d3.min(data, d => d.y) - 10, d3.max(data, d => d.y)]);

    var y = d3.scaleLinear()
      .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
      .range([h2, 0])

  var  xAxis = g => g
      .attr("transform", `translate(0,${h2})`)
    .call(d3.axisBottom(x).ticks(element.offsetWidth / 80).tickSizeOuter(0))


    var yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

    // 7. d3's line generator
    var line = d3.line()
      .defined(d => !isNaN(d))
      .x((d, i) => x(data.dates[i]))
      .y(d => y(d))

    const svg = d3.select(element).append("svg")
      .attr("id", this.chartid)
      .attr("viewBox", [0, 0, element.offsetWidth, h2])
      .style("overflow", "visible");

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

    const path = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .selectAll("path")
      .data(data.series)
      .join("path")
      .style("mix-blend-mode", "multiply")
      .attr("d", d => line(d.values));



  }



  ngAfterViewInit() {
    //this.data =  [{ letter: 'A', frequency: 0.50 },
    //{ letter: 'B', frequency: 0.22 },
    //{ letter: 'C', frequency: 0.56 }];
    //this.createChart();
    this.createChart3();

    this.chart.charttitle = "Average By Range";
    this.chart.subheader = "A classification of patients based on their average BG range";

  }

}



/* example
 *
 * https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89
 * https://datawanderings.com/2019/10/28/tutorial-making-a-line-chart-in-d3-js-v-5/
 * https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
 *
 * */
