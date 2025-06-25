<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero 轮播区 -->
    <section class="relative h-96 md:h-[500px] overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
      <div 
        v-if="heroContent.data.value?.results?.length" 
        class="relative h-full bg-cover bg-center transition-all duration-1000"
        :style="{ backgroundImage: `url(${getBackdropUrl(currentHeroItem.backdrop_path, 'large')})` }"
      >
        <div class="absolute inset-0 z-20 flex items-center">
          <div class="container mx-auto px-6">
            <div class="max-w-2xl text-white">
              <!-- 内容类型标签 -->
              <div class="flex items-center gap-2 mb-3">
                <span class="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {{ currentHeroItem.media_type === 'movie' ? '电影' : '电视剧' }}
                </span>
                <span class="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                  🔥 今日热门
                </span>
              </div>
              
              <h1 class="text-4xl md:text-6xl font-bold mb-4">
                {{ currentHeroItem.title || currentHeroItem.name }}
              </h1>
              <p class="text-lg md:text-xl mb-6 line-clamp-3">{{ currentHeroItem.overview }}</p>
              
              <div class="flex items-center gap-4 mb-6">
                <div class="flex items-center">
                  <span class="text-yellow-400 mr-1">★</span>
                  <span class="font-semibold">{{ currentHeroItem.vote_average?.toFixed(1) }}/10</span>
                </div>
                <span class="text-gray-300">
                  {{ currentHeroItem.release_date || currentHeroItem.first_air_date }}
                </span>
                <div class="flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  <span class="text-sm">🌟 {{ currentHeroItem.popularity?.toFixed(0) || 'N/A' }}</span>
                </div>
              </div>
              
              <div class="flex gap-3">
                <button class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                  </svg>
                  立即观看
                </button>
                <button class="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  了解更多
                </button>
                <button 
                  @click="toggleFavorite(currentHeroItem)"
                  class="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-colors backdrop-blur-sm"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 轮播指示器 -->
        <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          <button
            v-for="(item, index) in heroContent.data.value.results.slice(0, 5)"
            :key="item.id"
            @click="currentHeroIndex = index"
            class="w-3 h-3 rounded-full transition-colors relative group"
            :class="currentHeroIndex === index ? 'bg-white' : 'bg-white/50'"
          >
            <!-- 悬停时显示标题 -->
            <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {{ item.title || item.name }}
            </div>
          </button>
        </div>
        
        <!-- 轮播控制按钮 -->
        <button 
          @click="prevHero"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button 
          @click="nextHero"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      
      <!-- 加载状态 -->
      <div v-else class="h-full bg-gray-300 animate-pulse flex items-center justify-center">
        <div class="text-gray-500 text-xl">加载精彩内容中...</div>
      </div>
    </section>

    <div class="container mx-auto px-6 py-8">
      <!-- 热门电影 -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">热门电影</h2>
          <button class="text-red-600 hover:text-red-700 font-semibold">查看更多 →</button>
        </div>
        
        <div v-if="popularMovies.pending.value" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div v-for="n in 6" :key="n" class="animate-pulse">
            <div class="bg-gray-300 aspect-[2/3] rounded-lg mb-2"></div>
            <div class="bg-gray-300 h-4 rounded mb-1"></div>
            <div class="bg-gray-300 h-3 rounded w-1/2"></div>
          </div>
        </div>
        
        <div v-else-if="popularMovies.data.value" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <MediaCard
            v-for="movie in popularMovies.data.value.results.slice(0, 12)"
            :key="movie.id"
            :item="movie"
            :is-movie="true"
            :movie-genres="movieGenres.data.value?.genres || []"
            :tv-genres="tvGenres.data.value?.genres || []"
          />
        </div>
      </section>

      <!-- 热门电视剧 -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">热门电视剧</h2>
          <button class="text-red-600 hover:text-red-700 font-semibold">查看更多 →</button>
        </div>
        
        <div v-if="popularTvShows.pending.value" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div v-for="n in 6" :key="n" class="animate-pulse">
            <div class="bg-gray-300 aspect-[2/3] rounded-lg mb-2"></div>
            <div class="bg-gray-300 h-4 rounded mb-1"></div>
            <div class="bg-gray-300 h-3 rounded w-1/2"></div>
          </div>
        </div>
        
        <div v-else-if="popularTvShows.data.value" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <MediaCard
            v-for="tvShow in popularTvShows.data.value.results.slice(0, 12)"
            :key="tvShow.id"
            :item="tvShow"
            :is-movie="false"
            :movie-genres="movieGenres.data.value?.genres || []"
            :tv-genres="tvGenres.data.value?.genres || []"
          />
        </div>
      </section>

      <!-- 最新动态 -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">最新动态</h2>
          <button class="text-red-600 hover:text-red-700 font-semibold">查看更多 →</button>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <!-- 即将上映电影 -->
          <MediaCard
            v-for="movie in upcomingMovies.data.value?.results?.slice(0, 6)"
            :key="`movie-${movie.id}`"
            :item="movie"
            status="upcoming"
            :is-movie="true"
            :movie-genres="movieGenres.data.value?.genres || []"
            :tv-genres="tvGenres.data.value?.genres || []"
          />
          
          <!-- 正在播出电视剧 -->
          <MediaCard
            v-for="show in onTheAirTvShows.data.value?.results?.slice(0, 6)"
            :key="`tv-${show.id}`"
            :item="show"
            status="on-air"
            :is-movie="false"
            :movie-genres="movieGenres.data.value?.genres || []"
            :tv-genres="tvGenres.data.value?.genres || []"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { getPopularMovies, getUpcomingMovies } from '~/api/movie'
import { getPopularTvShows, getOnTheAirTvShows } from '~/api/tv'
import { getAllTrending } from '~/api/trending'
import { getMovieGenres, getTvGenres } from '~/api/genre'
import { getBackdropUrl } from '~/utils/image'

// SEO
useHead({
  title: 'Nuxt Movie - 发现精彩电影',
  meta: [
    { name: 'description', content: '发现最新最热门的电影和电视剧，获取详细信息和评分' }
  ]
})

// 数据获取
const popularMovies = getPopularMovies(1)
console.log('popularMovies', popularMovies)
const upcomingMovies = getUpcomingMovies(1)
const popularTvShows = getPopularTvShows(1)
const onTheAirTvShows = getOnTheAirTvShows(1)
const movieGenres = getMovieGenres()
const tvGenres = getTvGenres()

// Hero 轮播 - 使用趋势内容（包含电影和电视剧）
const heroContent = getAllTrending()
console.log('heroContent', heroContent)
const currentHeroIndex = ref(0)

const currentHeroItem = computed(() => {
  return heroContent.data.value?.results?.[currentHeroIndex.value] || {}
})

// 轮播控制函数
const nextHero = () => {
  if (heroContent.data.value?.results?.length) {
    currentHeroIndex.value = (currentHeroIndex.value + 1) % Math.min(5, heroContent.data.value.results.length)
  }
}

const prevHero = () => {
  if (heroContent.data.value?.results?.length) {
    const maxIndex = Math.min(5, heroContent.data.value.results.length) - 1
    currentHeroIndex.value = currentHeroIndex.value === 0 ? maxIndex : currentHeroIndex.value - 1
  }
}

// 收藏功能
const favorites = ref(new Set())

const toggleFavorite = (item) => {
  if (favorites.value.has(item.id)) {
    favorites.value.delete(item.id)
  } else {
    favorites.value.add(item.id)
  }
  // TODO: 这里可以调用 API 同步到服务器
  console.log('收藏状态切换:', item.title || item.name, favorites.value.has(item.id))
}

// 自动轮播
let heroInterval = null
onMounted(() => {
  heroInterval = setInterval(() => {
    if (heroContent.data.value?.results?.length) {
      currentHeroIndex.value = (currentHeroIndex.value + 1) % Math.min(5, heroContent.data.value.results.length)
    }
  }, 5000)
})

onUnmounted(() => {
  if (heroInterval) {
    clearInterval(heroInterval)
  }
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 