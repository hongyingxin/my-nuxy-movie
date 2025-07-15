<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero 轮播区 - 展示热门内容的动态轮播 -->
    <section class="relative h-96 md:h-[500px] overflow-hidden z-10">
      <!-- 渐变遮罩层 - 确保文字在背景图片上清晰可见 -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"
      />

      <!-- 轮播背景图片 - 使用动态背景图片 -->
      <div
        v-if="heroContent.data.value?.results?.length"
        class="relative h-full bg-cover bg-center transition-all duration-1000"
        :style="{
          backgroundImage: `url(${image.getBackdropUrl(currentHeroItem.backdrop_path, 'large')})`,
        }"
      >
        <!-- 内容区域 - 显示电影/电视剧信息 -->
        <div class="absolute inset-0 z-20 flex items-center">
          <div class="container mx-auto px-6">
            <div class="max-w-2xl text-white">
              <!-- 内容类型标签 - 区分电影和电视剧 -->
              <div class="flex items-center gap-2 mb-3">
                <span
                  class="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{
                    currentHeroItem.media_type === 'movie'
                      ? $t('home.movie')
                      : $t('home.tvShow')
                  }}
                </span>
                <span
                  class="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ $t('home.todayTrending') }}
                </span>
              </div>

              <!-- 标题 - 电影/电视剧名称 -->
              <h1 class="text-4xl md:text-6xl font-bold mb-4">
                {{ currentHeroItem.title || currentHeroItem.name }}
              </h1>

              <!-- 简介 - 内容描述 -->
              <p class="text-lg md:text-xl mb-6 line-clamp-3">
                {{ currentHeroItem.overview }}
              </p>

              <!-- 评分和日期信息 -->
              <div class="flex items-center gap-4 mb-6">
                <!-- 评分 -->
                <div class="flex items-center">
                  <span class="text-yellow-400 mr-1">★</span>
                  <span class="font-semibold"
                    >{{ currentHeroItem.vote_average?.toFixed(1) }}/10</span
                  >
                </div>
                <!-- 发布日期 -->
                <span class="text-gray-300">
                  {{
                    currentHeroItem.release_date ||
                    currentHeroItem.first_air_date
                  }}
                </span>
                <!-- 热度指标 -->
                <div
                  class="flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm"
                >
                  <span class="text-sm"
                    >🌟 {{ $t('home.popularity') }}:
                    {{ currentHeroItem.popularity?.toFixed(0) || 'N/A' }}</span
                  >
                </div>
              </div>

              <!-- 操作按钮组 -->
              <div class="flex gap-3">
                <!-- 立即观看按钮 -->
                <button
                  class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
                    />
                  </svg>
                  {{ $t('home.watchNow') }}
                </button>
                <!-- 了解更多按钮 -->
                <button
                  class="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm flex items-center gap-2"
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {{ $t('home.learnMore') }}
                </button>
                <!-- 收藏按钮 -->
                <button
                  class="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-colors backdrop-blur-sm"
                  @click="toggleFavorite(currentHeroItem)"
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 轮播指示器 - 显示当前轮播位置 -->
        <div
          class="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2"
        >
          <button
            v-for="(item, index) in heroContent.data.value.results.slice(0, 5)"
            :key="item.id"
            class="w-3 h-3 rounded-full transition-colors relative group"
            :class="currentHeroIndex === index ? 'bg-white' : 'bg-white/50'"
            @click="currentHeroIndex = index"
          >
            <!-- 悬停提示 - 显示内容标题 -->
            <div
              class="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {{ item.title || item.name }}
            </div>
          </button>
        </div>

        <!-- 轮播控制按钮 -->
        <!-- 上一张按钮 -->
        <button
          class="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          @click="prevHero"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <!-- 下一张按钮 -->
        <button
          class="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          @click="nextHero"
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <!-- 加载状态 - 数据加载时显示 -->
      <div
        v-else
        class="h-full bg-gray-300 animate-pulse flex items-center justify-center"
      >
        <div class="text-gray-500 text-xl">{{ $t('home.loadingContent') }}</div>
      </div>
    </section>

    <!-- 主要内容区域 -->
    <div class="container mx-auto px-6 py-8">
      <!-- 热门电影区域 -->
      <section class="mb-12">
        <!-- 区域标题和操作按钮 -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">
            {{ $t('home.popularMovies') }}
          </h2>
          <button class="text-red-600 hover:text-red-700 font-semibold">
            {{ $t('home.viewMore') }}
          </button>
        </div>

        <!-- 使用骨架屏组件 -->
        <SkeletonGrid
          v-if="popularMovies.pending.value"
          :count="12"
          variant="movie"
          :cols="{ sm: 2, md: 4, lg: 6 }"
        />

        <!-- 电影卡片网格 -->
        <div
          v-else-if="popularMovies.data.value"
          class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          <MediaCard
            v-for="movie in popularMovies.data.value.results.slice(0, 12)"
            :key="movie.id"
            :item="movie"
            :is-movie="true"
          />
        </div>
      </section>

      <!-- 热门电视剧区域 -->
      <section class="mb-12">
        <!-- 区域标题和操作按钮 -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">
            {{ $t('home.popularTvShows') }}
          </h2>
          <button class="text-red-600 hover:text-red-700 font-semibold">
            {{ $t('home.viewMore') }}
          </button>
        </div>

        <!-- 使用骨架屏组件 -->
        <SkeletonGrid
          v-if="popularTvShows.pending.value"
          :count="12"
          variant="tv"
          :cols="{ sm: 2, md: 4, lg: 6 }"
        />

        <!-- 电视剧卡片网格 -->
        <div
          v-else-if="popularTvShows.data.value"
          class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          <MediaCard
            v-for="tvShow in popularTvShows.data.value.results.slice(0, 12)"
            :key="tvShow.id"
            :item="tvShow"
            :is-movie="false"
          />
        </div>
      </section>

      <!-- 最新动态区域 - 包含即将上映和正在播出的内容 -->
      <section class="mb-12">
        <!-- 区域标题和操作按钮 -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">
            {{ $t('home.latestUpdates') }}
          </h2>
          <button class="text-red-600 hover:text-red-700 font-semibold">
            {{ $t('home.viewMore') }}
          </button>
        </div>

        <!-- 使用骨架屏组件 -->
        <SkeletonGrid
          v-if="upcomingMovies.pending.value || onTheAirTvShows.pending.value"
          :count="12"
          variant="movie"
          :cols="{ sm: 2, md: 4, lg: 6 }"
        />

        <!-- 混合内容网格 -->
        <div
          v-else
          class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          <!-- 即将上映电影 -->
          <MediaCard
            v-for="movie in upcomingMovies.data.value?.results?.slice(0, 6)"
            :key="`movie-${movie.id}`"
            :item="movie"
            status="upcoming"
            :is-movie="true"
          />

          <!-- 正在播出电视剧 -->
          <MediaCard
            v-for="show in onTheAirTvShows.data.value?.results?.slice(0, 6)"
            :key="`tv-${show.id}`"
            :item="show"
            status="on-air"
            :is-movie="false"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
  // API 导入 - 电影相关接口
  import { getPopularMovies, getUpcomingMovies } from '~/api/movie'
  // API 导入 - 电视剧相关接口
  import { getPopularTvShows, getOnTheAirTvShows } from '~/api/tv'
  // API 导入 - 趋势内容接口
  import { getAllTrending } from '~/api/trending'

  // 获取 i18n 实例
  const { t } = useI18n()

  // SEO 配置 - 设置页面标题和描述
  useHead(() => ({
    title: t('home.pageTitle'),
    meta: [
      {
        name: 'description',
        content: t('home.pageDescription'),
      },
    ],
  }))

  // ==================== 数据获取 ====================
  // 获取热门电影数据
  const popularMovies = getPopularMovies(1)
  // 获取即将上映电影数据
  const upcomingMovies = getUpcomingMovies(1)
  // 获取热门电视剧数据
  const popularTvShows = getPopularTvShows(1)
  // 获取正在播出电视剧数据
  const onTheAirTvShows = getOnTheAirTvShows(1)
  // 获取电影分类数据
  // const movieGenres = getMovieGenres()
  // 获取电视剧分类数据
  // const tvGenres = getTvGenres()

  // ==================== Hero 轮播相关 ====================
  // 获取趋势内容数据（用于 Hero 轮播）
  const heroContent = getAllTrending()
  console.log('heroContent', heroContent)
  // 当前轮播索引
  const currentHeroIndex = ref(0)

  // 计算当前轮播项
  const currentHeroItem = computed(() => {
    return heroContent.data.value?.results?.[currentHeroIndex.value] || {}
  })

  // 轮播控制函数 - 下一张
  const nextHero = () => {
    if (heroContent.data.value?.results?.length) {
      currentHeroIndex.value =
        (currentHeroIndex.value + 1) %
        Math.min(5, heroContent.data.value.results.length)
    }
  }

  // 轮播控制函数 - 上一张
  const prevHero = () => {
    if (heroContent.data.value?.results?.length) {
      const maxIndex = Math.min(5, heroContent.data.value.results.length) - 1
      currentHeroIndex.value =
        currentHeroIndex.value === 0 ? maxIndex : currentHeroIndex.value - 1
    }
  }

  // ==================== 收藏功能 ====================
  // 收藏列表 - 使用 Set 存储收藏的 ID
  const favorites = ref(new Set())

  // 切换收藏状态
  const toggleFavorite = item => {
    if (favorites.value.has(item.id)) {
      favorites.value.delete(item.id)
    } else {
      favorites.value.add(item.id)
    }
    // TODO: 这里可以调用 API 同步到服务器
    console.log(
      '收藏状态切换:',
      item.title || item.name,
      favorites.value.has(item.id)
    )
  }

  // ==================== 自动轮播 ====================
  // 轮播定时器
  let heroInterval = null

  // 组件挂载时启动自动轮播
  onMounted(() => {
    heroInterval = setInterval(() => {
      if (heroContent.data.value?.results?.length) {
        currentHeroIndex.value =
          (currentHeroIndex.value + 1) %
          Math.min(5, heroContent.data.value.results.length)
      }
    }, 5000) // 每5秒切换一次
  })

  // 组件卸载时清理定时器
  onUnmounted(() => {
    if (heroInterval) {
      clearInterval(heroInterval)
    }
  })
</script>

<style scoped>
  /* 文本截断样式 - 限制文本显示行数 */
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
