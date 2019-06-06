import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import { LoadingController,NavController  } from '@ionic/angular';

import { Router, RouterModule } from '@angular/router';





@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  

})
export class HomePage {

  detailToggle = [];
  objectKeys = Object.keys;
  coins : Object;
  details: Object;
  moedasEscolhidas =[];
  chart =[];
  graficoescolha =1;

  constructor(private _data:DataService, private storage:Storage,public loadingController: LoadingController,private router:Router ){
    //Remover do Storage moedas já selecionadas
    //this.storage.remove('likedCoina');
    
  }

  ionViewWillEnter(){
    this.refreshCoins();
  }

  async refreshCoins(){

    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'bubbles'
      
 
    });


 


      
    loading.present().then(() => {
 
 
   
    

    
    this.storage.get('moedasEscolhidas').then((val) =>{
      //Se valores não tiverem sido setados
      if(!val){
        this.moedasEscolhidas.push('BTC','ETH','LTC','XMR','BTCD','XMR','DASH','IOT');
        this.storage.set('moedasEscolhidas', this.moedasEscolhidas);

        this._data.getCoins(this.moedasEscolhidas)
        .subscribe(res =>{
          this.coins =res;
          loading.dismiss();
 
        })
      }
      // Se valores já tiverem sido setados
      else{
        this.moedasEscolhidas= val;

        this._data.getCoins(this.moedasEscolhidas)
        .subscribe(res =>{
          this.coins =res;
          loading.dismiss();
 
        })
        
      }
    });

  });

  }


  ///Graficos 
  coinDetails(coin,index){
  
   
    //Esconder se já estiver clicado
    if(this.detailToggle[index])
    this.detailToggle[index]= false;
    ///Se clicar em outro fechar o q estiver aberto
    else{
      this.detailToggle.fill(false);

      this._data.getCoin(coin)
      .subscribe(res => {
        this.details = res['DISPLAY'][coin]['USD'];

        this.detailToggle[index] = true;
        
        if(this.graficoescolha==1)
        this._data.getChart(coin)
        .subscribe(res => {
  
          console.log(res);

          let coinHistory = res['Data'].map((a) => (a.close));
          
          setTimeout(()=> {

            this.chart[index] = new Chart('canvas'+index, {

              type: 'line',
              data: {
                labels: coinHistory,
                datasets: [{ 
                    data: coinHistory,
                    
                    backgroundColor:   "#25b7c4",
                    fill: true,
                  }
                ]
              },
              options: {
                
                tooltips: {
                  callbacks: {
                      label: function(tooltipItems, data) {
                          return "$" + tooltipItems.yLabel.toString();
                      }
                    }
                  },
                  responsive: true, 
                  legend: {
                    display: false
                },
                scales: {
                  xAxes: [{
                    display: false
                  }],
                  yAxes: [{
                    display: false,
                    
                  }],
                }
              }
            });
          }, 250);
        
        });

        if(this.graficoescolha==2)

        this._data.getChart2(coin)

        .subscribe(res => {
  
          console.log(res);

          let coinHistory = res['Data'].map((a) => (a.close));
          
          setTimeout(()=> {

            this.chart[index] = new Chart('canvas'+index, {
              type: 'line',
              data: {
                labels: coinHistory,
                datasets: [{ 
                    data: coinHistory,
                    
                    backgroundColor:   "#25b7c4",
                    fill: true,
                  }
                ]
              },
              options: {
                
                tooltips: {
                  callbacks: {
                      label: function(tooltipItems, data) {
                          return "$" + tooltipItems.yLabel.toString();
                      }
                    }
                  },
                  responsive: true, 
                  legend: {
                    display: false
                },
                scales: {
                  xAxes: [{
                    display: false
                  }],
                  yAxes: [{
                    display: false,
                    
                  }],
                }
              }
            });
          }, 250);
        
        });
        if(this.graficoescolha==3)

        this._data.getChart3(coin)
        
        .subscribe(res => {
  
          console.log(res);

          let coinHistory = res['Data'].map((a) => (a.close));
          
          setTimeout(()=> {
            
            this.chart[index] = new Chart('canvas'+index, {
              type: 'line',
              data: {
                labels: coinHistory,
                datasets: [{ 
                    data: coinHistory,
                    
                    backgroundColor:   "#25b7c4",
                    fill: true,
                  }
                ]
              },
              options: {
                
                tooltips: {
                  callbacks: {
                      label: function(tooltipItems, data) {
                          return "$" + tooltipItems.yLabel.toString();
                      }
                    }
                  },
                  responsive: true, 
                  legend: {
                    display: false
                },
                scales: {
                  xAxes: [{
                    display: false
                  }],
                  yAxes: [{
                    display: false,
                    
                  }],
                  
                }
                
              }
            });
          
          }, 250);
        
        });



      });


    }

}
swiped(index){
  this.detailToggle[index] = false;
}

removeCoin(coin){
  this.detailToggle.fill(false);

  this.moedasEscolhidas = this.moedasEscolhidas.filter(function(item){
    return item !== coin
  })
  this.storage.set('moedasEscolhidas', this.moedasEscolhidas);

  setTimeout(()=> {
    this.refreshCoins();
  },300);
}

showSearch(){
  this.router.navigateByUrl('/search');
}
showNoticias(){
  this.router.navigateByUrl('/noticias');
}
showNotfication(){
  this.router.navigateByUrl('/notfication');
}

getChart(index){
 
  this.graficoescolha=1;
  this.refreshCoins();
  this.detailToggle.fill(false);
  
 
  
}
getChart2(){
 
  this.graficoescolha=2;
  this.refreshCoins();
  this.detailToggle.fill(false);
 
  
}
getChart3(){
  this.graficoescolha=3;
  this.refreshCoins();
  this.detailToggle.fill(false);
  
  
  
}

mudarcor(details){
  var changecolor=details.CHANGEPCT24HOUR;
  console.log(changecolor);
if(changecolor>0){
  document.getElementById("Mudanca").style.color = "green";
}if(changecolor<0){
  document.getElementById("Mudanca").style.color = "red";
}
}




  

}
