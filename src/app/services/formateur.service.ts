import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

// Création d'une interface pour l'enregistrement des données
export interface FormateursInterface {
  id: number;
  nom: string;
  prenom: string;
}

const URL = 'http://localhost:3000/formateurs';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  // variables chargée de stockées la liste des formations
  public formateursList: FormateursInterface[] = [];

  // Définition de l'abonnement de notification
  public formateursListChanged: Subject<FormateursInterface[]>;

  constructor(private http: HttpClient) {
    this.formateursListChanged = new Subject<FormateursInterface[]>();
  }

  public loadFormateurs(): void {
    this.http.get(URL).subscribe((result: FormateursInterface[]) => {
      this.formateursList = result;
      this.formateursListChanged.next(result);
    });
  }
}
