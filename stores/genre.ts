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
      if (this.initialized) return

      try {
        const [movieGenresRes, tvGenresRes] = await Promise.all([
          getMovieGenres(),
          getTvGenres(),
        ])

        // 安全地访问数据，处理AsyncData的返回值
        const movieGenres = movieGenresRes?.data?.value?.genres || []
        const tvGenres = tvGenresRes?.data?.value?.genres || []

        this.movieGenres = movieGenres
        this.tvGenres = tvGenres
        this.initialized = true
      } catch (error) {
        console.error('Failed to initialize genres:', error)
        // 不要重新抛出错误，避免阻塞应用启动
        this.movieGenres = []
        this.tvGenres = []
        this.initialized = false
      }
    },
  },

  persist: true,
})
