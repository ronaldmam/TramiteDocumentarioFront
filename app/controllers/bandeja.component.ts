import { Component, OnInit } from '@angular/core';
import {AgGridModule} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

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
	//propieadades de la ng-grid
	private gridOptions:GridOptions;
    private showGrid:boolean;
    private rowData:any[];
    private columnDefs:any[];
    private rowCount:string;

	//propieadades de la ng-grid de movimiento
	private gridOptions2:GridOptions;
    private showGrid2:boolean;
    private rowData2:any[];
    private columnDefs2:any[];
    private rowCount2:string;

	constructor(private _tramiteService: TramiteService){
		this.columnDefs = [
            { headerName: "TramNumero", field: "TramNumero", sortingOrder: ["asc", "desc"], editable: false,width: 120 },
			{ headerName: "NombreEmisor", field: "NombreEmisor",sortingOrder: ["asc", "desc"], editable: false, width: 290 },
			{ headerName: "TramFecha", field: "TramFecha", sortingOrder: ["asc", "desc"], editable: false, width: 140},
			{ headerName: "TramAsunto", field: "TramAsunto",sortingOrder: ["asc", "desc"], editable: false, width: 497 },
			{ headerName: "TiTrAbrevia", field: "TiTrAbrevia",sortingOrder: ["asc", "desc"], editable: false, width: 47 },
			{ headerName: "TrMoFecha", field: "TrMoFecha", sortingOrder: ["asc", "desc"], editable: false, width: 90 },

        ];
		this.columnDefs2 = [
            { headerName: "nombreUsu", field: "nombreUsu", width: 160 },
			{ headerName: "TiTrAbrevia", field: "TiTrAbrevia", width: 90 },
			{ headerName: "TrMoFecha", field: "TrMoFecha", width: 120 },
			{ headerName: "Persona", field: "Persona", width: 160 },
			{ headerName: "TrMoObserva", field: "TrMoObserva", width: 497 }

        ];
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

        this.rowData=this.pendientesPresentar;

        this.gridOptions = {
	        //enableSorting: true,
	        //rowData: this.rowData,
	        //columnDefs: this.columnDefs,				       
		}
	}
	private onRowSelected($event) {
        // taking out, as when we 'select all', it prints to much to the console!!
        console.log('onRowSelected: ' + $event.node.data.TramNumero);

		this._tramiteService.getAllMovimientoTramite( $event.node.data.TrMoId)
			.subscribe(
			data => { this.tramitesPendiente = data;			 
						this.mostrarGrillaMovimiento();},//lo llamo aqui xq sino le pierde el estado
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);

    }
	private onQuickFilterChanged($event) {
        this.gridOptions.api.setQuickFilter($event.target.pendiente);
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
		 this.rowData2=this.pendientesPresentar2;

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
