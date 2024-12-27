import TMDbApi from './themoviedb.js'

const tmdbApi = new TMDbApi()

tmdbApi.getTvWatchlist().then((data) => {
  console.log('Watchlist TV Shows:', data.length)
})

tmdbApi.getTvRated().then((data) => {
  console.log('Rated TV Shows:', data.length)
})

tmdbApi.getMoviesRated().then((data) => {
  console.log('Rated Movies:', data.length)
})

tmdbApi.getMoviesWatchlist().then((data) => {
  console.log('Watchlist Movies:', data.length)
})

