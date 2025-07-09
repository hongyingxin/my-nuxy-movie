<!-- 
  网格骨架屏组件
  用于在数据加载时显示网格布局的内容轮廓
-->
<template>
  <div class="grid gap-4" :class="gridClass">
    <SkeletonCard
      v-for="n in count"
      :key="n"
      :variant="variant"
      :show-extra="showExtra"
    />
  </div>
</template>

<script setup>
  // Props 定义
  const props = defineProps({
    // 网格列数配置
    cols: {
      type: Object,
      default: () => ({
        sm: 2,
        md: 4,
        lg: 6,
      }),
    },
    // 骨架卡片数量
    count: {
      type: Number,
      default: 6,
    },
    // 卡片变体类型
    variant: {
      type: String,
      default: 'movie',
      validator: value => ['movie', 'tv', 'person', 'compact'].includes(value),
    },
    // 是否显示额外信息
    showExtra: {
      type: Boolean,
      default: false,
    },
  })

  // 计算网格类
  const gridClass = computed(() => {
    const { sm, md, lg } = props.cols
    return `grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg}`
  })
</script>
