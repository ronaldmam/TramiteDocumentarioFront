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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var app_routing_1 = require('./app.routing');
var http_1 = require('@angular/http');
var main_1 = require('ag-grid-ng2/main');
//Esto lo uso para la grilla
var primeng_1 = require('primeng/primeng');
var primeng_2 = require('primeng/primeng');
var app_component_1 = require('./app.component');
var heroes_component_1 = require('./heroes.component');
var hero_detail_component_1 = require('./hero-detail.component');
var dashboard_component_1 = require('./dashboard.component');
var bandeja_component_1 = require('./controllers/bandeja.component');
var envio_component_1 = require('./controllers/envio.component');
var hero_service_1 = require('./hero.service');
var tramite_service_1 = require('./services/tramite.service');
var tipoDocumento_service_1 = require('./services/tipoDocumento.service');
var personal_service_1 = require('./services/personal.service');
var destinatario_service_1 = require('./services/destinatario.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, app_routing_1.routing, main_1.AgGridModule.withNg2ComponentSupport(), primeng_1.DataTableModule, primeng_1.SharedModule, primeng_2.ButtonModule, primeng_2.DialogModule, primeng_1.DataListModule, primeng_2.OverlayPanelModule],
            declarations: [app_component_1.AppComponent, heroes_component_1.HeroesComponent, hero_detail_component_1.HeroDetailComponent, dashboard_component_1.DashboardComponent, bandeja_component_1.BandejaComponent, envio_component_1.EnvioComponent],
            providers: [hero_service_1.HeroService, tramite_service_1.TramiteService, tipoDocumento_service_1.TipoDocumentoService, personal_service_1.PersonalService, destinatario_service_1.DestinatarioService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map