import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
	private _url = "http://jsonplaceholder.typicode.com/users";

	constructor(private _http: Http){
	}

	getUsers(){
		return this._http.get(this._url).map(res => res.json());
	}

	getUser(id){
		return this._http.get(this.getBaseUrl(id)).map(res => res.json());
	}

	updateUser(user){
		return this._http.put(this.getBaseUrl(user.id), JSON.stringify(user)).map(res => res.json());
	}

	deleteUser(user){
		return this._http.delete(this.getBaseUrl(user.id)).map(res => res.json());
	}

	addUser(user){
		return this._http.post(this._url, JSON.stringify(user)).map(res => res.json());
	}

	private getBaseUrl(id){
		return this._url + "/" + id;
	}
}
