import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { QuestionsComponent } from './components/questions/questions.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupChoosePlanComponent } from './components/signup-choose-plan/signup-choose-plan.component';
import { SignupChooserightPlanComponent } from './components/signup-chooseright-plan/signup-chooseright-plan.component';
import { SignupFinishSetupComponent } from './components/signup-finish-setup/signup-finish-setup.component';
import { SignupCreateAccountComponent } from './components/signup-create-account/signup-create-account.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AuthService } from './services/auth.service';
import { CoreModule } from './core/core.module';
import { DecimalPipe, DatePipe } from '@angular/common';
import { SharedModule } from './shared/shared.module';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorFnInterceptor } from './core/interceptors/error-fn.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LanguageSelectorComponent,
    WelcomeComponent,
    GetStartedComponent,
    QuestionsComponent,
    SigninComponent,
    SignupComponent,
    SignupChoosePlanComponent,
    SignupChooserightPlanComponent,
    SignupFinishSetupComponent,
    SignupCreateAccountComponent,
    MovieDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    YouTubePlayerModule,
    SharedModule,
    CoreModule
  ],
  providers: [
    provideClientHydration(),
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorFnInterceptor, multi: true },
    DecimalPipe,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
