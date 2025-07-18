/**
 * 屏幕尺寸检测 composable
 * 提供响应式的屏幕尺寸信息和设备类型判断
 *
 * @returns {Object} 屏幕尺寸相关的响应式数据和方法
 * @returns {Ref<number>} screenWidth - 屏幕宽度（只读）
 * @returns {Ref<number>} screenHeight - 屏幕高度（只读）
 * @returns {ComputedRef<boolean>} isMobile - 是否为移动端 (< 640px)
 * @returns {ComputedRef<boolean>} isTablet - 是否为平板 (640px - 768px)
 * @returns {ComputedRef<boolean>} isDesktop - 是否为桌面端 (≥ 768px)
 * @returns {ComputedRef<boolean>} isLargeDesktop - 是否为大屏桌面 (≥ 1024px)
 * @returns {ComputedRef<string>} deviceType - 设备类型枚举
 * @returns {ComputedRef<string>} deviceTypeText - 设备类型中文描述
 *
 * @example
 * ```javascript
 * const { screenWidth, isMobile, deviceTypeText } = useScreenSize()
 *
 * // 条件渲染
 * if (isMobile.value) {
 *   // 移动端逻辑
 * }
 *
 * // 响应式数据
 * console.log(screenWidth.value) // 当前屏幕宽度
 * console.log(deviceTypeText.value) // 设备类型描述
 * ```
 */
export const useScreenSize = () => {
  /** 屏幕宽度 */
  const screenWidth = ref(0)
  /** 屏幕高度 */
  const screenHeight = ref(0)

  /**
   * 更新屏幕尺寸信息
   * 在客户端环境下获取当前窗口的宽度和高度
   */
  const updateSize = () => {
    if (import.meta.client) {
      screenWidth.value = window.innerWidth
      screenHeight.value = window.innerHeight
    }
  }

  onMounted(() => {
    // 初始化屏幕尺寸
    updateSize()

    // 监听窗口大小变化
    window.addEventListener('resize', updateSize)

    // 组件卸载时清理事件监听器
    onUnmounted(() => {
      window.removeEventListener('resize', updateSize)
    })
  })

  // 计算属性
  /** 是否为移动端 (< 640px) */
  const isMobile = computed(() => screenWidth.value < 640)

  /** 是否为平板 (640px - 768px) */
  const isTablet = computed(
    () => screenWidth.value >= 640 && screenWidth.value < 768
  )

  /** 是否为桌面端 (≥ 768px) */
  const isDesktop = computed(() => screenWidth.value >= 768)

  /** 是否为大屏桌面 (≥ 1024px) */
  const isLargeDesktop = computed(() => screenWidth.value >= 1024)

  /**
   * 设备类型枚举
   * @returns {string} 'mobile' | 'tablet' | 'desktop' | 'large-desktop'
   */
  const deviceType = computed(() => {
    if (isMobile.value) return 'mobile'
    if (isTablet.value) return 'tablet'
    if (isLargeDesktop.value) return 'large-desktop'
    return 'desktop'
  })

  /**
   * 设备类型中文描述
   * @returns {string} 设备类型的详细中文描述
   */
  const deviceTypeText = computed(() => {
    if (screenWidth.value < 640) return '移动端 (< 640px)'
    if (screenWidth.value < 768) return '平板 (640px - 768px)'
    if (screenWidth.value < 1024) return '小屏桌面 (768px - 1024px)'
    return '大屏桌面 (> 1024px)'
  })

  return {
    screenWidth: readonly(screenWidth),
    screenHeight: readonly(screenHeight),
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    deviceType,
    deviceTypeText,
  }
}
