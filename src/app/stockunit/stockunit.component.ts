import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
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
  selector: 'app-stockunit',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './stockunit.component.html',
  styleUrl: './stockunit.component.css',
})
export class StockunitComponent implements OnInit {
  constructor(private activeroute: ActivatedRoute, private http: HttpClient) {}
  symbol!: string;
  id!: number;
  stock_open_chart_data!:number[]

  ngOnInit() {
    this.activeroute.params.subscribe((params: Params) => {
      this.symbol = params['symbol'];
      console.log(this.symbol);
      console.log();
    });
    this.get_chart_data();
  }


  private chart_url = 'https://seeking-alpha.p.rapidapi.com/symbols/get-chart';
  private chart_params = {
    symbol: 'aapl',
    period: '1Y',
  };
  private chart_headers = new HttpHeaders({
    'X-RapidAPI-Key': '76e3478958msh3514934cebda9d6p14d4ccjsna7d2e232769f',
    'X-RapidAPI-Host': 'seeking-alpha.p.rapidapi.com',
  });

 
  get_chart_data() {
    this.http
      .get<any>(this.chart_url, {
        headers: this.chart_headers,
        params: this.chart_params,
      })
      .subscribe((data) => {
        console.log(data);
        let mydata:MyData=data.attributes;
        for(const [key,value] of Object.entries(mydata))
        {
          console.log(value.open)
          //  this.stock_open_chart_data.push(value.open)
        }
      });
  }


  


}
