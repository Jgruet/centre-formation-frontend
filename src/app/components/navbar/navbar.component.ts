import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, public userService: UserService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.userService.user = this.tokenStorageService.getUser();
    console.log(this.userService.user);
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
