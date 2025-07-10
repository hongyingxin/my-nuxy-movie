<template>
  <!-- 进度条目前观察到不生效，暂时注释 -->
  <!-- <NuxtLoadingIndicator /> -->
  <LayoutHeader />
  <NuxtPage />
  <LayoutFooter />
</template>
<script setup>
  import { useGenreStore } from '~/stores/genre'

  const genreStore = useGenreStore()

  // 在客户端安全初始化分类数据
  onMounted(async () => {
    try {
      await genreStore.initializeGenres()
    } catch (error) {
      console.error('Failed to initialize genres in app.vue:', error)
    }
  })
</script>
