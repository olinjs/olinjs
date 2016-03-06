/*
  Feel free to comment/uncomment, add things, change things, etc -- sometimes
  changing one line of code and then reloading the app can help you see what
  that line does.
*/

// --------------TIME DATA--------------

function timeData() {
  var now = new Date;
  return [
    {index: .7, text: formatSecond(now), value: now.getSeconds() / 60},
    {index: .6, text: formatMinute(now), value: now.getMinutes() / 60},
    {index: .5, text: formatHour(now),   value: now.getHours() / 24},
    {index: .3, text: formatDay(now),    value: now.getDay() / 7},
    {index: .2, text: formatDate(now),   value: (now.getDate()) / (32 - new Date(now.getYear(), now.getMonth(), 32).getDate())},
    {index: .1, text: formatMonth(now),  value: now.getMonth() / 12}
  ];
}

// --------------CONSTANTS & DEFINITIONS--------------

// "Magic numbers" to position things on the page
var width = 960,
    height = 800,
    radius = Math.min(width, height) / 1.9,
    spacing = .09;

d3.select(self.frameElement).style("height", height + "px");

// Functions to parse the date into labels for the clock arcs
var formatSecond = d3.time.format("%-S seconds"),
    formatMinute = d3.time.format("%-M minutes"),
    formatHour = d3.time.format("%-H hours"),
    formatDay = d3.time.format("%A"),
    formatDate = function(d) {
      d = d.getDate();
      switch (10 <= d && d <= 19 ? 10 : d % 10) {
        case 1: d += "st"; break;
        case 2: d += "nd"; break;
        case 3: d += "rd"; break;
        default: d += "th"; break;
      }
      return d;
    },
    formatMonth = d3.time.format("%B");
// If the format functions are confusing to you -- try uncommenting the following
// line and figuring out what it does:
// console.log(formatHour(new Date))


// Color scale -- a function which takes a number between 0 and 1 and returns a HSL
// color object (where HSL is hue, saturation, lightness)
// Try other color scales out! (making sure only one .range is uncommented at a time)
var color = d3.scale.linear()
    .range(["hsl(0,60%,50%)", "hsl(360,60%,50%)"])
    // .range(["hsl(-90,60%,50%)", "hsl(270,60%,50%)"])
    // .range(["hsl(-180,60%,50%)", "hsl(180,60%,50%)"])
    // .range(["hsl(-270,60%,50%)", "hsl(90,60%,50%)"])
    .interpolate(function(a, b) {
      var i = d3.interpolateString(a, b);
      return function(t) {
        return d3.hsl(i(t));
      };
    });


// Functions which construct d3 arcs based on an input object with value and index properties
// ...this one draws the colored arcs
var arcBody = d3.svg.arc()
    .startAngle(0)
    .endAngle(function(d) { return d.value * 2 * Math.PI; })
    .innerRadius(function(d) { return d.index * radius; })
    .outerRadius(function(d) { return (d.index + spacing) * radius; })
    .cornerRadius(6);

// ...this one draws arcs for putting the label text in
var arcCenter = d3.svg.arc()
    .startAngle(0)
    .endAngle(function(d) { return d.value * 2 * Math.PI; })
    .innerRadius(function(d) { return (d.index + spacing / 2) * radius; })
    .outerRadius(function(d) { return (d.index + spacing / 2) * radius; });



// --------------SET UP THE SVG--------------

// Make the SVG and append a group ("g") to the SVG which is centered on the page.
// SVG group elements are containers used to group other SVG elements.
var svg = d3.select("#clock-container").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


// Within the centered group element, add a new group element for every item in the timeData array
var arcGroup = svg.selectAll("g") // (this selects the centered group)
    .data(timeData)
  .enter().append("g");
// console.log(arcGroup); // uncomment to check -- this should be an array of group objects


// To each arcGroup, append:
// ...a path SVG element with the class arc-body
arcGroup.append("path")
    .attr("class", "arc-body");

// ...a path SVG element with the class arc-center and a unique id
arcGroup.append("path")
    .attr("id", function(d, i) { return "arc-center-" + i; })
    .attr("class", "arc-center");

// ...a text path for the label
arcGroup.append("text")
    .attr("dy", ".35em")
    .attr("dx", ".75em")
    .style("text-anchor", "start")
  .append("textPath")
    .attr("startOffset", "50%")
    .attr("class", "arc-text")
    .attr("xlink:href", function(d, i) { return "#arc-center-" + i; });



// --------------TIMING & TRANSITIONS--------------

tick(); // start the clock ticking

// function which causes a fieldTransition within the clock every second
function tick() {
  if (!document.hidden) arcGroup
      .each(function(d) { this._value = d.value; })
      .data(timeData)
      .each(function(d) { d.previousValue = this._value; })
    .transition()
      .ease("elastic")
      .duration(500)
      .each(fieldTransition);

  setTimeout(tick, 1000 - Date.now() % 1000); // calls itself -- fires again after a second
}

// function which executes a fieldTransition (updates arc positions to represent the new time)
function fieldTransition() {
  var field = d3.select(this).transition();

  field.select(".arc-body")
      .attrTween("d", arcTween(arcBody))
      .style("fill", function(d) { return color(d.value); });

  field.select(".arc-center")
      .attrTween("d", arcTween(arcCenter));

  field.select(".arc-text")
      .text(function(d) { return d.text; });
}

// function for interpolating arc position between second ticks
function arcTween(arc) {
  return function(d) {
    var i = d3.interpolateNumber(d.previousValue, d.value);
    return function(t) {
      d.value = i(t);
      return arc(d);
    };
  };
}
