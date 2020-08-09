import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {Router} from '@angular/router';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {MustMatch} from "../../helpers/must-match.validator";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public showPassword = false;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loginForm: FormGroup;
  submitted = false;

  constructor(private userService: UserService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.loginForm = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      mdp: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const userLogins = this.loginForm.value
    this.userService.login(userLogins).subscribe(
      data => {
        console.log(data.id)
        if (data.id) {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

          this.userService.user = data;

          this.isLoginFailed = false;
          this.userService.isloggedIn = true;
          this.roles = this.tokenStorage.getUser().roleId;
          this.router.navigateByUrl('/home');
        }else{
          this.isLoginFailed = true;
        }
      },
      err => {
        console.log('test');
        this.isLoginFailed = true;
      }
    );
  }
}
