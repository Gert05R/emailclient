import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// HTTP required for the async validator
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871000#notes
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Eager loading the AuthModule in this case
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule
  ],
  // providers is an old use of handling dependancy injection
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
