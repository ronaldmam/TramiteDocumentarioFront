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
var BandejaComponent = (function () {
    function BandejaComponent(_tramiteService) {
        this._tramiteService = _tramiteService;
        this.tramitesPendiente = [];
        this.pendientesPresentar = [];
        this.pendientesPresentar2 = [];
        this.errorMessage = '';
        this.isLoading = true;
        this.bandejas = [
            { value: 0, display: 'Pendiente' },
            { value: 1, display: 'Recibido' }
        ];
    }
    BandejaComponent.prototype.getAllPendiente = function (codcap, id_usuario, recibido, superv) {
        var _this = this;
        this._tramiteService.getAllPendiente(codcap, id_usuario, recibido, superv)
            .subscribe(function (data) {
            _this.tramitesPendiente = data;
            _this.mostrarGrillaPendiente();
        }, //lo llamo aqui xq sino le pierde el estado
        function (//lo llamo aqui xq sino le pierde el estado
            err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    BandejaComponent.prototype.ngOnInit = function () {
        this.idCap = '4004';
        this.idUsuario = '00424113'; // parihuana Jose Luis '04742754' 
        this.supervisor = 1;
        this.bandeja = this.bandejas[0].value;
        this.recibido = this.bandeja;
        this.getAllPendiente(this.idCap, this.idUsuario, this.recibido.toString(), this.supervisor);
        //this.mostrarGrillaPendiente() ;
    };
    BandejaComponent.prototype.mostrarGrillaPendiente = function () {
        this.pendientesPresentar = [];
        var _valorDoc = "";
        for (var _i = 0, _a = this.tramitesPendiente; _i < _a.length; _i++) {
            var pendiente = _a[_i];
            if (pendiente.TramCodEmisor != null)
                _valorDoc = pendiente.nombrecom;
            else
                _valorDoc = pendiente.EnExNombre;
            this.pendientesPresentar.push({
                Id: pendiente.TramId, TramNumero: pendiente.TramNumero, NombreEmisor: _valorDoc,
                TramFecha: pendiente.TramFecha, TramAsunto: pendiente.TramAsunto, TrMoId: pendiente.TrMoId,
                TrMoFecha: pendiente.TrMoFecha, TiTrId: pendiente.TiTrId, TiTrAbrevia: pendiente.TiTrAbrevia, TramArchivo: pendiente.TramArchivo
            });
        }
    };
    BandejaComponent.prototype.onRowSelect = function (event) {
        var _this = this;
        // taking out, as when we 'select all', it prints to much to the console!!
        console.log('onRowSelected: ' + event.data.TramNumero);
        this.trMovId = event.data.TrMoId;
        this.tramId = event.data.Id;
        this._tramiteService.getAllMovimientoTramite(event.data.TrMoId)
            .subscribe(function (data) {
            _this.tramitesPendiente = data;
            _this.mostrarGrillaMovimiento();
        }, //lo llamo aqui xq sino le pierde el estado
        function (//lo llamo aqui xq sino le pierde el estado
            err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    BandejaComponent.prototype.mostrarGrillaMovimiento = function () {
        this.pendientesPresentar2 = [];
        var _valorDoc = "";
        for (var _i = 0, _a = this.tramitesPendiente; _i < _a.length; _i++) {
            var pendiente = _a[_i];
            if (pendiente.TramCodEmisor != null)
                _valorDoc = pendiente.nombrecom;
            else
                _valorDoc = pendiente.EnExNombre;
            this.pendientesPresentar2.push({
                nombreUsu: pendiente.nombreUsu, TiTrAbrevia: pendiente.TiTrAbrevia,
                TrMoFecha: pendiente.TrMoFecha, Persona: _valorDoc, TrMoObserva: pendiente.TrMoObserva,
                TrMoId: pendiente.TrMoId
            });
        }
    };
    BandejaComponent.prototype.cargarBandeja = function (_valorRadio) {
        this.recibido = _valorRadio;
        this.getAllPendiente(this.idCap, this.idUsuario, this.recibido.toString(), this.supervisor);
    };
    BandejaComponent.prototype.recepcionarTramite = function () {
        var _this = this;
        this._tramiteService.recepcionarTramiteMov(this.tramId, this.trMovId, this.idUsuario)
            .subscribe(function (data) {
            _this.getAllPendiente(_this.idCap, _this.idUsuario, _this.recibido.toString(), _this.supervisor);
        }, //lo llamo aqui xq sino le pierde el estado
        function (//lo llamo aqui xq sino le pierde el estado
            err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    BandejaComponent = __decorate([
        core_1.Component({
            selector: 'bandeja',
            templateUrl: 'app/views/bandeja.component.html'
        }), 
        __metadata('design:paramtypes', [tramite_service_1.TramiteService])
    ], BandejaComponent);
    return BandejaComponent;
}());
exports.BandejaComponent = BandejaComponent;
//# sourceMappingURL=bandeja.component.js.map