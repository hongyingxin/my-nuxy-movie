<template>
  <!-- 进度条目前观察到不生效，暂时注释 -->
  <!-- <NuxtLoadingIndicator /> -->
  <LayoutHeader />
  <NuxtPage />
  <LayoutFooter />
</template>
<script setup>
  import { useGenreStore } from '~/stores/genre'
  import { useLanguageStore } from '~/stores/language'
  import { useThemeStore } from '~/stores/theme'

  const genreStore = useGenreStore()
  const languageStore = useLanguageStore()
  const themeStore = useThemeStore()

  // 在客户端安全初始化数据
  onMounted(async () => {
    try {
      // 初始化主题（确保在客户端执行）
      if (import.meta.client) {
        themeStore.initialize()
      }

      // 初始化分类数据
      genreStore.initializeGenres()

      // 初始化语言设置
      languageStore.initialize()
    } catch (error) {
      console.error('Failed to initialize stores in app.vue:', error)
    }
  })
</script>
