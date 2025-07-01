import { getMovieGenres, getTvGenres } from '~/api/genre'

export const useGenreStore = defineStore('genre',{
  state: () => ({
    movieGenres: [],
    tvGenres: [],
    initialized: false
  }),

  getters: {
  },

  actions: {
    async initializeGenres() {
      console.log('-------------initializeGenres',this)
      if (this.initialized) return

      try {
        const [movieGenresRes, tvGenresRes] = await Promise.all([
          getMovieGenres(),
          getTvGenres()
        ])
        if (movieGenresRes && tvGenresRes) {
          this.movieGenres = movieGenresRes.data.value.genres || []
          this.tvGenres = tvGenresRes.data.value.genres || []
        }
      } catch (error) {
        console.error('Failed to initialize genres:', error)
        throw error
      }
    }
  },

  persist: true
}) 