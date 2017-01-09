import { Component, OnInit } from '@angular/core';
import {AgGridModule} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

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
  //propieadades de la ng-grid
	private gridOptions:GridOptions;
    private showGrid:boolean;
    private rowData:any[];
    private columnDefs:any[];
    private rowCount:string;

  constructor(private _tramiteService: TramiteService){
    this.columnDefs = [
            { headerName: "TramNumero", field: "TramNumero", sortingOrder: ["asc", "desc"], editable: false,width: 120 },
			{ headerName: "NombreEmisor", field: "NombreEmisor",sortingOrder: ["asc", "desc"], editable: false, width: 290 },
			{ headerName: "TramFecha", field: "TramFecha", sortingOrder: ["asc", "desc"], editable: false, width: 140},
			{ headerName: "TramAsunto", field: "TramAsunto",sortingOrder: ["asc", "desc"], editable: false, width: 497 },
			{ headerName: "TiTrAbrevia", field: "TiTrAbrevia",sortingOrder: ["asc", "desc"], editable: false, width: 47 },
			{ headerName: "TrMoFecha", field: "TrMoFecha", sortingOrder: ["asc", "desc"], editable: false, width: 90 },

        ];

  }
  getAllEmitidos(codcap: string) {
		this._tramiteService.getAllEmitidos(codcap)
			.subscribe(
			data => { this.tramitesEnvio = data;			 
						this.mostrarGrillaPendiente();},//lo llamo aqui xq sino le pierde el estado
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);

	}
  ngOnInit(){
		this.codCap='4004';	
		this.getAllEmitidos(this.codCap);
		//this.mostrarGrillaPendiente() ;

	}
	mostrarGrillaPendiente() {
		this.enviosPresentar=[];
		let _valorDoc:string="";
		for(let pendiente of this.tramitesEnvio ){
			if (pendiente.TramCodEmisor!=null)
				_valorDoc=pendiente.nombrecom;
			else
				_valorDoc=pendiente.EnExNombre;
			this.enviosPresentar.push(
				{
					Id: pendiente.TramId, TramNumero: pendiente.TramNumero, NombreEmisor: _valorDoc,
                   TramFecha: pendiente.TramFecha, TramAsunto: pendiente.TramAsunto, TrMoId: pendiente.TrMoId,
                   TrMoFecha: pendiente.TrMoFecha, TiTrId: pendiente.TiTrId, TiTrAbrevia: pendiente.TiTrAbrevia, TramArchivo: pendiente.TramArchivo
				}
			);

		}

        this.rowData=this.enviosPresentar;

        this.gridOptions = {
	        //enableSorting: true,
	        //rowData: this.rowData,
	        //columnDefs: this.columnDefs,				       
		}
	}
	
}
