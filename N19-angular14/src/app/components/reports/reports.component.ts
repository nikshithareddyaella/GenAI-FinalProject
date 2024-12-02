import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.chartService.getChartData().subscribe((data) => {
      this.createPieChart(data);
    });
  }

  createPieChart(data: any[]): void {
    const width = 450,
      height = 450,
      radius = Math.min(width, height) / 2;

    const svg = d3
      .select('#pieChart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<any>().value((d) => d.investment);
    const data_ready = pie(data);

    const arc = d3.arc<d3.PieArcDatum<any>>().innerRadius(0).outerRadius(radius);

    svg
      .selectAll('slices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (_, i: number) => d3.schemeCategory10[i % 10]);
  }
}
