import { Component, OnInit } from '@angular/core';
import { Subject }	from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
// Componentes de primefaces
import {DataTableModule} from 'primeng/primeng';
import {ButtonModule,DialogModule,OverlayPanel} from 'primeng/primeng';

import { TramiteService } from '../services/tramite.service';
import { TipoAccionService } from '../services/tipoAccion.service';
import { PersonalService } from '../services/personal.service';

@Component({
  selector: 'bandeja', 
  templateUrl:'app/views/bandeja.component.html'
})
export class BandejaComponent { 
	private idCap:string;
	private idUsuario:string;
	private idZona:number;
	private recibido:number;
	private supervisor:number;
	private tramitesPendiente:any=[];
	private pendientesPresentar:any = [];
	private selectedPendientePresentar:any;
	private pendientesPresentar2:any = [];
	private errorMessage:string='';
	private isLoading: boolean = true;
	private bandeja:number
	private bandejas = [
		{ value: 0, display: 'Pendiente' },
		{ value: 1, display: 'Recibido' }
	];
	//para guardar la seleccion de la primera grilla
	private trMovId:number;
    private tramId:number;
	//propiedades dela ventana Modal
	private headerTitle:string;
	private displayDialog: boolean=false;
	private tipoAcciones1:any=[];
	private tipoAcciones2:any=[];
	private tipoAcciones3:any=[];
	private tramiteMov:any={};
	private nombrePersonal:string;
	private nombreCAPS:string;
	//Para el compo buscar Personal
	private personalesSearch:any = [];	
	private searchTerms = new Subject<string>();

	constructor(private _tramiteService: TramiteService, 
	private _tipoAccionService:TipoAccionService,private _personalService: PersonalService){	
	
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
		this.idUsuario='04742754'//'00424113'; // parihuana Jose Luis '04742754' 
		this.idZona=1;//Es la Zona de usuario actulmente logueado
		this.supervisor=1;
		this.bandeja=this.bandejas[0].value
		this.recibido=this.bandeja;
		this.getAllPendiente(this.idCap,this.idUsuario,this.recibido.toString(),this.supervisor);
		//this.mostrarGrillaPendiente() ;
		//Para el termino de searchTerms(Siempre tiene que ir en el ngOnInit)
		this.personalesSearch = this.searchTerms
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
	private mostrarGrillaPendiente() {
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
		this.trMovId=event.data.TrMoId;
		this.tramId=event.data.Id
		this._tramiteService.getAllMovimientoTramite( event.data.TrMoId)
			.subscribe(
			data => { this.tramitesPendiente = data;			 
						this.mostrarGrillaMovimiento();},//lo llamo aqui xq sino le pierde el estado
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);

    }
	private mostrarGrillaMovimiento() {
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
	private cargarBandeja(_valorRadio:number){
		this.recibido=_valorRadio;
		this.getAllPendiente(this.idCap,this.idUsuario,this.recibido.toString(),this.supervisor);

	}
	private recepcionarTramite(){
			this._tramiteService.recepcionarTramiteMov(this.tramId,this.trMovId,this.idUsuario)
			.subscribe(
			data => { 			 
						this.getAllPendiente(this.idCap,this.idUsuario,this.recibido.toString(),this.supervisor);},//lo llamo aqui xq sino le pierde el estado
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);
	}

	//Derivar un documento
	private derivarTramiteMov(){
		this.cargarDatosModal();
		//this.selectedPendientePresentar;
	}
	private cargarDatosModal(){
		this.displayDialog=true;
		this.headerTitle="Derivar Documento";
		if (this.tipoAcciones1)
			this.getAllTipoAcciones();

		//Creando un objeto de TramiteMOvi
		this._tramiteService.newTramiteMovi()
			.subscribe(
				data => { this.tramiteMov = data;	
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
	//Cuando se leccion un registro
	selectPersonal(personalSelect: any,overlaypanel: OverlayPanel){
		this.tramiteMov.TrMoPersoIn=personalSelect.id_persona;
		this.tramiteMov.TrMoZona=personalSelect.id_zona;
		this.nombrePersonal=personalSelect.nombrecom;
		this.nombreCAPS=personalSelect.cap_per;
		 //overlaypanel.toggle(event);
		 overlaypanel.hide();
	}
	//Obtenidendo informacion de la BD de TipoAcciones
	private getAllTipoAcciones() {
			this._tipoAccionService.getAllTipoAcciones()
			.subscribe(
			data => { this.tipoAcciones1 = data;
					this.tipoAcciones2 = data;
					this.tipoAcciones3 = data;	
				},
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);
		
	}
	private derivarTramite(){
		   //llamando a la funcion para guardar
        this.tramiteMov.Id = this.selectedPendientePresentar.TrMoId;		
        this.tramiteMov.TramId = this.selectedPendientePresentar.Id;
       // $scope.tramiteMov.TrMoObserva = currentTramiteMov.TrMoObserva; Esto ya ta enlazado  al controlador input
        this.tramiteMov.trMoCopia = 0;
        this.tramiteMov.TrMoPersonLog = this.idUsuario;
        this.tramiteMov.TrMoCAP = this.idZona;// estamos usando esto temporalmente para enviar zona del usuario logueado
        this.tramiteMov.TrMoRecepciono = this.selectedPendientePresentar.TiTrAbrevia=="REC"?"true":"false";//TrMoRecepciono;// estamos usando esto temporalmente para indicar si esta recibido o no recibido
        this.tramiteMov.TrMoTraTramite = this.supervisor; //se esta usando temporalmente para enviar el supervisor
		//Guardar en BD
		 this._tramiteService.derivarTramiteMov(this.tramiteMov)
		 .subscribe(
			 realizar => {
			 	this.displayDialog=false;
				this.getAllPendiente(this.idCap,this.idUsuario,this.recibido.toString(),this.supervisor);
			 },
			 err => {
                console.log(err);// Log errors if any
             });	
	}

}
