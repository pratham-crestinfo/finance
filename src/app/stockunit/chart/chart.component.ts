import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { StockunitComponent } from '../stockunit.component';
import { stockservice } from '../stock.service';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';

Chart.register(...registerables);
interface MyDataValue {
  open: number;
  close: number;
  adj: number;
  high: number;
  low: number;
  volume:number
}
interface MyData {
  [key: string]: MyDataValue;
}



@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule,StockunitComponent],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit {
  
  chart: any;
  open_data :number[]=[];
  // labels:number[]=new Array(this.open_data.length).fill(1);
  arrayWithIndexValues:number[]=[];
  symbol:string="appl";
  constructor(private stockService:stockservice,private activeroute:ActivatedRoute){}
  


  ngOnInit(): void {
    this.activeroute.params.subscribe((params: Params) => {
      this.symbol=params['symbol'];
    })  


    this.stockService.get_chart_data(this.symbol).subscribe({
      next:(data)=>{
        let mydata:MyData=data.attributes;
        console.log(data.attributes)
        for(const [key,value] of Object.entries(mydata))
          {
            console.log(value.open)
            this.open_data.push(value.open);
          }
      console.log(this.open_data);
      const arraySize = 253;
       this.arrayWithIndexValues = Array.from({ length: arraySize }, (_, index) => index);



      this.createChart();
      }
    })
    // this.createChart();
  }
  createChart() {
    this.chart = new Chart('MyChart', {
      type:"line",
      data: {
        // labels: ['467', '576', '572', '79', '92', '574', '573', '576'],
        labels:this.arrayWithIndexValues,
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


// .subscribe((data) => {
//   console.log(data);

  // for(const [key,value] of Object.entries(mydata))
  // {
  //   this.num++;
  //   console.log(value.open)
  //   this.stock_open_chart_data.push(value.open);
  // }
// });