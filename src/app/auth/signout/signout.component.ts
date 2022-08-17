import { Component, OnInit } from '@angular/core';
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871066#questions
//Need access to our authservice
import { AuthService } from '../auth.service';
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871074#questions
// get acces to an instance of our application router using dependency injection
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private authservice: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.authservice.signout().subscribe(() => {
      //Navigate the user back to the root page
      this.router.navigateByUrl('/')
    })
  }

}
