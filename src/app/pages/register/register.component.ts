import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserInterface, UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {MustMatch} from '../../helpers/must-match.validator';

let emailAlreadyUsed = false;

function uniqueEmailValidator(control: FormControl) {
  if (emailAlreadyUsed) {
    return {emailAlreadyUsed: true};
  }
  return null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(public userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router
  ) {

  }

  public user: UserInterface;
  form: any = {};
  isSuccessful = false;
  errorMessage = '';

  resetEmailAlreadyUsed() {
    emailAlreadyUsed = false;
    this.registerForm.get('mail').updateValueAndValidity();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      prenom: ['Tintin', Validators.required],
      nom: ['Milou', Validators.required],
      mail: ['tintin@free.fr', [Validators.required, Validators.email, uniqueEmailValidator]],
      mdp: ['Test1234*', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      mdpConfirmation: ['Test1234*', Validators.required],
    }, {
      validator: MustMatch('mdp', 'mdpConfirmation')
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.registerForm.invalid) {
      this.userService.register(this.registerForm.value).subscribe(
        data => {
          console.log(data)
          if (data.errno === 1062) {
            emailAlreadyUsed = true;
            this.registerForm.get('mail').updateValueAndValidity();
          // } else if (data.error === 'pwdFail') {
          //   this.notMatchRegex = true;
          } else if (data.error === 'registered') {
            this.isSuccessful = true;
            setTimeout(() => this.router.navigateByUrl('/home'), 5000);
          }
        },
        err => {
          console.log('err: ' + err);
          this.errorMessage = err.error.message;
          console.log(this.errorMessage)
        }
      );
    }
  }
}
