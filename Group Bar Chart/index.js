height = 500
margin = ({top: 10, right: 10, bottom: 20, left: 40})
width = 1000

d3.csv("database.csv").then(function(data) {
    data.forEach(function(d) {   
      d.role = +d.role;
      d.applicant = +d.applicant;
    });

    keys = data.columns.slice(1)
    groupKey = data.columns[0]

    color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6"])

    x0 = d3.scaleBand()
    .domain(data.map(d => d[groupKey]))
    .rangeRound([margin.left, width - margin.right])
    .paddingInner(0.1)

    x1 = d3.scaleBand()
    .domain(keys)
    .rangeRound([0, x0.bandwidth()])
    .padding(0.05)

    y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d3.max(keys, key => d[key]))]).nice()
    .rangeRound([height - margin.bottom, margin.top])

    xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x0).tickSizeOuter(0))
    .call(g => g.select(".domain").remove())

    yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

        const svg = d3.select('body').append("svg")
        .attr('width', width)
        .attr("height", height);

        svg.append("g")
          .selectAll("g")
          .data(data)
          .join("g")
            .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
          .selectAll("rect")
          .data(d => keys.map(key => ({key, value: d[key]})))
          .join("rect")
            .attr("x", d => x1(d.key))
            .attr("y", d => y(d.value))
            .attr("width", x1.bandwidth())
            .attr("height", d => y(0) - y(d.value))
            .attr("fill", d => color(d.key));
      
        svg.append("g")
            .call(xAxis);
      
        svg.append("g")
            .call(yAxis);


            legend = svg => {
                const g = svg
                    .attr("transform", `translate(${width},0)`)
                    .attr("text-anchor", "end")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 10)
                  .selectAll("g")
                  .data(color.domain().slice().reverse())
                  .join("g")
                    .attr("transform", (d, i) => `translate(0,${i * 20})`);
              
                g.append("rect")
                    .attr("x", -19)
                    .attr("width", 19)
                    .attr("height", 19)
                    .attr("fill", color);
              
                g.append("text")
                    .attr("x", -24)
                    .attr("y", 9.5)
                    .attr("dy", "0.35em")
                    .text(d => d);
              }
              
        svg.append("g")
      .call(legend);
    
});