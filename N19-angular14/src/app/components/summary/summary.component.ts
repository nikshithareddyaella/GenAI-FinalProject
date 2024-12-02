import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.chartService.getChartData().subscribe((data) => {
      this.createBarChart(data);
    });
  }

  createBarChart(data: any[]): void {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select('#barChart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d: any) => d.innovation))
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d: any) => d.investment) as number])
      .range([height, 0]);

    svg.append('g').call(d3.axisLeft(y));
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.innovation) as number)
      .attr('y', (d: any) => y(d.investment))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => height - y(d.investment))
      .attr('fill', 'steelblue');
  }
}
