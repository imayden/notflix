import { Component, OnInit, HostListener, Inject, PLATFORM_ID, AfterViewInit, ElementRef, ViewChild  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie';
import { Router, NavigationEnd, Event } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('loadMoreTrigger') loadMoreTrigger!: ElementRef;

  movies: Movie[] = [];
  page: number = 1;
  loading: boolean = false;
  isBrowser!: boolean;

  heroMovies: Movie[] = [];  // hero-sections

  // scrollPosition: number = 0;

  // cārousel options
  carouselOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  };

  constructor(
    private movieService: MovieService,
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object
  ){
    this.isBrowser = isPlatformBrowser(platformId);

    // this.router.events.pipe(
    //   filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //   if (event.urlAfterRedirects === '/home') {
    //     setTimeout(() => this.restoreScrollPosition(), 100); 
    //   }
    // });
  }
  
  ngOnInit(): void {
      if(this.isBrowser) {
        this.loadMovies();
      }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.loadMoreTrigger) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.loading) {
            this.loadMovies();
          }
        });
      }, { threshold: 1.0 });
      
      observer.observe(this.loadMoreTrigger.nativeElement);
    }
  }

  loadMovies() {
    if(this.loading || !this.isBrowser) return;

    this.loading = true;

    this.movieService.getMovies(this.page).subscribe( 
      (response) => {
        this.movies = [...this.movies, ...response.results]; 

        if (this.heroMovies.length < 5) {
          const moviesToAdd = response.results.slice(0, 5 - this.heroMovies.length);
          this.heroMovies = [...this.heroMovies, ...moviesToAdd];
        }
        
        this.page++;
        this.loading = false;
      },
      () => {
        this.loading = false;
        console.error('An error occurred while fetching movies');
      }

    )
  }

  @HostListener('window:scroll', []) // infinite scrolling
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.offsetHeight - 100;

    if (scrollPosition >= threshold && !this.loading) {
      this.loadMovies();
    }
  }
  viewMovieDetail(movieId: number): void {
    // this.scrollPosition = window.scrollY;
    // sessionStorage.setItem('scrollPosition', this.scrollPosition.toString()); 

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/movie', movieId])
    );
    window.open(url, '_blank');
    
    // this.router.navigate(['/movie', movieId]); 
  }


  // restoreScrollPosition(): void {
  //   const savedPosition = sessionStorage.getItem('scrollPosition'); 
  //   if (savedPosition) {
  //     window.scrollTo(0, parseInt(savedPosition, 10));
  //   }
  // }

}
