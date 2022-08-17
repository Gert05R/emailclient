//requires dependancy injection from the signup class.
//First make the HTTP client available through the App module
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17869428#questions/14966032
//can only use dependancy injection if this class itself is wired up using dependency injection or if it's
// wired up as a component , a decorator a service and so on
import { Injectable } from "@angular/core";
//import is deleted as the auth service class was implemented by refactoring
//import { HttpClient } from "@angular/common/http";
import { AbstractControl, AsyncValidator, FormControl } from "@angular/forms";
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17869542#notes
import { map, catchError, observable, of } from "rxjs";

//new import for the auth service
import { AuthService } from "../auth.service";

@Injectable({ providedIn: 'root'})
export class UniqueUsername implements AsyncValidator{

  constructor(private authservice: AuthService) {}
  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17869438#questions/14966032
  //validate (control: AbstractControl) {
  validate = (control: AbstractControl):any => {

    const { value } = control;
    //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17869440#notes
    //this is the refactored code, with an authservice
    return this.authservice.usernameAvailable(value).pipe(
      // No checking required, the function and value only goes through if the request was succesfull
      map(() => {
        return null;
      }),
      //we have to return a new observable with catcherror
      catchError(err => {
        if (err.error.username) {
          // Off operator is a shortcut for creating a new operator
        return of({ nonUniqueUsername: true });
        }
        else {
          return of({ noConnection: true });
        }

      }
      )
      );
  };
}
