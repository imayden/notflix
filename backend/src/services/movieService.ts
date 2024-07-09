import { AppDataSource } from '../database';
import { Movie } from '../entities/Movie';
import axios from 'axios';

export class MovieService {
  private movieRepository = AppDataSource.getRepository(Movie);

  async getMovies(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async fetchMoviesFromTMDB(): Promise<void> {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=YOUR_TMDB_API_KEY');
    const movies = response.data.results.map((movie: any) => {
      const newMovie = new Movie();
      newMovie.title = movie.title;
      newMovie.overview = movie.overview;
      newMovie.release_date = movie.release_date;
      newMovie.poster_path = movie.poster_path;
      newMovie.backdrop_path = movie.backdrop_path;
      return newMovie;
    });

    await this.movieRepository.save(movies);
  }
}
