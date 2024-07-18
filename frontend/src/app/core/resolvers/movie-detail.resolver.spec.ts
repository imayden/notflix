// import { TestBed } from '@angular/core/testing';
// import { ResolveFn } from '@angular/router';

// import { movieDetailResolver } from './movie-detail.resolver';

// describe('movieDetailResolver', () => {
//   const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
//       TestBed.runInInjectionContext(() => movieDetailResolver(...resolverParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(executeResolver).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { MovieDetailResolver } from './movie-detail.resolver';
import { MovieDetailService } from '../../services/movie-detail.service';
import { of } from 'rxjs';

describe('MovieDetailResolver', () => {
  let resolver: MovieDetailResolver;
  let movieDetailService: jasmine.SpyObj<MovieDetailService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MovieDetailService', ['getMovieDetail']);
    TestBed.configureTestingModule({
      providers: [
        MovieDetailResolver,
        { provide: MovieDetailService, useValue: spy }
      ]
    });
    resolver = TestBed.inject(MovieDetailResolver);
    movieDetailService = TestBed.inject(MovieDetailService) as jasmine.SpyObj<MovieDetailService>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve movie details', () => {
    const expectedMovieDetail = { id: 1, title: 'Test Movie' } as any;
    movieDetailService.getMovieDetail.and.returnValue(of(expectedMovieDetail));

    resolver.resolve({ paramMap: { get: () => '1' } } as any, {} as any).subscribe(result => {
      expect(result).toEqual(expectedMovieDetail);
    });

    expect(movieDetailService.getMovieDetail.calls.count()).toBe(1);
  });
});
