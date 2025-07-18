<!-- 主题切换组件 -->
<template>
  <div class="relative">
    <!-- 主题切换按钮 -->
    <button
      ref="triggerRef"
      class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
      :aria-label="t('theme.switchTheme')"
      @click="toggleDropdown"
    >
      <!-- 太阳图标（明亮模式） -->
      <svg
        v-if="themeStore.getCurrent === 'light'"
        class="w-5 h-5 text-gray-700 dark:text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m6.01-6.01l.707-.707m12.728 12.728l.707.707M6.343 6.343l-.707-.707m12.728-.707l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      <!-- 月亮图标（暗黑模式） -->
      <svg
        v-else
        class="w-5 h-5 text-gray-700 dark:text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>

    <!-- 下拉菜单 -->
    <div
      v-if="isDropdownOpen"
      ref="dropdownRef"
      class="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
    >
      <div class="p-2 space-y-1">
        <button
          v-for="option in themeOptions"
          :key="option.value"
          class="flex items-center w-full px-3 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          :class="{
            'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300':
              themeStore.getMode === option.value,
          }"
          @click="selectTheme(option.value)"
        >
          <!-- 图标 -->
          <div class="flex items-center justify-center w-5 h-5 mr-3">
            <svg
              v-if="option.icon === 'sun'"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m6.01-6.01l.707-.707m12.728 12.728l.707.707M6.343 6.343l-.707-.707m12.728-.707l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <svg
              v-else-if="option.icon === 'moon'"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <svg
              v-else-if="option.icon === 'computer'"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <!-- 文本 -->
          <div class="flex-1">
            <div class="font-medium">{{ t(option.label) }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ t(option.description) }}
            </div>
          </div>

          <!-- 选中指示器 -->
          <div
            v-if="themeStore.getMode === option.value"
            class="flex items-center justify-center w-4 h-4"
          >
            <svg
              class="w-4 h-4 text-red-600 dark:text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { ThemeMode } from '~/types/theme'
  import { THEME_OPTIONS } from '~/constants/theme'

  // ==================== Props ====================
  // interface Props {
  //   /** 变体样式 */
  //   variant?: 'simple' | 'dropdown'
  // }

  // const _props = withDefaults(defineProps<Props>(), {
  //   variant: 'dropdown',
  // })

  // ==================== 响应式数据 ====================
  const isDropdownOpen = ref(false)
  const triggerRef = ref<HTMLButtonElement>()
  const dropdownRef = ref<HTMLDivElement>()

  // ==================== Store ====================
  const themeStore = useThemeStore()

  // ==================== i18n ====================
  const { t } = useI18n()

  // ==================== 计算属性 ====================
  const themeOptions = computed(() => THEME_OPTIONS)

  // ==================== 方法 ====================
  /**
   * 切换下拉菜单
   */
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
  }

  /**
   * 选择主题
   */
  const selectTheme = (theme: ThemeMode) => {
    themeStore.setTheme(theme)
    isDropdownOpen.value = false
  }

  /**
   * 点击外部关闭下拉菜单
   */
  const handleClickOutside = (event: Event) => {
    const target = event.target as Element

    if (
      isDropdownOpen.value &&
      triggerRef.value &&
      dropdownRef.value &&
      !triggerRef.value.contains(target) &&
      !dropdownRef.value.contains(target)
    ) {
      isDropdownOpen.value = false
    }
  }

  // ==================== 生命周期 ====================
  onMounted(() => {
    // 监听点击外部事件
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
</script>
