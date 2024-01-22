import './style.css';
import Alpine from 'alpinejs';

interface IMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface IMovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}

const BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = 'df78c129';

Alpine.store('movieStore', {
  title: 'Movie with Vite, AlpineJS, Typescript, and Tailwind CSS',
});

const alpineConfig: any = {
  keyword: '',
  moviesSkeleton: false,
  movies: {} as Record<string, IMovie[]>,
  async searchMovie(this: typeof alpineConfig) {
    try {
      this.movies = {};
      this.moviesSkeleton = true;

      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${this.keyword}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      this.movies = await response.json();
      this.keyword = '';
    } catch (error) {
      console.error('Error during search movie:', error);
    } finally {
      this.moviesSkeleton = false;
    }
  },
  movieDetail: {} as IMovieDetail,
  async detailMovie(this: typeof alpineConfig, idMovie: string) {
    try {
      this.movieDetail = {};
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${idMovie}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      this.movieDetail = await response.json();
      this.openModal = true;
    } catch (error) {
      console.error('Error during detail movie:', error);
    }
  },
  openModal: false,
  toggleOpenModal(this: typeof alpineConfig) {
    this.openModal = !this.openModal;
  },
};


window.onload = function () {
  Alpine.data('movies', () => alpineConfig);
  Alpine.start();
};
