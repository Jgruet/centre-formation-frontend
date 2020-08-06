import {Component, OnInit} from '@angular/core';
import {FormationService, FormationsInterface} from '../../services/formation.service';


@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

  public formationList: FormationsInterface[] = [];

  constructor(private formationService: FormationService) {
  }

  ngOnInit(): void {

    // chargement des données depuis le back-end
    this.formationService.loadFormations();

    // Abonnement aux modifications sur les notes
    this.formationService.formationsListChanged.subscribe(data => this.formationList = data);
  }
}
