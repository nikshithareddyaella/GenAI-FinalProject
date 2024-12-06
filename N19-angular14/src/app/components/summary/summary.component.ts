import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';  // Import data labels plugin

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit, AfterViewInit {
  constructor(private chartService: ChartService) {
    Chart.register(...registerables, ChartDataLabels);  // Register the plugin
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chartService.getChartData().subscribe((data) => {
      this.createLineChart(data);
      this.createBarChart(data);
    });
  }

  createLineChart(data: any): void {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map((d: any) => d.year),
          datasets: [
            {
              label: 'Investment',
              data: data.map((d: any) => d.investment),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              fill: true,
              // Add data labels to the line chart
              datalabels: {
                align: 'top',
                font: { weight: 'bold' },
                color: 'black',
              },
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem: any) {
                  return `Investment: $${tooltipItem.raw}`;
                },
              },
            },
            datalabels: {
              display: true,  // Display data labels
            },
          },
        },
      });
    } else {
      console.error('Line chart canvas element not found');
    }
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
              // Add data labels to the bar chart
              datalabels: {
                align: 'top',
                font: { weight: 'bold' },
                color: 'black',
              },
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem: any) {
                  return `Investment: $${tooltipItem.raw}`;
                },
              },
            },
            datalabels: {
              display: true,  // Display data labels
            },
          },
        },
      });
    } else {
      console.error('Bar chart canvas element not found');
    }
  }
}
