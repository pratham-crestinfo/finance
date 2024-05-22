import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit {
  
  chart: any;
  @Input() open_data :number[]=[];
  // constructor(private open_data:number[]){}
  ngOnInit(): void {
    this.createChart();
  }
  createChart() {
    this.chart = new Chart('MyChart', {
      type:"bar",
      data: {
        labels: [
          '2022-05-10',
          '2022-05-11',
          '2022-05-12',
          '2022-05-13',
          '2022-05-14',
          '2022-05-15',
          '2022-05-16',
          '2022-05-17',
        ],
        datasets: [
          {
            label: 'Sales',
            // data: ['467', '576', '572', '79', '92', '574', '573', '576'],
            data:this.open_data,
            backgroundColor: 'blue',
          },
         
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
