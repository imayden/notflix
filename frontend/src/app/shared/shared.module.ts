import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeadingComponent } from '../components/home-heading/home-heading.component';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [
    HomeHeadingComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService
  ],
  exports: [
    HomeHeadingComponent
  ]
})
export class SharedModule { }
