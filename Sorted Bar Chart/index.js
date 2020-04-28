margin = ({top: 20, right: 0, bottom: 30, left: 40})
height = 500
width = 1000;

var alphabetical = (a, b) => {return a.letter.localeCompare(b.letter)};
var ascending = (a, b) => {return a.frequency - b.frequency};
var descending = (a, b) => {return b.frequency - a.frequency};

//read data from csv
d3.csv("alphabet.csv").then(function(data) {
  data.forEach(function(d) {   
    d.frequency = +d.frequency;    
  });

  x = d3.scaleBand()
.domain(data.map(d => d.letter))
.range([margin.left, width - margin.right])
.padding(0.1)

y = d3.scaleLinear()
.domain([0, d3.max(data, d => d.frequency)]).nice()
.range([height - margin.bottom, margin.top])

xAxis = g => g
.attr("transform", `translate(0,${height - margin.bottom})`)
.call(d3.axisBottom(x).tickSizeOuter(0))

yAxis = g => g
.attr("transform", `translate(${margin.left},0)`)
.call(d3.axisLeft(y))
.call(g => g.select(".domain").remove())

//build chart
const svg = d3.select("body").append("svg")
      .attr("viewBox", [0, 0, width, height]);

  const bar = svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(data).enter()
    .append("rect")
      .style("mix-blend-mode", "multiply")
      .attr("x", d => x(d.letter))
      .attr("y", d => y(d.frequency))
      .attr("height", d => y(0) - y(d.frequency))
      .attr("width", x.bandwidth());
  
  const gx = svg.append("g")
      .call(xAxis);
  
  const gy = svg.append("g")
      .call(yAxis);

 //change the chart base on selection

d3.select('#select-key').on('change', function() {  
  var order = eval(d3.select(this).property('value'));  
  update(order);
 });
 
 //function to update bar chart
 function update(order) {
  x.domain(data.sort(order).map(d => d.letter));

  const t = svg.transition()
      .duration(750);

  bar.data(data, d => d.letter)
      .order()
    .transition(t)
      .delay((d, i) => i * 20)
      .attr("x", d => x(d.letter));

  gx.transition(t)
      .call(xAxis)
    .selectAll(".tick")
      .delay((d, i) => i * 20);
      
}

}); 






