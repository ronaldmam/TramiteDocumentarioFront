import { Injectable } from '@angular/core';
import { Headers, Http ,Response} from '@angular/http';
import '../rxjs-extensions';
import { Observable } from 'rxjs/Rx';

//import 'rxjs/add/operator/toPromise';

@Injectable()
export class TramiteService {
	//private baseUrl: string = 'http://localhost:8081/TramiteDocumentarioJava/rest/tramites/';
	private baseUrl: string = 'http://tramite-ronaldmam.rhcloud.com/rest/tramites/';
	//private baseUrl2: string = 'http://localhost:8081/TramiteDocumentarioJava/rest/tramitesmovi/';
	private baseUrl2: string = 'http://tramite-ronaldmam.rhcloud.com/rest/tramitesmovi/';
	private tramitesPendiente:string[];
	constructor(private http: Http) { }

	getAllEmitidos(codcap: string) {
	return this.http
			.get(this.baseUrl+ "getalltramitesenv/"+codcap) 
			.map((r: Response) => r.json() )             
			.catch(this.handleError);
	}
	getAllPendiente(codcap: string, id_usuario:string, recibido:string,superv:number) {
	return this.http
			.get(this.baseUrl2+ 'getalltramitemovbyrecibir?codcap='+codcap + "&id_usuario=" + id_usuario + "&recibido=" + recibido + "&superv=" + superv) //${codcap}&id_usuario=${id_usuario}&recibido=${recibido}&superv=${superv}'
			.map((r: Response) => r.json() )
			//.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
			.catch(this.handleError);

	}
	getAllMovimientoTramite(_trMoid:number){
		return this.http
			.get(this.baseUrl2+ 'getalltramitemovbytramite?trMoid='+_trMoid )
			.map((r: Response) => r.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	getTramiteById(_trMoid:number){
		return this.http
			.get(this.baseUrl+ _trMoid )
			.map((r: Response) => r.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	newTramite(){
		return this.http
			.get(this.baseUrl+ 'new')
			.map((r: Response) => r.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));

	}


	saveTramite(_tramiteEnvio:Object){
		return this.http.post(this.baseUrl+ "save", _tramiteEnvio) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
	}

	enviarTramite(_idTramite:number, _idzona:number, _usuarioLog:string) {
		return this.http
			.get(this.baseUrl+ "enviartramite?tramiteid=" + _idTramite + "&zonaid=" + _idzona + "&usuarioLog=" + _usuarioLog)
			.map((r: Response) => r.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	
	deleteTramite(_idTramite:number){
		return this.http.post(this.baseUrl+ "delete/"+_idTramite, _idTramite) // ...using post request
						.map((res:Response) => res.json()) // ...and calling .json() on the response to return data
						.catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
	}

	// this could also be a private method of the component class
	handleError (error: any) {
	// log error
	// could be something more sofisticated
	let errorMsg = error.message;// || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
	console.error(errorMsg);

	// throw an application level error
	return Observable.throw(errorMsg);
	}

}


    