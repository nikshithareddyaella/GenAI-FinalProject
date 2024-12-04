import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit, AfterViewInit {
  constructor(private chartService: ChartService) {
    Chart.register(...registerables); // Register chart.js components
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chartService.getChartData().subscribe((data) => {
      this.createBarChart(data);
    });
  }

  createBarChart(data: any): void {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map((d: any) => d.innovation),
          datasets: [
            {
              label: 'Investment',
              data: data.map((d: any) => d.investment),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
      });
    } else {
      console.error('Bar chart canvas element not found');
    }
  }
}
