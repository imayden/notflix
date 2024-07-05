import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
  private movieApiUrl = 'https://api.themoviedb.org/3/';
  private apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjMwNGE1YTMxN2Q1NWU5OWNjMDQyZGI1MGIwM2RhYiIsIm5iZiI6MTcyMDAyMjg4OS43MzkzMDcsInN1YiI6IjY2ODU3NDdiNjNkMGI1ZDdmYTFhNDViNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-IDAXqE7eXdh1vfvC2pgnQ-ijEBtk2diNqXxJ3sz6iI';

  constructor(private http: HttpClient) { }

  getMovies(page: number): Observable<{results: Movie[]}> {
    const headers = new HttpHeaders().set('Authorization', this.apiKey).set('accept', 'application/json');
    return this.http.get<{ results: Movie[] }>(`${this.apiUrl}&page=${page}`, { headers });
  }

  getMovie(id: number): Observable<Movie> {
    const headers = new HttpHeaders().set('Authorization', this.apiKey).set('accept', 'application/json');
    return this.http.get<Movie>(`${this.movieApiUrl}/movie/${id}`, { headers });
  }
}
