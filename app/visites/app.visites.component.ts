import { Component } from '@angular/core';
import { DataService} from '../services/app.service.data';
import{ Observable } from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'my-visites',
  templateUrl: 'app.visites.html'
  
})
export class VisitesComponent {
  nomMedecin : string;
  lesMedecins : Array<any>; 
  medecin : any;
  gestionMajRapport : boolean = false;
  gestionAjoutRapport : boolean = false;
  dateVisite : Date;
  dateNouveauRapport :Date;
  nomMedicament : string;
  lesMedicaments : Array<any>; 
  medicamentsSelect : Array<any> = new Array();
  medicamentSelect : any;
  lesRapports : Array<any>;
  qtes : Array<number> = [1,2,3,4,5];
  qteSelect :number;
  titre : string; 
  rapport : any;
  motif : string;
  bilan : string;
  afficherRapport : boolean = false;
 messageMAJ : string ="";
  messageEnregistrement : string =""
  typeMessage : string ="";
  constructor(private dataService : DataService){

  }
  chargerMedecins(){
     this.dataService.chargerMedecins(this.nomMedecin)
                                  .subscribe( 
                                      (data)=>{this.lesMedecins = data;
                                         }
                                      ,(error)=>{}
                                              );
  }
  selectionnerMedecin(med) : void{
        this.medecin = med;
        this.nomMedecin = med.nom + " " + med.prenom + "; dep : " + med.departement;
        this.lesMedecins = null;
  }
  modifierRapport(): void{
        this.gestionMajRapport = true;
       this.gestionAjoutRapport = false;
       this.afficherRapport = false;
       this.typeMessage="";
       this.lesRapports = null;
       this.dateVisite = null;
       this.messageMAJ ="";
  }
  chargerVisites() : void{
       this.titre = "Médecins visité(s) ce jour :";
       this.dataService.chargerRapportsAuneDate(this.dataService.visiteur.id, this.dateVisite)
                                  .subscribe( 
                                      (data)=>{this.lesRapports = data;
                                         }
                                      ,(error)=>{}
                                             );
  } 
  selectionner(rapport){
       this.rapport = rapport;
       this.afficherRapport = true;
  }
  valider(): void{
       console.log(this.rapport);
       this.dataService.majRapport(this.rapport.idRapport,this.rapport.motif,this.rapport.bilan)
                                  .subscribe( 
                                      (data)=>{ this.typeMessage ="alert alert-success";
                                              this.messageMAJ= "Mise à jour effectuée";
                                         }
                                      ,(error)=>{this.messageMAJ= "Merci de réessayer plus tard";
                                             this.typeMessage ="alert alert-danger"}
                                              );
   }
   initNouveauRapport(){
       this.nomMedecin ="";
       this.bilan="";
       this.motif="";
       this.dateNouveauRapport = null;
       this.nomMedicament = "";
       this.qteSelect = 1;
       this.typeMessage="";
       this.messageEnregistrement ="";
       

   }
   ajouterRapport(): void{
     this.initNouveauRapport();
      this.gestionAjoutRapport = true;
      this.gestionMajRapport = false;

   }
   chargerMedicaments(){
      this.dataService.chargerMedicaments(this.nomMedicament)
          .subscribe( 
                     (data)=>{this.lesMedicaments 
                       = data;
                                         }
                                      ,(error)=>{}
                                             );

   }
   choisirMedicament(medicament : any){
      this.medicamentSelect = medicament;
      this.nomMedicament = medicament.nomCommercial;
    
      this.lesMedicaments = null;
   }
   ajouter(): void{
      this.medicamentsSelect.push({id : this.medicamentSelect.id, nom : 
        this.medicamentSelect.nomCommercial, qte : this.qteSelect});
      this.nomMedicament ="";
   }
   retirer() : void{
      this.medicamentsSelect.pop();
   }
   enregistrer(): void{
     console.log(this.dateNouveauRapport);
      console.log(this.medicamentsSelect);
      this.dataService.enregistrerRapport(this.dataService.visiteur.id,this.medecin.id,this.motif,this.dateNouveauRapport, this.bilan,this.medicamentsSelect )
               .subscribe( 
                     (data)=>{ this.typeMessage ="alert alert-success";
                               this.messageEnregistrement= "Enregistrement effectué";}
                              ,(error)=>{
                                this.typeMessage ="alert alert-danger"
                                this.messageEnregistrement= "Merci de réessayer plus tard";}
                        );
   }
  
}
