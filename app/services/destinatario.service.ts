import { Injectable } from '@angular/core';
import { Headers, Http ,Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DestinatarioService {
	private baseUrl: string = 'http://tramite-ronaldmam.rhcloud.com/rest/destinatario/';

	constructor(private http: Http) { }

	getAllDestinatarioByTram(tramId: number) {
		return this.http
			.get(this.baseUrl+"getalldestinatariobytram?tramid="+tramId) 
			.map((r: Response) => r.json() )             
			.catch(this.handleError);
	}
	 // delete Destinatario
	deleteDestinatario(id:number){
		return this.http.post(this.baseUrl+ "delete/", id) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
	}

	save(_destinatario:Object){
		return this.http.post(this.baseUrl+ "save", _destinatario) // ...using post request
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
