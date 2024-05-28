import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { Observable } from 'rxjs';
import { stockservice } from './stock.service';


@Component({
  selector: 'app-stockunit',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './stockunit.component.html',
  styleUrl: './stockunit.component.css',
  providers:[stockservice]
})
export class StockunitComponent implements OnInit {
  constructor(private activeroute: ActivatedRoute, private http: HttpClient) {}
  symbol!: string;
  id!: number;
  stock_open_chart_data:number[]=[];
  num=0;

  ngOnInit() {
    this.activeroute.params.subscribe((params: Params) => {
      this.symbol = params['symbol'];
      console.log(this.symbol);
      console.log();
    });
  }


}
