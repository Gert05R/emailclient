import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  //lazy loading
  // adding a guard to prevent access to unauthorized users, the guard needs to be in front as it should prevent the code from executing (https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871172#questions)
//https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17871148#questions
{  path: 'inbox',
//This is an array because we can have multiple different guars on one individual rout,
//we might want to check on multiple different conditions before we grant access to the rout.
    canLoad: [AuthGuard],
  loadChildren: () => import('./inbox/inbox.module').then(mod => mod.InboxModule)
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
