import { Component, OnInit } from '@angular/core';

import { TramiteService } from '../services/tramite.service';

export class TramiteComponent { 
	tramitePendiente=[];
	foods_error;
	constructor(private _tramiteService: TramiteService){}
		getAllPendiente(codcap: string, id_usuario:string) {
			this._tramiteService.getAllPendiente(codcap,id_usuario).subscribe(
		      data => { this.tramitePendiente = data},
		      err => { this.foods_error = true }
		    );

		}
}