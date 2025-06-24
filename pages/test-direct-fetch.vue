<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">直接使用 useFetch 测试</h1>
      
      <!-- 热门电影测试 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">热门电影 (GET with params)</h2>
        <div class="space-y-4">
          <div class="flex gap-4">
            <input 
              v-model="popularPage" 
              type="number" 
              placeholder="页码" 
              class="border rounded px-3 py-2 w-24"
            >
            <button 
              @click="fetchPopularMovies"
              :disabled="popularLoading"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {{ popularLoading ? '加载中...' : '获取热门电影' }}
            </button>
          </div>
          <div v-if="popularError" class="text-red-500">
            错误: {{ popularError }}
          </div>
          <div v-if="popularData" class="text-sm text-gray-600">
            结果: {{ popularData.results?.length || 0 }} 部电影
          </div>
        </div>
      </div>

      <!-- 搜索电影测试 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">搜索电影 (GET with query)</h2>
        <div class="space-y-4">
          <div class="flex gap-4">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="搜索关键词" 
              class="border rounded px-3 py-2 flex-1"
            >
            <input 
              v-model="searchPage" 
              type="number" 
              placeholder="页码" 
              class="border rounded px-3 py-2 w-24"
            >
            <button 
              @click="searchMovies"
              :disabled="searchLoading"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
              {{ searchLoading ? '搜索中...' : '搜索' }}
            </button>
          </div>
          <div v-if="searchError" class="text-red-500">
            错误: {{ searchError }}
          </div>
          <div v-if="searchData" class="text-sm text-gray-600">
            结果: {{ searchData.results?.length || 0 }} 部电影
          </div>
        </div>
      </div>

      <!-- 电影详情测试 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">电影详情 (GET with path param)</h2>
        <div class="space-y-4">
          <div class="flex gap-4">
            <input 
              v-model="movieId" 
              type="number" 
              placeholder="电影ID" 
              class="border rounded px-3 py-2 w-32"
            >
            <button 
              @click="fetchMovieDetails"
              :disabled="movieLoading"
              class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
            >
              {{ movieLoading ? '加载中...' : '获取详情' }}
            </button>
          </div>
          <div v-if="movieError" class="text-red-500">
            错误: {{ movieError }}
          </div>
          <div v-if="movieData" class="text-sm text-gray-600">
            电影: {{ movieData.title }}
          </div>
        </div>
      </div>

      <!-- 评分测试 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">评分 (POST with body)</h2>
        <div class="space-y-4">
          <div class="flex gap-4">
            <input 
              v-model="ratingMovieId" 
              type="number" 
              placeholder="电影ID" 
              class="border rounded px-3 py-2 w-32"
            >
            <input 
              v-model="ratingValue" 
              type="number" 
              min="0.5" 
              max="10" 
              step="0.5"
              placeholder="评分" 
              class="border rounded px-3 py-2 w-24"
            >
            <button 
              @click="handleRateMovie"
              :disabled="ratingLoading"
              class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
            >
              {{ ratingLoading ? '提交中...' : '提交评分' }}
            </button>
          </div>
          <div v-if="ratingError" class="text-red-500">
            错误: {{ ratingError }}
          </div>
          <div v-if="ratingData" class="text-sm text-green-600">
            评分提交成功！
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

// 导入 API 函数
import { getPopularMovies, rateMovie } from '~/api/movie'

// 热门电影
const popularPage = ref(1)
const popularLoading = ref(false)
const popularData = ref(null)
const popularError = ref(null)

const fetchPopularMovies = async () => {
  popularLoading.value = true
  popularError.value = null
  try {
    const { data } = await getPopularMovies(popularPage.value)
    console.log('data', data)
    popularData.value = data.value
  } catch (err) {
    console.log('err', err) 
    popularError.value = err.message
  } finally {
    popularLoading.value = false
  }
}

// 搜索电影
const searchQuery = ref('')
const searchPage = ref(1)
const searchLoading = ref(false)
const searchData = ref(null)
const searchError = ref(null)

const searchMovies = async () => {
  if (!searchQuery.value.trim()) {
    searchError.value = '请输入搜索关键词'
    return
  }
  
  searchLoading.value = true
  searchError.value = null
  
  try {
    const { data, error } = await useFetch('/search/movie', {
      baseURL: config.public.tmdbApiUrl,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.public.tmdbApiToken}`,
        'Content-Type': 'application/json'
      },
      params: {
        language: 'zh-CN',
        query: searchQuery.value,
        page: searchPage.value
      },
      lazy: true
    })
    
    if (error.value) {
      searchError.value = error.value.message
    } else {
      searchData.value = data.value
    }
  } catch (err) {
    searchError.value = err.message
  } finally {
    searchLoading.value = false
  }
}

// 电影详情
const movieId = ref(550) // Fight Club
const movieLoading = ref(false)
const movieData = ref(null)
const movieError = ref(null)

const fetchMovieDetails = async () => {
  if (!movieId.value) {
    movieError.value = '请输入电影ID'
    return
  }
  
  movieLoading.value = true
  movieError.value = null
  
  try {
    const { data, error } = await useFetch(`/movie/${movieId.value}`, {
      baseURL: config.public.tmdbApiUrl,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.public.tmdbApiToken}`,
        'Content-Type': 'application/json'
      },
      params: {
        language: 'zh-CN'
      },
      lazy: true
    })
    
    if (error.value) {
      movieError.value = error.value.message
    } else {
      movieData.value = data.value
    }
  } catch (err) {
    movieError.value = err.message
  } finally {
    movieLoading.value = false
  }
}

// 评分
const ratingMovieId = ref(550)
const ratingValue = ref(8.5)
const ratingLoading = ref(false)
const ratingData = ref(null)
const ratingError = ref(null)

const handleRateMovie = async () => {
  if (!ratingMovieId.value || !ratingValue.value) {
    ratingError.value = '请输入电影ID和评分'
    return
  }
  
  ratingLoading.value = true
  ratingError.value = null
  
  try {
    const { data } = await rateMovie(parseInt(ratingMovieId.value), parseFloat(ratingValue.value))
    console.log('res', data)
    ratingData.value = data.value
  } catch (err) {
    console.log('err', err) 
    ratingError.value = err.message
  } finally {
    ratingLoading.value = false
  }
}
</script> 