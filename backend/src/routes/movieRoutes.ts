import { Router } from 'express';
import { getMovies, fetchMovies } from '../controllers/movieController';

const router = Router();

router.get('/movies', getMovies);
router.get('/fetch-movies', fetchMovies);

export default router;
