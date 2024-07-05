import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';



const routes: Routes = [
  { path: '', component: WelcomeComponent }, // Welcome Page
  { path: 'signin', component: SigninComponent }, // Signin
  { path: 'signup', component: SignupComponent }, // Signup
  { path: 'home', component: HomeComponent } // Home Page
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
