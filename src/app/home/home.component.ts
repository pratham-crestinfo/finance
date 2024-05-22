import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomeDataService } from '../shared/homedata.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private homeservice: HomeDataService,private http:HttpClient,private router:Router) {}
  ngOnInit() {
    // this.homeservice.gethistory().subscribe((data) => console.log(data));
    // this.homeservice.getstocks().subscribe((data)=>console.log(data));
   
  }
  private ac_url= 'https://seeking-alpha.p.rapidapi.com/auto-complete'
  private ac_params={term: 'rel'}
  private ac_headers=new HttpHeaders({
    'X-RapidAPI-Key': '76e3478958msh3514934cebda9d6p14d4ccjsna7d2e232769f',
    'X-RapidAPI-Host': 'seeking-alpha.p.rapidapi.com'
  }) 
   ac_input:string ='';
   private debounceTimer: any;
    data_suggestion_array:any[]=[];
   onChangeInput()
  {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.http.get<any>(this.ac_url,{headers:this.ac_headers,params:{term:this.ac_input}}).subscribe((data)=>{
        console.log(data);
        this.data_suggestion_array=[];
        for(let i=0;i<data.symbols.length;i++)
          {
              this.data_suggestion_array.push({cont : data.symbols[i].content, id:data.symbols[i].id});
          }
          console.log(this.data_suggestion_array);
      })
    },300);    
  }

  private getbyid_url='https://seeking-alpha.p.rapidapi.com/market/get-realtime-quotes'
  
  private getbyid_headers=new HttpHeaders({
    'X-RapidAPI-Key': '76e3478958msh3514934cebda9d6p14d4ccjsna7d2e232769f',
    'X-RapidAPI-Host': 'seeking-alpha.p.rapidapi.com'
  }) 



  stock_choice(item:number)
  {
    stock_symbol:String;
    this.http.get<any>(this.getbyid_url,{headers:this.getbyid_headers,params:{sa_ids:`${item}`}})
    .subscribe((data)=>{
                        console.log(data);
                        this.router.navigate(['stock',`${item}`,`${data.real_time_quotes[0].symbol}`])
                      });
  }

  // ac_input:string ='';
  // private ac_url= `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.ac_input}&apikey=5XUOOH560D5EOWJA`
  // private ac_params={term: 'rel'}
  // private ac_headers=new HttpHeaders({
  //   'X-RapidAPI-Key': '76e3478958msh3514934cebda9d6p14d4ccjsna7d2e232769f',
  //   'X-RapidAPI-Host': 'seeking-alpha.p.rapidapi.com'
  // }) 
  //  private debounceTimer: any;
  //   data_suggestion_array:any[]=[];
  //  onChangeInput()
  // {
  //   console.log(this.ac_input)
  //   this.http.get<any>(this.ac_url).subscribe((data)=>{console.log(data)})


  //   // clearTimeout(this.debounceTimer);
  //   // this.debounceTimer = setTimeout(() => {
  //   //   this.http.get<any>(this.ac_url).subscribe((data)=>{
  //   //     this.data_suggestion_array=[];
  //   //     for(let i=0;i<data.symbols.length;i++)
  //   //       {
  //   //           this.data_suggestion_array.push(data.symbols[i].content);
  //   //       }
  //   //       console.log(this.data_suggestion_array);
  //   //   })
  //   // },0);    
  // }
}
