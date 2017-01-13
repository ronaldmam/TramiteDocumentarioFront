import { Component, OnInit } from '@angular/core';

// es para el datatable
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {ButtonModule,DialogModule} from 'primeng/primeng';
import { TramiteService } from '../services/tramite.service';


@Component({
  selector: 'envio', 
  templateUrl:'app/views/envio.component.html'
})
export class EnvioComponent { 
  private codCap:string;
  private tramitesEnvio:any=[];
  private enviosPresentar:any = [];
  private isLoading: boolean = true;  
  private errorMessage:string='';
  //propiedades de modal
  private displayDialog: boolean=true;
  //propieadades de la ng-grid
  private columnDefs:any[];


  constructor(private _tramiteService: TramiteService){ 
  /*  this.columnDefs = [
            { header: "TramNumero", field: "TramNumero"},
			{ header: "NombreEmisor", field: "NombreEmisor", sortable:"true"},
			{ header: "TramFecha", field: "TramFecha"},
			{ header: "TramAsunto", field: "TramAsunto"},
			{ header: "TiDocAbrevia", field: "TiDocAbrevia"},
        ];*/

  }
	getAllEmitidos(codcap: string) {
		this._tramiteService.getAllEmitidos(codcap)
			.subscribe(
			data => { this.tramitesEnvio = data;			 
						this.mostrarGrillaEnvio();},//lo llamo aqui xq sino le pierde el estado
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);

	}
 	ngOnInit(){
		this.codCap='4004';	
		this.getAllEmitidos(this.codCap);
		//this.mostrarGrillaEnvio() ;

	}
	mostrarGrillaEnvio() {
		this.enviosPresentar=[];
		let _valorDoc:string="";
		for(let envio of this.tramitesEnvio ){
			if (envio.TramCodEmisor!=null)
				_valorDoc=envio.nombrecom;
			else
				_valorDoc=envio.EnExNombre;
			this.enviosPresentar.push(
				{
					Id: envio.Id, TramNumero: envio.TramNumero, NombreEmisor: _valorDoc,
                   TramFecha: envio.TramFecha, TramAsunto: envio.TramAsunto, 
                   TiDocAbrevia: envio.TiDocAbrevia
				}
			);

		}     
	}

}
