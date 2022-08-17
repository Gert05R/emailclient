import { Component, OnInit } from '@angular/core';
import { Email } from '../email';
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884170#questions
import { AuthService } from 'src/app/auth/auth.service';
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884178#questions
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  showModal= false;
  //Imports the email interface
  email: Email;

  constructor(private authService: AuthService,
    private emailservice: EmailService) {
    //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884124#notes
    this.email= {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884170#questions
      from: `${authService.username}@angular-email.com`
    };
   }

  ngOnInit(): void {
  }

  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884172#questions
  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884178#questions
  onSubmit(email: Email) {
    //Send the email off via the email service
    this.emailservice.sendEmail(email).subscribe(() => {
      //closes the email modal
      this.showModal = false;
    });
  }

}

