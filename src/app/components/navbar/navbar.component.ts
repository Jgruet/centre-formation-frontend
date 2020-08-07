import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  role: number;
  id: number;
  isLoggedIn = false;
  fullName: string;

  constructor(private tokenStorageService: TokenStorageService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getRole().subscribe((data: any) => {
      this.id = data.id;
      this.role = data.role;
    });

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = user.role;
      console.log(this.role)

      this.fullName = user.nom + ' ' + user.prenom;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
