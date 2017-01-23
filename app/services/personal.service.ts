import { Injectable } from '@angular/core';
import { Headers, Http ,Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PersonalService {
	private baseUrl: string = 'http://tramite-ronaldmam.rhcloud.com/rest/personal/';

	constructor(private http: Http) { }

	getAllPersonalByArea(codcap: string) {
	return this.http
			.get(this.baseUrl+"getrhppersobyareacap/"+codcap) 
			.map((r: Response) => r.json() )             
			.catch(this.handleError);
	}
	searchPersonalByTerm(termino: string) {
	return this.http
			.get(this.baseUrl+"getrhppersobyterm?term="+termino) 
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
