import { Component, OnInit } from '@angular/core';
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871116#questions
import { FormGroup, FormControl,Validators } from '@angular/forms'
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871160#questions
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
    //Use a regular expression to make sure only alphanumeric characters are used
    Validators.pattern(/^[a-z0-9]+$/)]),
    password: new FormControl('', [Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)])
  });

  constructor(private authservice: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871124#questions
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.authservice.signin(this.authForm.value).subscribe({
      next: () => {
        //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871160#questions
        this.router.navigateByUrl('inbox');
      },
      error: ({error}) => {
        if ( error.username || error.password) {
          // the object { credentials: true} will show up on the error as property of the authform itself
          this.authForm.setErrors({ credentials: true});
        }

      }

    });
  }

}
