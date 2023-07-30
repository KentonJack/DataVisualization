const width = 800;
const height = 600;
const sid = "#ranking";

function clearChart(sid) {
    d3.select(sid).selectAll("*").remove();
}

function selectYear() {
    const year = document.getElementById("year").value;
    clearChart(sid);
    drawChart(sid, year);
}

function clearYear() {
    document.getElementById("year").value = "";
    clearChart(sid);
}

function drawChart(sid, year) {
    const svg = d3.select(sid)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand()
        .rangeRound([0, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .rangeRound([innerHeight, 0]);
    
    const dataPath = "data/cwurData_" + year + ".csv";

    d3.csv(dataPath).then(data => {
        data = data.filter(d => d.year == year);
        data.forEach(d => {
            d.value = +d.value;
        });

        xScale.domain(data.map(d => d.name));
        yScale.domain([0, d3.max(data, d => d.value)]);

        g.append("g")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale));

        g.append("g")
            .call(d3.axisLeft(yScale).ticks(10))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .text("Value");

        g.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.name))
            .attr("y", d => yScale(d.value))
            .attr("width", xScale.bandwidth())
            .attr("height", d => innerHeight - yScale(d.value));
    });
}