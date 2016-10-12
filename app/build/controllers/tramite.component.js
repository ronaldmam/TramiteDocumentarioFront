"use strict";
var TramiteComponent = (function () {
    function TramiteComponent(_tramiteService) {
        this._tramiteService = _tramiteService;
        this.idCap = '4004';
        this.idUsuario = '00480798';
        this.recibido = false;
        this.supervisor = true;
        this.tramitePendiente = [];
        this.errorMessage = '';
        this.isLoading = true;
    }
    TramiteComponent.prototype.getAllPendiente = function (codcap, id_usuario, recibido, superv) {
        var _this = this;
        this._tramiteService.getAllPendiente(codcap, id_usuario, recibido, superv)
            .subscribe(function (data) { _this.tramitePendiente = data; }, function (err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    TramiteComponent.prototype.ngOnInit = function () {
        this.getAllPendiente(this.idUsuario, this.idCap, this.recibido, this.supervisor);
        this.mostrarGrillaPendiente();
    };
    TramiteComponent.prototype.mostrarGrillaPendiente = function () {
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
    return TramiteComponent;
}());
exports.TramiteComponent = TramiteComponent;
//# sourceMappingURL=tramite.component.js.map