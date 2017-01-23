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
var Rx_1 = require('rxjs/Rx');
var DestinatarioService = (function () {
    function DestinatarioService(http) {
        this.http = http;
        this.baseUrl = 'http://tramite-ronaldmam.rhcloud.com/rest/destinatario/';
    }
    DestinatarioService.prototype.getAllDestinatarioByTram = function (tramId) {
        return this.http
            .get(this.baseUrl + "getalldestinatariobytram?tramid=" + tramId)
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    // delete Destinatario
    DestinatarioService.prototype.deleteDestinatario = function (id) {
        return this.http.delete(this.baseUrl + "delete/" + id) // ...using post request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    DestinatarioService.prototype.save = function (_destinatario) {
        return this.http.post(this.baseUrl + "save", _destinatario) // ...using post request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    // this could also be a private method of the component class
    DestinatarioService.prototype.handleError = function (error) {
        // log error
        // could be something more sofisticated
        var errorMsg = error.message; // || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
        console.error(errorMsg);
        // throw an application level error
        return Rx_1.Observable.throw(errorMsg);
    };
    DestinatarioService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DestinatarioService);
    return DestinatarioService;
}());
exports.DestinatarioService = DestinatarioService;
//# sourceMappingURL=destinatario.service.js.map