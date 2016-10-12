import { Component, OnInit } from '@angular/core';

import { TramiteService } from '../services/tramite.service';

export class TramiteComponent { 
	tramitePendiente=[];
	errorMessage:string='';
	isLoading: boolean = true;
	constructor(private _tramiteService: TramiteService){}
		getAllPendiente(codcap: string, id_usuario:string) {
			this._tramiteService.getAllPendiente(codcap,id_usuario)
			.subscribe(
		      data => { this.tramitePendiente = data},
		      err => { this.errorMessage = err },
		      () => this.isLoading = false
		    );

		}

		ngOnInit(){
			this.getAllPendiente()

		}
}