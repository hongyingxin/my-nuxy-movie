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
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          热门演员
        </h1>
        <p class="text-gray-600">发现最受欢迎的演员和明星</p>
      </div>

      <!-- 加载状态 -->
      <div v-if="actors?.pending.value" class="space-y-8">
        <!-- 使用骨架屏组件 -->
        <SkeletonGrid
          :count="20"
          variant="person"
          :cols="{ sm: 2, md: 3, lg: 4, xl: 5 }"
          :show-extra="true"
        />
      </div>

      <!-- 演员列表 -->
      <div v-else-if="actors?.data.value" class="space-y-8">
        <!-- 演员网格 -->
        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <div
            v-for="actor in actors.data.value.results"
            :key="actor.id"
            class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            @click="navigateToActor(actor.id)"
          >
            <!-- 演员头像 -->
            <div class="relative aspect-[2/3] overflow-hidden rounded-t-lg">
              <img
                :src="image.getProfileUrl(actor.profile_path, 'medium')"
                :alt="actor.name"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                @error="event => image.handleImageError(event, 'profile')"
              />
              <!-- 悬停遮罩 -->
              <div
                class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              >
                <div class="text-white text-center">
                  <svg
                    class="w-8 h-8 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span class="text-sm font-medium">查看详情</span>
                </div>
              </div>
            </div>

            <!-- 演员信息 -->
            <div class="p-4">
              <!-- 演员姓名 -->
              <h3
                class="font-semibold text-gray-800 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors"
              >
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
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span class="text-sm font-medium">{{
                    actor.popularity.toFixed(0)
                  }}</span>
                </div>
                <span class="text-xs text-gray-400">{{
                  actor.known_for_department
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 公共分页组件 -->
        <CommonPagination
          v-if="actors.data.value.total_pages > 1"
          :current-page="currentPage"
          :total-pages="actors.data.value.total_pages"
          :total-results="actors.data.value.total_results"
          :show-first-last="true"
          :show-quick-jump="true"
          :max-visible-pages="7"
          @page-change="handlePageChange"
        />
      </div>

      <!-- 错误状态 -->
      <div v-else-if="actors?.error.value" class="text-center py-12">
        <div class="text-red-600 text-6xl mb-4">😞</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">加载失败</h2>
        <p class="text-gray-600 mb-4">无法获取演员列表，请稍后重试</p>
        <button
          class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          @click="actors.refresh"
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

  // SEO 配置
  useHead({
    title: '热门演员 - Nuxt Movie',
    meta: [
      {
        name: 'description',
        content: '发现最受欢迎的演员和明星，查看他们的代表作品和详细信息',
      },
    ],
  })

  // 路由实例
  const route = useRoute()

  // 当前页码 - 从 URL 参数初始化
  const currentPage = computed(() => {
    const page = parseInt(route.query.page)
    return page > 0 ? page : 1
  })

  // 演员列表数据
  const actors = ref()

  // 获取演员列表数据
  const fetchData = async () => {
    try {
      console.log('获取演员数据，页码:', currentPage.value)
      actors.value = getPopularPeople(currentPage.value)
    } catch (error) {
      console.error('获取演员列表失败:', error)
    }
  }

  // 页面跳转处理
  const handlePageChange = page => {
    if (page < 1 || page > (actors.value?.data.value?.total_pages || 1)) return

    // 更新 URL 参数
    const newQuery = { ...route.query }

    if (page === 1) {
      // 第1页时移除 page 参数
      delete newQuery.page
    } else {
      // 其他页面添加 page 参数
      newQuery.page = page
    }

    console.log('页面跳转，更新 URL:', newQuery)

    // 导航到新页面
    navigateTo(
      {
        query: newQuery,
      },
      { replace: true }
    )
  }

  // 监听页码变化，重新获取数据
  watch(
    currentPage,
    () => {
      fetchData()
    },
    { immediate: true }
  )

  // 导航到演员详情页
  const navigateToActor = actorId => {
    navigateTo(`/actors/${actorId}`)
  }
</script>
