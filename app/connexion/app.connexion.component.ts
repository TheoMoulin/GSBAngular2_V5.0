import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataService} from '../services/app.service.data';
import {Sha1Service} from '../services/app.service.crypto';
@Component({
  moduleId: module.id,
  selector: 'my-connexion',
  templateUrl: 'app.connexion.html',
  styleUrls: ['app.connexion.css'],

})
export class ConnexionComponent {
   titre : string ="Connexion";
   lblLogin : string ="Login";
   lblMdp : string ="Mot de passe";
   login : string ;
   mdp : string;
   estCache : boolean = true;
   //visiteur : string;  
   lblMessage : string = "";
  
  
  constructor(private router : Router,private dataService : DataService, private sha1Service : Sha1Service){}

  valider():void{
          this.dataService.login(this.login)
                             .subscribe(
                                       (data)=>{this.dataService.ticket = data;
                                                 this.connexion()}
                                      ,(error)=>{this.estCache = false;
                                               this.lblMessage ="erreur de login"; 
                                               }
                                  );
  }
  private  connexion(){        
           let mdpHache : string = this.sha1Service.hash(this.dataService.ticket + this.mdp); 
           this.dataService.connexion(this.login, mdpHache)
                         .subscribe( 
                                      (data)=>{this.dataService.ticket = data;
                                              this.router.navigate(['accueil']);}
                                      ,(error)=>{this.estCache = false;
                                               this.lblMessage += " erreur de mot de passe";}
                                              );
         
    }  
}
   









































































