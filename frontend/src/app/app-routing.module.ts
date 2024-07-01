import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SignupComponent } from './components/signup/signup.component';



const routes: Routes = [
  { path: '', component: WelcomeComponent }, // Home
  { path: 'signin', component: SigninComponent }, // Signin
  { path: 'signup', component: SignupComponent } // Signup
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
