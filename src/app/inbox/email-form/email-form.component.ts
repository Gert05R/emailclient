import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884124#notes
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Email } from '../email';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  // we only want to initialize after we got the email from the parent component, that's why ngoninit
  emailForm: FormGroup;
  @Input() email: Email;
  @Output() emailSubmit = new EventEmitter();


  constructor() {

   }

  ngOnInit():any  {
    //https://stackoverflow.com/questions/70976866/cannot-destructure-property-as-undefined
    const { subject, from, to,text} = this.email || {};
    //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884148#notes
    this.emailForm= new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({value: from, disabled: true}),
      subject: new FormControl(subject ,[Validators.required]),
      text: new FormControl(text,[Validators.required])



    });
    console.log(this.emailForm.get('from'));
  }
  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884172#questions
  //in case you want to display a disabled field of form: .getRawValue()
  onSubmit() {
    if(this.emailForm.invalid) {
      return;
    }
    //console.log(this.emailForm.getRawValue());

    this.emailSubmit.emit(this.emailForm.value);
  }

}
