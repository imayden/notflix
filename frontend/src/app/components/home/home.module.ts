import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o'; 
import { Title } from '@angular/platform-browser';  


const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    CarouselModule
  ],
  providers: [
    DecimalPipe,
    DatePipe,
    Title
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
