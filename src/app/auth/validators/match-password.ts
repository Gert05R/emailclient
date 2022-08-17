//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17869392#questions
import { AbstractControl, FormGroup, Validator } from "@angular/forms";
// make this class injectable for dependancy injection in the signup-component class
// https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17869422#questions
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class MatchPassword implements Validator{
  // In case not sure if you want to use FormGroup or Formcontrol as a parameter to the validator function
  //Use validate(control: AbstractControl) {}
  validate( formGroup: AbstractControl) {
    const { password, passwordConfirmation } = formGroup.value;

    if (password === passwordConfirmation) {
      return null;
    } else {

    //This first object will be assigned to the errors property of your Formcontrol/Formgroup
    //authForm.errors === {passwordsDontMatch: true}
    return { passwordsDontMatch: true};}

  }
}
