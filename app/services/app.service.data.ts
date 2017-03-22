import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import{ Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Sha1Service} from '../services/app.service.crypto';

@Injectable()
export class DataService {
    private  urlDomaine :  string = "http://localhost/restGSBsecu";
    visiteur : any;
    ticket : string;
    constructor(private http: Http, private sha1Service : Sha1Service) {}

   
    public login(loginIn : string) : Observable<string>{
        let url :string = this.urlDomaine + "/login?login=" + loginIn;
        let req = this.http
                    .get(url)
                    .map((r: Response)=>r.json());
        return req;
    }
    public connexion( loginIn : string, mdpHache : string ) : Observable<string> {
        let url :string = this.urlDomaine + "/connexion?login=" + loginIn + "&mdp=" + mdpHache;
        let req = this.http
                    .get(url)
                    .map((r: Response)=>r.json());
        return req;
    }
    
    public chargerMedecins(nomMedecin : string) : Observable<string[]>{
        let url : string =  this.urlDomaine + "/medecins?nom=" + nomMedecin + "&ticket=" + this.ticket;
        let req = this.http
                    .get(url)
                    .map((r: Response)=>r.json());
        return req;

    }

    public chargerRapports(idMedecin : Number ): Observable<string[]>{
       let url : string =  this.urlDomaine + "/rapports?idMedecin=" + idMedecin + "&ticket=" + this.ticket;
       let req = this.http
                    .get(url)
                    .map((r: Response)=>r.json());
        return req;
    }
  
    public majMedecin(id : string ,adresse : string, tel :string, spe : string): Observable<string> {
              let url : string =  this.urlDomaine + "/majmedecin?idMedecin=" + id + "&adresse=";
                  url += adresse + "&tel=" + tel +"&specialite=" + spe + "&ticket=" + this.ticket;
              let req = this.http
                         .get(url)
                         .map((r: Response)=>r.json());
           return req;
    }
    public chargerRapportsAuneDate(idVisiteur:string, date : Date ): Observable<string[]>{
            let url : string =  this.urlDomaine + "/rapports_a_date?idVisiteur=" + idVisiteur + "&date=" + date;
            let req = this.http
                    .get(url)
                    .map((r: Response)=>r.json());
            return req;    

    }
    public majRapport(idRapport : string, motif : string, bilan : string){
            let url : string =  this.urlDomaine + "/majrapport?idRapport=" + idRapport + "&motif=";
                  url += motif + "&bilan=" + bilan;
              let req = this.http
                         .get(url)
           return req;
    }
    public chargerMedicaments(nom: string){
            let url : string =  this.urlDomaine + "/medicaments?nom=" + nom;
       let req = this.http
                    .get(url)
                    .map((r: Response)=>r.json());
        return req;
    }
    public enregistrerRapport(idVisiteur : string, idMedecin : string, motif : string,date : Date, bilan : string,lesMedicaments : Array<any> ){
        let url : string =  this.urlDomaine + "/nouveaurapport?idVisiteur=" + idVisiteur + "&motif=";
            url += motif + "&bilan=" + bilan + "&idMedecin=" + idMedecin +"&date="+ date;
            lesMedicaments.forEach((med)=>{url+="&medicaments["+med.id+"]="+ med.qte;});
                let req = this.http
                         .get(url);
           return req;

    }

}   
    


