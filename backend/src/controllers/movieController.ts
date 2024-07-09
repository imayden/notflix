import { Request, Response } from 'express';
import { MovieService } from '../services/movieService';

const movieService = new MovieService();

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  const movies = await movieService.getMovies();
  res.json(movies);
};

export const fetchMovies = async (req: Request, res: Response): Promise<void> => {
  await movieService.fetchMoviesFromTMDB();
  res.status(200).send('Movies fetched successfully');
};
