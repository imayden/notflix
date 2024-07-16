import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailService } from '../../services/movie-detail.service';
import { MovieDetail } from '../../interfaces/movie-detail';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: MovieDetail | undefined;

  constructor(
    private route: ActivatedRoute,
    private movieDetailService: MovieDetailService
  ) { }

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.movieDetailService.getMovieDetail(movieId).subscribe((movie: MovieDetail) => {
      this.movie = movie;
    });
  }

  extractVideoId(url: string): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  }
}
