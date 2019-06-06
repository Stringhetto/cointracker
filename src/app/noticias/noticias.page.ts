import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import { LoadingController,NavController  } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  post: any;
  currentArticle: any;
  newsEscolha =2;

  constructor(private _data:DataService, private storage:Storage,public loadingController: LoadingController,private router:Router ,private inAppBrowser: InAppBrowser){
    //Remover do Storage moedas já selecionadas
    //this.storage.remove('likedCoina');
    
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'bubbles'
 
    });

    loading.present().then(() => {

      if(this.newsEscolha==1)
    this._data.getPosts().subscribe(res => {
      console.log(res);
      this.post=res;
      loading.dismiss();
    });

    if(this.newsEscolha==2)
    this._data.getPosts1().subscribe(res => {
      console.log(res);
      this.post=res;
      loading.dismiss();
    });
    
  });
  }

  getNews(index){
    this.newsEscolha=1;
    this.ngOnInit();
    
    
   
    
  }
  getNews2(){
    this.newsEscolha=2;
    this.ngOnInit();
   
   
    
  }
  showSearch(){
    this.router.navigateByUrl('/home');
  }

  opeWebPage(article){
    const browser = this.inAppBrowser.create(article.url,'_system')
  }
  }
  


