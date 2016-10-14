import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { routing } from './app.routing';
import { HttpModule }    from '@angular/http';
import {AgGridModule} from 'ag-grid-ng2/main';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { DashboardComponent }   from './dashboard.component';
import { PendienteComponent } from './controllers/pendiente.component';
import { HeroService } from './hero.service';
import { TramiteService } from './services/tramite.service';

@NgModule({
  imports:      [ BrowserModule ,  FormsModule, HttpModule, routing,AgGridModule.withNg2ComponentSupport()],
  declarations: [ AppComponent,HeroesComponent, HeroDetailComponent, DashboardComponent,PendienteComponent ],
  providers: [  HeroService, TramiteService  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 

}
