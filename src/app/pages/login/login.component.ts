import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TokenStorageService } from '../../services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public showPassword = false;

  form: any = {mdp:''};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private userService: UserService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    console.log(this.form);
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    console.log(this.form);
    this.userService.login(this.form).subscribe(
      data => {

        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.userService.user = data;
        console.log(data);

        this.isLoginFailed = false;
        this.userService.isloggedIn = true;
        this.roles = this.tokenStorage.getUser().roleId;
        this.router.navigateByUrl('/home');
      },
      err => {
        console.log('test');
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(this.errorMessage);
      }
    );
  }
}
