import { Injectable } from '@angular/core';
import { Headers, Http ,Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TipoAccionService {
	private baseUrl: string = 'http://tramite-ronaldmam.rhcloud.com/rest/tipoaccion/';
	//private baseUrl2: string = 'http://localhost:8081/TramiteDocumentarioJava/rest/tramitesmovi/';
	
	constructor(private http: Http) { }

	getAllTipoAcciones() {
	return this.http
			.get(this.baseUrl) 
			.map((r: Response) => r.json() )             
			.catch(this.handleError);
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
