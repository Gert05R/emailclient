import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailShowComponent } from './email-show/email-show.component';
// https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871148#questions
import { HomeComponent } from './home/home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871776#notes
import { EmailResolverService } from './email-resolver.service';
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871792#notes
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [

  // path string is epty for lazy loading, routing will be added to the app routing module with a precise path
  //Appmodule will specify: rout inbox => inbox Module +'' = Homecomponent of the inbox module
  //Child component routing is added in to show the email and placeholder
  //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871446#questions/9229912
  { path: '',
  component: HomeComponent,
  children: [
    //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871792#notes
    {
      path: 'not-found',
      component: NotFoundComponent
    },
    //We want to show any rout/url that looks like inbox/anything, the second part of the url is going to be a wildcard.
    //with the colon, we are catching any variable or any string whatsoever, whatever we capture with the url we are going to call id.
    //https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871446#questions/9229912
    { path: ':id', component: EmailShowComponent,
      resolve : {
        email: EmailResolverService
      }},
    { path:'', component: PlaceholderComponent}
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
