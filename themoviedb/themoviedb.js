import Config from '../automate/config.js'

export default class TMDbApi {
  constructor() {
    this.config = new Config()
    this.baseUrl = 'https://api.themoviedb.org'
    this.accountId = this.config.get('THEMOVIEDB_ACCOUNT_OBJECT_ID')
    this.fetchConfig = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.get('THEMOVIEDB_READ_TOKEN')}`
      }
    }
  }

  async fetchObject(path) {
    const url = `${this.baseUrl}${path}?language=${this.config.get('LANGUAGE')}`
    const response = await fetch(url, this.fetchConfig)
    return await response.json()
  }

  async #fetchPaginatedData(path) {
    let allResults = []
    let currentPage = 1
    let totalPages = 1

    while (currentPage <= totalPages) {
      const url = `${this.baseUrl}/4${path}?page=${currentPage}&language=${this.config.get('LANGUAGE')}&sort_by=created_at.desc`

      try {
        const response = await fetch(url, this.fetchConfig)
        const data = await response.json()
        allResults = [...allResults, ...data.results]

        currentPage++
        totalPages = data.total_pages
      } catch (error) {
        console.error('Error fetching data:', error)
        break
      }
    }

    return allResults
  }

  // Method to get rated movies
  async getMoviesRated() {
    const path = `/account/${this.accountId}/movie/rated`
    return await this.#fetchPaginatedData(path)
  }

  // Method to get Movies Watchlist shows
  async getMoviesWatchlist() {
    const path = `/account/${this.accountId}/movie/watchlist`
    return await this.#fetchPaginatedData(path)
  }

  // Method to get rated TV shows
  async getTvRated() {
    const path = `/account/${this.accountId}/tv/rated`
    return await this.#fetchPaginatedData(path)
  }

  // Method to get TV Show Watchlist
  async getTvWatchlist() {
    const path = `/account/${this.accountId}/tv/watchlist`
    return await this.#fetchPaginatedData(path)
  }

  // Method to get Movie Details
  async getMovie(id) {
    const details = await this.fetchObject(`/3/movie/${id}`)
    const externalIds = await this.fetchObject(`/3/movie/${id}/external_ids`)
    return {...details, ...externalIds}
  }

  // Method to get Movie Details
  async getTv(id) {
    const details = await this.fetchObject(`/3/tv/${id}`)
    const externalIds = await this.fetchObject(`/3/tv/${id}/external_ids`)

    return {...details, ...externalIds}
  }

}
