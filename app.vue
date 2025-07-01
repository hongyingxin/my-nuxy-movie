<template>
  <div>
    <LayoutHeader />
    <NuxtPage />
    <LayoutFooter />
  </div>
</template>
<script setup>
import { useGenreStore } from '~/stores/genre'
const genreStore = useGenreStore()
// 初始化分类数据
genreStore.initializeGenres()
</script>