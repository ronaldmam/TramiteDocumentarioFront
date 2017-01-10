import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { routing } from './app.routing';
import { HttpModule }    from '@angular/http';
import {AgGridModule} from 'ag-grid-ng2/main';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTableModule,SharedModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { DashboardComponent }   from './dashboard.component';
import { BandejaComponent } from './controllers/bandeja.component';
import { EnvioComponent } from './controllers/envio.component';
import { HeroService } from './hero.service';
import { TramiteService } from './services/tramite.service';

@NgModule({
  imports:      [ BrowserModule ,  FormsModule, HttpModule, routing,AgGridModule.withNg2ComponentSupport(),DataTableModule,SharedModule],//NgbModule.forRoot()
  declarations: [ AppComponent,HeroesComponent, HeroDetailComponent, DashboardComponent,BandejaComponent,EnvioComponent ],
  providers: [  HeroService, TramiteService  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 

}
