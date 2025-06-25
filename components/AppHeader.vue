<template>
  <!-- 头部导航栏 - 默认置顶，滚动时吸顶 -->
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-out"
    :class="[
      isScrolled 
        ? 'bg-white shadow-lg' 
        : 'bg-white/90 backdrop-blur-sm'
    ]"
  >
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <!-- 左侧：Logo 和导航菜单 -->
        <div class="flex items-center space-x-8">
          <!-- Logo -->
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900">Nuxt Movie</span>
          </div>

          <!-- 主导航菜单 -->
          <nav class="hidden md:flex items-center space-x-8">
            <!-- 首页 -->
            <NuxtLink 
              to="/" 
              class="text-gray-700 hover:text-red-600 font-medium transition-colors relative group"
              active-class="text-red-600"
            >
              首页
              <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></div>
            </NuxtLink>

            <!-- 电影下拉菜单 -->
            <div class="relative group">
              <button class="text-gray-700 hover:text-red-600 font-medium transition-colors flex items-center space-x-1">
                <span>电影</span>
                <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <!-- 电影下拉内容 -->
              <div class="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999]">
                <div class="p-4">
                  <div class="grid grid-cols-1 gap-2">
                    <NuxtLink to="/movies/popular" class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors">
                      <div>
                        <div class="font-medium text-gray-900">热门电影</div>
                        <div class="text-sm text-gray-500">最受欢迎的电影</div>
                      </div>
                    </NuxtLink>
                    
                    <NuxtLink to="/movies/upcoming" class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors">
                      <div>
                        <div class="font-medium text-gray-900">即将上映</div>
                        <div class="text-sm text-gray-500">即将上映的新片</div>
                      </div>
                    </NuxtLink>
                    
                    <NuxtLink to="/movies/top-rated" class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors">
                      <div>
                        <div class="font-medium text-gray-900">高分电影</div>
                        <div class="text-sm text-gray-500">评分最高的电影</div>
                      </div>
                    </NuxtLink>
                    
                    <NuxtLink to="/movies/now-playing" class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors">
                      <div>
                        <div class="font-medium text-gray-900">正在上映</div>
                        <div class="text-sm text-gray-500">影院正在放映</div>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <!-- 电影列表页面链接 -->
            <NuxtLink 
              to="/movies" 
              class="text-gray-700 hover:text-red-600 font-medium transition-colors relative group"
              active-class="text-red-600"
            >
              电影列表
              <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></div>
            </NuxtLink>

            <!-- 电视剧下拉菜单 -->
            <div class="relative group">
              <button class="text-gray-700 hover:text-red-600 font-medium transition-colors flex items-center space-x-1">
                <span>电视剧</span>
                <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <!-- 电视剧下拉内容 -->
              <div class="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999]">
                <div class="p-4">
                  <div class="grid grid-cols-1 gap-2">
                    <NuxtLink to="/tv/popular" class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors">
                      <div>
                        <div class="font-medium text-gray-900">热门剧集</div>
                        <div class="text-sm text-gray-500">最受欢迎的电视剧</div>
                      </div>
                    </NuxtLink>
                    
                    <NuxtLink to="/tv/on-the-air" class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors">
                      <div>
                        <div class="font-medium text-gray-900">正在播出</div>
                        <div class="text-sm text-gray-500">正在播出的剧集</div>
                      </div>
                    </NuxtLink>
                    
                    <NuxtLink to="/tv/top-rated" class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors">
                      <div>
                        <div class="font-medium text-gray-900">高分剧集</div>
                        <div class="text-sm text-gray-500">评分最高的电视剧</div>
                      </div>
                    </NuxtLink>
                    
                    <NuxtLink to="/tv/airing-today" class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors">
                      <div>
                        <div class="font-medium text-gray-900">今日播出</div>
                        <div class="text-sm text-gray-500">今天播出的剧集</div>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <!-- 电视剧列表页面链接 -->
            <NuxtLink 
              to="/tv" 
              class="text-gray-700 hover:text-red-600 font-medium transition-colors relative group"
              active-class="text-red-600"
            >
              电视剧列表
              <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></div>
            </NuxtLink>

            <!-- 演员 -->
            <NuxtLink 
              to="/people" 
              class="text-gray-700 hover:text-red-600 font-medium transition-colors relative group"
              active-class="text-red-600"
            >
              演员
              <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></div>
            </NuxtLink>

            <!-- 搜索 -->
            <NuxtLink 
              to="/search" 
              class="text-gray-700 hover:text-red-600 font-medium transition-colors relative group"
              active-class="text-red-600"
            >
              搜索
              <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></div>
            </NuxtLink>
          </nav>
        </div>

        <!-- 右侧：搜索和功能区域 -->
        <div class="flex items-center space-x-4">
          <!-- 搜索框 -->
          <div class="hidden lg:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              type="text" 
              placeholder="搜索电影、电视剧、演员..." 
              class="bg-transparent outline-none text-sm w-48"
            />
          </div>

          <!-- 主题切换按钮 -->
          <button class="p-2 text-gray-600 hover:text-red-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          </button>

          <!-- 用户菜单 -->
          <div class="relative group">
            <button class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
              </div>
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <!-- 用户下拉菜单 -->
            <div class="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999]">
              <div class="p-2">
                <NuxtLink to="/profile" class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors">
                  <span class="text-sm text-gray-700">个人资料</span>
                </NuxtLink>
                <NuxtLink to="/favorites" class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors">
                  <span class="text-sm text-gray-700">我的收藏</span>
                </NuxtLink>
                <NuxtLink to="/watchlist" class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors">
                  <span class="text-sm text-gray-700">观看清单</span>
                </NuxtLink>
                <hr class="my-2">
                <button class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors w-full text-left">
                  <span class="text-sm text-gray-700">退出登录</span>
                </button>
              </div>
            </div>

            <!-- 移动端菜单按钮 -->
            <button 
              @click="toggleMobileMenu"
              class="md:hidden p-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-200 py-4">
        <div class="space-y-4">
          <!-- 移动端搜索框 -->
          <div class="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              type="text" 
              placeholder="搜索..." 
              class="bg-transparent outline-none text-sm flex-1"
            />
          </div>

          <!-- 移动端导航链接 -->
          <div class="space-y-2">
            <NuxtLink to="/" class="block py-2 text-gray-700 hover:text-red-600 transition-colors">首页</NuxtLink>
            <NuxtLink to="/movies" class="block py-2 text-gray-700 hover:text-red-600 transition-colors">电影</NuxtLink>
            <NuxtLink to="/tv" class="block py-2 text-gray-700 hover:text-red-600 transition-colors">电视剧</NuxtLink>
            <NuxtLink to="/people" class="block py-2 text-gray-700 hover:text-red-600 transition-colors">演员</NuxtLink>
            <NuxtLink to="/search" class="block py-2 text-gray-700 hover:text-red-600 transition-colors">搜索</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- 占位元素：头部固定时保持布局稳定 -->
  <div class="h-16"></div>
</template>

<script setup>
// 移动端菜单状态
const isMobileMenuOpen = ref(false)

// 滚动状态
const isScrolled = ref(false)

// 切换移动端菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 监听滚动事件
onMounted(() => {
  const handleScroll = () => {
    // 当滚动超过一定距离时才吸顶，使用更小的阈值让响应更及时
    isScrolled.value = window.scrollY > 20
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // 清理事件监听器
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script> 