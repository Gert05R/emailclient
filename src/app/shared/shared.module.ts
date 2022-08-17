import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
// https://stackoverflow.com/questions/43220348/cant-bind-to-formcontrol-since-it-isnt-a-known-property-of-input-angular
//Need this to bind the input component with the formcontrol element.
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    InputComponent,
    ModalComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  //Add in the inputcomponent as an export, so we can get access to the input component
  //from other modules inosde of our project
  // add in the sharedmodule to the Auth.module.ts file

  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884104#notes
  exports: [InputComponent, ModalComponent]
})
export class SharedModule { }
