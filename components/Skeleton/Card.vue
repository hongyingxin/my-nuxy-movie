<!-- 
  骨架卡片组件
  用于在数据加载时显示内容的大致轮廓
-->
<template>
  <div class="animate-pulse">
    <!-- 海报/图片占位符 -->
    <div class="bg-gray-300 rounded-lg mb-2" :class="posterClass" />

    <!-- 内容占位符 -->
    <div class="space-y-1">
      <!-- 标题占位符 -->
      <div class="bg-gray-300 h-4 rounded" :class="titleClass" />

      <!-- 副标题占位符 -->
      <div class="bg-gray-300 h-3 rounded" :class="subtitleClass" />

      <!-- 可选的额外信息占位符 -->
      <div v-if="showExtra" class="flex items-center gap-2 mt-2">
        <div class="bg-gray-300 h-3 w-8 rounded" />
        <div class="bg-gray-300 h-3 w-16 rounded" />
      </div>
    </div>
  </div>
</template>

<script setup>
  // Props 定义
  const props = defineProps({
    // 卡片变体类型
    variant: {
      type: String,
      default: 'movie',
      validator: value => ['movie', 'tv', 'person', 'compact'].includes(value),
    },
    // 是否显示额外信息占位符
    showExtra: {
      type: Boolean,
      default: false,
    },
  })

  // 根据变体计算海报样式类
  const posterClass = computed(() => {
    const classes = {
      movie: 'aspect-[2/3]',
      tv: 'aspect-[2/3]',
      person: 'aspect-[2/3]',
      compact: 'aspect-[16/9]',
    }
    return classes[props.variant] || classes.movie
  })

  // 根据变体计算标题样式类
  const titleClass = computed(() => {
    const classes = {
      movie: 'w-3/4',
      tv: 'w-3/4',
      person: 'w-full',
      compact: 'w-2/3',
    }
    return classes[props.variant] || classes.movie
  })

  // 根据变体计算副标题样式类
  const subtitleClass = computed(() => {
    const classes = {
      movie: 'w-1/2',
      tv: 'w-1/2',
      person: 'w-2/3',
      compact: 'w-1/2',
    }
    return classes[props.variant] || classes.movie
  })
</script>
