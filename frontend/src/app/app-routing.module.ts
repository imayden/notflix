import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';



const routes: Routes = [
  { path: '', component: WelcomeComponent }, // Welcome Page
  { path: 'signin', component: SigninComponent }, // Signin
  { path: 'signup', component: SignupComponent }, // Signup
  { path: 'home', loadChildren: () => import('./modules/home.module').then(m => m.HomeModule) }, // Home Page
  { path: 'movie/:id', component: MovieDetailComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
