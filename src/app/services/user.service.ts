import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const URL = 'http://localhost:3000/inscription';

export interface UserInterface {
  id: number;
  nom: string;
  prenom: string;
  mail: string;
  mdp: string;
  roleId: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: UserInterface;


  constructor(private http: HttpClient) {
  }

  public insertUser(user) {
    this.http.post(URL, user).subscribe((data: UserInterface) => {
    });
  }
}
