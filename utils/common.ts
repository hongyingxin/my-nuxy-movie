/**
 * 通用工具函数集合
 */

/**
 * 防抖函数
 * 延迟执行函数，如果在延迟期间再次调用，则重新计时
 * 
 * @param fn 要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    // 清除之前的定时器
    if (timer) {
      clearTimeout(timer)
    }
    
    // 设置新的定时器
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

/**
 * 节流函数
 * 限制函数在一定时间内只能执行一次
 * 
 * @param fn 要节流的函数
 * @param delay 延迟时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  
  return (...args: Parameters<T>) => {
    const now = Date.now()
    
    if (now - lastCall >= delay) {
      lastCall = now
      fn(...args)
    }
  }
}

/**
 * 延迟执行函数
 * 创建一个延迟执行的 Promise
 * 
 * @param delay 延迟时间（毫秒）
 * @returns Promise
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
} 