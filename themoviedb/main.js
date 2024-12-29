import TMDbApi from './themoviedb.js'
import {TheMovieDbStorage} from './storage.js'

const tmdbApi = new TMDbApi()

tmdbApi.getTvWatchlist().then((data) => {
  console.log('Watchlist TV Shows:', data.length)
})

tmdbApi.getTvRated().then((data) => {
  console.log('Rated TV Shows:', data.length)
})

tmdbApi.getMoviesRated().then(async (data) => {
  console.log('Rated Movies:', data.length)
  const movies_rated = new TheMovieDbStorage('movies_rated.json')
  await movies_rated.addItemOrItems(data)
})

tmdbApi.getMoviesWatchlist().then(async (data) => {
  console.log('Watchlist Movies:', data.length)
  const movies_watchlist = new TheMovieDbStorage('movies_watchlist.json')
  await movies_watchlist.addItemOrItems(data)
})

