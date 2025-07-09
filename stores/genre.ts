import { getMovieGenres, getTvGenres } from '~/api/genre'
import type { Genre } from '~/types/apiType'

export const useGenreStore = defineStore('genre', {
  state: () => ({
    movieGenres: [] as Genre[],
    tvGenres: [] as Genre[],
    initialized: false,
  }),

  getters: {},

  actions: {
    async initializeGenres() {
      console.log('-------------initializeGenres', this)
      if (this.initialized) return

      try {
        const [movieGenresRes, tvGenresRes] = await Promise.all([
          getMovieGenres(),
          getTvGenres(),
        ])
        if (movieGenresRes && tvGenresRes) {
          this.movieGenres = movieGenresRes.data.value.genres || []
          this.tvGenres = tvGenresRes.data.value.genres || []
        }
      } catch (error) {
        console.error('Failed to initialize genres:', error)
        throw error
      }
    },
  },

  persist: true,
})
