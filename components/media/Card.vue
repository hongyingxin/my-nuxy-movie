<template>
  <div class="group cursor-pointer">
    <div class="relative overflow-hidden rounded-lg mb-3 aspect-[2/3] bg-gray-200">
      <NuxtImg
        v-if="item.poster_path"
        :src="getPosterUrl(item.poster_path)"
        :alt="item.title || item.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        sizes="sm:100vw md:50vw lg:400px"
        format="webp"
        quality="80"
        @error="handleImageError"
      />
      
      <!-- 状态标签 -->
      <div v-if="status" class="absolute top-2 left-2 text-white px-2 py-1 rounded text-xs font-medium"
        :class="getStatusClass(status)">
        {{ getStatusText(status) }}
      </div>
      
      <!-- 评分 -->
      <div class="absolute top-2 right-2">
        <MediaRating 
          :score="item.vote_average || 0" 
          :total-score="10"
        />
      </div>
    </div>
    
    <!-- 标题 -->
    <h3 class="font-semibold text-gray-800 line-clamp-2 mb-1">
      {{ item.title || item.name }}
    </h3>
    
    <!-- 年份和热度 -->
    <div class="flex items-center justify-between text-sm mb-1">
      <span class="text-gray-600">
        {{ (item.release_date || item.first_air_date)?.split('-')[0] || '未知' }}
      </span>
      <span class="text-gray-500">🔥 {{ formatPopularity(item.popularity) }}</span>
    </div>
    
    <!-- 分类 -->
    <div v-if="genreNames.length" class="text-xs text-gray-500">
      {{ genreNames.join(' · ') }}
    </div>
  </div>
</template>

<script setup>
import { getPosterUrl } from '~/utils/image'

// Props
const props = defineProps({
  // 电影/电视剧数据对象
  item: {
    type: Object,
    required: true
  },
  // 状态标签
  status: {
    type: String,
    default: null // 'upcoming', 'on-air', 'movie', 'tv'
  },
  // 是否为电影类型
  isMovie: {
    type: Boolean,
    default: true
  },
  // 电影分类
  movieGenres: {
    type: Array,
    default: () => []
  },
  // 电视剧分类
  tvGenres: {
    type: Array,
    default: () => []
  }
})

// 获取分类名称
const genreNames = computed(() => {
  if (!props.item.genre_ids || !props.item.genre_ids.length) return []
  
  const genres = props.isMovie ? props.movieGenres : props.tvGenres
  if (!genres || !genres.length) return []
  
  return props.item.genre_ids
    .slice(0, 2) // 只显示前2个分类
    .map(id => genres.find(genre => genre.id === id)?.name)
    .filter(Boolean)
})

// 格式化热度
const formatPopularity = (popularity) => {
  if (!popularity) return 'N/A'
  return popularity.toFixed(1)
}

// 获取状态样式
const getStatusClass = (status) => {
  switch (status) {
    case 'upcoming':
      return 'bg-green-600'
    case 'on-air':
      return 'bg-red-600'
    case 'movie':
      return 'bg-blue-600'
    case 'tv':
      return 'bg-purple-600'
    default:
      return 'bg-gray-600'
  }
}

// 获取状态文本
const getStatusText = (status) => {
  switch (status) {
    case 'upcoming':
      return '即将上映'
    case 'on-air':
      return '正在播出'
    case 'movie':
      return '电影'
    case 'tv':
      return '电视剧'
    default:
      return ''
  }
}

// 处理图片加载错误
const handleImageError = (event) => {
  // 设置默认图片或隐藏图片
  const img = event.target
  img.style.display = 'none'
  // 或者设置一个默认的占位符图片
  // img.src = '/images/placeholder.jpg'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 