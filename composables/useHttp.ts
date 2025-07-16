// /composables/useHttp.ts

import type { UseFetchOptions } from '#app'
import { useNuxtApp } from '#app'
import { useLanguageStore } from '~/stores/language'
import type {
  ApiResponse,
  UseHttpReturn,
  UseHttpOptions,
} from '~/types/apiType/http'

export const useHttp = <T>({
  url,
  method,
  opts,
  params,
}: UseHttpOptions<T>) => {
  const { tmdbApiUrl, tmdbApiToken } = useRuntimeConfig().public
  const options = (opts as UseFetchOptions<ApiResponse<T>>) || {}
  // 需要检查key、params 和 watch 几个参数，如果没有手动设置 key，但 params 或 watch 中有 ref 对象时，要进行错误提示
  // 这里需要支持手动设置key
  // 将 lazy 选项默认值改为了 true，避免页面切换时的阻塞（但要处理数据 loading 显示效果）
  options.lazy = options.lazy ?? true
  options.method = method
  // 获取当前界面语言
  let currentLanguage = 'zh-CN'
  // 为了避免 $i18n 和 pinia store 的切换不一致
  try {
    const { $i18n } = useNuxtApp()
    if ($i18n?.locale?.value) {
      currentLanguage = $i18n.locale.value
    } else {
      // fallback: pinia store
      const languageStore = useLanguageStore()
      if (languageStore.currentLocale) {
        currentLanguage = languageStore.currentLocale
      }
    }
  } catch {
    // fallback
    currentLanguage = 'zh-CN'
  }
  options.params = {
    language: currentLanguage,
    ...params,
  }
  options.baseURL = tmdbApiUrl
  options.headers = {
    Authorization: `Bearer ${tmdbApiToken}`,
    'Content-Type': 'application/json',
  }
  // return
  const result = useFetch<ApiResponse<T>>(url, {
    // 请求前处理
    /**
     * 注意：这里无法处理请求参数，因为请求参数是直接传入的，无法在 onRequest 中处理，
     * 只能处理headers和baseURL。由于可以通过options配置参数处理，统一在上面处理
     */
    onRequest() {},
    // 业务上接口实际返回的数据格式，根据自身情况做调整即可
    onResponse() {},
    onRequestError() {},
    // 接口错误处理
    onResponseError() {},
    ...options,
  }) as UseHttpReturn<T>
  return result
  // return {
  //   data: computed(() => result.data.value), // 直接返回 data 字段
  //   loading: result.pending,
  //   error: result.error,
  //   refresh: result.refresh
  // }
}
