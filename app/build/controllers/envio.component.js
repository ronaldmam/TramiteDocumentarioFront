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
var tramite_service_1 = require("../services/tramite.service");
var EnvioComponent = (function () {
    function EnvioComponent(_tramiteService) {
        /*  this.columnDefs = [
                  { header: "TramNumero", field: "TramNumero"},
                  { header: "NombreEmisor", field: "NombreEmisor", sortable:"true"},
                  { header: "TramFecha", field: "TramFecha"},
                  { header: "TramAsunto", field: "TramAsunto"},
                  { header: "TiDocAbrevia", field: "TiDocAbrevia"},
              ];*/
        this._tramiteService = _tramiteService;
        this.tramitesEnvio = [];
        this.enviosPresentar = [];
        this.isLoading = true;
        this.errorMessage = '';
    }
    EnvioComponent.prototype.getAllEmitidos = function (codcap) {
        var _this = this;
        this._tramiteService.getAllEmitidos(codcap)
            .subscribe(function (data) {
            _this.tramitesEnvio = data;
            _this.mostrarGrillaEnvio();
        }, //lo llamo aqui xq sino le pierde el estado
        function (//lo llamo aqui xq sino le pierde el estado
            err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    EnvioComponent.prototype.ngOnInit = function () {
        this.codCap = '4004';
        this.getAllEmitidos(this.codCap);
        //this.mostrarGrillaEnvio() ;
    };
    EnvioComponent.prototype.mostrarGrillaEnvio = function () {
        this.enviosPresentar = [];
        var _valorDoc = "";
        for (var _i = 0, _a = this.tramitesEnvio; _i < _a.length; _i++) {
            var envio = _a[_i];
            if (envio.TramCodEmisor != null)
                _valorDoc = envio.nombrecom;
            else
                _valorDoc = envio.EnExNombre;
            this.enviosPresentar.push({
                Id: envio.Id, TramNumero: envio.TramNumero, NombreEmisor: _valorDoc,
                TramFecha: envio.TramFecha, TramAsunto: envio.TramAsunto,
                TiDocAbrevia: envio.TiDocAbrevia
            });
        }
    };
    return EnvioComponent;
}());
EnvioComponent = __decorate([
    core_1.Component({
        selector: 'envio',
        templateUrl: 'app/views/envio.component.html'
    }),
    __metadata("design:paramtypes", [tramite_service_1.TramiteService])
], EnvioComponent);
exports.EnvioComponent = EnvioComponent;
//# sourceMappingURL=envio.component.js.map