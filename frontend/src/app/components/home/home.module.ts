import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeHeadingComponent } from '../home-heading/home-heading.component';


const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    HomeComponent
    // HomeHeadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    DecimalPipe,
    DatePipe
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
