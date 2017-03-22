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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var app_service_crypto_1 = require("../services/app.service.crypto");
var DataService = (function () {
    function DataService(http, sha1Service) {
        this.http = http;
        this.sha1Service = sha1Service;
        this.urlDomaine = "http://localhost/restGSBsecu";
    }
    DataService.prototype.login = function (loginIn) {
        var url = this.urlDomaine + "/login?login=" + loginIn;
        var req = this.http
            .get(url)
            .map(function (r) { return r.json(); });
        return req;
    };
    DataService.prototype.connexion = function (loginIn, mdpHache) {
        var url = this.urlDomaine + "/connexion?login=" + loginIn + "&mdp=" + mdpHache;
        var req = this.http
            .get(url)
            .map(function (r) { return r.json(); });
        return req;
    };
    DataService.prototype.chargerMedecins = function (nomMedecin) {
        var url = this.urlDomaine + "/medecins?nom=" + nomMedecin + "&ticket=" + this.ticket;
        var req = this.http
            .get(url)
            .map(function (r) { return r.json(); });
        return req;
    };
    DataService.prototype.chargerRapports = function (idMedecin) {
        var url = this.urlDomaine + "/rapports?idMedecin=" + idMedecin + "&ticket=" + this.ticket;
        var req = this.http
            .get(url)
            .map(function (r) { return r.json(); });
        return req;
    };
    DataService.prototype.majMedecin = function (id, adresse, tel, spe) {
        var url = this.urlDomaine + "/majmedecin?idMedecin=" + id + "&adresse=";
        url += adresse + "&tel=" + tel + "&specialite=" + spe + "&ticket=" + this.ticket;
        var req = this.http
            .get(url)
            .map(function (r) { return r.json(); });
        return req;
    };
    DataService.prototype.chargerRapportsAuneDate = function (idVisiteur, date) {
        var url = this.urlDomaine + "/rapports_a_date?idVisiteur=" + idVisiteur + "&date=" + date;
        var req = this.http
            .get(url)
            .map(function (r) { return r.json(); });
        return req;
    };
    DataService.prototype.majRapport = function (idRapport, motif, bilan) {
        var url = this.urlDomaine + "/majrapport?idRapport=" + idRapport + "&motif=";
        url += motif + "&bilan=" + bilan;
        var req = this.http
            .get(url);
        return req;
    };
    DataService.prototype.chargerMedicaments = function (nom) {
        var url = this.urlDomaine + "/medicaments?nom=" + nom;
        var req = this.http
            .get(url)
            .map(function (r) { return r.json(); });
        return req;
    };
    DataService.prototype.enregistrerRapport = function (idVisiteur, idMedecin, motif, date, bilan, lesMedicaments) {
        var url = this.urlDomaine + "/nouveaurapport?idVisiteur=" + idVisiteur + "&motif=";
        url += motif + "&bilan=" + bilan + "&idMedecin=" + idMedecin + "&date=" + date;
        lesMedicaments.forEach(function (med) { url += "&medicaments[" + med.id + "]=" + med.qte; });
        var req = this.http
            .get(url);
        return req;
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, app_service_crypto_1.Sha1Service])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=app.service.data.js.map