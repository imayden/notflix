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

@NgModule({
  declarations: [
    AppComponent,
    LanguageSelectorComponent,
    WelcomeComponent,
    GetStartedComponent,
    QuestionsComponent,
    SigninComponent
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
