let w = 900; let h = 900; let p = 5; 

let ch = 300; 
let test2 = document.getElementById("data")

//creating the svg canvas
let graph = d3.select("#data").append("svg");
graph.attr("width", w).attr("height", h);

d3.csv("edited.csv").then((data) => {
    visual(data);
});

function visual(data){
    //both scales

    let yScale = d3.scaleLinear().domain([0.5, 4]).range([0, ch]);
    let xScale = d3.scaleLinear().domain([0 , 270]).range([0, ch]);
    let textScale = d3.scaleLinear().domain([1995 , 2021]).range([0, 810]);
    let yAxisScale = d3.scaleLinear().domain([4, 0.5]).range([0, ch]);

    //top bar chart

    let graph1 = graph.append("g")
    .attr("transform", "translate(50, -550)")
    .selectAll("rect").data(data).enter().append("rect")
    
    graph1
    .attr("x", (d, o) =>{return o * ( w / xScale(data.length))})
    .attr("width", w / data.length-p)
    .attr("y", (d) => {return h - yScale(d.allGrades_avg)})
    .attr("height", (d) => {return yScale(d.allGrades_avg)})
    .attr("id", (d) => {return "top_" + d.Date})
    .attr("fill", "#ff8182")
    .on("mouseover", mouseOver) 
    .on("mouseout", mouseOut)

    graph.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text((d) => {return d.allGrades_avg;})
    .attr("x", (d, o) => {return o * ( w / xScale(data.length)) + (w / xScale(data.length)) / 2 + 49})
    .attr("y", (d) => {return h - yScale(d.allGrades_avg) + (-530)})
    .attr("font-family", "arial")
    .attr("font-size", "0.60em")
    .attr("font-weight", "bold")
    .attr("fill", "black")
    .attr("text-anchor", "middle")

    //bottom bar chart
    
    let graph2 = graph.append("g")
    .attr("transform", "translate(50, -90)")
    .selectAll("rect").data(data).enter().append("rect")
    
    graph2
    .attr("x", (d, o) =>{return o * ( w / xScale(data.length))})
    .attr("width", w / data.length-p)
    .attr("y", (d) => {return h - yScale(d.allDiesel)})
    .attr("height", (d) => {return yScale(d.allDiesel)})
    .attr("id", (d) => {return "bottom_" + d.Date})
    .attr("fill", "#ff8182")
    .on("mouseover", mouseOver2) 
    .on("mouseout", mouseOut)    

    graph.selectAll("text2")
    .data(data)
    .enter()
    .append("text")
    .text((d) => {return d.allDiesel})
    .attr("x", (d, o) => {return o * ( w / xScale(data.length)) + (w / xScale(data.length)) / 2 + 49})
    .attr("y", (d) => {return h - yScale(d.allDiesel) - 70})
    .attr("font-family", "arial")
    .attr("font-size", "0.60em")
    .attr("font-weight", "bold")
    .attr("fill", "black")
    .attr("text-anchor", "middle")

    //interaction events

    function mouseOver(d){
        let mousePos = d3.pointer(d)
        let x = mousePos[0] + 400
        let y = mousePos[1] - 120

        d3.select(this)
        .transition()
        .duration(100)
        .attr("fill", "#1eb1ef")

        d3.select("#tooltip")
        .style("left" , x + "px")
        .style("top" , y + "px")
        .classed("hidden", false)
        
        d3.select("#value")
        .text(() =>{
            return d.path[0].__data__.Date + "-" + " " + "$" + d.path[0].__data__.allGrades_avg + " " + "Per Gallon"
        })
    }

    function mouseOver2(d){
        let mousePos = d3.pointer(d)
        let x = mousePos[0] + 400
        let y = mousePos[1] + 320
        
        d3.select(this)
        .transition()
        .duration(100)
        .attr("fill", "#1eb1ef")

        d3.select("#tooltip")
        .style("left" , x + "px")
        .style("top" , y + "px")
        .classed("hidden", false)

        d3.select("#value")
        .text(() =>{
            return d.path[0].__data__.Date + "-" + " " + "$" + d.path[0].__data__.allDiesel + " " + "Per Gallon"
        })
    }

    function mouseOut(){
        d3.select(this)
        .transition()
        .duration(100)
        .attr("fill", "#ff8182")

        d3.select("#tooltip").classed("hidden", true)
    }

    //chart axis

    graph.append("text")
    .attr("class", "x_label")
    .attr("font-weight", "bold")
    .attr("font-family", "arial")
    .attr("x", 400)
    .attr("y", 410)
    .attr("font-size", "0.90em")
    .text("Years from 1995-2021")

    graph.append("text")
    .attr("class", "x_label")
    .attr("font-weight", "bold")
    .attr("font-family", "arial")
    .attr("x", 400)
    .attr("y", 870)
    .attr("font-size", "0.90em")
    .text("Years from 1995-2021")

    graph.append("text")
    .attr("class", "x_label")
    .attr("font-weight", "bold")
    .attr("font-family", "arial")
    .attr("x", 15)
    .attr("y", 40)
    .attr("font-size", "0.90em")
    .text("Dollars Per Gallon (All Grades)")

    graph.append("text")
    .attr("class", "x_label")
    .attr("font-weight", "bold")
    .attr("font-family", "arial")
    .attr("x", 15)
    .attr("y", 500)
    .attr("font-size", "0.90em")
    .text("Dollars Per Gallon (Diesel)")

    graph.append('g')
    .attr('class', 'axis')
    .attr("transform", "translate(40, 50)")
    .call(d3.axisLeft(yAxisScale));
    
    graph.append('g')
    .attr('class', 'axis')
    .attr("transform", "translate(40, 510)")
    .call(d3.axisLeft(yAxisScale));

    graph.append('g')
    .attr('class', 'axis')
    .attr("transform", "translate(48, 365)")
    .call(d3.axisBottom()
    .scale(textScale)
    .ticks(27)
    .tickFormat(d3.format("d")));

    graph.append('g')
    .attr('class', 'axis')
    .attr("transform", "translate(48, 825)")
    .call(d3.axisBottom()
    .scale(textScale)
    .ticks(27)
    .tickFormat(d3.format("d")));
};