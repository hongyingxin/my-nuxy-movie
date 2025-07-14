import { defineStore } from 'pinia'
import { fetchTmdbCountries } from '@/api/configuration'
import type { TmdbCountry } from '@/types/apiType/configuration'

export const useRegionStore = defineStore('region', {
  state: () => ({
    regions: [] as {
      value: string
      label: string
    }[],
    loaded: false,
  }),
  actions: {
    async loadRegions() {
      try {
        if (this.loaded && this.regions.length > 0) return
        const res = await fetchTmdbCountries()
        // 兼容 useHttp 返回 AsyncData 结构
        const data = (res?.data?.value as TmdbCountry[]) || []
        this.regions = data.map(item => ({
          value: item.iso_3166_1,
          label: item.english_name,
        }))
        this.loaded = true
      } catch (error) {
        console.error('Failed to fetch TMDB regions:', error)
        this.regions = []
        this.loaded = false
      }
    },
  },
  persist: true,
})
