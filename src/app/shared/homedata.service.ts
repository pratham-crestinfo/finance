import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HomeDataService {
  constructor(private http: HttpClient) {}
  private history_url = 'https://today-in-history.p.rapidapi.com/thisday';
  private history_options = new HttpHeaders({
    'X-RapidAPI-Key': '76e3478958msh3514934cebda9d6p14d4ccjsna7d2e232769f',
    'X-RapidAPI-Host': 'today-in-history.p.rapidapi.com',
  });
  gethistory() {
    return this.http.get<any>(this.history_url, {
      headers: this.history_options,
    });
  }




  private stock_url =
    'https://seeking-alpha.p.rapidapi.com/symbols/get-profile';
  private stock_options = new HttpHeaders({
    'X-RapidAPI-Key': '76e3478958msh3514934cebda9d6p14d4ccjsna7d2e232769f',
    'X-RapidAPI-Host': 'seeking-alpha.p.rapidapi.com',
  });
  getstocks() {
    return this.http.get<any>(this.stock_url, {
      headers: this.stock_options,
      params: { symbols: 'AAPL,TSLA,RELIANCE' },
    });
  }

  // autocomplete
  




}
