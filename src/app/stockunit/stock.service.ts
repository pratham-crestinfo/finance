import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Params } from "@angular/router";


interface myparamsType{
    symbol:string,
    period:string
}





@Injectable()
export class stockservice{
    constructor(private http:HttpClient,private activeroute:ActivatedRoute){}
  private chart_url = 'https://seeking-alpha.p.rapidapi.com/symbols/get-chart';

  private chart_headers = new HttpHeaders({
    'X-RapidAPI-Key': '76e3478958msh3514934cebda9d6p14d4ccjsna7d2e232769f',
    'X-RapidAPI-Host': 'seeking-alpha.p.rapidapi.com',
  });


  get_chart_data(mysymbol:string):Observable<any>{
    return this.http
      .get<any>(this.chart_url, {
        headers: this.chart_headers,
        params: {
            symbol:mysymbol,
            period:'1Y'
        }
      })
  }
}