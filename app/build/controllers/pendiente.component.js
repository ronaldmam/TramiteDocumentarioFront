"use strict";
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
    return PendienteComponent;
}());
exports.PendienteComponent = PendienteComponent;
//# sourceMappingURL=pendiente.component.js.map