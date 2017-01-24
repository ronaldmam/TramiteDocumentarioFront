import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { routing } from './app.routing';
import { HttpModule }    from '@angular/http';
//import {AgGridModule} from 'ag-grid-ng2/main';

//COmponentes primefaces// Esto lo uso para la grilla
import {DataTableModule,SharedModule,DataListModule} from 'primeng/primeng';
import {ButtonModule,DialogModule,OverlayPanelModule} from 'primeng/primeng';
import {ConfirmDialogModule,GrowlModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { DashboardComponent }   from './dashboard.component';
import { BandejaComponent } from './controllers/bandeja.component';
import { EnvioComponent } from './controllers/envio.component';
import { HeroService } from './hero.service';

import { TramiteService } from './services/tramite.service';
import { TipoDocumentoService } from './services/tipoDocumento.service';
import { PersonalService } from './services/personal.service';
import { DestinatarioService } from './services/destinatario.service';


@NgModule({
  imports:      [ BrowserModule ,  FormsModule, HttpModule, routing,//AgGridModule.withNg2ComponentSupport(),
                DataTableModule,SharedModule, ButtonModule,DialogModule, DataListModule,OverlayPanelModule,ConfirmDialogModule,GrowlModule],
  declarations: [ AppComponent,HeroesComponent, HeroDetailComponent, DashboardComponent,BandejaComponent,EnvioComponent ],
  providers: [  HeroService, TramiteService, TipoDocumentoService, PersonalService, DestinatarioService ],
  bootstrap:    [ AppComponent]
})
export class AppModule { 

}
