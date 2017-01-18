import { Component, OnInit, Input } from '@angular/core';

// es para el datatable
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {ButtonModule,DialogModule} from 'primeng/primeng';
import { TramiteService } from '../services/tramite.service';
import { TipoDocumentoService } from '../services/tipoDocumento.service';
import { PersonalService } from '../services/personal.service';


@Component({
  selector: 'envio', 
  templateUrl:'app/views/envio.component.html'
})
export class EnvioComponent implements OnInit { 
	private codCap:string;
	private tramitesEnvio:any=[];
	private tipoDocumentos:any=[];
	private personalByAreas:any=[];
	//@Input()
	private tramiteEnvio:any;
	private enviosPresentar:any = [];
	private isLoading: boolean = false;  
	private errorMessage:string='';
	//propiedades de modal
	private displayDialog: boolean=false;
	//propieadades de la ng-grid
	private columnDefs:any[];
	//propiedades del formulario agregar o Editar
	private mostrarCtrlEnvio:boolean;
	private muestraEnviar:boolean;
	private headerTitle:string;
	private selectedEnvioPresentar: any;
	private idEnvioPresentar:number;


	constructor(private _tramiteService: TramiteService,
	private _tipoDocumentoService: TipoDocumentoService,
	private _personalService: PersonalService){ 
	/*  this.columnDefs = [
				{ header: "TramNumero", field: "TramNumero"},
				{ header: "NombreEmisor", field: "NombreEmisor", sortable:"true"},
				{ header: "TramFecha", field: "TramFecha"},
				{ header: "TramAsunto", field: "TramAsunto"},
				{ header: "TiDocAbrevia", field: "TiDocAbrevia"},
			];*/

	}
	ngOnInit(){
			this.codCap='4004';	
			this.getAllEmitidos(this.codCap);
			//this.mostrarGrillaEmitido() ;

	}
	getAllEmitidos(codcap: string) {
		this._tramiteService.getAllEmitidos(codcap)
			.subscribe(
			data => { this.tramitesEnvio = data;			 
						this.mostrarGrillaEmitido();},//lo llamo aqui xq sino le pierde el estado
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);

	}
 	
	mostrarGrillaEmitido() {
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
	addEmitido(codcap: string) {
		this._tramiteService.newTramite()
			.subscribe(
			data => { this.tramiteEnvio = data;	
					this.tramiteEnvio.TramCodCAP=this.codCap; 
					this.displayDialog=true;
					this.getAllTipoDocumentos();
					this.getAllPersonalByArea(this.codCap);
					 if (this.tramiteEnvio.Id > 0)
					{
						this.headerTitle = 'Editar Documento';
						this.mostrarCtrlEnvio = true;
						this.muestraEnviar = true;
					}
					else
					{
						this.headerTitle = 'Nuevo Documento';
						this.mostrarCtrlEnvio = false;
						this.muestraEnviar = false;
					}
						},//lo llamo aqui xq sino le pierde el estado
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);

	}
	editEmitido(_trMoid:number){
		this._tramiteService.getTramiteById(_trMoid)
			.subscribe(
			data => { this.tramiteEnvio = data;			 
						this.displayDialog=true;},//lo llamo aqui xq sino le pierde el estado
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);
	}
	getAllTipoDocumentos() {
		this._tipoDocumentoService.getAllTipoDocumentos()
			.subscribe(
			data => { this.tipoDocumentos = data;
				},
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);

	}
	getAllPersonalByArea(codCap:string) {
		this._personalService.getAllPersonalByArea(codCap)
			.subscribe(
			data => { this.personalByAreas = data;
				},
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);

	}
	
	saveEnvio() {
		 this._tramiteService.save(this.tramiteEnvio)
		 .subscribe(
			 ents => {
			 	this.displayDialog=false;
			 },
			 err => {
                console.log(err);// Log errors if any
             });		 
	}

	onRowSelect(event) {    
    	this.idEnvioPresentar = event.data.Id;
    	
  }

}
