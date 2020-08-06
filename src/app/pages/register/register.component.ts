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

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const userInput = form.value;
    console.log(userInput);
    if (!form.errors && form.touched) {
      this.userService.insertUser(userInput);
      this.router.navigateByUrl('/home');
    }
  }
}
