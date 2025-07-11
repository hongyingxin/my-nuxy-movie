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

  const genreStore = useGenreStore()
  const languageStore = useLanguageStore()

  // 在客户端安全初始化数据
  onMounted(async () => {
    try {
      // 初始化分类数据
      await genreStore.initializeGenres()

      // 初始化语言设置
      languageStore.initialize()
    } catch (error) {
      console.error('Failed to initialize stores in app.vue:', error)
    }
  })
</script>
