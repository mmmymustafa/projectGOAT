const showAllSeasons = () => d3.json("./data/Kobe_season_all.json", (data) => {
    document.getElementById("game-info").style.display = "none"
    document.getElementById("seasons-modal").style.display = "flex"
    let backgrounds = document.getElementsByClassName("mySlides")
    for (let bg of backgrounds){
        bg.style.backgroundColor= "grey"
    }
    for (let i = 0; i < data.length; i++) {
        const node = document.createElement("LI");
        let textnode = document.createTextNode(data[i].Season);
        node.setAttribute("id", "season")
        node.onclick = function () { showSeasonData(data[i].Season) };
        if (document.getElementById('seasons').getElementsByTagName("li").length < data.length){
        node.appendChild(textnode);
        document.getElementById("seasons").appendChild(node);
        }
    } 
});

// const showSeasonData = (dataFile) => d3.json(`./data/Kobe_season_${dataFile}.json`, (data) => {
//     document.getElementById("game-info").style.display = "flex"
//     if (document.getElementById('game-data').getElementsByTagName("li").length > 0){
//         let gameData = document.getElementById('game-data');
//         gameData.innerHTML = ""
//     }
//     let backgrounds = document.getElementsByClassName("mySlides")
//     for (let bg of backgrounds) {
//         bg.style.backgroundColor = "grey"
//     }
//     for (let i = 0; i < data.length; i++) {
//         const node = document.createElement("LI");
//         let textnode = document.createTextNode(data[i].Date + " " + data[i].Team + " Vs. " + data[i].Opponent);
//         node.setAttribute("id", "game")
//         if (document.getElementById('game-data').getElementsByTagName("li").length < data.length) {
//             node.appendChild(textnode);
//             document.getElementById("game-data").appendChild(node);
//         }
//     }
// })

// set the dimensions and margins of the graph
let margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 7500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
let x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
let y = d3.scaleLinear()
    .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
let svg = d3.select("#game-info").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "bar-chart")
    .append("g")
    .attr("id", "bar-chart-g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    
    svg.append("text")
        .text("Points by Kobe per game")
        .attr("y", 10)
        .attr("x", 10)
        .attr("stroke", "white")
        .attr("font-size", 20)
        .attr("font-family", "monospace")

// get the data
const showSeasonData = (dataFile) =>d3.json(`./data/Kobe_season_${dataFile}.json`, function (error, data) {
    document.getElementById("game-info").style.display = "flex";
    if (document.getElementById('bar-chart-g').getElementsByTagName("rect").length > 0) {
        let gameData = document.getElementById('bar-chart-g');
        gameData.innerHTML = ""
    }
    let backgrounds = document.getElementsByClassName("mySlides")
    for (let bg of backgrounds) {
        bg.style.backgroundColor = "grey"
    }
    if (error) throw error;

    // format the data
    data.forEach(function (d) {
        d.Points = +d.Points;
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function (d) { return d.Date}));
    y.domain([0, d3.max(data, function (d) { return d.Points; })]);

    // append the rectangles for the bar chart
    let bars = svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.Date); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d.Points); })
        .attr("height", function (d) { return height - y(d.Points); });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

    let tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip');


    bars.on('mousemove', showTooltip)
    bars.on('mouseout', hideTooltip)

    function showTooltip(d) {
        tooltip.style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .html(d.Team + " Vs. " + d.Opponent + "<br>" + "Minutes Kobe Played: " + d.MinsPlayed + "<br>"
            + "Field Goals (Success/Attempted/%): " + d.FieldGoals + "/" + d.FieldGoalsAttempted + "/" + Math.round((d.FieldGoalPercentage * 100), 4) + "%" + "<br>"
            + "3-Pointers (Success/Attempted/%): " + d.ThreePointFieldGoals + "/" + d.ThreePointFieldGoalAttempted + "/" + Math.round((d.ThreePointFieldGoalPercentage * 100), 4) + "%" + "<br>"
                + "Free Throws (Success/Attempted/%): " + d.FreeThrows + "/" + d.FreeThrowAttempts + "/" + Math.round((d.FreeThrowPercentage * 100), 4) + "%" + "<br>"
            + "Rebounds (Offensive/Deffensive/Total): " + d.OffensiveRebounds + "/" + d.DeffensiveRebounds + "/" + d.TotalRebounds + "<br>"
            + "Assists: " + d.Assists + "<br>" + "Steals: " + d.Steals + "<br>" + "Blocks: " + d.Blocks + "<br>" + "Turnovers: " + d.Turnovers + "<br>"
            + "Personal Fouls: " + d.PersonalFouls + "<br>" + "Points: " + d.Points + "<br>" + "Game Score: " + d.GameScore + "<br>" + "Match Results: " + d.FIELD8
            )
    }

    function hideTooltip() {
        tooltip.style('display', 'none');
    }

});

// const showGameData = (dataFile) => d3.json(`./data/Kobe_season_${dataFile}.json`, (data) => {

// }

// function getMax(arr, prop) {
//     let max;
//     for (let i = 0; i < arr.length; i++) {
//         if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
//             max = arr[i];
//     }
//     return max;
// }

// let maxPpg = getMax(arr, "ppg");
// console.log("Top scorer: " + maxPpg.player + " - " + maxPpg.team);

const closeModal = () => {
    document.getElementById("game-info").style.display = "none"
    document.getElementById("seasons-modal").style.display = "none"
    let backgrounds = document.getElementsByClassName("mySlides")
    for (let bg of backgrounds) {
        bg.style.backgroundColor = "transparent"
    }
}