"use strict";
var router_1 = require('@angular/router');
var heroes_component_1 = require('./heroes.component');
var dashboard_component_1 = require('./dashboard.component');
var hero_detail_component_1 = require('./hero-detail.component');
var bandeja_component_1 = require('./controllers/bandeja.component');
var envio_component_1 = require('./controllers/envio.component');
var appRoutes = [
    {
        path: 'heroes',
        component: heroes_component_1.HeroesComponent
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'bandeja',
        component: bandeja_component_1.BandejaComponent
    },
    {
        path: 'envio',
        component: envio_component_1.EnvioComponent
    },
    /*{
        path: '',
        redirectTo: '/dashboard',
          pathMatch: 'full'
    },*/
    {
        path: 'detail/:id',
        component: hero_detail_component_1.HeroDetailComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map