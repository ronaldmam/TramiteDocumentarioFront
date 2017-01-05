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
require("../rxjs-extensions");
var Rx_1 = require("rxjs/Rx");
//import 'rxjs/add/operator/toPromise';
var TramiteService = (function () {
    function TramiteService(http) {
        this.http = http;
        //private baseUrl: string = 'http://localhost:8081/TramiteDocumentarioJava/rest/tramites/';
        this.baseUrl = 'http://tramite-ronaldmam.rhcloud.com/rest/tramites/';
        //private baseUrl2: string = 'http://localhost:8081/TramiteDocumentarioJava/rest/tramitesmovi/';
        this.baseUrl2 = 'http://tramite-ronaldmam.rhcloud.com/rest/tramitesmovi/';
    }
    TramiteService.prototype.getAllPendiente = function (codcap, id_usuario, recibido, superv) {
        return this.http
            .get(this.baseUrl2 + 'getalltramitemovbyrecibir?codcap=' + codcap + "&id_usuario=" + id_usuario + "&recibido=" + recibido + "&superv=" + superv) //${codcap}&id_usuario=${id_usuario}&recibido=${recibido}&superv=${superv}'
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    TramiteService.prototype.getAllMovimientoTramite = function (_trMoid) {
        return this.http
            .get(this.baseUrl2 + 'getalltramitemovbytramite?trMoid=' + _trMoid)
            .map(function (r) { return r.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    // this could also be a private method of the component class
    TramiteService.prototype.handleError = function (error) {
        // log error
        // could be something more sofisticated
        var errorMsg = error.message; // || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
        console.error(errorMsg);
        // throw an application level error
        return Rx_1.Observable.throw(errorMsg);
    };
    return TramiteService;
}());
TramiteService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TramiteService);
exports.TramiteService = TramiteService;
//# sourceMappingURL=tramite.service.js.map