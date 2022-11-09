import { select, scaleBand, axisBottom, scaleLinear, axisLeft } from 'd3'
import data from './data.json'

// set the dimensions and margins of the graph
const margin = { top: 30, right: 30, bottom: 70, left: 60 }
const width = 460 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

// append the svg object to the body of the page
const svg = select('#root')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`)

// X axis
const x = scaleBand()
  .range([0, width])
  .domain(data.map((d) => d.country))
  .padding(0.2)
svg
  .append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(axisBottom(x))
  .selectAll('text')
  .attr('transform', 'translate(-10,0)rotate(-45)')
  .style('text-anchor', 'end')

// Add Y axis
const y = scaleLinear().domain([0, 13000]).range([height, 0])
svg.append('g').call(axisLeft(y))

// Bars
svg
  .selectAll('mybar')
  .data(data)
  .join('rect')
  .attr('x', (d) => x(d.country))
  .attr('y', (d) => y(d.value))
  .attr('width', x.bandwidth())
  .attr('height', (d) => height - y(d.value))
  .attr('fill', '#2dcf7b')
