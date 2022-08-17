//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17869556#overview
import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() inputType: string; // for password inputs (**)
  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884166#notes
  @Input() controlType= 'input';

  constructor() { }

  ngOnInit(): void {
  }
  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17869618#questions/17424396
  showErrors() {
    const { dirty, touched, errors} = this.control;
    return dirty && touched && errors;

  }
}
