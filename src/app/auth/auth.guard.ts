import { Injectable } from '@angular/core';
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871222#questions
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871214#questions
import { AuthService } from './auth.service';
import { take, skipWhile, tap } from 'rxjs';
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871172#questions


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authservice: AuthService,
    private router: Router) {}

  //canLoad watches the observable untill it is marked complete, it then looks at the last value
  //emitted and uses that for its deciision, observer must be marked as being complete (subscriber.complete();)
  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871190#questions
  //
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // true means, allow the suer to navigate to this route, false not
    //This lets canload know if the user is signed or not, (boolean true or not for canload)
      return this.authservice.signedIn$.pipe(
        //skip a value that is equels to null of the signedin$ value, we don't have an answer yet to the question if the user is signed in or not
        skipWhile(value => value === null),
        // as soon we get one value out of skipwhile, we fake or let the subscriber think the observable is complete
        take(1),
        //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871222#questions
        tap((authenthicated) => {
          if (!authenthicated) {
            this.router.navigateByUrl('/');
          }
        })
      );
  }
}
