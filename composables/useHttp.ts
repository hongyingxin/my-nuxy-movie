// /composables/useHttp.ts

import type { FetchError, SearchParameters } from 'ofetch'
import type { AsyncData, UseFetchOptions } from '#app'

type UrlType = string | Request | Ref<string | Request> | (() => string | Request)

type HttpOption<T> = UseFetchOptions<ResOptions<T>, T, any, any>
interface ResOptions<T> {
  data: T
  code: number
  success: boolean
  detail?: string
}

export const fetch = <T>(
  {url, method, opts, params}: {
    url: UrlType, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    params?: SearchParameters | Record<string, any>,
    opts?: HttpOption<T>,
  }
) => {
  console.log('fetch-----', url, method, params, opts)
  const { tmdbApiUrl, tmdbApiToken } = useRuntimeConfig().public
  const options = opts as UseFetchOptions<ResOptions<T>> || {}
  options.lazy = options.lazy ?? true
  options.method = method
  options.params = {
    language: 'zh-CN',
    ...params
  }
  options.baseURL = tmdbApiUrl
  options.headers = {
    'Authorization': `Bearer ${tmdbApiToken}`,
    'Content-Type': 'application/json'

  }
  return useFetch<ResOptions<T>>(url, {
    onRequest({ options }) {
      console.log('onRequest-----', options)
    },
    onResponse(_context) {
      console.log('onResponse-----', _context)
    },
    onRequestError({ error }) {
      console.warn('[onRequestError]', error)
    },
    onResponseError({ response, options: { method } }) {
      console.error(`[useHttp] Error in ${method} request:`, response)
    },
    ...options,
  }) as AsyncData<T, FetchError<ResOptions<T>> | null>
}
