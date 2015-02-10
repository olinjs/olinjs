var fill = d3.scale.category20();

var generateWordCloud = function(word_objects){

  d3.select("#cloud").html('');

  d3.layout.cloud().size([800, 500])
  .words(word_objects)
  .padding(5)
  .font("Impact")
  .fontSize(function(d) { return d.size; })
  .on("end", draw)
  .start();
    
  function draw(words) {
    d3.select("#cloud").append("svg")
    .attr("width", 800)
    .attr("height", 500)
    .append("g")
    .attr("transform", "translate(400,250)")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("font-family", "Impact")
    .style("fill", function(d, i) { return fill(i); })
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; });
  };
}
