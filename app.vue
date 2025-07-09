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
  // 初始化分类数据
  genreStore.initializeGenres()
</script>
