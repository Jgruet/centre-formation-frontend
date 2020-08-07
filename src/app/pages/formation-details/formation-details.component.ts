import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormationService, FormationsInterface} from '../../services/formation.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.css']
})
export class FormationDetailsComponent implements OnInit {

  public formation: FormationsInterface = {
    id: null,
    titre: null,
    duree: null,
    date_debut: null,
    date_fin: null,
    description: null,
    lieu: null,
    type: null,
  };

  constructor(private activeRoute: ActivatedRoute, private formationService: FormationService, public userService: UserService) { }

  ngOnInit(): void {

    const id = parseInt(this.activeRoute.snapshot.paramMap.get('id'), 10);

    this.formationService.loadFormationsDetails(id);
    this.formationService.formationsChanged.subscribe(data => this.formation = data);

    console.log(this.userService.user);

  }

}
