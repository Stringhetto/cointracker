import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  result:any;

  constructor(public _http: HttpClient) { 
    
  }
  getCoins(coins){

    let coinlist ='';

    coinlist = coins.join();
    return this._http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms='+coinlist+'&tsyms=USD')
    .map(result => this.result= result);
  }

  getCoin(coin){
    return this._http.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms='+coin+'&tsyms=USD')
    .map(result => this.result= result);
  }

  getChart(coin){
    return this._http.get('https://min-api.cryptocompare.com/data/histoday?fsym='+coin+'&tsym=USD&limit=7&aggregate=1')
    .map(result => this.result= result);
  }

  getChart2(coin) {
    return this._http.get("https://min-api.cryptocompare.com/data/histoday?fsym="+coin+"&tsym=USD&limit=30&aggregate=1")
    .map(result => this.result = result);
  }
  getChart3(coin) {
    return this._http.get("https://min-api.cryptocompare.com/data/histoday?fsym="+coin+"&tsym=USD&limit=300&aggregate=1")
    .map(result => this.result = result);
  }

  todasMoedas(){
    return this._http.get('https://min-api.cryptocompare.com/data/all/coinlist')
    .map(result => this.result= result);
  }

  getPosts1(){
    return this._http.get("https://newsapi.org/v2/everything?sources=crypto-coins-news&pageSize=100&apiKey=670f2bdf939c4d109a9cddb15d3e1585")
    .map(result => this.result = result);
  }

  getPosts(){
    return this._http.get("https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&language=pt&pageSize=100&apiKey=670f2bdf939c4d109a9cddb15d3e1585")
    .map(result => this.result = result);
  }
}
