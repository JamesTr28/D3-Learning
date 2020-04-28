const height = 500;
const width = 1000;
margin = ({top: 30, right: 0, bottom: 30, left: 40});

//save data from csv to variable
d3.csv("alphabet.csv").then(function(data) {
  data.forEach(function(d) {   
    d.frequency = +d.frequency;
    
  });


const xScale = d3.scaleBand()
                  .domain(data.map(d => d.letter))
                  .range([margin.left, width - margin.right])
                  .padding(0.1);
const yScale = d3.scaleLinear()
                  .domain([0, d3.max(data, d => d.frequency)]).nice()
                  .range([height - margin.bottom, margin.top]);

//Build Bar columns
const svg = d3.select('body').append("svg")
              .attr('width', width)
              .attr("height", height);
          
      svg.append("g")
          .attr("fill", "steelblue")
          .selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", (d, i) => xScale(d.letter))
          .attr("y", d => yScale(d.frequency))
          .attr("height", d => yScale(0) - yScale(d.frequency))
          .attr("width", xScale.bandwidth());

//Add Axises
const xAxis = d3.axisBottom(xScale) 
                .ticks(data.length);                
                
      svg.append("g")
         .attr("transform", "translate(0, " + (height - margin.bottom) + ")")
         .call(xAxis);
        
const yAxis = d3.axisLeft(yScale)
              .tickFormat(d3.format(".00%"));
                
      svg.append("g")
         .attr("transform", "translate(" + margin.left + " ,0)")
         .call(yAxis)
         .append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "steelblue")
        .attr("text-anchor", "start")
        .text("Frequency");
  
});










