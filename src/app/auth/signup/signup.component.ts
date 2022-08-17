import { Component, OnInit } from '@angular/core';
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17869368#questions
// Validators class gves access to validators like required, minlength
//https://angular.io/guide/form-validation
//https://angular.io/api/forms/Validators is a list of validators
import { FormGroup, FormControl, Validators, RequiredValidator } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
//Need to use dependancy injection, as this will create an instance of the authservice. When we import just authserivce, that is the class
import { AuthService } from '../auth.service';
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871160#questions
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // bind the Formgroup in the HTML template [formGroup],
   // bind the 3 different control elements to input fields in the html - formControlName
  authForm = new FormGroup({
    //Validatos need to be added as a second argument to the formcontrol element as an arry
    username: new FormControl('', [
      //This array of validators is reserved for synchronous validators
      //you need to add in third a list of async validators
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      //Use a regular expression to make sure only alphanumeric characters are used
      Validators.pattern(/^[a-z0-9]+$/)
    ], [
      this.uniqueUsername.validate
    ]
    ),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17869422#questions
//apply a second object to the formgroup, pass in the validate function from match-password,
//through dependancy injection (remark match-password class must be modified as injectable)
  }, { validators: [this.matchPassword.validate] }
  );

  constructor(private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  // https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17869670#questions
  onSubmit() {
    //make a check if the vorm is valid
    if (this.authForm.invalid) {
      return;
    }
    //if vaid, reach out to our auth service, an RXJS observable will be returned (when we have an observale, none of the code inside will be executed untill we subscribe to it)
    // We will not make our post request untill we subscribe to the observale that has returned.
    // subscribe can handle different type of arguments, we add in an object
    //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17869690#questions
    this.authService.Signup(this.authForm.value)
    .subscribe({
      next: response => {
        //Navifate to some other route https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871160#questions
        this.router.navigateByUrl('inbox');

      },
      error: (err) => {
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true })
        } else {
          this.authForm.setErrors({unknownError: true});
        }
      }

    });
  }

}
