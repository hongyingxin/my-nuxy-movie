import { useHttp } from '@/composables/useHttp'
import type { TmdbCountry } from '@/types/apiType/configuration'

export const fetchTmdbCountries = () => {
  return useHttp<TmdbCountry[]>({
    url: '/configuration/countries',
    method: 'GET',
  })
}
