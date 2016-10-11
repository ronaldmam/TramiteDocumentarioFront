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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var TramiteService = (function () {
    function TramiteService(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:8081/TramiteDocumentarioJava/rest/tramites/';
        this.baseUrl2 = 'http://localhost:8081/TramiteDocumentarioJava/rest/tramitesmovi/';
    }
    TramiteService.prototype.getAllPendiente = function (codcap, id_usuario) {
        return this.http
            .get(this.baseUrl2 + 'getalltramitemovbyrecibir?codcap=${codcap}&id_usuario=${id_usuario}')
            .map(function (r) { return r.json().data; });
    };
    TramiteService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TramiteService);
    return TramiteService;
}());
exports.TramiteService = TramiteService;
//# sourceMappingURL=tramite.service.js.map