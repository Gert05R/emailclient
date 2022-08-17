import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871302#questions/9229912
@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css']
})
export class EmailIndexComponent implements OnInit {
  emails= [];

  constructor(private emailService: EmailService) { }

  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871434#questions/9229912
  ngOnInit(): void {
    this.emailService.getEmails()
    .subscribe((emails) => {
      this.emails = emails;
    });
  }

}
