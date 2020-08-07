import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  role: string;
  isLoggedIn = false;
  fullName: string;

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = user.role;


      this.fullName = user.nom + ' ' + user.prenom;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
