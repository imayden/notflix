import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieDetail } from '../interfaces/movie-detail';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjMwNGE1YTMxN2Q1NWU5OWNjMDQyZGI1MGIwM2RhYiIsIm5iZiI6MTcyMDAyMjg4OS43MzkzMDcsInN1YiI6IjY2ODU3NDdiNjNkMGI1ZDdmYTFhNDViNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-IDAXqE7eXdh1vfvC2pgnQ-ijEBtk2diNqXxJ3sz6iI';

  constructor(private http: HttpClient) {}

  getMovieDetail(id: number): Observable<MovieDetail> {
    const headers = new HttpHeaders().set('Authorization', this.apiKey).set('accept', 'application/json');

    const movieDetail$ = this.http.get<MovieDetail>(`${this.apiUrl}/movie/${id}`, { headers });
    const movieVideos$ = this.http.get<any>(`${this.apiUrl}/movie/${id}/videos`, { headers });
    const movieCredits$ = this.http.get<any>(`${this.apiUrl}/movie/${id}/credits`, { headers });

    return forkJoin([movieDetail$, movieVideos$, movieCredits$]).pipe(
      map(([movieDetail, videos, credits]) => {
        const trailer = videos.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailer) {
          movieDetail.trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
        }

        movieDetail.cast = credits.cast.map((actor: any) => ({
          name: actor.name,
          character: actor.character,
          profile_path: actor.profile_path
        }));

        return movieDetail;
      })
    );
  }
}
