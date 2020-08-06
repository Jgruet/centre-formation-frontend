import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

// Création d'une interface pour l'enregistrement des données
export interface FormationsInterface {
  id: number;
  titre: string;
  duree: number;
  date_debut: Date;
  date_fin: Date;
  description: string;
  lieu: string;
  type: string;
}

const URL = 'http://localhost:3000/formations';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  // variables chargée de stockées la liste des formations
  public formationsList: FormationsInterface[] = [];

  // Définition de l'abonnement de notification
  public formationsListChanged: Subject<FormationsInterface[]>;

  constructor(private http: HttpClient) {
    this.formationsListChanged = new Subject<FormationsInterface[]>();
  }

  public loadFormations(): void {
    this.http.get(URL).subscribe((result: FormationsInterface[]) => {
      this.formationsList = result;
      this.formationsListChanged.next(result);
    });
  }

  public getFormationsById(id: number): FormationsInterface {
    return this.formationsList.find((item) => item.id === id);
  }

}


