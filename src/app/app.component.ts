import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17869766#overview
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Refactor of the code https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17869776#questions
  signedin$: BehaviorSubject<boolean>;

  constructor (private authService: AuthService) {
    this.signedin$ = this.authService.signedIn$;
  }
  // start to lsiten to an observable
  //ngOnInit() {
    //this.authService.signedIn$.subscribe(signedin => {
      //this.signedin = signedin;
      //console.log(signedin);
    //}
    //)};

    //checks if we are signed in https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17870978#questions
    ngOnInit() {
      this.authService.checkAuth().subscribe(()=> {

      });
    }
}
