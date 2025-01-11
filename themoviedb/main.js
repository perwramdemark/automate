import TMDbApi from './themoviedb.js'
import {TheMovieDbStorage} from './storage.js'

const tmdbApi = new TMDbApi()

const tvs_watchlist = new TheMovieDbStorage('tv_watchlist.json')
await tmdbApi.getTvWatchlist().then(async (data) => {
  console.log('Watchlist TV Shows:', data.length)
  await tvs_watchlist.addItemOrItems(data)
})

tvs_watchlist.getList().then(async (tvshows) => {
  tvshows.forEach(tv => {
    tmdbApi.getTv(tv.id).then(async (tvDetails) => {
      const tvStore = new TheMovieDbStorage(`tv/${tvDetails.id}.json`)
      await tvStore.addItemOrItems({...tv, ...tvDetails})
    })
  })
})

const tvs_rated = new TheMovieDbStorage('tv_rated.json')
await tmdbApi.getTvRated().then(async (data) => {
  console.log('Rated TV Shows:', data.length)
  await tvs_rated.addItemOrItems(data)
})

tvs_rated.getList().then(async (tvshows) => {
  tvshows.forEach(tv => {
    tmdbApi.getTv(tv.id).then(async (tvDetails) => {
      const tvStore = new TheMovieDbStorage(`tv/${tvDetails.id}.json`)
      await tvStore.addItemOrItems({...tv, ...tvDetails})
    })
  })
})

const movies_rated = new TheMovieDbStorage('movie_rated.json')
await tmdbApi.getMoviesRated().then(async (data) => {
  console.log('Rated Movies:', data.length)
  await movies_rated.addItemOrItems(data)
})

movies_rated.getList().then(async (movies) => {
  movies.forEach(movie => {
    tmdbApi.getMovie(movie.id).then(async (movieDetails) => {
      const movieStore = new TheMovieDbStorage(`movies/${movieDetails.id}.json`)
      await movieStore.addItemOrItems(movieDetails)
    })
  })
})

const movies_watchlist = new TheMovieDbStorage('movie_watchlist.json')
await tmdbApi.getMoviesWatchlist().then(async (data) => {
  console.log('Watchlist Movies:', data.length)
  await movies_watchlist.addItemOrItems(data)
})

movies_watchlist.getList().then(async (movies) => {
  movies.forEach(movie => {
    tmdbApi.getMovie(movie.id).then(async (movieDetails) => {
      const movieStore = new TheMovieDbStorage(`movies/${movieDetails.id}.json`)
      await movieStore.addItemOrItems(movieDetails)
    })
  })
})



