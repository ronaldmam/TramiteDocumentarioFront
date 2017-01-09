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
        this._tramiteService = _tramiteService;
        this.tramitesEnvio = [];
        this.enviosPresentar = [];
        this.isLoading = true;
        this.errorMessage = '';
        this.columnDefs = [
            { headerName: "TramNumero", field: "TramNumero", sortingOrder: ["asc", "desc"], editable: false, width: 120 },
            { headerName: "NombreEmisor", field: "NombreEmisor", sortingOrder: ["asc", "desc"], editable: false, width: 290 },
            { headerName: "TramFecha", field: "TramFecha", sortingOrder: ["asc", "desc"], editable: false, width: 140 },
            { headerName: "TramAsunto", field: "TramAsunto", sortingOrder: ["asc", "desc"], editable: false, width: 497 },
            { headerName: "TiTrAbrevia", field: "TiTrAbrevia", sortingOrder: ["asc", "desc"], editable: false, width: 47 },
            { headerName: "TrMoFecha", field: "TrMoFecha", sortingOrder: ["asc", "desc"], editable: false, width: 90 },
        ];
    }
    EnvioComponent.prototype.getAllEmitidos = function (codcap) {
        var _this = this;
        this._tramiteService.getAllEmitidos(codcap)
            .subscribe(function (data) {
            _this.tramitesEnvio = data;
            _this.mostrarGrillaPendiente();
        }, //lo llamo aqui xq sino le pierde el estado
        function (//lo llamo aqui xq sino le pierde el estado
            err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    EnvioComponent.prototype.ngOnInit = function () {
        this.codCap = '4004';
        this.getAllEmitidos(this.codCap);
        //this.mostrarGrillaPendiente() ;
    };
    EnvioComponent.prototype.mostrarGrillaPendiente = function () {
        this.enviosPresentar = [];
        var _valorDoc = "";
        for (var _i = 0, _a = this.tramitesEnvio; _i < _a.length; _i++) {
            var pendiente = _a[_i];
            if (pendiente.TramCodEmisor != null)
                _valorDoc = pendiente.nombrecom;
            else
                _valorDoc = pendiente.EnExNombre;
            this.enviosPresentar.push({
                Id: pendiente.TramId, TramNumero: pendiente.TramNumero, NombreEmisor: _valorDoc,
                TramFecha: pendiente.TramFecha, TramAsunto: pendiente.TramAsunto, TrMoId: pendiente.TrMoId,
                TrMoFecha: pendiente.TrMoFecha, TiTrId: pendiente.TiTrId, TiTrAbrevia: pendiente.TiTrAbrevia, TramArchivo: pendiente.TramArchivo
            });
        }
        this.rowData = this.enviosPresentar;
        this.gridOptions = {};
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