import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit, AfterViewInit {
  constructor(private chartService: ChartService) {
    Chart.register(...registerables); // Register chart.js components
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chartService.getChartData().subscribe((data) => {
      this.createPieChart(data);
    });
  }

  createPieChart(data: any): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data.map((d: any) => d.innovation),
          datasets: [
            {
              data: data.map((d: any) => d.investment),
              backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
            },
          ],
        },
      });
    } else {
      console.error('Pie chart canvas element not found');
    }
  }
}
