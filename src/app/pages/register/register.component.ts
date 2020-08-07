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
 form: any ={};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    this.user = form.value;


    this.userService.register(this.user).subscribe(
      data => {
        if (data != null) {
          throw data.message;
        }
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {

        this.errorMessage = err.error.message;
        console.log(this.errorMessage)
        this.isSignUpFailed = true;
      }
    );
  }
}
