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
function debounce<T extends (...args: any[]) => any>(
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
function throttle<T extends (...args: any[]) => any>(
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
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 格式化日期
 * 将日期字符串格式化为中文日期格式
 *
 * @param dateString 日期字符串 (YYYY-MM-DD)
 * @returns 格式化后的日期字符串
 */
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '未知'
  return new Date(dateString).toLocaleDateString('zh-CN')
}

/**
 * 格式化人气指数
 * 将人气数值格式化为保留一位小数的字符串
 *
 * @param popularity 人气数值
 * @returns 格式化后的人气字符串
 */
function formatPopularity(popularity: number | null | undefined): string {
  if (!popularity) return 'N/A'
  return popularity.toFixed(1)
}

/**
 * 获取性别文本
 * 将 TMDB API 的性别数字转换为中文文本
 *
 * @param gender 性别数字 (0=未知, 1=女性, 2=男性)
 * @returns 性别中文文本
 */
function getGenderText(gender: number | null | undefined): string {
  switch (gender) {
    case 1:
      return '女'
    case 2:
      return '男'
    default:
      return '未知'
  }
}

/**
 * 格式化预算/票房
 * 将金额数值格式化为易读的字符串
 *
 * @param amount 金额数值
 * @returns 格式化后的金额字符串
 */
function formatBudget(amount: number | null | undefined): string {
  if (!amount) return '未知'
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`
  }
  return `$${amount}`
}

/**
 * 获取年份
 * 从日期字符串中提取年份
 *
 * @param dateString 日期字符串
 * @returns 年份字符串
 */
function getYear(dateString: string | null | undefined): string {
  if (!dateString) return '未知'
  return new Date(dateString).getFullYear().toString()
}

/**
 * 格式化时长
 * 将分钟数转换为小时和分钟的格式
 *
 * @param minutes 分钟数
 * @returns 格式化后的时长字符串
 */
function formatRuntime(minutes: number | null | undefined): string {
  if (!minutes) return '未知'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

// 导出 common 对象，包含所有工具函数
export default {
  debounce,
  throttle,
  delay,
  formatDate,
  formatPopularity,
  getGenderText,
  formatBudget,
  getYear,
  formatRuntime,
}

// // 为了向后兼容，也导出单独的函数
// export {
//   debounce,
//   throttle,
//   delay,
//   formatDate,
//   formatPopularity,
//   getGenderText,
//   formatBudget,
//   getYear,
//   formatRuntime
// }
