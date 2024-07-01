import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { QuestionsComponent } from './components/questions/questions.component';

import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupChoosePlanComponent } from './components/signup-choose-plan/signup-choose-plan.component';
import { SignupChooserightPlanComponent } from './components/signup-chooseright-plan/signup-chooseright-plan.component';
import { SignupFinishSetupComponent } from './components/signup-finish-setup/signup-finish-setup.component';
import { SignupCreateAccountComponent } from './components/signup-create-account/signup-create-account.component';

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
    SignupCreateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
