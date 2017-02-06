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
var Subject_1 = require("rxjs/Subject");
var Rx_1 = require("rxjs/Rx");
var primeng_1 = require("primeng/primeng");
var tramite_service_1 = require("../services/tramite.service");
var tipoDocumento_service_1 = require("../services/tipoDocumento.service");
var personal_service_1 = require("../services/personal.service");
var destinatario_service_1 = require("../services/destinatario.service");
var EnvioComponent = (function () {
    function EnvioComponent(_tramiteService, _tipoDocumentoService, _personalService, _destinatarioService, _confirmationService) {
        this._tramiteService = _tramiteService;
        this._tipoDocumentoService = _tipoDocumentoService;
        this._personalService = _personalService;
        this._destinatarioService = _destinatarioService;
        this._confirmationService = _confirmationService;
        this.tramitesEnvio = [];
        this.tipoDocumentos = [];
        this.personalByAreas = [];
        this.enviosPresentar = [];
        this.isLoading = false;
        this.errorMessage = '';
        //propiedades de modal
        this.displayDialog = false;
        //mesage popup
        this.msgs = [];
        this.destinatarios = [];
        this.destinatariosSearch = [];
        this.destinatariosPresentar = [];
        this.searchTerms = new Subject_1.Subject();
        //Para agregar destinatario
        //Esto es para el destinatario
        this.personalDestinatario = { copiaOri: "0", internoExt: "0", id_zona: 1, observa: "", destinatarioPersona: "", idPersona: "", idExt: 0 };
    }
    EnvioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.codCap = '4004'; //Es la COdArea de usuario actulmente logueado
        this.idZona = 1; //Es la Zona de usuario actulmente logueado
        this.idUsuario = "00480798"; // este usuario es obtenido del login
        this.getAllEmitidos(this.codCap);
        //this.mostrarGrillaEmitido() ;		
        //Para el termino de searchTerms
        this.destinatariosSearch = this.searchTerms
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
        //inicializando los datos del formulario de destinatario		
        this.personalDestinatario.copiaOri = "0";
        this.personalDestinatario.internoExt = "0";
        this.personalDestinatario.id_zona = 1; //Es la Zona de usuario actulmente logueado
        this.personalDestinatario.observa = "";
        this.personalDestinatario.idPersona = "";
        this.personalDestinatario.destinatarioPersona = "";
        /*this.personalDestinatario = {};*/
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
        this._tramiteService.saveTramite(this.tramiteEnvio)
            .subscribe(function (realizar) {
            _this.displayDialog = false;
            _this.getAllEmitidos(_this.codCap);
        }, function (err) {
            console.log(err); // Log errors if any
        });
    };
    EnvioComponent.prototype.enviarEmitido = function () {
        var _this = this;
        if (this.destinatarios.length <= 0)
            alert("No tien destinatario");
        else {
            this._tramiteService.enviarTramite(this.tramiteEnvio.Id, this.idZona, this.idUsuario)
                .subscribe(function (data) {
                _this.displayDialog = false;
                _this.getAllEmitidos(_this.codCap);
            }, function (err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
        }
    };
    EnvioComponent.prototype.deleteEmitido = function (_idTramite) {
        var _this = this;
        this._tramiteService.deleteTramite(_idTramite)
            .subscribe(function (realizar) {
            _this.getAllEmitidos(_this.codCap);
        }, function (err) {
            console.log(err); // Log errors if any
        });
    };
    EnvioComponent.prototype.confirmaDeleteEmitido = function (_idTramite, numero) {
        var _this = this;
        this._confirmationService.confirm({
            message: 'Esta seguro que desea elmininar el registro: ' + numero + " ?",
            header: 'Confirmacion de Eliminacion',
            icon: 'fa fa-trash',
            accept: function () {
                _this.deleteEmitido(_idTramite);
                _this.msgs = [];
                _this.msgs.push({ severity: 'info', summary: 'Confirmacion', detail: 'Registro:' + numero + ' eliminado' });
            }
        });
    };
    EnvioComponent.prototype.onRowSelect = function (event) {
        this.idEnvioPresentar = event.data.Id;
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // en el formulario  de Nuevo y editar Documento
    EnvioComponent.prototype.getAllDestinatarioByTram = function (idTramite) {
        var _this = this;
        this._destinatarioService.getAllDestinatarioByTram(idTramite)
            .subscribe(function (data) {
            _this.destinatarios = data;
            _this.mostrarGrillaDestinatario();
        }, function (err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    //Busqueda por termino de busqueda Destinatario
    EnvioComponent.prototype.searchPersonalByTerm = function (event, termino, overlaypanel) {
        this.searchTerms.next(termino);
        overlaypanel.toggle(event);
    };
    EnvioComponent.prototype.SelectDestinatario = function (destinatarioSelect, overlaypanel) {
        this.personalDestinatario.idPersona = destinatarioSelect.id_persona;
        this.personalDestinatario.destinatarioPersona = destinatarioSelect.nombrecom;
        //overlaypanel.toggle(event);
        overlaypanel.hide();
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
    EnvioComponent.prototype.guardarDestinatario = function () {
        var _this = this;
        this._destinatarioService.newDestinatario()
            .subscribe(function (data) {
            _this.destinatario = data;
            _this.destinatario.tramId = _this.tramiteEnvio.Id;
            _this.destinatario.DestAmbito = _this.personalDestinatario.internoExt;
            _this.destinatario.DestCopia = _this.personalDestinatario.copiaOri == "0" ? "false" : "true";
            _this.destinatario.DestNoTramita = 0; //siempre va 0						
            _this.destinatario.DestObserva = _this.personalDestinatario.observa;
            if (_this.personalDestinatario.internoExt == "0") {
                _this.destinatario.DestPersoInterno = _this.personalDestinatario.idPersona;
                _this.destinatario.DestZona = _this.personalDestinatario.id_zona;
                if (_this.personalDestinatario.id_zona != _this.idZona)
                    _this.destinatario.DestAmbito = "2";
                else
                    _this.destinatario.DestAmbito = "0";
                _this.destinatario.DestCap = _this.codCap;
            }
            else {
                _this.destinatario.EnExId = _this.personalDestinatario.idExt;
                _this.destinatario.DestZona = "0";
            }
            //ahora si guardamos en la base de datos
            _this.guardarBaseDestinatario(_this.destinatario);
        }, function (err) { _this.errorMessage = err; }, function () { return _this.isLoading = false; });
    };
    EnvioComponent.prototype.guardarBaseDestinatario = function (_destinatario) {
        var _this = this;
        this._destinatarioService.save(_destinatario)
            .subscribe(function (ejecutado) {
            //Caargando nuevamente destinatario
            _this.getAllDestinatarioByTram(_this.tramiteEnvio.Id);
        }, function (err) {
            console.log(err); // Log errors if any
        });
    };
    EnvioComponent.prototype.deleteDestinatario = function (_idDestinatario) {
        var _this = this;
        this._destinatarioService.deleteDestinatario(_idDestinatario)
            .subscribe(function (ejecutado) {
            //Caargando nuevamente destinatario
            _this.getAllDestinatarioByTram(_this.tramiteEnvio.Id);
        }, function (err) {
            console.log(err); // Log errors if any
        });
    };
    return EnvioComponent;
}());
EnvioComponent = __decorate([
    core_1.Component({
        selector: 'envio',
        templateUrl: 'app/views/envio.component.html',
        providers: [primeng_1.ConfirmationService]
    }),
    __metadata("design:paramtypes", [tramite_service_1.TramiteService,
        tipoDocumento_service_1.TipoDocumentoService,
        personal_service_1.PersonalService, destinatario_service_1.DestinatarioService,
        primeng_1.ConfirmationService])
], EnvioComponent);
exports.EnvioComponent = EnvioComponent;
//# sourceMappingURL=envio.component.js.map