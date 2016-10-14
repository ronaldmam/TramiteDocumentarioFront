import { Component, OnInit } from '@angular/core';
import {AgGridModule} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

import { TramiteService } from '../services/tramite.service';
@Component({
  selector: 'pendiente', 
 template:'<div>hola</div>'// '/views/pendiente.view.html'
})
export class PendienteComponent { 
	private idCap:string='4004';
	private idUsuario:string='00480798';
	private recibido:boolean=false;
	private supervisor:boolean=true;
	private tramitePendiente:any=[];
	private errorMessage:string='';
	private isLoading: boolean = true;
	private bandeja:string
	//propieadades de la ng-grid
	private gridOptions:GridOptions;
    private showGrid:boolean;
    private rowData:any[];
    private columnDefs:any[];
    private rowCount:string;

	constructor(private _tramiteService: TramiteService){}
	getAllPendiente(codcap: string, id_usuario:string, recibido: boolean,superv:boolean) {
		this._tramiteService.getAllPendiente(codcap,id_usuario,recibido,superv)
		.subscribe(
	      data => { this.tramitePendiente = data},
	      err => { this.errorMessage = err },
	      () => this.isLoading = false
	    );

	}

	ngOnInit(){
		this.idCap='4004';
		this.bandeja==this.bandejas[0].value
		this.getAllPendiente(this.idUsuario,this.idCap,this.recibido,this.supervisor);
		this.mostrarGrillaPendiente() ;

	}
	mostrarGrillaPendiente() {
		this.columnDefs = [
            { headerName: "ID", field: "id", sortingOrder: ["asc", "desc"], editable: false, width: 100 },
            { headerName: "Name", field: "name", sortingOrder: ["asc", "desc"], editable: false, hide: false },

        ];
        this.rowData=this.tramitePendiente;

        this.gridOptions = {
	        enableSorting: true,
	        rowData: this.rowData,
	        columnDefs: this.columnDefs,
	       
		}
	}
	public bandejas = [
		{ value: 'p', display: 'Pendiente' },
		{ value: 'r', display: 'Recibido' }
	];
}
