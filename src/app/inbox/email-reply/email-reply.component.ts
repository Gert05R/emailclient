import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent  {
  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884194#questions
  showModal = false;
  @ Input() email: Email

  constructor(private emailservice: EmailService) { }
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884216#questions
  ngOnChanges(): void {
    const text= this.email.text.replace(/\n/gi, '\n> ');

    //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884200#questions
    this.email= {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n-------- ${this.email.from} wrote:\n>${text}`

    }
  }

  onSubmit(email: Email) {
    //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884206#questions
    this.emailservice.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });

  }

}
