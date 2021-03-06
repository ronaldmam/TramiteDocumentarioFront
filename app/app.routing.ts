import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent }      from './heroes.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroDetailComponent }   from './hero-detail.component';
import { BandejaComponent }   from './controllers/bandeja.component';
import { EnvioComponent }   from './controllers/envio.component';

const appRoutes: Routes = [
  	{
    	path: 'heroes',
    	component: HeroesComponent
  	},
  	{
   		path: 'dashboard',
  		component: DashboardComponent
	},
	{
   		path: 'bandeja',
  		component: BandejaComponent
	},
	{
   		path: 'envio',
  		component: EnvioComponent
	},
	/*{
  		path: '',
  		redirectTo: '/dashboard',
		  pathMatch: 'full'
	},*/
	{
	  path: 'detail/:id',
	  component: HeroDetailComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

