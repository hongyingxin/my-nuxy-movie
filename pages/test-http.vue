<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-gray-800 text-center">HTTP 封装测试</h1>
      
      <!-- 测试热门电影 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
          <span class="w-2 h-6 bg-blue-500 rounded mr-3"></span>
          测试获取热门电影
        </h2>
        <div class="flex gap-3 mb-4">
          <input 
            v-model="popularPage" 
            placeholder="页码" 
            type="number"
            min="1"
            class="border border-gray-300 rounded-lg px-4 py-3 w-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
          <button 
            @click="loadPopularMovies" 
            class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-sm"
          >
            <span v-if="popularMovies.pending?.value" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              加载中...
            </span>
            <span v-else>获取热门电影</span>
          </button>
        </div>
        
        <!-- <div v-if="popularMovies.data.value" class="mt-6">
          <h3 class="font-medium mb-4 text-gray-600">热门电影 (共 {{ popularMovies.data.value.total_results }} 部, 第 {{ popularMovies.data.value.page }} 页):</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="movie in popularMovies.data.value.results.slice(0, 6)" 
              :key="movie.id"
              class="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 border border-gray-200"
            >
              <h4 class="font-semibold text-gray-800 mb-2 line-clamp-2">{{ movie.title }}</h4>
              <div class="flex items-center mb-2">
                <span class="text-yellow-500 mr-1">★</span>
                <span class="text-sm font-medium text-gray-700">{{ movie.vote_average }}/10</span>
              </div>
              <p class="text-sm text-gray-600">上映日期: {{ movie.release_date || '未知' }}</p>
            </div>
          </div>
        </div>
        
        <div v-if="popularMovies.error.value" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-red-700 font-medium">错误: {{ popularMovies.error.value.message }}</span>
          </div>
        </div> -->
      </div>

      <!-- 测试搜索电影 -->
      <!-- <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
          <span class="w-2 h-6 bg-green-500 rounded mr-3"></span>
          测试搜索电影
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <input 
            v-model="searchQuery" 
            placeholder="输入电影名称，如：Avengers" 
            class="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
          />
          <input 
            v-model="searchPage" 
            placeholder="页码" 
            type="number"
            min="1"
            class="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
          />
          <button 
            @click="handleSearchMovies" 
            class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium shadow-sm"
            :disabled="searchResults.pending.value"
          >
            <span v-if="searchResults.pending.value" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              搜索中...
            </span>
            <span v-else>搜索</span>
          </button>
        </div>
        
        <div v-if="searchResults.data.value" class="mt-6">
          <h3 class="font-medium mb-4 text-gray-600">搜索结果 (共 {{ searchResults.data.value.total_results }} 部, 第 {{ searchResults.data.value.page }} 页):</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="movie in searchResults.data.value.results.slice(0, 6)" 
              :key="movie.id"
              class="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 border border-gray-200"
            >
              <h4 class="font-semibold text-gray-800 mb-2 line-clamp-2">{{ movie.title }}</h4>
              <div class="flex items-center mb-2">
                <span class="text-yellow-500 mr-1">★</span>
                <span class="text-sm font-medium text-gray-700">{{ movie.vote_average }}/10</span>
              </div>
              <p class="text-sm text-gray-600">上映日期: {{ movie.release_date || '未知' }}</p>
            </div>
          </div>
        </div>
        
        <div v-if="searchResults.error.value" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-red-700 font-medium">错误: {{ searchResults.error.value.message }}</span>
          </div>
        </div>
      </div> -->

      <!-- 测试获取电影分类 -->
      <!-- <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
          <span class="w-2 h-6 bg-indigo-500 rounded mr-3"></span>
          测试获取电影分类
        </h2>
        <button 
          @click="loadGenres" 
          class="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-200 font-medium shadow-sm"
          :disabled="genres.pending.value"
        >
          <span v-if="genres.pending.value" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            加载中...
          </span>
          <span v-else>获取电影分类</span>
        </button>
        
        <div v-if="genres.data.value" class="mt-6">
          <h3 class="font-medium mb-4 text-gray-600">电影分类 (共 {{ genres.data.value.genres?.length || 0 }} 个):</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <div 
              v-for="genre in genres.data.value.genres" 
              :key="genre.id"
              class="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-center text-sm font-medium border border-indigo-200"
            >
              {{ genre.name }}
            </div>
          </div>
        </div>
        
        <div v-if="genres.error.value" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-red-700 font-medium">错误: {{ genres.error.value.message }}</span>
          </div>
        </div>
      </div> -->

      <!-- 测试获取趋势 -->
      <!-- <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
          <span class="w-2 h-6 bg-pink-500 rounded mr-3"></span>
          测试获取趋势
        </h2>
        <div class="flex gap-3 mb-4">
          <select 
            v-model="trendingType" 
            class="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-200"
          >
            <option value="all">所有</option>
            <option value="movie">电影</option>
            <option value="tv">电视剧</option>
          </select>
          <input 
            v-model="trendingPage" 
            placeholder="页码" 
            type="number"
            min="1"
            class="border border-gray-300 rounded-lg px-4 py-3 w-32 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-200"
          />
          <button 
            @click="loadTrending" 
            class="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-200 font-medium shadow-sm"
            :disabled="trending.pending.value"
          >
            <span v-if="trending.pending.value" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              加载中...
            </span>
            <span v-else>获取趋势</span>
          </button>
        </div>
        
        <div v-if="trending.data.value" class="mt-6">
          <h3 class="font-medium mb-4 text-gray-600">趋势内容 (共 {{ trending.data.value.total_results }} 个, 第 {{ trending.data.value.page }} 页):</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="item in trending.data.value.results.slice(0, 6)" 
              :key="item.id"
              class="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 border border-gray-200"
            >
              <h4 class="font-semibold text-gray-800 mb-2 line-clamp-2">{{ item.title || item.name }}</h4>
              <div class="flex items-center mb-2">
                <span class="text-yellow-500 mr-1">★</span>
                <span class="text-sm font-medium text-gray-700">{{ item.vote_average }}/10</span>
              </div>
              <p class="text-sm text-gray-600">类型: {{ item.media_type || '未知' }}</p>
              <p class="text-sm text-gray-600">发布日期: {{ item.release_date || item.first_air_date || '未知' }}</p>
            </div>
          </div>
        </div>
        
        <div v-if="trending.error.value" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-red-700 font-medium">错误: {{ trending.error.value.message }}</span>
          </div>
        </div>
      </div> -->

      <!-- 测试获取电影详情 -->
      <!-- <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
          <span class="w-2 h-6 bg-purple-500 rounded mr-3"></span>
          测试获取电影详情
        </h2>
        <div class="flex gap-3 mb-4">
          <input 
            v-model="movieId" 
            placeholder="输入电影ID，如：299536 (复仇者联盟3)" 
            type="number"
            class="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
          />
          <button 
            @click="loadMovieDetail" 
            class="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors duration-200 font-medium shadow-sm"
            :disabled="movieDetail.pending.value"
          >
            <span v-if="movieDetail.pending.value" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              加载中...
            </span>
            <span v-else>获取详情</span>
          </button>
        </div>
        
        <div v-if="movieDetail.data.value" class="mt-6">
          <h3 class="font-medium mb-4 text-gray-600">电影详情:</h3>
          <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h4 class="text-2xl font-bold text-gray-800 mb-3">{{ movieDetail.data.value.title }}</h4>
            <p class="text-gray-600 mb-4 leading-relaxed">{{ movieDetail.data.value.overview || '暂无简介' }}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div class="flex items-center">
                <span class="text-yellow-500 mr-2">★</span>
                <span class="text-gray-700">评分: <span class="font-medium">{{ movieDetail.data.value.vote_average }}/10</span></span>
              </div>
              <div class="text-gray-700">
                上映日期: <span class="font-medium">{{ movieDetail.data.value.release_date || '未知' }}</span>
              </div>
              <div class="text-gray-700">
                时长: <span class="font-medium">{{ movieDetail.data.value.runtime || '未知' }} 分钟</span>
              </div>
              <div class="text-gray-700">
                类型: <span class="font-medium">{{ movieDetail.data.value.genres?.map(g => g.name).join(', ') || '未知' }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="movieDetail.error.value" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-red-700 font-medium">错误: {{ movieDetail.error.value.message }}</span>
          </div>
        </div>
      </div> -->

      <!-- 测试 POST 请求 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <!-- <h2 class="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
          <span class="w-2 h-6 bg-orange-500 rounded mr-3"></span>
          测试 POST 请求
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">电影ID</label>
            <input 
              v-model="postMovieId" 
              placeholder="输入电影ID" 
              type="number"
              class="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">评分 (1-10)</label>
            <input 
              v-model="postRating" 
              placeholder="输入评分" 
              type="number"
              min="1"
              max="10"
              class="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
        </div>
        <button 
          @click="testPostRequest" 
          class="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium shadow-sm"
          :disabled="postResult.pending.value"
        >
          <span v-if="postResult.pending.value" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            发送中...
          </span>
          <span v-else>测试 POST 请求</span>
        </button>
        
        <div v-if="postResult.data.value" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-green-700 font-medium">POST 请求成功!</span>
          </div>
          <pre class="mt-2 text-sm text-green-600 bg-green-100 p-2 rounded overflow-auto">{{ JSON.stringify(postResult.data.value, null, 2) }}</pre>
        </div>
        
        <div v-if="postResult.error.value" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-red-700 font-medium">POST 请求失败: {{ postResult.error.value.message }}</span>
          </div>
          <pre class="mt-2 text-sm text-red-600 bg-red-100 p-2 rounded overflow-auto">{{ JSON.stringify(postResult.error.value, null, 2) }}</pre>
        </div> -->

        <!-- 请求详情调试信息 -->
        <!-- <div class="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 class="font-medium text-gray-700 mb-2">请求详情:</h4>
          <div class="text-sm text-gray-600 space-y-1">
            <p><strong>URL:</strong> /movie/{{ postMovieId }}/rating?language=zh-CN</p>
            <p><strong>Method:</strong> POST</p>
            <p><strong>Body:</strong> {{ JSON.stringify({ value: parseFloat(postRating) || 0 }) }}</p>
            <p><strong>Headers:</strong> Authorization: Bearer ***, Content-Type: application/json</p>
            <p><strong>URL Params:</strong> language=zh-CN</p>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
// 直接导入 API 函数
import { 
  getPopularMovies, 
  searchMovies, 
  getMovieDetail, 
  rateMovie 
} from '~/api/movie'

import { getMovieGenres } from '~/api/genre'
import { getAllTrending, getMovieTrending, getTvTrending } from '~/api/trending'


// 响应式数据
const searchQuery = ref('')
const searchPage = ref(1)
const movieId = ref('')
const postMovieId = ref('299536')
const postRating = ref('8.5')
const popularPage = ref(1)
const trendingType = ref('all')
const trendingPage = ref(1)

// 获取热门电影 - 手动触发
const popularMovies = getPopularMovies(popularPage.value)
console.log('popularMovies------------', popularMovies)


const loadPopularMovies = async() => {
  const { data: { value } } = await getPopularMovies(popularPage.value)
  console.log('res------------', value)
  // popularMovies()
}

// // 搜索电影 - 手动触发
// const searchResults = searchMovies('', 1)

// const handleSearchMovies = () => {
//   if (searchQuery.value.trim()) {
//     searchResults.refresh()
//   }
// }

// // 获取电影分类 - 手动触发
// const genres = getMovieGenres()

// const loadGenres = () => {
//   genres.refresh()
// }

// // 获取趋势 - 手动触发
// const trending = computed(() => {
//   switch (trendingType.value) {
//     case 'movie':
//       return getMovieTrending(trendingPage.value)
//     case 'tv':
//       return getTvTrending(trendingPage.value)
//     default:
//       return getAllTrending(trendingPage.value)
//   }
// })

// const loadTrending = () => {
//   trending.value.refresh()
// }

// // 获取电影详情 - 手动触发
// const movieDetail = getMovieDetail(0)

// const loadMovieDetail = () => {
//   if (movieId.value) {
//     movieDetail.refresh()
//   }
// }

// // 测试 POST 请求 - 手动触发
// const postResult = rateMovie(parseInt(postMovieId.value), parseFloat(postRating.value))

// const testPostRequest = () => {
//   if (postMovieId.value && postRating.value) {
//     const rating = parseFloat(postRating.value)
//     if (rating >= 1 && rating <= 10) {
//       postResult.refresh()
//     } else {
//       alert('评分必须在 1-10 之间')
//     }
//   } else {
//     alert('请填写电影ID和评分')
//   }
// }
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 