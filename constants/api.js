import { API_KEY } from './config';
import axios from "axios"
const genres = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
};

const BASE_URL = `https://api.themoviedb.org/3/tv/popular/?api_key=${API_KEY}`;

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
const getImagePath = (path) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;


// endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${API_KEY}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${API_KEY}`;
// endpoints with dynamic params

// movie
const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${API_KEY}`;
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${API_KEY}`;
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${API_KEY}`;

// person
const personDetailsEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${API_KEY}`;
const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${API_KEY}`;

// functions to get images of different widths, (show images using these to improve the loading times)
export const image500 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : null;
export const image342 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w342' + posterPath : null;
export const image185 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w185' + posterPath : null;


// fallback images 
export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {}
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return {};
  }
}

// home screen apis
export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
}


// movie screen apis
export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = (movieId) => {
  return apiCall(movieCreditsEndpoint(movieId));
}
export const fetchSimilarMovies = (movieId) => {
  return apiCall(similarMoviesEndpoint(movieId));
}

// person screen apis
export const fetchPersonDetails = (personId) => {
  return apiCall(personDetailsEndpoint(personId));
}
export const fetchPersonMovies = (personId) => {
  return apiCall(personMoviesEndpoint(personId));
}

// search screen apis
export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
}

export const getMovies = async () => {
  const { results } = await fetch(API_URL).then((x) => x.json());
  const movies = results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids.map((genre) => genres[genre]),
    })
  );

  return movies;
};


export const getSeries = async () => {
  const results = await fetch(BASE_URL).then((x) => x.json()).catch((x) => {
    console.log('There has been a problem with your fetch operation: ' + error.message);
    // ADD THIS THROW error
    throw error;
  });
  return results;
}