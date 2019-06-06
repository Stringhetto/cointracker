import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { LoadedRouterConfig } from '@angular/router/src/config';
import { Router, RouterModule } from '@angular/router';

@Component({

  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],

})
export class SearchPage implements OnInit {

  objectKeys = Object.keys;
  
  moedasEscolhidas =[];
  liked=[];
  raw =[];
  todasMoedas:any;

  constructor(private _data:DataService, private storage:Storage,public loadingController: LoadingController,private router:Router){
  
    
  }

  

  //ngOnInit() {
  //}

  async ngOnInit() {
    const loading = await this.loadingController.create({

      message: 'Carregando...',
      spinner: 'bubbles'
 
    });


 


      //Mostrar lista com todas criptomoedas 
    loading.present().then(() => {

      this.storage.get('moedasEscolhidas').then((val) =>{
        this.moedasEscolhidas= val;
      });
      this._data.todasMoedas()
      .subscribe(res =>{
        console.log(res);
        this.raw =res['Data'];
        this.todasMoedas = res['Data'];

        loading.dismiss();
        this.storage.get('moedasEscolhidas').then((val) =>{
          this.liked =val;
        })
      })

    });

    }

    //Adiciona moeda para lista principal
    addCoin(coin) {
      this.moedasEscolhidas.push(coin);
      this.storage.set('moedasEscolhidas',this.moedasEscolhidas);
    }
    //Buscar pela siglas da criptomoeda
    //Buscar  criptomoeda q bata com o q o usuario digitou
    searchCoins(ev: any) {

      let val = ev.target.value;
  
      this.todasMoedas = this.raw;
      //valor digitado não for vazio
      if (val && val.trim() != '') {
        
        const filtered = Object.keys(this.todasMoedas)
          .filter(key => val.toUpperCase().includes(key))
          .reduce((obj,key) => {
            obj[key] = this.todasMoedas[key];
            return obj;
          }, {});
  
        this.todasMoedas = filtered;
  
      }
    }
    showHome(){
      this.router.navigateByUrl('/home');
    }
  
  }




