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
var tipoDocumento_service_1 = require("../services/tipoDocumento.service");
var personal_service_1 = require("../services/personal.service");
var destinatario_service_1 = require("../services/destinatario.service");
var EnvioComponent = (function () {
    function EnvioComponent(_tramiteService, _tipoDocumentoService, _personalService, _destinatarioService) {
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
        this._destinatarioService = _destinatarioService;
        this.tramitesEnvio = [];
        this.tipoDocumentos = [];
        this.personalByAreas = [];
        this.enviosPresentar = [];
        this.isLoading = false;
        this.errorMessage = '';
        //propiedades de modal
        this.displayDialog = false;
        this.destinatarios = [];
        this.destinatariosPresentar = [];
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
    EnvioComponent.prototype.cargarDatosModal = function () {
        this.displayDialog = true;
        if (this.tipoDocumentos)
            this.getAllTipoDocumentos();
        if (this.personalByAreas)
            this.getAllPersonalByArea(this.codCap);
        if (this.tramiteEnvio.Id > 0) {
            this.headerTitle = 'Editar Documento';
            this.mostrarCtrlEnvio = true;
            this.muestraEnviar = true;
            this.getAllDestinatarioByTram(this.tramiteEnvio.Id);
        }
        else {
            this.headerTitle = 'Nuevo Documento';
            this.mostrarCtrlEnvio = false;
            this.muestraEnviar = false;
        }
    };
    EnvioComponent.prototype.addEmitido = function (codcap) {
        var _this = this;
        this._tramiteService.newTramite()
            .subscribe(function (data) {
            _this.tramiteEnvio = data;
            _this.tramiteEnvio.TramCodCAP = _this.codCap;
            _this.cargarDatosModal();
        }, //lo llamo aqui xq sino le pierde el estado
        function (//lo llamo aqui xq sino le pierde el estado
            err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    EnvioComponent.prototype.editEmitido = function (_trMoid) {
        var _this = this;
        this._tramiteService.getTramiteById(_trMoid)
            .subscribe(function (data) {
            _this.tramiteEnvio = data;
            _this.cargarDatosModal();
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
    EnvioComponent.prototype.getAllPersonalByArea = function (codCap) {
        var _this = this;
        this._personalService.getAllPersonalByArea(codCap)
            .subscribe(function (data) {
            _this.personalByAreas = data;
        }, function (err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    EnvioComponent.prototype.saveEmitido = function () {
        var _this = this;
        this._tramiteService.save(this.tramiteEnvio)
            .subscribe(function (realizar) {
            _this.displayDialog = false;
        }, function (err) {
            console.log(err); // Log errors if any
        });
    };
    EnvioComponent.prototype.onRowSelect = function (event) {
        this.idEnvioPresentar = event.data.Id;
    };
    // en el formulario  de Nuevo y editar Documento
    EnvioComponent.prototype.getAllDestinatarioByTram = function (idTramite) {
        var _this = this;
        this._destinatarioService.getAllDestinatarioByTram(idTramite)
            .subscribe(function (data) {
            _this.destinatarios = data;
            _this.mostrarGrillaDestinatario();
        }, function (err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    EnvioComponent.prototype.mostrarGrillaDestinatario = function () {
        this.destinatariosPresentar = [];
        var _valorDoc = "";
        var _nomDesti = "";
        var _lugarDesti = "";
        var _ambDesti = "";
        var _ambtipo = "";
        for (var _i = 0, _a = this.destinatarios; _i < _a.length; _i++) {
            var destinatario = _a[_i];
            if (destinatario.DestPersoInterno != null) {
                _valorDoc = destinatario.DestPersoInterno;
                _nomDesti = destinatario.nombrecom;
                _lugarDesti = destinatario.nombre;
            }
            else {
                if (destinatario.EnExDNI != null) {
                    _valorDoc = destinatario.EnExDNI;
                    _nomDesti = destinatario.EnExNombre;
                    _lugarDesti = "";
                }
                else {
                    _valorDoc = destinatario.EnExRUC;
                    _nomDesti = destinatario.EnExNombre;
                    _lugarDesti = "";
                }
            }
            if (destinatario.DestAmbito == "0")
                _ambDesti = "Interno";
            else
                _ambDesti = "Externo";
            if (destinatario.DestCopia == true)
                _ambtipo = "Copia";
            else
                _ambtipo = "Original";
            this.destinatariosPresentar.push({
                Id: destinatario.Id, documento: _valorDoc, nombre: _nomDesti, lugar: _lugarDesti, ambito: _ambDesti, tipo: _ambtipo
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
    __metadata("design:paramtypes", [tramite_service_1.TramiteService,
        tipoDocumento_service_1.TipoDocumentoService,
        personal_service_1.PersonalService, destinatario_service_1.DestinatarioService])
], EnvioComponent);
exports.EnvioComponent = EnvioComponent;
//# sourceMappingURL=envio.component.js.map