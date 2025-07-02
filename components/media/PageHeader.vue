<!-- 页面标题组件 -->
<template>
  <div 
    class="relative bg-gray-900 mb-8"
    :style="backgroundStyle"
  >
    <!-- 背景遮罩 -->
    <div class="absolute inset-0 bg-black/50"></div>
    
    <!-- 背景图片 -->
    <div 
      v-if="backdrop_path"
      class="absolute inset-0 bg-cover bg-center opacity-50"
      :style="{ backgroundImage: `url(${getBackdropUrl(backdrop_path, 'original')})` }"
    ></div>

    <div class="container mx-auto px-4 py-8 relative">
      <!-- 返回按钮 -->
      <NuxtLink 
        :to="backTo"
        class="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium mb-6 transition-all duration-200 backdrop-blur-sm group"
      >
        <svg 
          class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        返回详情
      </NuxtLink>

      <!-- 标题 -->
      <h1 class="text-4xl font-bold text-white">
        {{ title }}
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getBackdropUrl } from '~/utils/image'

interface Props {
  title: string
  backTo: string
  backdrop_path?: string | null
}

const props = defineProps<Props>()

const backgroundStyle = computed(() => ({
  background: !props.backdrop_path ? 'linear-gradient(to right, #1a202c, #2d3748)' : undefined
}))
</script> 