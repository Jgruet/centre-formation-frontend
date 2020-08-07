import { Component, OnInit } from '@angular/core';
import {FormateurService,  FormateursInterface} from '../../services/formateur.service';

@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.css']
})
export class FormateurComponent implements OnInit {

  public formateurList: FormateursInterface[] = [];

  constructor(private formateurService: FormateurService) { }

  ngOnInit(): void {

    // chargement des données depuis le back-end
    this.formateurService.loadFormateurs();

    // Abonnement aux modifications sur les notes
    this.formateurService.formateursListChanged.subscribe(data => this.formateurList = data);
  }

}
