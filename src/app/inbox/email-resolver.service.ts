import { Injectable } from '@angular/core';
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871764#notes
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871792#notes
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router'
import { catchError, EMPTY } from 'rxjs';
import { Email } from './email';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {

  constructor(private emailService: EmailService, private router: Router) { }
  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871776#notes
  resolve(route: ActivatedRouteSnapshot) {
    //console.log(route);
    const { id } = route.params;
    //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871786#notes
    return this.emailService.getEmail(id)
    //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871792#notes
    .pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');

        return EMPTY;
      })

    )
    ;
  }
}
