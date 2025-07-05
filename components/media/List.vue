<template>
  <!-- 列表容器 - 使用垂直间距布局 -->
  <div class="space-y-4">
    <!-- 遍历媒体项目，每个项目显示为一个卡片 -->
    <div 
      v-for="item in items"
      :key="item.id"
      class="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <!-- 卡片内容布局 - 左侧海报，右侧信息 -->
      <div class="flex space-x-4">
        <!-- 海报图片 -->
        <img 
          :src="getPosterUrl(item.poster_path)" 
          :alt="item.title || item.name"
          class="w-16 h-24 object-cover rounded-lg"
          @error="handleImageError"
        >
        <!-- 媒体信息区域 -->
        <div class="flex-1">
          <!-- 标题 -->
          <h3 class="text-lg font-semibold text-gray-900 mb-1">
            {{ item.title || item.name }}
          </h3>
          <!-- 简介 - 限制为2行显示 -->
          <p class="text-sm text-gray-600 mb-2 line-clamp-2">
            {{ item.overview || '暂无简介' }}
          </p>
          <!-- 元信息 - 年份、评分、时长 -->
          <div class="flex items-center space-x-4 text-sm text-gray-500">
            <span>{{ common.getYear(item.release_date || item.first_air_date) }}</span>
            <span v-if="item.vote_average">★ {{ item.vote_average.toFixed(1) }}</span>
            <span v-if="isMovie && item.runtime">{{ item.runtime }}分钟</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入工具函数
import { getTmdbImageUrl } from '~/utils/image'

// ==================== Props 定义 ====================
const props = defineProps({
  // 媒体项目数组 - 包含电影或电视剧信息
  items: {
    type: Array,
    required: true
  },
  // 是否为电影类型 - 用于显示不同的信息（如时长）
  isMovie: {
    type: Boolean,
    default: true
  }
})

// ==================== 方法 ====================
/**
 * 获取海报图片URL
 * @param {string} path - TMDB图片路径
 * @returns {string} 完整的图片URL
 */
const getPosterUrl = (path) => {
  return getTmdbImageUrl(path, 'poster', 'medium')
}

/**
 * 处理图片加载错误
 * @param {Event} event - 图片错误事件
 */
const handleImageError = (event) => {
  const img = event.target
  img.style.display = 'none'
}
</script>

<style scoped>
/* 文本截断样式 - 限制为2行显示 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 