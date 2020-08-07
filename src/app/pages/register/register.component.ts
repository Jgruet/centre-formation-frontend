import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserInterface, UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public userService: UserService,
              private router: Router,
  ) {
  }

  public user: UserInterface;
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.user = form.value;
    console.log(form.value);
    if (form.value.mdp !== form.value.mdpConfirmation) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      this.isSignUpFailed = true;
    } else {
      this.userService.register(this.user).subscribe(
        data => {
          console.log(data);
          if (data.errno === 1062) {
            this.errorMessage = 'L\'adresse email est déjà utilisée';
            this.isSignUpFailed = true;
          } else if (data.error === 'pwdFail') {
            this.errorMessage = 'Le mot de passe est invalide';
            this.isSignUpFailed = true;
          } else if (data.message === 1) {
            this.isSuccessful = true;
            this.isSignUpFailed = false;
          }
          if (data != null) {
            throw data.message;
          }
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          console.log(err);
          this.errorMessage = err.error.message;
          console.log(this.errorMessage)
          this.isSignUpFailed = true;
        }
      );
    }

  }
}
