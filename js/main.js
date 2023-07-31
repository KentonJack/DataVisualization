const width = 1600;
const height = 600;
const margin = { top: 80, right: 100, bottom: 40, left: 120 };
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
    clearChart(sid);
}

async function initChart(year, sid) {
    const dataPath = "https://raw.githubusercontent.com/KentonJack/DataVisualization/main/data/cwurData_" + year + ".csv";
    let dataRaw = await d3.csv(dataPath);
    dataRaw.forEach(d => {
        d.year = Number(d.year);
        d.world_rank = Number(d.world_rank);
        d.institution = d.institution;
        d.country = d.country;
    });

    // convert data to a list of countries and their frequency
    const data = [ ...new Set(dataRaw.map(d => d.country)) ].map(country => {
        return {
            country: country,
            count: dataRaw.filter(d => d.country === country).length
        }
    });
    console.log(data);

    // draw bar chart based on the country frequency
    const svg = d3
    .select(sid)
    .append('g')
    .attr('width', width)
    .attr('height', height);

    // Create a scale for the x-axis from data countries
    const xScale = d3
    .scaleBand()
    .domain(data.map(d => d.country))
    .range([0, width - margin.left - margin.right]);

    // Create a scale for the y-axis
    const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([height - margin.top - margin.bottom, 0]);

    // Create the line generator
    const line = d3
    .line()
    .x(d => margin.left + xScale(d.country))
    .y(d => margin.top + yScale(d.count));

    // Append the line path
    svg.append('path')
        .datum(data)
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2);

    // Append circle data points
    svg.append('g')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
            .attr('cx', (d) => margin.left + xScale(d.country))
            .attr('cy', (d) => margin.top + yScale(d.count))
            .attr('r', 3)
            .style('fill', 'steelblue')
            .style('stroke', 'black')
            .on("mouseover", (d) => {
                // Show the tooltip on mouseover
                const tooltip = svg.append("g")
                .attr("class", "tooltip")
                .attr("transform", "translate(" + (xScale(d.country) + 10) + "," + (yScale(d.count) + 40) + ")");

                tooltip.append("text")
                    .attr("y", 15)
                    .text("Country: " + d.country);

                tooltip.append("text")
                    .attr("y", 30)
                    .text("Count: " + d.count);
            })
            .on("mouseout", (d,i) => {
                // Remove the tooltip on mouseout
                svg.select(".tooltip").remove();
            })

    // Append X-axis
    svg.append('g')
        .attr("transform",`translate(${margin.left / 1.6}, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale))

    // Append Y-axis
    svg.append('g')
        .attr("transform",`translate(${margin.left}, ${margin.top})`)
        .call(d3.axisLeft(yScale).tickFormat(d3.format('~s')))

    // Append x-axis label
    svg.append("text")
    .attr("y", height)
    .attr("x", width/2)
    .style("text-anchor", "middle")
    .style("fill", "black")
    .text("Country");

    // Append y-axis label
    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("x", -(height/2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("fill", "black")
    .text("Count");

    // if year is >= 2014, add annotation
    if (Number(year) >= 2014) {
        const annotations = [{
            type: d3.annotationCalloutElbow,
            connector: { end: "arrow" },
            note: { 
                title: "CWUR increased the number of universities ranked from 100 to 1000 starting from 2014",
                wrap: 300
            },
            x: xScale(width/2) + margin.left,
            y: yScale(height) + margin.top,
            dx: width / 2 - margin.left,
            dy: margin.top,
        }].map(function(d){ d.color = "green"; return d})

        const makeAnnotations = d3.annotation()
            .annotations(annotations)

        svg.append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations)
    }
}
