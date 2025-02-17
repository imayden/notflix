import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SignupComponent } from './components/signup/signup.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { authGuard } from './core/guards/auth.guard';
import { MovieDetailResolver } from './core/resolvers/movie-detail.resolver';
import { LoadingComponent } from './components/loading/loading.component';


const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule), canActivate: [authGuard] },
  // { path: 'movie/:id', component: MovieDetailComponent, canActivate: [authGuard] },
  {
    path: 'movie/:id',
    // canActivate: [authGuard],
    component: MovieDetailComponent,
    resolve: {
      movie: MovieDetailResolver
    }
  },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'loading', component: LoadingComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
