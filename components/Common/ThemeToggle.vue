<!-- 简单主题切换按钮 -->
<template>
  <button
    class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
    :aria-label="t('theme.switchTheme')"
    @click="toggleTheme"
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
</template>

<script setup lang="ts">
  // ==================== Store ====================
  const themeStore = useThemeStore()

  // ==================== i18n ====================
  const { t } = useI18n()

  // ==================== 方法 ====================
  /**
   * 切换主题
   */
  const toggleTheme = () => {
    themeStore.toggleTheme()
  }

  // ==================== 生命周期 ====================
  onMounted(() => {
    // 初始化主题
    themeStore.initialize()
  })
</script>
