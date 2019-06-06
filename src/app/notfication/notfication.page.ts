import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import {LocalNotifications, ELocalNotificationTriggerUnit}from '@ionic-native/local-notifications/ngx';
import { Title } from '@angular/platform-browser';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';
import { LoadingController,NavController  } from '@ionic/angular';
import { testUserAgent } from '@ionic/core';





@Component({
  selector: 'app-notfication',
  templateUrl: './notfication.page.html',
  styleUrls: ['./notfication.page.scss'],


})

export class NotficationPage implements OnInit {


  schedule=[];
  detailToggle = [];
  objectKeys = Object.keys;
  coins : Object;
  details: Object;
  moedasEscolhidas =[];
  Acima:"";
  Abaixo:"";
  
  constructor(private router:Router,private plt:Platform,private localNotifications:LocalNotifications,private alertCtrl:AlertController,private _data:DataService, private storage:Storage,public loadingController: LoadingController) {
    this.plt.ready().then(()=>{


      this.localNotifications.on('click').subscribe(res=>{
        console.log('click: ',res);
        let msg= res.data ? res.data.mydata : '';
        this.showAlert(res.title,res.text, msg);

      });

     this.localNotifications.on('trigger').subscribe(res =>{

      console.log('trigger: ',res);

      let msg= res.data ? res.data.mydata : '';
      this.showAlert(res.title,res.text, msg);
      var coin=this.showAlert(res.title,res.text, msg);
      
     })
    
    });
   }

  ngOnInit() {
   
  }

  showSearch(){
    this.router.navigateByUrl('/home');
  }

  scheduleNotification(coin,coins){
    

    
     var teste=(coins[coin].USD);
    console.log(coin+ ' $'+(teste += ''));
    console.log("assets/icon/iconsmoedas/{{coin}}.png");
    this.localNotifications.schedule({
      
      id:2,
      title:'Notificação Agendada',
      icon:'',
      text: (coin+ ' $'+(teste += '')) ,
      
      trigger:{in:5,unit:ELocalNotificationTriggerUnit.SECOND}
    })

  }
  cancelarscheduleNotification(coin){
    this.localNotifications.cancel(2);
      
    
    this.alertCtrl.create({
      
      message:'Notificação Agendada Cancelada',
      buttons:['OK']
    }).then(alert=>alert.present());
      
      
  }

  

  showAlert(header, sub, msg){

    this.alertCtrl.create({

      header:header,
      subHeader: sub,
      message:msg,
      buttons:['OK']
    }).then(alert=>alert.present());

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
  
   notificationDiaria(coin,coins) {
   var notificationDiariaid=1;
    
    let alert =this.alertCtrl.create({
      header:'Notificação Diaria',
      subHeader: 'Escolha Horario para receber a notificação',
     inputs:[
     {
      name:'AlertaAbaixo',
      placeholder:'Alerta valores abaixo de:',
      type:'time',
     }],
     buttons:[{
       text:'Confirmar',
       handler:data =>{
        console.log( 'Alerta Abaixo:'+data.AlertaAbaixo)
       
       this.Abaixo=data.AlertaAbaixo;
       var str = this.Abaixo;
       
       
       var ultimo=(str.slice(-2));     // returns 'nu.' last two
       var integer = parseInt(ultimo, 10);
       // console.log(str.slice(3, -7)); // returns 'name is'
      var primeiro=(str.slice(0, -3));  
      var integer2 = parseInt(primeiro, 10);
       var teste=(coins[coin].USD);
       console.log(integer2);
       console.log(integer);
      console.log(coin+ ' $'+(teste += ''));
      console.log("assets/icon/iconsmoedas/{{coin}}.png");
      //var d = new Date(2019, 3, 19, 11, 08);
      this.localNotifications.schedule({
        
        id:2,
        title:'Notificação Agendada',
        icon:'file://assets/icon/iconsmoedas/'+coin+'.png',


        text: (coin+ ' $'+(coins[coin].USD)) ,
        trigger:{
          every:{hour:integer2,minute:integer,second: 15 }, count: 1 
        }

      
       
      })
      
      
       }
     },{
       text:'Cancelar',
       role:'cancel',
       handler:data=>{
         console.log('Cancel Clicked...')
       }
     }]

      
    })
    .then(alert=>alert.present());
   
      
    
  }
  
  notificationPorHora(coin,coins) {
    var notificationHora=50;
    var confirmar=1;
    var numero;
     let alert =this.alertCtrl.create({
       header:'Notificação por Hora',
       subHeader: 'Receber notificação a cada hora',
     
      buttons:[{
        text:'Confirmar',
        handler:data =>{
         
        
        

        var teste=(coins[coin].USD);
        
       console.log(coin+ ' $'+(coins[coin].USD));
       console.log(numero);
       

       
       this.refreshCoins();
       
              
       this._data.getCoin(coin)
       .subscribe(res => {
         this.details = res['DISPLAY'][coin]['USD'];
         console.log(coin+' '+this.details['PRICE']);
       this.localNotifications.schedule({
         
         id:2,
         title:'Notificação por Hora',
         icon:'file://assets/icon/iconsmoedas/'+coin+'.png',

         text: (coin+' '+this.details['PRICE']) ,
         trigger:{every:ELocalNotificationTriggerUnit.HOUR},
         
        })
        
       });

       this.localNotifications.on('trigger').subscribe(res =>{
       
          this._data.getCoin(coin)
          .subscribe(res => {
            this.details = res['DISPLAY'][coin]['USD'];
            console.log(coin+' '+this.details['PRICE']);
            this.localNotifications.update({
              
              id:2,
              title:'Notificação por Hora',
              icon:'file://assets/icon/iconsmoedas/'+coin+'.png',
              text: (coin+' '+this.details['PRICE']) ,
              
      
            
             
            })
          })
      
      })
       
       console.log(coin+ ' $'+(coins[coin].USD));
      
  
       

         
        
       
         
         
       
       
 
        }
      },{
        text:'Cancelar',
        role:'cancel',
        handler:data=>{
          console.log('Cancel Clicked...')
        }
      }]
 
       
     })
     .then(alert=>alert.present());
    
       
     
   }
  notificationagendada(coin,coins) {
    var confirmar=1;
    var notificationAged=70;
     let alert =this.alertCtrl.create({
       header:'Agendar',
       subHeader: 'Escolha Data e hora',
      inputs:[
       {
       name:'AlertaAcima',
       placeholder:'Alerta valores acima de:',
       type:'date',
      },{
       name:'AlertaAbaixo',
       placeholder:'Alerta valores abaixo de:',
       type:'time',
      }],
      buttons:[{
        text:'Confirmar',
        handler:data =>{
         console.log('Alerta Acima:'+data.AlertaAcima+ 'Alerta Abaixo:'+data.AlertaAbaixo)
        this.Acima=data.AlertaAcima;
        this.Abaixo=data.AlertaAbaixo;
        var str = this.Abaixo;
        confirmar=2;
        console.log(confirmar);
        console.log(this.Acima ,this.Abaixo);
        var ultimo=(str.slice(-2));     // returns 'nu.' last two
        var integer = parseInt(ultimo, 10);
        // console.log(str.slice(3, -7)); // returns 'name is'
       var primeiro=(str.slice(0, -3));  
       var integer2 = parseInt(primeiro, 10);
        var teste=(coins[coin].USD);
        console.log(integer2);
        console.log(integer);
       console.log(coin+ ' $'+(teste += ''));
       console.log("assets/icon/iconsmoedas/{{coin}}.png");
       //var d = new Date(2019, 3, 19, 11, 08);
       this.localNotifications.schedule({
         
         id:notificationAged,
         title:'Notificação Agendada',
         icon:'file://assets/icon/iconsmoedas/'+coin+'.png',

         text: (coin+ ' $'+(teste += '')) ,
         trigger:{
           every:{hour:integer2,minute:integer,second: 15 }, count: 1 
         }
 
       
        
       })
 
        }
      },{
        text:'Cancelar',
        role:'cancel',
        handler:data=>{
          console.log('Cancel Clicked...')
        }
      }]
 
       
     })
     .then(alert=>alert.present());
    
       
     
   }
   notificationValor(coin,coins) {
     
    var confirmar=1;
    var notificationAged=70;
     let alert =this.alertCtrl.create({
       header:'Agendar',
       subHeader: 'Escolha Valores',
      inputs:[
       {
       name:'AlertaAcima',
       placeholder:'Alerta valores acima de:',
       
      },{
       name:'AlertaAbaixo',
       placeholder:'Alerta valores abaixo de:',
       
      }],
      buttons:[{
        text:'Confirmar',
        handler:data =>{
         console.log('Alerta Acima:'+data.AlertaAcima+ 'Alerta Abaixo:'+data.AlertaAbaixo)
        this.Acima=data.AlertaAcima;
        this.Abaixo=data.AlertaAbaixo;
        var str = this.Abaixo;
        confirmar=2;
        console.log(confirmar);
        console.log(this.Acima ,this.Abaixo);
        var ultimo=(str.slice(-2));    
        var integer = parseInt(ultimo, 10);
        
       var primeiro=(str.slice(0, -3));  
       var integer2 = parseInt(primeiro, 10);
        var teste=(coins[coin].USD);
        console.log(integer2);
        console.log(integer);
       console.log(coin+ ' $'+(teste += ''));
       
       console.log(teste );
       console.log(this.Acima );
       console.log(this.Abaixo );
       var controle=true;
       var cont=0;
       var cont2=0;
          
          setInterval(() => {
                
          this._data.getCoin(coin)
          .subscribe(res => {
            this.details = res['DISPLAY'][coin]['USD'];
            console.log(coin+' '+this.details['PRICE']);
            var tes=this.details['PRICE'];
            var test2f=tes.substr(2);
            var  tes3= parseFloat(test2f.replace(/,/g, ''));
            
            if(cont<1){
            if(tes3>parseFloat(this.Acima)){
              console.log("Verdade Valor acima");
              console.log((tes3+" +"+parseFloat(this.Acima)));
              console.log("Encerra");
             
                cont++;
              
              this.localNotifications.schedule({
      
                id:2,
                title:'Notificação Por valor cotação chegou acima do valor selecionado',
                icon:'file://assets/icon/iconsmoedas/'+coin+'.png',

                text: (coin+ ' $'+(teste += '')) ,
                
                trigger:{in:5,unit:ELocalNotificationTriggerUnit.SECOND}
              })
            }
            } if(tes3<parseFloat(this.Abaixo)){
              if(cont2<1){
              console.log("Verdade Valor Abaixo Abaixo");
              console.log((tes3+" +"+parseFloat(this.Abaixo)));
              clearInterval();
              cont2++;
              this.localNotifications.schedule({
      
                id:2,
                title:'Notificação Por valor cotação chegou abaixo do valor selecionado',
                icon:'file://assets/icon/iconsmoedas/'+coin+'.png',

                text: (coin+ ' $'+(teste += '')) ,
                
                trigger:{in:5,unit:ELocalNotificationTriggerUnit.SECOND}
              })
            
           
          //console.log(this.Acima );
          //console.log(this.Abaixo );
          //console.log(tes);
          //console.log(test2f);
          //console.log((tes3+" +"+parseFloat(this.Acima)));
            }}
        });
       
       }, 5000);
      
      
      
    
 
        }
      },{
        text:'Cancelar',
        role:'cancel',
        handler:data=>{
          console.log('Cancel Clicked...')
        }
      }]
 
       
     })
     .then(alert=>alert.present());
    
       
     
   }
   

    

    

}
  


