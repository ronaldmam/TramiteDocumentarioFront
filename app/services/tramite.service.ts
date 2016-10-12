import { Injectable } from '@angular/core';
import { Headers, Http ,Response} from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TramiteService {
	private baseUrl: String = 'http://localhost:8081/TramiteDocumentarioJava/rest/tramites/';
   	private baseUrl2: String = 'http://localhost:8081/TramiteDocumentarioJava/rest/tramitesmovi/';
   	private tramitesPendiente:string[];
   	constructor(private http: Http) { }
   	getAllPendiente(codcap: string, id_usuario:string) {
    	return this.http
               .get(this.baseUrl2+ 'getalltramitemovbyrecibir?codcap=${codcap}&id_usuario=${id_usuario}')
               .map((r: Response) => r.json().data )
               .catch(handleError);
    }

	}

 // this could also be a private method of the component class
function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}

    