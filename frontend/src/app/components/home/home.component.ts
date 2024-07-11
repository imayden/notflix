import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie';
import { response } from 'express';
import { Router } from '@angular/router';
import { HomeHeadingComponent } from '../home-heading/home-heading.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  movies: Movie[] = [];
  page: number = 1;
  loading: boolean = false;
  isBrowser!: boolean;

  constructor(
    private movieService: MovieService,
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object
  ){
    this.isBrowser = isPlatformBrowser(platformId);
  }
  
  ngOnInit(): void {
      if(this.isBrowser) {
        this.loadMovies();
      }
  }

  loadMovies() {
    if(this.loading || !this.isBrowser) return;

    this.loading = true;

    this.movieService.getMovies(this.page).subscribe( 
      (response) => {
        this.movies = [...this.movies, ...response.results]; 
        this.page++;
        this.loading = false;
      },
      () => {
        this.loading = false;
        console.error('An error occurred while fetching movies');
      }

    )
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.offsetHeight - 100;

    if (scrollPosition >= threshold && !this.loading) {
      this.loadMovies();
    }
  }
  viewMovieDetail(movieId: number): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/movie', movieId])
    );
    window.open(url, '_blank');
  }

}
