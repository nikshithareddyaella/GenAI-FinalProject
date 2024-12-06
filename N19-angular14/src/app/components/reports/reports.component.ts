import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';  // Import data labels plugin

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit, AfterViewInit {
  constructor(private chartService: ChartService) {
    Chart.register(...registerables, ChartDataLabels);  // Register the plugin
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chartService.getChartData().subscribe((data) => {
      this.createRadarChart(data);
      this.createPieChart(data);
    });
  }

  createRadarChart(data: any): void {
    const ctx = document.getElementById('radarChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: data.map((d: any) => d.focusArea),
          datasets: [
            {
              label: 'Priority Level',
              data: data.map((d: any) => (d.priorityLevel === 'High' ? 3 : 2)),
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
              // Add data labels to the radar chart
              datalabels: {
                display: true,
                color: 'black',
                align: 'center',
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
                  return `Priority Level: ${tooltipItem.raw}`;
                },
              },
            },
            datalabels: {
              display: true,  // Display data labels
            },
          },
          scales: {
            r: {
              angleLines: { display: true },
              suggestedMin: 0,
              suggestedMax: 3,
            },
          },
        },
      });
    } else {
      console.error('Radar chart canvas element not found');
    }
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
              backgroundColor: ['#FC8585', '#A5CE7C', '#2ECFCA', '#BFA194', '#F8F29A'],
              // Add data labels to the pie chart
              datalabels: {
                display: true,
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
      console.error('Pie chart canvas element not found');
    }
  }
}
