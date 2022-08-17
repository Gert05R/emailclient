import { Injectable } from '@angular/core';
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871236#questions/9229912
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Email} from './email';

interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}


@Injectable({
  providedIn: 'root'
})


export class EmailService {
  rootUrl = 'https://api.angular-email.com';

  constructor(private http: HttpClient) { }

  getEmails() {
    // the angle brackets specify we ar getting back an array, not that the type is an array
    return this.http.get<EmailSummary[]>(`${this.rootUrl}/emails`);
    //,{withCredentials: true} not necassary as the interceptor has already been authored.
  }
  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871718#questions/9229912
  getEmail(id: string) {
    return this.http.get<Email>(`${this.rootUrl}/emails/${id}`);
  }
  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884178#questions
  sendEmail(email: Email) {
    return this.http.post(`${this.rootUrl}/emails`, email);


  }
}
