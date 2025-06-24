<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero 轮播区 -->
    <section class="relative h-96 md:h-[500px] overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
      <div 
        v-if="heroContent.data.value?.results?.length" 
        class="relative h-full bg-cover bg-center transition-all duration-1000"
        :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${currentHeroItem.backdrop_path})` }"
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
      <!-- 电影分类导航 -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">电影分类</h2>
        <div v-if="genres.data.value?.genres" class="flex flex-wrap gap-3">
          <button
            v-for="genre in genres.data.value.genres.slice(0, 10)"
            :key="genre.id"
            class="bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-full border border-gray-200 transition-colors"
          >
            {{ genre.name }}
          </button>
        </div>
      </section>

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
          <div
            v-for="movie in popularMovies.data.value.results.slice(0, 12)"
            :key="movie.id"
            class="group cursor-pointer"
          >
            <div class="relative overflow-hidden rounded-lg mb-3 aspect-[2/3] bg-gray-200">
              <img
                v-if="movie.poster_path"
                :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"
                :alt="movie.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                ★ {{ movie.vote_average?.toFixed(1) }}
              </div>
            </div>
            <h3 class="font-semibold text-gray-800 line-clamp-2 mb-1">{{ movie.title }}</h3>
            <p class="text-sm text-gray-600">{{ movie.release_date?.split('-')[0] || '未知' }}</p>
          </div>
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
          <div
            v-for="tvShow in popularTvShows.data.value.results.slice(0, 12)"
            :key="tvShow.id"
            class="group cursor-pointer"
          >
            <div class="relative overflow-hidden rounded-lg mb-3 aspect-[2/3] bg-gray-200">
              <img
                v-if="tvShow.poster_path"
                :src="`https://image.tmdb.org/t/p/w342${tvShow.poster_path}`"
                :alt="tvShow.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                电视剧
              </div>
              <div class="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                ★ {{ tvShow.vote_average?.toFixed(1) }}
              </div>
            </div>
            <h3 class="font-semibold text-gray-800 line-clamp-2 mb-1">{{ tvShow.name }}</h3>
            <p class="text-sm text-gray-600">{{ tvShow.first_air_date?.split('-')[0] || '未知' }}</p>
          </div>
        </div>
      </section>

      <!-- 正在播出 -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">正在播出</h2>
          <div class="flex items-center gap-2">
            <span class="text-green-500 animate-pulse">🔴</span>
            <span class="text-sm text-gray-600">实时更新</span>
            <button class="text-red-600 hover:text-red-700 font-semibold ml-4">查看更多 →</button>
          </div>
        </div>
        
        <div v-if="onTheAirTvShows.data.value" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="show in onTheAirTvShows.data.value.results.slice(0, 4)"
            :key="show.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
          >
            <div class="flex">
              <div class="w-1/4 aspect-[2/3] bg-gray-200">
                <img
                  v-if="show.poster_path"
                  :src="`https://image.tmdb.org/t/p/w185${show.poster_path}`"
                  :alt="show.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1 p-4">
                <div class="flex items-center gap-2 mb-2">
                  <span class="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    正在播出
                  </span>
                  <span class="text-xs text-gray-500">{{ show.origin_country?.join(', ') || '未知' }}</span>
                </div>
                <h3 class="font-semibold text-gray-800 mb-2 line-clamp-2">{{ show.name }}</h3>
                <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ show.overview }}</p>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">首播: {{ show.first_air_date }}</span>
                  <div class="flex items-center">
                    <span class="text-yellow-500 mr-1">★</span>
                    <span>{{ show.vote_average?.toFixed(1) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 即将上映 -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">即将上映</h2>
          <button class="text-red-600 hover:text-red-700 font-semibold">查看更多 →</button>
        </div>
        
        <div v-if="upcomingMovies.data.value" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="movie in upcomingMovies.data.value.results.slice(0, 6)"
            :key="movie.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
          >
            <div class="flex">
              <div class="w-1/3 aspect-[2/3] bg-gray-200">
                <img
                  v-if="movie.poster_path"
                  :src="`https://image.tmdb.org/t/p/w185${movie.poster_path}`"
                  :alt="movie.title"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1 p-4">
                <h3 class="font-semibold text-gray-800 mb-2 line-clamp-2">{{ movie.title }}</h3>
                <p class="text-sm text-gray-600 mb-3 line-clamp-3">{{ movie.overview }}</p>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-red-600 font-semibold">{{ movie.release_date }}</span>
                  <div class="flex items-center">
                    <span class="text-yellow-500 mr-1">★</span>
                    <span>{{ movie.vote_average?.toFixed(1) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 趋势内容 -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">今日趋势</h2>
          <div class="flex gap-2">
            <button
              @click="trendingType = 'all'"
              :class="trendingType === 'all' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              全部
            </button>
            <button
              @click="trendingType = 'movie'"
              :class="trendingType === 'movie' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              电影
            </button>
            <button
              @click="trendingType = 'tv'"
              :class="trendingType === 'tv' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              电视剧
            </button>
          </div>
        </div>
        
        <div v-if="currentTrending.data.value" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="item in currentTrending.data.value.results.slice(0, 12)"
            :key="item.id"
            class="group cursor-pointer"
          >
            <div class="relative overflow-hidden rounded-lg mb-3 aspect-[2/3] bg-gray-200">
              <img
                v-if="item.poster_path"
                :src="`https://image.tmdb.org/t/p/w342${item.poster_path}`"
                :alt="item.title || item.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                {{ item.media_type === 'movie' ? '电影' : '电视剧' }}
              </div>
              <div class="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                ★ {{ item.vote_average?.toFixed(1) }}
              </div>
            </div>
            <h3 class="font-semibold text-gray-800 line-clamp-2 mb-1">{{ item.title || item.name }}</h3>
            <p class="text-sm text-gray-600">{{ (item.release_date || item.first_air_date)?.split('-')[0] || '未知' }}</p>
          </div>
        </div>
      </section>

      <!-- 今日推荐 -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">今日推荐</h2>
          <div class="flex gap-2">
            <button
              @click="recommendationType = 'top_rated_movies'"
              :class="recommendationType === 'top_rated_movies' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              高分电影
            </button>
            <button
              @click="recommendationType = 'top_rated_tv'"
              :class="recommendationType === 'top_rated_tv' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              高分剧集
            </button>
            <button
              @click="recommendationType = 'now_playing'"
              :class="recommendationType === 'now_playing' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              正在上映
            </button>
          </div>
        </div>
        
        <div v-if="currentRecommendation.data.value" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="item in currentRecommendation.data.value.results.slice(0, 12)"
            :key="item.id"
            class="group cursor-pointer"
          >
            <div class="relative overflow-hidden rounded-lg mb-3 aspect-[2/3] bg-gray-200">
              <img
                v-if="item.poster_path"
                :src="`https://image.tmdb.org/t/p/w342${item.poster_path}`"
                :alt="item.title || item.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute top-2 left-2 text-white px-2 py-1 rounded text-xs font-medium"
                :class="getRecommendationBadge(recommendationType).class"
              >
                {{ getRecommendationBadge(recommendationType).text }}
              </div>
              <div class="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                ★ {{ item.vote_average?.toFixed(1) }}
              </div>
            </div>
            <h3 class="font-semibold text-gray-800 line-clamp-2 mb-1">{{ item.title || item.name }}</h3>
            <p class="text-sm text-gray-600">
              {{ (item.release_date || item.first_air_date)?.split('-')[0] || '未知' }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { getPopularMovies, getUpcomingMovies, getNowPlayingMovies, getTopRatedMovies } from '~/api/movie'
import { getPopularTvShows, getOnTheAirTvShows, getTopRatedTvShows } from '~/api/tv'
import { getMovieGenres } from '~/api/genre'
import { getAllTrending, getMovieTrending, getTvTrending } from '~/api/trending'

// SEO
useHead({
  title: 'Nuxt Movie - 发现精彩电影',
  meta: [
    { name: 'description', content: '发现最新最热门的电影和电视剧，获取详细信息和评分' }
  ]
})

// 数据获取
const popularMovies = getPopularMovies(1)
const upcomingMovies = getUpcomingMovies(1)
const popularTvShows = getPopularTvShows(1)
const onTheAirTvShows = getOnTheAirTvShows(1)
const genres = getMovieGenres()

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

// 趋势内容
const trendingType = ref('all')
const allTrending = getAllTrending(1)
const movieTrending = getMovieTrending(1)
const tvTrending = getTvTrending(1)

const currentTrending = computed(() => {
  switch (trendingType.value) {
    case 'movie':
      return movieTrending
    case 'tv':
      return tvTrending
    default:
      return allTrending
  }
})

// 今日推荐
const recommendationType = ref('top_rated_movies')
const topRatedMovies = getTopRatedMovies(1)
const topRatedTvShows = getTopRatedTvShows(1)
const nowPlayingMovies = getNowPlayingMovies(1)

const currentRecommendation = computed(() => {
  switch (recommendationType.value) {
    case 'top_rated_movies':
      return topRatedMovies
    case 'top_rated_tv':
      return topRatedTvShows
    case 'now_playing':
      return nowPlayingMovies
    default:
      return topRatedMovies
  }
})

// 今日推荐徽章
const getRecommendationBadge = (type) => {
  switch (type) {
    case 'top_rated_movies':
      return { class: 'bg-purple-600', text: '高分电影' }
    case 'top_rated_tv':
      return { class: 'bg-blue-600', text: '高分剧集' }
    case 'now_playing':
      return { class: 'bg-green-600', text: '正在上映' }
    default:
      return { class: 'bg-purple-600', text: '高分电影' }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 