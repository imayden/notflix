// app/core/resolvers/movie-detail.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieDetailService } from '../../services/movie-detail.service';
import { MovieDetail } from '../../interfaces/movie-detail';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailResolver implements Resolve<MovieDetail> {
  constructor(private movieDetailService: MovieDetailService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<MovieDetail> {
    const id = route.paramMap.get('id');
    return this.movieDetailService.getMovieDetail(+id!);
  }
}
