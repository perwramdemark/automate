import Config from '../automate/config.js'

export default class TMDbApi {
  constructor() {
    this.config = new Config()
    this.baseUrl = 'https://api.themoviedb.org/4'
    this.accountId = this.config.get('ACCOUNT_OBJECT_ID')
    this.fetchConfig = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.get('READ_TOKEN')}`,
      },
    }
  }

  async #fetchPaginatedData(endpoint) {
    let allResults = []
    let currentPage = 1
    let totalPages = 1

    while (currentPage <= totalPages) {
      const url = `${this.baseUrl}${endpoint}&page=${currentPage}`

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
    const path = `/account/${this.accountId}/movie/rated?language=en-US&sort_by=created_at.desc`
    return await this.#fetchPaginatedData(path)
  }

  // Method to get Movies Watchlist shows
  async getMoviesWatchlist() {
    const path = `/account/${this.accountId}/movie/watchlist?&language=en-US&sort_by=created_at.desc`
    return await this.#fetchPaginatedData(path)
  }

  // Method to get rated TV shows
  async getTvRated() {
    const path = `/account/${this.accountId}/tv/rated?&language=en-US&sort_by=created_at.desc`
    return await this.#fetchPaginatedData(path)
  }

  // Method to get TV Show Watchlist
  async getTvWatchlist() {
    const path = `/account/${this.accountId}/tv/watchlist?&language=en-US&sort_by=created_at.desc`
    return await this.#fetchPaginatedData(path)
  }
}
