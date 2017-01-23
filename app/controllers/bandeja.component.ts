import { Component, OnInit } from '@angular/core';
import {AgGridModule} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';
// Componentes de primefaces
import {DataTableModule} from 'primeng/primeng';

import { TramiteService } from '../services/tramite.service';
@Component({
  selector: 'bandeja', 
  templateUrl:'app/views/bandeja.component.html'
})
export class BandejaComponent { 
	private idCap:string;
	private idUsuario:string;
	private recibido:number;
	private supervisor:number;
	private tramitesPendiente:any=[];
	private pendientesPresentar:any = [];
	private pendientesPresentar2:any = [];
	private errorMessage:string='';
	private isLoading: boolean = true;
	private bandeja:number


	constructor(private _tramiteService: TramiteService){	
	
	}
	getAllPendiente(codcap: string, id_usuario:string, recibido: string,superv:number) {
		this._tramiteService.getAllPendiente(codcap,id_usuario,recibido,superv)
			.subscribe(
			data => { this.tramitesPendiente = data;			 
						this.mostrarGrillaPendiente();},//lo llamo aqui xq sino le pierde el estado
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);

	}

	ngOnInit(){
		this.idCap='4004';
		this.idUsuario='00424113'; // parihuana Jose Luis '04742754' 
		this.supervisor=1;
		this.bandeja=this.bandejas[0].value
		this.recibido=this.bandeja;
		this.getAllPendiente(this.idCap,this.idUsuario,this.recibido.toString(),this.supervisor);
		//this.mostrarGrillaPendiente() ;

	}
	mostrarGrillaPendiente() {
		this.pendientesPresentar=[];
		let _valorDoc:string="";
		for(let pendiente of this.tramitesPendiente ){
			if (pendiente.TramCodEmisor!=null)
				_valorDoc=pendiente.nombrecom;
			else
				_valorDoc=pendiente.EnExNombre;
			this.pendientesPresentar.push(
				{
					Id: pendiente.TramId, TramNumero: pendiente.TramNumero, NombreEmisor: _valorDoc,
                   TramFecha: pendiente.TramFecha, TramAsunto: pendiente.TramAsunto, TrMoId: pendiente.TrMoId,
                   TrMoFecha: pendiente.TrMoFecha, TiTrId: pendiente.TiTrId, TiTrAbrevia: pendiente.TiTrAbrevia, TramArchivo: pendiente.TramArchivo
				}
			);

		}      
	}
	private onRowSelect(event) {
        // taking out, as when we 'select all', it prints to much to the console!!
        console.log('onRowSelected: ' + event.data.TramNumero);

		this._tramiteService.getAllMovimientoTramite( event.data.TrMoId)
			.subscribe(
			data => { this.tramitesPendiente = data;			 
						this.mostrarGrillaMovimiento();},//lo llamo aqui xq sino le pierde el estado
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);

    }
	mostrarGrillaMovimiento() {
		this.pendientesPresentar2=[];
		let _valorDoc:string="";
		for(let pendiente of this.tramitesPendiente ){
			if (pendiente.TramCodEmisor!=null)
				_valorDoc=pendiente.nombrecom;
			else
				_valorDoc=pendiente.EnExNombre;
			this.pendientesPresentar2.push(
				{
					   nombreUsu: pendiente.nombreUsu, TiTrAbrevia: pendiente.TiTrAbrevia, 
					   TrMoFecha: pendiente.TrMoFecha, Persona: _valorDoc, TrMoObserva: pendiente.TrMoObserva, 
					   TrMoId: pendiente.TrMoId
				}
			);

		}
	}
	cargarBandeja(_valorRadio:number){
		this.recibido=_valorRadio;
		this.getAllPendiente(this.idCap,this.idUsuario,this.recibido.toString(),this.supervisor);

	}
	private bandejas = [
		{ value: 0, display: 'Pendiente' },
		{ value: 1, display: 'Recibido' }
	];
}
