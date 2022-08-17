//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17869552#overview
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17869766#overview
import { BehaviorSubject, tap } from 'rxjs';

interface UsernameAvailableResponse {
  availbale: boolean;
}
//interface can also be incroporated in a seperate file
interface SignupCredentials {
  username?: string;
  password?: string;
  passwordConfirmation?: string;
}

interface SigninCredentials {
  username?: string;
  password?: string;
}

//interface that describes the repsonse that is flowing back from the post request as an observble?
// by this, the signup function in singup component knows that the repsonse is of tyths type
interface SignupResponse{
  username: string;
}

interface SingedinResponse {
  authenticated: boolean;
  username: string;
}

interface signinReponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  //Community convention to put a $dollar sign on an observable
  //Recieve a default value of null, see guards course
  signedIn$ = new BehaviorSubject(null);
  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884170#questions
  username= '';

  constructor(private http: HttpClient) { }

  //make our network request inside of here and return the observable
  //Implement this method in unique-username, where the body was located
  //
  usernameAvailable(userName: string) {
    // Type literal, {available: boolean}. THIS IS THE REPONSE YOU GET FROM THE WEBCALL
    // https://api.angular-email.com/auth/username when the username is/isn't available
    //other syntax:
    //return this.http.post<any>('https://api.angular-email.com/auth/username', {
    // No Interaface syntax:
    //return this.http.post<{available: boolean}>('https://api.angular-email.com/auth/username', {
    return this.http.post<UsernameAvailableResponse>( this.rootUrl + '/auth/username', {
      username: userName
    })
  }
  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17869670#questions
   //this method should receive all the different values out of our form
   //Credentials should be an object that receive a password, username, passwordconfirmation
   Signup(credentials: SignupCredentials) {
    // the <> tells typescript what type of data it will receive back from the request.
    return this.http.post<SignupResponse>(
      // as a second argument we need to pass in some info, that will be used in the body of the request, so in this case the object credentials
      `${this.rootUrl}/auth/signup`, credentials).pipe(
    //tap enables us to reach in, intercept a value, and do something based upon it.
    //https://www.learnrxjs.io/learn-rxjs/operators/utility/do
    // errors skip over the tap operator, which is what we want.
    // Explanation on Observable execution types: Next, error, complete
    //https://rxjs.dev/guide/observable
    tap(( { username }) => {
      this.signedIn$.next(true); //Now we are singed up/in
      this.username = username;
    })
    );
   }
   //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17870978#questions
   //Call this method from our app component to check if a user is signed in, this has to be checked everytie the app loads => ngoninit
   // To handle cookies, add in a third object on the post/ge HTTP requests https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17870986#notes
   // https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871046#questions
   checkAuth() {
    return this.http.get<SingedinResponse>(`${this.rootUrl}/auth/signedin`).pipe(
      tap(({ authenticated, username }) => {
        this.signedIn$.next(authenticated);
        this.username = username;
      })
    );
   }
   //post request requires a body
   //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871056#questions
   signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {})
    .pipe(
      tap(() => {
        this.signedIn$.next(false);
      })
    )
   }

   signin(credentials: SigninCredentials) {
    //If you provide a wrong username and password, this request will result in an error and will skip over the tap statements
    return this.http.post<signinReponse>(`${this.rootUrl}/auth/signin`, credentials).pipe(
      tap(( { username }) => {
        this.signedIn$.next(true); //Now we are singed in
        //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884170#questions
        this.username= username;
      })
    )
   }

}
