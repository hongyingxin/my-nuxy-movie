<!-- 
  演员列表页面
  url: /actors
  展示热门演员列表，支持分页加载
-->
<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">热门演员</h1>
        <p class="text-gray-600">发现最受欢迎的演员和明星</p>
      </div>

      <!-- 加载状态 -->
      <div v-if="actors?.pending.value" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p class="text-gray-600">加载演员列表中...</p>
      </div>

      <!-- 演员列表 -->
      <div v-else-if="actors?.data.value" class="space-y-8">
        <!-- 演员网格 -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div 
            v-for="actor in actors.data.value.results" 
            :key="actor.id"
            class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            @click="navigateToActor(actor.id)"
          >
            <!-- 演员头像 -->
            <div class="relative aspect-[2/3] overflow-hidden rounded-t-lg">
              <img 
                :src="getProfileUrl(actor.profile_path, 'medium')"
                :alt="actor.name"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                @error="handleImageError"
              />
              <!-- 悬停遮罩 -->
              <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div class="text-white text-center">
                  <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <span class="text-sm font-medium">查看详情</span>
                </div>
              </div>
            </div>
            
            <!-- 演员信息 -->
            <div class="p-4">
              <!-- 演员姓名 -->
              <h3 class="font-semibold text-gray-800 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
                {{ actor.name }}
              </h3>
              
              <!-- 代表作 -->
              <div class="space-y-1">
                <p class="text-xs text-gray-500">代表作：</p>
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="work in actor.known_for?.slice(0, 2)" 
                    :key="work.id"
                    class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full line-clamp-1"
                    :title="work.title || work.name"
                  >
                    {{ work.title || work.name }}
                  </span>
                  <span 
                    v-if="(actor.known_for?.length || 0) > 2" 
                    class="text-xs text-gray-400"
                  >
                    +{{ (actor.known_for?.length || 0) - 2 }}
                  </span>
                </div>
              </div>
              
              <!-- 人气指数 -->
              <div class="mt-3 flex items-center justify-between">
                <div class="flex items-center text-yellow-500">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="text-sm font-medium">{{ actor.popularity.toFixed(0) }}</span>
                </div>
                <span class="text-xs text-gray-400">{{ actor.known_for_department }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页组件 -->
        <div v-if="actors.data.value.total_pages > 1" class="flex justify-center">
          <div class="flex items-center space-x-2 bg-white rounded-lg shadow-sm px-4 py-2">
            <!-- 上一页 -->
            <button 
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage <= 1"
              class="px-3 py-1 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              :class="currentPage <= 1 ? 'text-gray-400' : 'text-gray-700'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            <!-- 页码 -->
            <div class="flex items-center space-x-1">
              <!-- 第一页 -->
              <button 
                v-if="currentPage > 3"
                @click="goToPage(1)"
                class="px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                1
              </button>
              
              <!-- 省略号 -->
              <span v-if="currentPage > 4" class="px-2 text-gray-400">...</span>
              
              <!-- 当前页附近的页码 -->
              <button 
                v-for="page in visiblePages" 
                :key="page"
                @click="goToPage(page)"
                class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
                :class="page === currentPage ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'"
              >
                {{ page }}
              </button>
              
              <!-- 省略号 -->
              <span v-if="currentPage < actors.data.value.total_pages - 3" class="px-2 text-gray-400">...</span>
              
              <!-- 最后一页 -->
              <button 
                v-if="currentPage < actors.data.value.total_pages - 2"
                @click="goToPage(actors.data.value.total_pages)"
                class="px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {{ actors.data.value.total_pages }}
              </button>
            </div>

            <!-- 下一页 -->
            <button 
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage >= actors.data.value.total_pages"
              class="px-3 py-1 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              :class="currentPage >= actors.data.value.total_pages ? 'text-gray-400' : 'text-gray-700'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- 分页信息 -->
        <div v-if="actors.data.value.total_pages > 1" class="text-center text-gray-600 text-sm">
          第 {{ currentPage }} 页，共 {{ actors.data.value.total_pages }} 页
          <span class="mx-2">•</span>
          共 {{ actors.data.value.total_results }} 位演员
        </div>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="actors?.error.value" class="text-center py-12">
        <div class="text-red-600 text-6xl mb-4">😞</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">加载失败</h2>
        <p class="text-gray-600 mb-4">无法获取演员列表，请稍后重试</p>
        <button 
          @click="actors.refresh"
          class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          重新加载
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// API 导入
import { getPopularPeople } from '~/api/person'
import { getProfileUrl } from '~/utils/image'

// SEO 配置
useHead({
  title: '热门演员 - Nuxt Movie',
  meta: [
    { 
      name: 'description', 
      content: '发现最受欢迎的演员和明星，查看他们的代表作品和详细信息' 
    }
  ]
})

// 当前页码
const currentPage = ref(1)

// 演员列表数据
const actors = ref()

// 获取演员列表数据
const fetchData = async () => {
  try {
    actors.value = getPopularPeople(currentPage.value)
  } catch (error) {
    console.error('获取演员列表失败:', error)
  }
}

// 跳转到指定页面
const goToPage = async (page) => {
  if (page < 1 || page > actors.value?.data.value?.total_pages) return
  currentPage.value = page
  await fetchData()
  
  // 滚动到页面顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 计算可见的页码
const visiblePages = computed(() => {
  if (!actors.value?.data.value) return []
  
  const totalPages = actors.value.data.value.total_pages
  const current = currentPage.value
  const pages = []
  
  // 显示当前页前后各2页
  const start = Math.max(1, current - 2)
  const end = Math.min(totalPages, current + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// 页面加载时获取数据
fetchData()

// 导航到演员详情页
const navigateToActor = (actorId) => {
  navigateTo(`/actors/${actorId}`)
}

// 处理图片加载错误
const handleImageError = (event) => {
  const img = event.target
  img.src = '/images/default-profile.png' // 设置默认头像
}
</script> 