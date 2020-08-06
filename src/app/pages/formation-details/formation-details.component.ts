import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormationService, FormationsInterface} from '../../services/formation.service';

@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.css']
})
export class FormationDetailsComponent implements OnInit {

  public formation: FormationsInterface;

  constructor(private activeRoute: ActivatedRoute, private formationService: FormationService) { }

  ngOnInit(): void {

    this.formation = this.formationService.getFormationsById(
      parseInt(this.activeRoute.snapshot.paramMap.get('id'), 10)
    );
  }

}
