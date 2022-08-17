// https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17870994#notes

  import { Injectable } from '@angular/core';
  import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
  import { Observable, tap, filter } from 'rxjs';

  //to run the interceptor, add this class to the App module file
  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871000#notes
  @Injectable()
  export class AuthHttpInterceptor implements HttpInterceptor {
    //we can use the intercept method, to look at the response that is coming back from thes erver as well
    //Within the interceptor, we get access to an observable
    // explanation on intercept https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871028#questions
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      //you cannot directly update the req Object, that's why you create a clone and update the with credentials field
      //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871018#notes
      //Here we Modify or log the outgoing request
      const modifiedReq = req.clone({
        withCredentials: true
        //,url: ''
      });

      return next.handle(modifiedReq);

//HttpEventType tells us something abou the events coming out of the obeservable generated y the interceptor
// How to watch for events around our request:
//return next.handle(modifiedReq)
      //.pipe(
        //filter(val => val.type === HttpEventType.Sent),
        //tap(val =>{
          //  if (val.type === HttpEventType.Sent) {
            //  console.log('Request was sent to server')
            //}
            //if (val.type === HttpEventType.Response) {
            //  console.log('Got a response from the API', val)
            //}
        //})
      //)
    }
  }

