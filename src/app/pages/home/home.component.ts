import {Component, OnInit} from '@angular/core';
import {FormationService, FormationsInterface} from '../../services/formation.service';
import {FormateurService, FormateursInterface} from '../../services/formateur.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public formationList: FormationsInterface[] = [];
  public formateurList: FormateursInterface[] = [];

  constructor(private formationService: FormationService, private formateurService: FormateurService) {
  }

  ngOnInit(): void {

    // chargement des données depuis le back-end
    this.formationService.loadFormations();
    this.formateurService.loadFormateurs();

    // Abonnement aux modifications sur les notes
    this.formationService.formationsListChanged.subscribe(data => this.formationList = data.filter((item) => {
      return item.type === 'À distance';
    }));
    this.formateurService.formateursListChanged.subscribe(data => this.formateurList = data);
  }
}
