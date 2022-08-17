import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../email.service';
import { switchMap } from 'rxjs';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871756#notes
  email: Email;

  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871656#questions/9229912
  constructor(private route: ActivatedRoute,
    //No longer needed because of the resolver
    //private emailService: EmailService
    ) {
      //this is where the data is coming from the resolver
      //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871776#notes
      //The email is proveded through the resolver (the resolver is available through dependeancy injection on the route: ActivatedRoute?)
      this.email = route.snapshot.data.email;
      this.route.data.subscribe(( { email }) => {
        this.email = email;
      });
    }

  ngOnInit(): void {

    //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871708#questions/9229912
    //Snapshot vs observables
    //making using of Snpashot (what the condition of the URL is at a specific instant)
    //
    //console.log(this.route);
    //console.log(this.route.snapshot.params.id);


    //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871718#questions/9229912
    //MAKING USE OF BEHAVIOURSUBJECT/Observable/Use the observable
    //this.route.params.subscribe(({ id }) => {
      //this.emailService.getEmail(id).subscribe(email => {
        //console.log(email);
      //});
    //});

    //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871724#questions/9654540

    //this.route.params
    //.pipe(
    //  switchMap(( { id }) => {
    //    return this.emailService.getEmail(id);
    //  })
    //).subscribe(email => {
    //  this.email = email;
    // });

    //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871776#notes
    //All the data fetching is now moved into the resolver.


  }

}
