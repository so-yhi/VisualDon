const dataPc = [
  { name: 'Skyrim', heures: 327 },
  { name: 'The Sims 3', heures: 193 },
  { name: 'The Sims 4', heures: 34 },
  { name: 'World of Warcraft', heures: 420 },
  { name: 'Life is strange', heures: 21 },
  { name: 'League of Legends', heures: 34 },
  { name: 'Age Of Empire', heures: 21 }
];

const dataSwitch = [
  { name: 'Animal Crossing NH', heures: 330 },
  { name: 'Mario Kart 8 ', heures: 30 },
  { name: 'Octopath Traveler', heures: 20 },
  { name: 'Moonlighter', heures: 30 },
  { name: 'Not Tonight', heures: 11 },
  { name: 'Pokémon Bouclier', heures: 16 },
  { name: 'Donkey Kong Freez', heures: 23 }
];


function updatePc(){
  d3.selectAll('svg').remove();
  data = dataPc;
  let textePC = document.getElementById("typePlateforme").innerHTML = "Jeux PC";
  //console.log("au revoir");
  //console.log(data[0]);
  dessine(dataPc);
}


function updateSwitch(){
  d3.selectAll('svg').remove();
  data = dataSwitch;
  let textePC = document.getElementById("typePlateforme").innerHTML = "Jeux  Nintendo Switch";
 //console.log("au revoir");
  //console.log(data[0]);
  dessine(dataSwitch);
}


const width = 2000;
const height = 550;
const margin = { top: 50, bottom: 50, left: 20, right: 20 };


function dessine() {

  const svg = d3.select('#d3-container')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);

  const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)

  const y = d3.scaleLinear()
    .domain([0, 400])
    .range([height - margin.bottom, margin.top])

  svg
    .append("g")
    .selectAll("rect")
    .data(data.sort((a, b) => d3.descending(a.heures, b.heures)))
    .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.heures))
    .attr('title', (d) => d.heures)
    .attr("class", "rect")
    .attr("height", d => y(0) - y(d.heures))
    .attr("width", x.bandwidth())
    .attr("fill", '#FFBF46')



  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", '20px')
  }

  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].name))
      .attr("font-size", '20px')
  }

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();

}//fin dessine

