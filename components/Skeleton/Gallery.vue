<!--
  画廊骨架屏组件
  用于图片画廊加载时显示骨架屏
-->
<template>
  <div class="gallery-skeleton">
    <!-- 骨架屏网格 -->
    <div :class="['grid gap-4', gridColsClass]">
      <div v-for="n in count" :key="n" class="animate-pulse">
        <!-- 图片占位符 -->
        <div
          :class="['bg-gray-300 dark:bg-gray-600 rounded-lg', aspectRatioClass]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // ==================== 类型定义 ====================
  interface GallerySkeletonProps {
    // 骨架屏数量
    count?: number
    // 图片类型 (posters | backdrops)
    imageType?: 'posters' | 'backdrops'
    // 网格列数配置
    cols?: {
      sm?: number
      md?: number
      lg?: number
      xl?: number
    }
  }

  // ==================== Props 定义 ====================
  const props = withDefaults(defineProps<GallerySkeletonProps>(), {
    count: 12,
    imageType: 'posters',
    cols: () => ({ sm: 2, md: 3, lg: 4, xl: 5 }),
  })

  // ==================== 计算属性 ====================
  // 网格列数类名
  const gridColsClass = computed(() => {
    const { sm = 2, md = 3, lg = 4, xl = 5 } = props.cols
    return `grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg} xl:grid-cols-${xl}`
  })

  // 宽高比类名
  const aspectRatioClass = computed(() => {
    return props.imageType === 'posters' ? 'aspect-[2/3]' : 'aspect-[16/9]'
  })
</script>

<style scoped>
  .gallery-skeleton {
    /* 骨架屏容器样式 */
  }
</style>
