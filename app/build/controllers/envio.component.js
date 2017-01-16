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
var tramite_service_1 = require('../services/tramite.service');
var tipoDocumento_service_1 = require('../services/tipoDocumento.service');
var personal_service_1 = require('../services/personal.service');
var EnvioComponent = (function () {
    function EnvioComponent(_tramiteService, _tipoDocumentoService, _personalService) {
        /*  this.columnDefs = [
                    { header: "TramNumero", field: "TramNumero"},
                    { header: "NombreEmisor", field: "NombreEmisor", sortable:"true"},
                    { header: "TramFecha", field: "TramFecha"},
                    { header: "TramAsunto", field: "TramAsunto"},
                    { header: "TiDocAbrevia", field: "TiDocAbrevia"},
                ];*/
        this._tramiteService = _tramiteService;
        this._tipoDocumentoService = _tipoDocumentoService;
        this._personalService = _personalService;
        this.tramitesEnvio = [];
        this.tipoDocumentos = [];
        this.personalByAreas = [];
        this.enviosPresentar = [];
        this.isLoading = false;
        this.errorMessage = '';
        //propiedades de modal
        this.displayDialog = false;
    }
    EnvioComponent.prototype.ngOnInit = function () {
        this.codCap = '4004';
        this.getAllEmitidos(this.codCap);
        //this.mostrarGrillaEmitido() ;
    };
    EnvioComponent.prototype.getAllEmitidos = function (codcap) {
        var _this = this;
        this._tramiteService.getAllEmitidos(codcap)
            .subscribe(function (data) {
            _this.tramitesEnvio = data;
            _this.mostrarGrillaEmitido();
        }, //lo llamo aqui xq sino le pierde el estado
        function (//lo llamo aqui xq sino le pierde el estado
            err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    EnvioComponent.prototype.mostrarGrillaEmitido = function () {
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
    EnvioComponent.prototype.addEmitido = function (codcap) {
        var _this = this;
        this._tramiteService.newTramite()
            .subscribe(function (data) {
            _this.tramiteEnvio = data;
            _this.tramiteEnvio.TramCodCAP = _this.codCap;
            _this.displayDialog = true;
            _this.getAllTipoDocumentos();
            _this.getAllPersonalByArea();
            if (_this.tramiteEnvio.Id > 0) {
                _this.headerTitle = 'Editar Documento';
                _this.mostrarCtrlEnvio = true;
                _this.muestraEnviar = true;
            }
            else {
                _this.headerTitle = 'Nuevo Documento';
                _this.mostrarCtrlEnvio = false;
                _this.muestraEnviar = false;
            }
        }, //lo llamo aqui xq sino le pierde el estado
        function (//lo llamo aqui xq sino le pierde el estado
            err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    EnvioComponent.prototype.getAllTipoDocumentos = function () {
        var _this = this;
        this._tipoDocumentoService.getAllTipoDocumentos()
            .subscribe(function (data) {
            _this.tipoDocumentos = data;
        }, function (err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    EnvioComponent.prototype.getAllPersonalByArea = function () {
        var _this = this;
        this._personalService.getAllPersonalByArea(this.codCap)
            .subscribe(function (data) {
            _this.personalByAreas = data;
        }, function (err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    EnvioComponent = __decorate([
        core_1.Component({
            selector: 'envio',
            templateUrl: 'app/views/envio.component.html'
        }), 
        __metadata('design:paramtypes', [tramite_service_1.TramiteService, tipoDocumento_service_1.TipoDocumentoService, personal_service_1.PersonalService])
    ], EnvioComponent);
    return EnvioComponent;
}());
exports.EnvioComponent = EnvioComponent;
//# sourceMappingURL=envio.component.js.map