/**
 * HTTP 请求相关类型定义
 * 用于 useHttp composable 的类型定义
 */

import type { FetchError, SearchParameters } from 'ofetch'
import type { AsyncData, UseFetchOptions } from '#app'
import type { Ref } from 'vue'

// ==================== 基础类型 ====================

/**
 * URL 类型定义
 * 支持字符串、Request 对象、响应式引用和函数
 */
export type UrlType =
  | string
  | Request
  | Ref<string | Request>
  | (() => string | Request)

/**
 * HTTP 方法类型
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

/**
 * HTTP 状态码类型
 */
export type HttpStatusCode =
  | 200
  | 201
  | 202
  | 204
  | 300
  | 301
  | 302
  | 304
  | 307
  | 308
  | 400
  | 401
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511

// ==================== 响应类型 ====================

/**
 * 通用 API 响应包装类型
 * 用于包装 TMDB API 的响应数据
 */
export interface ApiResponse<T> {
  /** 响应数据 */
  data: T
  /** 状态码 */
  code: HttpStatusCode
  /** 请求是否成功 */
  success: boolean
  /** 错误详情（可选） */
  detail?: string
  /** 错误消息（可选） */
  message?: string
}

/**
 * 分页响应类型
 */
export interface PaginatedApiResponse<T> extends ApiResponse<T> {
  /** 当前页码 */
  page: number
  /** 总页数 */
  total_pages: number
  /** 总结果数 */
  total_results: number
}

// ==================== 请求参数类型 ====================

/**
 * 请求参数类型
 * 支持 ofetch 的 SearchParameters 和普通对象
 */
export type RequestParams =
  | SearchParameters
  | Record<string, string | number | boolean | undefined>

/**
 * 请求头类型
 */
export interface RequestHeaders {
  [key: string]: string
}

/**
 * 请求配置选项类型
 * 扩展 UseFetchOptions 以支持自定义配置
 */
export interface HttpRequestOptions<T = unknown>
  extends UseFetchOptions<ApiResponse<T>, T> {
  /** 请求参数 */
  params?: RequestParams
  /** 请求头 */
  headers?: RequestHeaders
  /** 是否延迟加载 */
  lazy?: boolean
  /** 请求超时时间（毫秒） */
  timeout?: number
  /** 重试次数 */
  retry?: number
  /** 重试延迟（毫秒） */
  retryDelay?: number
  /** 是否显示加载状态 */
  showLoading?: boolean
  /** 错误处理函数 */
  onError?: () => void
  /** 成功处理函数 */
  onSuccess?: () => void
}

// ==================== useHttp 函数类型 ====================

/**
 * useHttp 函数参数类型
 */
export interface UseHttpOptions<T = unknown> {
  /** 请求 URL */
  url: UrlType
  /** HTTP 方法 */
  method: HttpMethod
  /** 请求参数 */
  params?: RequestParams
  /** 请求配置选项 */
  opts?: HttpRequestOptions<T>
}

/**
 * useHttp 函数返回类型
 * 返回 AsyncData 包装的响应数据
 */
export type UseHttpReturn<T> = AsyncData<T, FetchError<ApiResponse<T>> | null>

/**
 * useHttp 函数类型定义
 */
export type UseHttpFunction = <T = unknown>() => UseHttpReturn<T> // options: UseHttpOptions<T> // 移除未使用参数名

// ==================== 错误类型 ====================

/**
 * HTTP 错误类型
 */
export interface HttpError extends Error {
  /** 错误状态码 */
  statusCode?: HttpStatusCode
  /** 错误响应数据 */
  response?: unknown
  /** 请求配置 */
  request?: unknown
}

/**
 * 网络错误类型
 */
export interface NetworkError extends HttpError {
  /** 网络错误类型 */
  type: 'network' | 'timeout' | 'abort'
}

/**
 * 业务错误类型
 */
export interface BusinessError extends HttpError {
  /** 业务错误码 */
  businessCode: string | number
  /** 业务错误消息 */
  businessMessage: string
}

// ==================== 请求拦截器类型 ====================

/**
 * 请求拦截器类型
 */
export interface RequestInterceptor {
  /** 请求前拦截 */
  onRequest?: () => void | Promise<void>
  /** 请求后拦截 */
  onResponse?: () => void | Promise<void>
  /** 请求错误拦截 */
  onRequestError?: () => void | Promise<void>
  /** 响应错误拦截 */
  onResponseError?: () => void | Promise<void>
}

// ==================== 配置类型 ====================

/**
 * HTTP 客户端配置类型
 */
export interface HttpClientConfig {
  /** 基础 URL */
  baseURL: string
  /** 默认请求头 */
  defaultHeaders: RequestHeaders
  /** 默认超时时间 */
  timeout: number
  /** 默认重试次数 */
  retry: number
  /** 默认重试延迟 */
  retryDelay: number
  /** 请求拦截器 */
  interceptors?: RequestInterceptor
}

// ==================== 工具类型 ====================

/**
 * 提取响应数据类型
 * 从 ApiResponse<T> 中提取 T 类型
 */
export type ExtractResponseData<T> = T extends ApiResponse<infer U> ? U : T

/**
 * 提取错误类型
 * 从 useHttp 返回类型中提取错误类型
 */
export type ExtractHttpError<T> =
  T extends UseHttpReturn<infer U> ? FetchError<ApiResponse<U>> | null : never

/**
 * 请求状态类型
 */
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

/**
 * 请求状态对象类型
 */
export interface RequestState<T = unknown> {
  /** 请求状态 */
  status: RequestStatus
  /** 响应数据 */
  data: T | null
  /** 错误信息 */
  error: HttpError | null
  /** 是否正在加载 */
  loading: boolean
  /** 是否成功 */
  success: boolean
}

// ==================== 导出类型 ====================

/**
 * 为了向后兼容，保留原有的 ResOptions 类型别名
 * @deprecated 建议使用 ApiResponse 类型
 */
export type ResOptions<T> = ApiResponse<T>

/**
 * 为了向后兼容，保留原有的 HttpOption 类型别名
 * @deprecated 建议使用 HttpRequestOptions 类型
 */
export type HttpOption<T> = HttpRequestOptions<T>
