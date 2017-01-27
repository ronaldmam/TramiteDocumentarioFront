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
var Subject_1 = require('rxjs/Subject');
var Rx_1 = require('rxjs/Rx');
var tramite_service_1 = require('../services/tramite.service');
var tipoAccion_service_1 = require('../services/tipoAccion.service');
var personal_service_1 = require('../services/personal.service');
var BandejaComponent = (function () {
    function BandejaComponent(_tramiteService, _tipoAccionService, _personalService) {
        this._tramiteService = _tramiteService;
        this._tipoAccionService = _tipoAccionService;
        this._personalService = _personalService;
        this.tramitesPendiente = [];
        this.pendientesPresentar = [];
        this.pendientesPresentar2 = [];
        this.errorMessage = '';
        this.isLoading = true;
        this.bandejas = [
            { value: 0, display: 'Pendiente' },
            { value: 1, display: 'Recibido' }
        ];
        this.displayDialog = false;
        this.tipoAcciones1 = [];
        this.tipoAcciones2 = [];
        this.tipoAcciones3 = [];
        this.tramiteMov = {};
        //Para el compo buscar Personal
        this.personalesSearch = [];
        this.searchTerms = new Subject_1.Subject();
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
        var _this = this;
        this.idCap = '4004';
        this.idUsuario = '04742754'; //'00424113'; // parihuana Jose Luis '04742754' 
        this.idZona = 1; //Es la Zona de usuario actulmente logueado
        this.supervisor = 1;
        this.bandeja = this.bandejas[0].value;
        this.recibido = this.bandeja;
        this.getAllPendiente(this.idCap, this.idUsuario, this.recibido.toString(), this.supervisor);
        //this.mostrarGrillaPendiente() ;
        //Para el termino de searchTerms(Siempre tiene que ir en el ngOnInit)
        this.personalesSearch = this.searchTerms
            .debounceTime(300) // wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time
            ? _this._personalService.searchPersonalByTerm(term)
            : Rx_1.Observable.of([]); })
            .catch(function (error) {
            // TODO: real error handling
            console.log(error);
            return Rx_1.Observable.of([]);
        });
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
    //Derivar un documento
    BandejaComponent.prototype.derivarTramiteMov = function () {
        this.cargarDatosModal();
        //this.selectedPendientePresentar;
    };
    BandejaComponent.prototype.cargarDatosModal = function () {
        var _this = this;
        this.displayDialog = true;
        this.headerTitle = "Derivar Documento";
        if (this.tipoAcciones1)
            this.getAllTipoAcciones();
        //Creando un objeto de TramiteMOvi
        this._tramiteService.newTramiteMovi()
            .subscribe(function (data) {
            _this.tramiteMov = data;
        }, function (err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    //Busqueda por termino de busqueda Destinatario
    BandejaComponent.prototype.searchPersonalByTerm = function (event, termino, overlaypanel) {
        this.searchTerms.next(termino);
        overlaypanel.toggle(event);
    };
    //Cuando se leccion un registro
    BandejaComponent.prototype.selectPersonal = function (personalSelect, overlaypanel) {
        this.tramiteMov.TrMoPersoIn = personalSelect.id_persona;
        this.tramiteMov.TrMoZona = personalSelect.id_zona;
        this.nombrePersonal = personalSelect.nombrecom;
        this.nombreCAPS = personalSelect.cap_per;
        //overlaypanel.toggle(event);
        overlaypanel.hide();
    };
    //Obtenidendo informacion de la BD de TipoAcciones
    BandejaComponent.prototype.getAllTipoAcciones = function () {
        var _this = this;
        this._tipoAccionService.getAllTipoAcciones()
            .subscribe(function (data) {
            _this.tipoAcciones1 = data;
            _this.tipoAcciones2 = data;
            _this.tipoAcciones3 = data;
        }, function (err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    BandejaComponent.prototype.derivarTramite = function () {
        var _this = this;
        //llamando a la funcion para guardar
        this.tramiteMov.Id = this.selectedPendientePresentar.TrMoId;
        this.tramiteMov.TramId = this.selectedPendientePresentar.Id;
        // $scope.tramiteMov.TrMoObserva = currentTramiteMov.TrMoObserva; Esto ya ta enlazado  al controlador input
        this.tramiteMov.trMoCopia = 0;
        this.tramiteMov.TrMoPersonLog = this.idUsuario;
        this.tramiteMov.TrMoCAP = this.idZona; // estamos usando esto temporalmente para enviar zona del usuario logueado
        this.tramiteMov.TrMoRecepciono = this.selectedPendientePresentar.TiTrAbrevia == "REC" ? "true" : "false"; //TrMoRecepciono;// estamos usando esto temporalmente para indicar si esta recibido o no recibido
        this.tramiteMov.TrMoTraTramite = this.supervisor; //se esta usando temporalmente para enviar el supervisor
        //Guardar en BD
        this._tramiteService.derivarTramiteMov(this.tramiteMov)
            .subscribe(function (realizar) {
            _this.displayDialog = false;
            _this.getAllPendiente(_this.idCap, _this.idUsuario, _this.recibido.toString(), _this.supervisor);
        }, function (err) {
            console.log(err); // Log errors if any
        });
    };
    BandejaComponent = __decorate([
        core_1.Component({
            selector: 'bandeja',
            templateUrl: 'app/views/bandeja.component.html'
        }), 
        __metadata('design:paramtypes', [tramite_service_1.TramiteService, tipoAccion_service_1.TipoAccionService, personal_service_1.PersonalService])
    ], BandejaComponent);
    return BandejaComponent;
}());
exports.BandejaComponent = BandejaComponent;
//# sourceMappingURL=bandeja.component.js.map