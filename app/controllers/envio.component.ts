import { Component, OnInit, Input } from '@angular/core';
import { Subject }	from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
// es para el datatable
import {DataTableModule,SharedModule, DataListModule} from 'primeng/primeng';
import {ButtonModule,DialogModule,OverlayPanel} from 'primeng/primeng';

import { TramiteService } from '../services/tramite.service';
import { TipoDocumentoService } from '../services/tipoDocumento.service';
import { PersonalService } from '../services/personal.service';
import { DestinatarioService } from '../services/destinatario.service';


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
	private destinatarios:any = [];
	private destinatariosSearch:any = [];
	//private destinatarioSelect: any;
	private destinatariosPresentar:any=[];
	private searchTerms = new Subject<string>();
	//Para agregar destinatario
	  //Esto es para el destinatario
    private personalDestinatario:any = {copiaOri:"0",internoExt: "0",id_zona:1, observa: "", destinatarioPersona:"",idPersona:""};
   

	constructor(private _tramiteService: TramiteService,
	private _tipoDocumentoService: TipoDocumentoService,
	private _personalService: PersonalService,private _destinatarioService: DestinatarioService){ 
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

		//Para el termino de searchTerms
		this.destinatariosSearch = this.searchTerms
								.debounceTime(300)        // wait for 300ms pause in events
								.distinctUntilChanged()   // ignore if next search term is same as previous
								.switchMap(term => term   // switch to new observable each time
								// return the http search observable
								? this._personalService.searchPersonalByTerm(term)
								// or the observable of empty heroes if no search term
								: Observable.of<any[]>([]))
								.catch(error => {
								// TODO: real error handling
								console.log(error);
								return Observable.of<any[]>([]);
								});


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
	cargarDatosModal(){
		this.displayDialog=true;
		if (this.tipoDocumentos)
		this.getAllTipoDocumentos();
		if (this.personalByAreas)
		this.getAllPersonalByArea(this.codCap);
		if (this.tramiteEnvio.Id > 0)
		{
			this.headerTitle = 'Editar Documento';
			this.mostrarCtrlEnvio = true;
			this.muestraEnviar = true;
			this.getAllDestinatarioByTram(this.tramiteEnvio.Id);
		}
		else
		{
			this.headerTitle = 'Nuevo Documento';
			this.mostrarCtrlEnvio = false;
			this.muestraEnviar = false;
		}
		//inicializando los datos del formulario de destinatario		
		this.personalDestinatario.copiaOri = "0";
		this.personalDestinatario.internoExt = "0";
		this.personalDestinatario.id_zona = 1; //Es la Zona de usuario actulmente logueado
		this.personalDestinatario.observa = "";
		this.personalDestinatario.idPersona="";
		this.personalDestinatario.destinatarioPersona="";
		/*this.personalDestinatario = {};*/
		
		   
	}
	addEmitido(codcap: string) {
		this._tramiteService.newTramite()
			.subscribe(
			data => { this.tramiteEnvio = data;	
					this.tramiteEnvio.TramCodCAP=this.codCap; 
					this.cargarDatosModal();
					
						},//lo llamo aqui xq sino le pierde el estado
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);

	}
	editEmitido(_trMoid:number){
		this._tramiteService.getTramiteById(_trMoid)
			.subscribe(
			data => { this.tramiteEnvio = data;			 
						this.cargarDatosModal();},//lo llamo aqui xq sino le pierde el estado
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
	
	saveEmitido() {
		 this._tramiteService.save(this.tramiteEnvio)
		 .subscribe(
			 realizar => {
			 	this.displayDialog=false;
			 },
			 err => {
                console.log(err);// Log errors if any
             });		 
	}

	onRowSelect(event) {    
    	this.idEnvioPresentar = event.data.Id;
    	
	}
	// en el formulario  de Nuevo y editar Documento
	getAllDestinatarioByTram(idTramite:number){
		this._destinatarioService.getAllDestinatarioByTram(idTramite)
			.subscribe(
				data => { this.destinatarios = data;
						this. mostrarGrillaDestinatario();
					},
				err => { this.errorMessage = err },
				() => this.isLoading = false
			);

	}
	//Busqueda por termino de busqueda Destinatario
	searchPersonalByTerm(event,termino: string, overlaypanel: OverlayPanel): void {
    this.searchTerms.next(termino);
	 overlaypanel.toggle(event);

	}
	SelectDestinatario(destinatarioSelect: any,overlaypanel: OverlayPanel){
		this.personalDestinatario.idPersona=destinatarioSelect.id_persona;
		this.personalDestinatario.destinatarioPersona=destinatarioSelect.nombrecom;
		 //overlaypanel.toggle(event);
		 overlaypanel.hide();
	}
	mostrarGrillaDestinatario(){
		this.destinatariosPresentar=[];
		let _valorDoc:string="";
		let _nomDesti:string="";
		let _lugarDesti:string="";
		let _ambDesti:string="";
		let _ambtipo:string="";

		for(let destinatario of this.destinatarios ){
			if (destinatario.DestPersoInterno != null) {
                 _valorDoc = destinatario.DestPersoInterno;
                 _nomDesti = destinatario.nombrecom;
                 _lugarDesti = destinatario.nombre;
             }
             else {
                 if (destinatario.EnExDNI != null) {
                     _valorDoc = destinatario.EnExDNI;
                     _nomDesti = destinatario.EnExNombre;
                     _lugarDesti = "";
                 }
                 else {
                     _valorDoc = destinatario.EnExRUC;
                     _nomDesti = destinatario.EnExNombre;
                     _lugarDesti = "";
                 }
             }
             if (destinatario.DestAmbito == "0")
                 _ambDesti = "Interno"
             else
                 _ambDesti = "Externo"

             if (destinatario.DestCopia == true)
                 _ambtipo = "Copia"
             else
                 _ambtipo = "Original"
			this.destinatariosPresentar.push(
				{
					Id: destinatario.Id, documento: _valorDoc, nombre: _nomDesti, lugar: _lugarDesti, ambito: _ambDesti, tipo: _ambtipo
				}
			);
		}
		

	}
	


}
