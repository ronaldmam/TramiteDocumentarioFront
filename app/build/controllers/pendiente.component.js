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
var PendienteComponent = (function () {
    function PendienteComponent(_tramiteService) {
        this._tramiteService = _tramiteService;
        this.idCap = '4004';
        this.idUsuario = '00480798';
        this.recibido = false;
        this.supervisor = true;
        this.tramitePendiente = [];
        this.errorMessage = '';
        this.isLoading = true;
        this.bandejas = [
            { value: 'p', display: 'Pendiente' },
            { value: 'r', display: 'Recibido' }
        ];
    }
    PendienteComponent.prototype.getAllPendiente = function (codcap, id_usuario, recibido, superv) {
        var _this = this;
        this._tramiteService.getAllPendiente(codcap, id_usuario, recibido, superv)
            .subscribe(function (data) { _this.tramitePendiente = data; }, function (err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    PendienteComponent.prototype.ngOnInit = function () {
        this.idCap = '4004';
        this.bandeja == this.bandejas[0].value;
        this.getAllPendiente(this.idUsuario, this.idCap, this.recibido, this.supervisor);
        this.mostrarGrillaPendiente();
    };
    PendienteComponent.prototype.mostrarGrillaPendiente = function () {
        this.columnDefs = [
            { headerName: "ID", field: "id", sortingOrder: ["asc", "desc"], editable: false, width: 100 },
            { headerName: "Name", field: "name", sortingOrder: ["asc", "desc"], editable: false, hide: false },
        ];
        this.rowData = this.tramitePendiente;
        this.gridOptions = {
            enableSorting: true,
            rowData: this.rowData,
            columnDefs: this.columnDefs,
        };
    };
    PendienteComponent = __decorate([
        core_1.Component({
            selector: 'pendiente',
            template: '<div>hola</div>' // '/views/pendiente.view.html'
        }), 
        __metadata('design:paramtypes', [tramite_service_1.TramiteService])
    ], PendienteComponent);
    return PendienteComponent;
}());
exports.PendienteComponent = PendienteComponent;
//# sourceMappingURL=pendiente.component.js.map