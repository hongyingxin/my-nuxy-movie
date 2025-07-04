<!-- 
  演员详情页面
  id: 演员的id
  url: /actors/1234567890
-->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 加载状态 -->
    <div v-if="detail.pending.value" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p class="text-gray-600">加载演员详情中...</p>
      </div>
    </div>

    <!-- 演员详情内容 -->
    <div v-else-if="detail.data.value" class="relative">
      <!-- Hero 区域 - 背景图片和基本信息 -->
      <section class="relative h-auto min-h-[500px] md:h-[500px] overflow-hidden">
        <!-- 背景图片 -->
        <div 
          class="absolute inset-0 bg-cover bg-center"
          :style="{ backgroundImage: `url(${getProfileUrl(detail.data.value.profile_path, 'original')})` }"
        >
          <!-- 渐变遮罩 -->
          <div class="absolute inset-0 bg-black/60"></div>
        </div>
        
        <!-- 内容区域 -->
        <div class="relative z-10 pt-16 pb-8">
          <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row gap-8 items-center md:items-end">
              <!-- 演员头像 -->
              <div class="flex-shrink-0">
                <img 
                  :src="getProfileUrl(detail.data.value.profile_path, 'large')"
                  :alt="detail.data.value.name"
                  class="w-48 md:w-64 rounded-lg shadow-2xl"
                />
              </div>
              
              <!-- 基本信息 -->
              <div class="flex-1 text-white text-center md:text-left">
                <!-- 姓名 -->
                <div class="mb-4">
                  <h1 class="text-3xl md:text-5xl font-bold mb-2">
                    {{ detail.data.value.name }}
                  </h1>
                  <p v-if="detail.data.value.birthday" class="text-xl text-gray-300">
                    {{ formatDate(detail.data.value.birthday) }}
                  </p>
                </div>
                
                <!-- 出生地 -->
                <div v-if="detail.data.value.place_of_birth" class="mb-4">
                  <p class="text-gray-300">
                    📍 {{ detail.data.value.place_of_birth }}
                  </p>
                </div>
                
                <!-- 人气指数 -->
                <div class="flex items-center gap-4 mb-6 justify-center md:justify-start">
                  <div class="flex items-center bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                    <span class="text-yellow-400 mr-2">★</span>
                    <span class="font-bold text-lg">{{ detail.data.value.popularity.toFixed(0) }}</span>
                    <span class="text-gray-300 ml-1">人气指数</span>
                  </div>
                </div>
                
                <!-- 操作按钮 -->
                <div class="flex gap-3 justify-center md:justify-start">
                  <button class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                    收藏
                  </button>
                  <button class="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                    </svg>
                    分享
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 主要内容区域 -->
      <div class="container mx-auto px-6 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- 左侧内容 -->
          <div class="lg:col-span-2">
            <!-- 简介 -->
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">简介</h2>
              <p class="text-gray-700 leading-relaxed">
                {{ detail.data.value.biography || '暂无简介' }}
              </p>
            </section>

            <!-- 作品列表 -->
            <section class="mb-8" v-if="credits.data.value">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">作品</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div 
                  v-for="work in credits.data.value.cast?.slice(0, 8)" 
                  :key="work.id"
                  class="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  @click="navigateToWork(work)"
                >
                  <img 
                    :src="getPosterUrl(work.poster_path, 'medium')"
                    :alt="work.title || work.name"
                    class="w-full aspect-[2/3] object-cover"
                    loading="lazy"
                  />
                  <div class="p-3">
                    <h3 class="font-medium text-gray-800 text-sm line-clamp-2 mb-1">
                      {{ work.title || work.name }}
                    </h3>
                    <p class="text-xs text-gray-600">{{ work.character }}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- 右侧边栏 -->
          <div class="lg:col-span-1">
            <!-- 详细信息 -->
            <section class="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 class="text-lg font-bold text-gray-800 mb-4">详细信息</h3>
              <div class="space-y-3">
                <div v-if="detail.data.value.birthday">
                  <span class="text-gray-600 text-sm">生日：</span>
                  <span class="text-gray-800">{{ formatDate(detail.data.value.birthday) }}</span>
                </div>
                <div v-if="detail.data.value.place_of_birth">
                  <span class="text-gray-600 text-sm">出生地：</span>
                  <span class="text-gray-800">{{ detail.data.value.place_of_birth }}</span>
                </div>
                <div>
                  <span class="text-gray-600 text-sm">职业：</span>
                  <span class="text-gray-800">{{ detail.data.value.known_for_department }}</span>
                </div>
                <div v-if="detail.data.value.imdb_id">
                  <span class="text-gray-600 text-sm">IMDB：</span>
                  <a 
                    :href="`https://www.imdb.com/name/${detail.data.value.imdb_id}`"
                    target="_blank"
                    class="text-red-600 hover:text-red-700"
                  >
                    查看 IMDB 页面
                  </a>
                </div>
              </div>
            </section>

            <!-- 人气统计 -->
            <section class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-bold text-gray-800 mb-4">人气统计</h3>
              <div class="text-center">
                <div class="text-4xl font-bold text-red-600 mb-2">
                  {{ detail.data.value.popularity.toFixed(0) }}
                </div>
                <p class="text-gray-600 text-sm">人气指数</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="detail.error.value" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="text-red-600 text-6xl mb-4">😞</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">加载失败</h2>
        <p class="text-gray-600 mb-4">无法获取演员详情，请稍后重试</p>
        <button 
          @click="detail.refresh"
          class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          重新加载
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 路由参数
const route = useRoute()
const actorId = parseInt(route.params.id)

// API 导入
import { getPersonDetail, getPersonCredits } from '~/api/person'
import { getProfileUrl, getPosterUrl } from '~/utils/image'

// 数据获取
const detail = getPersonDetail(actorId)
const credits = getPersonCredits(actorId)

// SEO 配置
useHead(() => ({
  title: detail.data.value ? `${detail.data.value.name} - 演员详情 - Nuxt Movie` : '演员详情 - Nuxt Movie',
  meta: [
    { 
      name: 'description', 
      content: detail.data.value?.biography || '查看演员详细信息和作品' 
    }
  ]
}))

// 工具函数
const formatDate = (dateString) => {
  if (!dateString) return '未知'
  return new Date(dateString).toLocaleDateString('zh-CN')
}

// 导航到作品详情页
const navigateToWork = (work) => {
  const mediaType = work.media_type || 'movie'
  navigateTo(`/${mediaType}/${work.id}`)
}

// 刷新功能
const refresh = () => {
  detail.refresh()
  credits.refresh()
}
</script> 