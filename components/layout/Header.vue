<template>
  <!-- 头部导航栏 - 默认置顶，滚动时吸顶 -->
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-out"
    :class="[
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm',
    ]"
  >
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <!-- 左侧：Logo 和导航菜单 -->
        <div class="flex items-center space-x-8">
          <!-- Logo -->
          <div class="flex items-center space-x-3">
            <div
              class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
                />
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900">Nuxt Movie</span>
          </div>

          <!-- 主导航菜单 -->
          <nav class="hidden md:flex items-center space-x-8">
            <template v-for="menu in navMenus" :key="menu.label">
              <NuxtLink
                v-if="!menu.dropdown"
                :to="menu.to"
                class="text-gray-700 hover:text-red-600 font-medium transition-colors relative group"
                active-class="text-red-600"
              >
                {{ menu.label }}
                <div
                  class="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"
                />
              </NuxtLink>
              <div v-else class="relative group">
                <button
                  class="text-gray-700 hover:text-red-600 font-medium transition-colors flex items-center space-x-1"
                >
                  <span>{{ menu.label }}</span>
                  <svg
                    class="w-4 h-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  class="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999]"
                >
                  <div class="p-4">
                    <div class="grid grid-cols-1 gap-2">
                      <NuxtLink
                        v-for="item in menu.dropdown"
                        :key="item.to"
                        :to="item.to"
                        class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <div class="font-medium text-gray-900">
                            {{ item.label }}
                          </div>
                          <div class="text-sm text-gray-500">
                            {{ item.desc }}
                          </div>
                        </div>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </nav>
        </div>

        <!-- 右侧：搜索和功能区域 -->
        <div class="flex items-center space-x-4">
          <!-- 搜索框 -->
          <div class="hidden lg:block">
            <SearchBox
              v-model="searchQuery"
              placeholder="搜索电影、电视剧、演员..."
              :show-search-button="false"
              :input-class="'bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 hover:border-gray-300 focus:border-red-500 pl-10 pr-4 py-2.5 text-sm w-64 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:shadow-lg'"
              @search="handleHeaderSearch"
              @suggestion-select="handleSuggestionSelect"
              @view-all-results="handleViewAllResults"
            />
          </div>

          <!-- 语言切换器 -->
          <div class="hidden md:block">
            <CommonLanguageSwitcher variant="simple" />
          </div>

          <!-- 主题切换按钮 -->
          <button
            class="hidden md:block p-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          <!-- 用户菜单 -->
          <div class="relative group hidden md:block">
            <button
              class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div
                class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <svg
                class="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <!-- 用户下拉菜单 -->
            <div
              class="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999]"
            >
              <div class="p-2">
                <NuxtLink
                  v-for="item in userMenuItems"
                  :key="item.to"
                  :to="item.to"
                  class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors"
                >
                  <span class="text-sm text-gray-700">{{ item.label }}</span>
                </NuxtLink>
                <hr class="my-2" />
                <button
                  class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <span class="text-sm text-gray-700">退出登录</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 移动端菜单按钮 -->
          <button
            class="md:hidden p-2 text-gray-600 hover:text-red-600 transition-colors"
            @click="toggleMobileMenu"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden border-t border-gray-200 py-4"
      >
        <div class="space-y-4">
          <!-- 移动端搜索框 -->
          <div class="px-3">
            <SearchBox
              v-model="mobileSearchQuery"
              placeholder="搜索..."
              :show-search-button="false"
              :input-class="'bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 hover:border-gray-300 focus:border-red-500 pl-10 pr-4 py-2.5 text-sm w-full rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:shadow-lg'"
              @search="handleMobileSearch"
              @suggestion-select="handleSuggestionSelect"
              @view-all-results="handleViewAllResults"
            />
          </div>

          <!-- 移动端导航链接 -->
          <div class="space-y-2">
            <NuxtLink
              v-for="item in mobileNavItems"
              :key="item.to"
              :to="item.to"
              class="block py-2 text-gray-700 hover:text-red-600 transition-colors"
              @click="closeMobileMenu"
            >
              {{ item.label }}
            </NuxtLink>
          </div>

          <!-- 移动端语言切换 -->
          <div class="border-t border-gray-200 pt-4">
            <div class="px-3 py-2">
              <div class="text-sm text-gray-500 mb-2">语言设置</div>
              <CommonLanguageSwitcher variant="buttons" />
            </div>
          </div>

          <!-- 移动端用户菜单 -->
          <div class="border-t border-gray-200 pt-4">
            <div class="space-y-2">
              <NuxtLink
                v-for="item in userMenuItems"
                :key="item.to"
                :to="item.to"
                class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors"
                @click="closeMobileMenu"
              >
                <span class="text-sm text-gray-700">{{ item.label }}</span>
              </NuxtLink>
              <hr class="my-2" />
              <button
                class="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors w-full text-left"
                @click="closeMobileMenu"
              >
                <span class="text-sm text-gray-700">退出登录</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- 占位元素：头部固定时保持布局稳定 -->
  <div class="h-16" />
</template>

<script setup>
  // ==================== 导入 ====================
  import {
    NAV_MENUS,
    MOBILE_NAV_ITEMS,
    USER_MENU_ITEMS,
  } from '@/constants/navigation'

  // ==================== 响应式数据 ====================
  const isMobileMenuOpen = ref(false)
  const isScrolled = ref(false)
  const searchQuery = ref('')
  const mobileSearchQuery = ref('')

  // 使用导入的导航数据
  const navMenus = NAV_MENUS
  const mobileNavItems = MOBILE_NAV_ITEMS
  const userMenuItems = USER_MENU_ITEMS

  // ==================== 方法 ====================
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
  }

  /**
   * 处理 Header 搜索
   */
  const handleHeaderSearch = query => {
    if (!query.trim()) return

    // 跳转到搜索页面
    navigateTo({
      path: '/search',
      query: { q: query },
    })
  }

  /**
   * 处理建议选择
   */
  const handleSuggestionSelect = suggestion => {
    // 关闭移动端菜单（如果是移动端触发的）
    closeMobileMenu()

    // 跳转到对应的详情页面
    if (suggestion.media_type === 'movie') {
      navigateTo(`/movie/${suggestion.id}`)
    } else if (suggestion.media_type === 'tv') {
      navigateTo(`/tv/${suggestion.id}`)
    } else if (suggestion.media_type === 'person') {
      navigateTo(`/person/${suggestion.id}`)
    }
  }

  /**
   * 处理查看所有结果
   */
  const handleViewAllResults = query => {
    if (!query.trim()) return

    // 关闭移动端菜单（如果是移动端触发的）
    closeMobileMenu()

    // 跳转到搜索页面
    navigateTo({
      path: '/search',
      query: { q: query },
    })
  }

  /**
   * 处理移动端搜索
   */
  const handleMobileSearch = query => {
    if (!query.trim()) return

    // 关闭移动端菜单
    closeMobileMenu()

    // 跳转到搜索页面
    navigateTo({
      path: '/search',
      query: { q: query },
    })
  }

  // ==================== 生命周期 ====================
  onMounted(() => {
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 20
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
  })
</script>
