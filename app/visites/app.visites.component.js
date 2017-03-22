"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var app_service_data_1 = require("../services/app.service.data");
var VisitesComponent = (function () {
    function VisitesComponent(dataService) {
        this.dataService = dataService;
        this.gestionMajRapport = false;
        this.gestionAjoutRapport = false;
        this.medicamentsSelect = new Array();
        this.qtes = [1, 2, 3, 4, 5];
        this.afficherRapport = false;
        this.afficherMessage = false;
        this.lblMessage = "";
        this.messageEnregistrement = "";
        this.typeMessage = "";
    }
    VisitesComponent.prototype.chargerMedecins = function () {
        var _this = this;
        this.dataService.chargerMedecins(this.nomMedecin)
            .subscribe(function (data) {
            _this.lesMedecins = data;
        }, function (error) { });
    };
    VisitesComponent.prototype.selectionnerMedecin = function (med) {
        this.medecin = med;
        this.nomMedecin = med.nom + " " + med.prenom + "; dep : " + med.departement;
        this.lesMedecins = null;
    };
    VisitesComponent.prototype.modifierRapport = function () {
        this.gestionMajRapport = true;
        this.gestionAjoutRapport = false;
        this.afficherRapport = false;
    };
    VisitesComponent.prototype.chargerVisites = function () {
        var _this = this;
        this.titre = "Médecins visité(s) ce jour :";
        this.dataService.chargerRapportsAuneDate(this.dataService.visiteur.id, this.dateVisite)
            .subscribe(function (data) {
            _this.lesRapports = data;
        }, function (error) { });
    };
    VisitesComponent.prototype.selectionner = function (rapport) {
        this.rapport = rapport;
        this.afficherRapport = true;
    };
    VisitesComponent.prototype.valider = function () {
        var _this = this;
        this.afficherMessage = true;
        console.log(this.rapport);
        this.dataService.majRapport(this.rapport.idRapport, this.rapport.motif, this.rapport.bilan)
            .subscribe(function (data) {
            _this.lblMessage = "Mise à jour effectuée";
        }, function (error) { _this.lblMessage = "Merci de réessayer plus tard"; });
    };
    VisitesComponent.prototype.initNouveauRapport = function () {
        this.nomMedecin = "";
        this.bilan = "";
        this.motif = "";
        this.dateNouveauRapport = null;
        this.nomMedicament = "";
        this.qteSelect = 1;
    };
    VisitesComponent.prototype.ajouterRapport = function () {
        this.initNouveauRapport();
        this.gestionAjoutRapport = true;
        this.gestionMajRapport = false;
    };
    VisitesComponent.prototype.chargerMedicaments = function () {
        var _this = this;
        this.dataService.chargerMedicaments(this.nomMedicament)
            .subscribe(function (data) {
            _this.lesMedicaments
                = data;
        }, function (error) { });
    };
    VisitesComponent.prototype.choisirMedicament = function (medicament) {
        this.medicamentSelect = medicament;
        this.nomMedicament = medicament.nomCommercial;
        this.lesMedicaments = null;
    };
    VisitesComponent.prototype.ajouter = function () {
        this.medicamentsSelect.push({ id: this.medicamentSelect.id, nom: this.medicamentSelect.nomCommercial, qte: this.qteSelect });
        this.nomMedicament = "";
    };
    VisitesComponent.prototype.retirer = function () {
        this.medicamentsSelect.pop();
    };
    VisitesComponent.prototype.enregistrer = function () {
        var _this = this;
        console.log(this.dateNouveauRapport);
        console.log(this.medicamentsSelect);
        this.dataService.enregistrerRapport(this.dataService.visiteur.id, this.medecin.id, this.motif, this.dateNouveauRapport, this.bilan, this.medicamentsSelect)
            .subscribe(function (data) {
            _this.typeMessage = "alert alert-success";
            _this.messageEnregistrement = "Enregistrement effectué";
        }, function (error) {
            _this.typeMessage = "alert alert-danger";
            _this.messageEnregistrement = "Merci de réessayer plus tard";
        });
    };
    return VisitesComponent;
}());
VisitesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-visites',
        templateUrl: 'app.visites.html'
    }),
    __metadata("design:paramtypes", [app_service_data_1.DataService])
], VisitesComponent);
exports.VisitesComponent = VisitesComponent;
//# sourceMappingURL=app.visites.component.js.map