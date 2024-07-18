export interface MovieDetail {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    backdrop_path: string;
    genres: { id: number; name: string; }[];
    runtime: number;
    trailerUrl?: string;
    cast?: { name: string; character: string; profile_path: string; }[];
  }
