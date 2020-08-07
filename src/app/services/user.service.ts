import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const URL = 'http://localhost:3000/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

export interface UserInterface {
  id: number;
  nom: string;
  prenom: string;
  mail: string;
  mdp: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: UserInterface;

  public isloggedIn = false;

  constructor(private http: HttpClient) {
  }

  public register(user): Observable<any> {
    return this.http.post(URL + 'inscription', user, httpOptions);
  }

  login(user): Observable<any> {
    return this.http.post(URL + 'connexion', user, httpOptions);
  }
}
