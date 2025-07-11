<!--
  电影和电视剧的详情页
  type: movie, tv
  id: 电影或者电视剧的id
  url: /movie/1234567890、/tv/1234567890
-->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 加载状态 -->
    <SkeletonLoadingState
      v-if="detail.pending.value"
      :message="$t('detail.loadingDetails', { type: mediaTypeText })"
    />

    <!-- 详情内容 -->
    <div v-else-if="detail.data.value" class="relative">
      <!-- Hero 区域 - 背景图片和基本信息 -->
      <section
        class="relative h-auto min-h-[500px] md:h-[500px] overflow-hidden"
      >
        <!-- 背景图片 -->
        <div
          class="absolute inset-0 bg-cover bg-center"
          :style="{
            backgroundImage: `url(${image.getBackdropUrl(detail.data.value.backdrop_path, 'original')})`,
          }"
        >
          <!-- 渐变遮罩 -->
          <div class="absolute inset-0 bg-black/60" />
        </div>

        <!-- 内容区域 -->
        <div class="relative z-10 pt-16 pb-8">
          <div class="container mx-auto px-6">
            <div
              class="flex flex-col md:flex-row gap-8 items-center md:items-end"
            >
              <!-- 海报 -->
              <div class="flex-shrink-0">
                <img
                  :src="
                    image.getPosterUrl(detail.data.value.poster_path, 'medium')
                  "
                  :alt="detail.data.value.title || detail.data.value.name"
                  class="w-48 md:w-64 rounded-lg shadow-2xl"
                />
              </div>

              <!-- 基本信息 -->
              <div class="flex-1 text-white text-center md:text-left">
                <!-- 标题和年份 -->
                <div class="mb-4">
                  <h1 class="text-3xl md:text-5xl font-bold mb-2">
                    {{ detail.data.value.title || detail.data.value.name }}
                  </h1>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-gray-600">{{
                      common.getYear(
                        detail.data.value.release_date ||
                          detail.data.value.first_air_date
                      )
                    }}</span>
                    <span class="text-gray-400">•</span>
                    <span class="text-gray-600">{{
                      getRuntimeOrSeasons()
                    }}</span>
                    <span class="text-gray-400">•</span>
                    <span class="text-gray-600"
                      >{{ detail.data.value.vote_average?.toFixed(1) }}/10</span
                    >
                  </div>
                </div>

                <!-- 标签信息 -->
                <div
                  class="flex flex-wrap gap-2 mb-4 justify-center md:justify-start"
                >
                  <span
                    class="bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {{ detail.data.value.adult ? 'R' : 'PG' }}
                  </span>
                  <span
                    class="bg-gray-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {{ getRuntimeOrSeasons() }}
                  </span>
                  <span
                    v-for="genre in detail.data.value.genres"
                    :key="genre.id"
                    class="bg-white/20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm"
                  >
                    {{ genre.name }}
                  </span>
                </div>

                <!-- 评分 -->
                <div
                  class="flex items-center gap-4 mb-6 justify-center md:justify-start"
                >
                  <div
                    class="flex items-center bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm"
                  >
                    <span class="text-yellow-400 mr-2">★</span>
                    <span class="font-bold text-lg">{{
                      detail.data.value.vote_average?.toFixed(1)
                    }}</span>
                    <span class="text-gray-300 ml-1">/10</span>
                  </div>
                  <div class="text-gray-300">
                    {{ detail.data.value.vote_count }}
                    {{ $t('detail.peopleRated') }}
                  </div>
                </div>

                <!-- 状态信息 (电视剧特有) -->
                <div v-if="isTv" class="mb-6 text-center md:text-left">
                  <span
                    class="bg-green-600 text-white px-3 py-1 rounded-full text-sm mr-2"
                  >
                    {{ detail.data.value.status }}
                  </span>
                  <span class="text-gray-300">
                    {{ detail.data.value.number_of_episodes }} 集
                  </span>
                </div>

                <!-- 操作按钮 -->
                <div class="flex gap-3 justify-center md:justify-start">
                  <button
                    class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
                      />
                    </svg>
                    {{ $t('detail.watchTrailer') }}
                  </button>
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {{ $t('detail.addToFavorites') }}
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
              <h2 class="text-2xl font-bold text-gray-800 mb-4">
                {{ $t('detail.overview') }}
              </h2>
              <p class="text-gray-700 leading-relaxed">
                {{ detail.data.value.overview || $t('detail.overview') }}
              </p>
            </section>

            <!-- 演职员 -->
            <section v-if="credits.data.value" class="mb-8">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-bold text-gray-800">
                  {{ $t('detail.cast') }}
                </h2>
                <NuxtLink
                  :to="`/${mediaType}/${mediaId}/credits`"
                  class="text-red-600 hover:text-red-700 flex items-center"
                >
                  {{ $t('detail.viewAll') }}
                  <svg
                    class="w-5 h-5 ml-1"
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
                </NuxtLink>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <NuxtLink
                  v-for="cast in credits.data.value.cast?.slice(0, 8)"
                  :key="cast.id"
                  :to="`/actors/${cast.id}`"
                  class="text-center group hover:scale-105 transition-transform duration-200"
                >
                  <img
                    :src="image.getProfileUrl(cast.profile_path, 'small')"
                    :alt="cast.name"
                    class="w-16 h-16 rounded-full mx-auto mb-2 object-cover group-hover:ring-2 group-hover:ring-red-500 transition-all duration-200"
                  />
                  <p
                    class="text-sm font-medium text-gray-800 group-hover:text-red-600 transition-colors"
                  >
                    {{ cast.name }}
                  </p>
                  <p class="text-xs text-gray-600">{{ cast.character }}</p>
                </NuxtLink>
              </div>
            </section>

            <!-- 媒体 -->
            <section v-if="images.data.value && activeMediaTab" class="mb-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">
                {{ $t('detail.photos') }}
              </h2>

              <!-- 标签页 -->
              <div class="border-b border-gray-200 mb-6">
                <nav class="flex space-x-8" aria-label="Tabs">
                  <button
                    v-for="tab in mediaTabs"
                    :key="tab.id"
                    :class="[
                      'py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap',
                      activeMediaTab === tab.id
                        ? 'border-red-600 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    ]"
                    @click="activeMediaTab = tab.id"
                  >
                    {{ tab.name }}
                    <span
                      :class="[
                        'ml-2 rounded-full text-xs px-2 py-0.5',
                        activeMediaTab === tab.id
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600',
                      ]"
                    >
                      {{ getMediaCount(tab.id) }}
                    </span>
                  </button>
                </nav>
              </div>

              <!-- 图片网格 -->
              <div
                v-if="activeMediaTab === 'backdrops'"
                class="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                <div
                  v-for="(imgItem, index) in images.data.value.backdrops?.slice(
                    0,
                    6
                  )"
                  :key="index"
                  class="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                  @click="openLightbox('backdrops', index)"
                >
                  <img
                    :src="image.getBackdropUrl(imgItem.file_path, 'medium')"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div
                    class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"
                  />
                </div>
              </div>

              <div
                v-if="activeMediaTab === 'posters'"
                class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
              >
                <div
                  v-for="(imgItem, index) in images.data.value.posters?.slice(
                    0,
                    12
                  )"
                  :key="index"
                  class="relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer group"
                  @click="openLightbox('posters', index)"
                >
                  <img
                    :src="image.getPosterUrl(imgItem.file_path, 'medium')"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div
                    class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"
                  />
                </div>
              </div>

              <div
                v-if="activeMediaTab === 'videos'"
                class="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div
                  v-for="video in videos.data.value?.results?.slice(0, 4)"
                  :key="video.id"
                  class="bg-gray-200 rounded-lg overflow-hidden"
                >
                  <iframe
                    :src="`https://www.youtube.com/embed/${video.key}`"
                    class="w-full aspect-video"
                    frameborder="0"
                    allowfullscreen
                  />
                  <div class="p-3">
                    <p class="font-medium text-gray-800">{{ video.name }}</p>
                    <p class="text-sm text-gray-600">{{ video.type }}</p>
                  </div>
                </div>
              </div>

              <!-- 查看更多按钮 -->
              <div v-if="hasMoreMedia" class="text-center mt-6">
                <NuxtLink
                  :to="`/${mediaType}/${mediaId}/gallery`"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {{ $t('detail.viewAllImages') }}
                  <svg
                    class="ml-2 -mr-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </NuxtLink>
              </div>
            </section>

            <!-- 相似内容 -->
            <section v-if="similar.data.value?.results?.length" class="mb-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">
                {{ $t('detail.similar') }}{{ mediaTypeText }}
              </h2>
              <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <MediaCard
                  v-for="item in similar.data.value.results.slice(0, 6)"
                  :key="item.id"
                  :item="item"
                  :is-movie="!isTv"
                />
              </div>
            </section>
          </div>

          <!-- 右侧边栏 -->
          <div class="lg:col-span-1">
            <!-- 详细信息 -->
            <section class="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 class="text-lg font-bold text-gray-800 mb-4">
                {{ $t('detail.details') }}
              </h3>
              <div class="space-y-3">
                <div>
                  <span class="text-gray-600 text-sm"
                    >{{ $t('detail.status') }}：</span
                  >
                  <span class="text-gray-800">{{
                    detail.data.value.status
                  }}</span>
                </div>
                <div>
                  <span class="text-gray-600 text-sm"
                    >{{ $t('detail.originalLanguage') }}：</span
                  >
                  <span class="text-gray-800">{{
                    detail.data.value.original_language?.toUpperCase()
                  }}</span>
                </div>

                <!-- 电影特有信息 -->
                <template v-if="!isTv">
                  <div>
                    <span class="text-gray-600 text-sm"
                      >{{ $t('detail.budget') }}：</span
                    >
                    <span class="text-gray-800">{{
                      common.formatBudget(detail.data.value.budget)
                    }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600 text-sm"
                      >{{ $t('detail.revenue') }}：</span
                    >
                    <span class="text-gray-800">{{
                      common.formatBudget(detail.data.value.revenue)
                    }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600 text-sm"
                      >{{ $t('detail.releaseDate') }}：</span
                    >
                    <span class="text-gray-800">{{
                      common.formatDate(detail.data.value.release_date)
                    }}</span>
                  </div>
                </template>

                <!-- 电视剧特有信息 -->
                <template v-else>
                  <div>
                    <span class="text-gray-600 text-sm"
                      >{{ $t('detail.seasons') }}：</span
                    >
                    <span class="text-gray-800"
                      >{{ detail.data.value.number_of_seasons }}
                      {{ $t('detail.seasons') }}</span
                    >
                  </div>
                  <div>
                    <span class="text-gray-600 text-sm"
                      >{{ $t('detail.episodes') }}：</span
                    >
                    <span class="text-gray-800"
                      >{{ detail.data.value.number_of_episodes }}
                      {{ $t('detail.episodes') }}</span
                    >
                  </div>
                  <div>
                    <span class="text-gray-600 text-sm"
                      >{{ $t('detail.firstAirDate') }}：</span
                    >
                    <span class="text-gray-800">{{
                      common.formatDate(detail.data.value.first_air_date)
                    }}</span>
                  </div>
                  <div v-if="detail.data.value.last_air_date">
                    <span class="text-gray-600 text-sm"
                      >{{ $t('detail.lastAirDate') }}：</span
                    >
                    <span class="text-gray-800">{{
                      common.formatDate(detail.data.value.last_air_date)
                    }}</span>
                  </div>
                </template>

                <div>
                  <span class="text-gray-600 text-sm"
                    >{{ $t('detail.productionCompanies') }}：</span
                  >
                  <div class="mt-1">
                    <span
                      v-for="company in detail.data.value.production_companies"
                      :key="company.id"
                      class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-2 mb-1"
                    >
                      {{ company.name }}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <!-- 评分 -->
            <section class="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 class="text-lg font-bold text-gray-800 mb-4">
                {{ $t('detail.rating') }}
              </h3>
              <div class="text-center">
                <div class="text-4xl font-bold text-red-600 mb-2">
                  {{ detail.data.value.vote_average?.toFixed(1) }}
                </div>
                <div class="flex justify-center mb-4">
                  <div class="flex">
                    <span
                      v-for="i in 10"
                      :key="i"
                      class="text-2xl"
                      :class="
                        i <= Math.round(detail.data.value.vote_average)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      "
                    >
                      ★
                    </span>
                  </div>
                </div>
                <p class="text-gray-600 text-sm">
                  {{
                    $t('detail.basedOnRatings', {
                      count: detail.data.value.vote_count,
                    })
                  }}
                </p>
              </div>
            </section>

            <!-- 关键词 (电影特有) -->
            <section
              v-if="!isTv && detail.data.value.keywords?.keywords?.length"
              class="bg-white rounded-lg shadow-md p-6"
            >
              <h3 class="text-lg font-bold text-gray-800 mb-4">
                {{ $t('detail.keywords') }}
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="keyword in detail.data.value.keywords.keywords.slice(
                    0,
                    10
                  )"
                  :key="keyword.id"
                  class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {{ keyword.name }}
                </span>
              </div>
            </section>

            <!-- 季数信息 (电视剧特有) -->
            <section
              v-if="isTv && detail.data.value.seasons?.length"
              class="bg-white rounded-lg shadow-md p-6"
            >
              <h3 class="text-lg font-bold text-gray-800 mb-4">
                {{ $t('detail.seasons') }}
              </h3>
              <div class="space-y-3">
                <div
                  v-for="season in detail.data.value.seasons.slice(0, 5)"
                  :key="season.id"
                  class="flex items-center gap-3 p-2 rounded hover:bg-gray-50"
                >
                  <img
                    :src="image.getPosterUrl(season.poster_path, 'small')"
                    :alt="season.name"
                    class="w-12 h-16 rounded object-cover"
                  />
                  <div class="flex-1">
                    <p class="font-medium text-gray-800">{{ season.name }}</p>
                    <p class="text-sm text-gray-600">
                      {{ season.episode_count }} {{ $t('detail.episodes') }}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <!-- 错误状态 -->
    <div
      v-else-if="detail.error.value"
      class="min-h-screen flex items-center justify-center"
    >
      <div class="text-center">
        <div class="text-red-600 text-6xl mb-4">😞</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">
          {{ $t('detail.loadingFailed') }}
        </h2>
        <p class="text-gray-600 mb-4">
          {{ $t('detail.loadingFailedDetails', { type: mediaTypeText }) }}
        </p>
        <button
          class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          @click="refresh"
        >
          {{ $t('detail.reload') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  // 路由参数
  // API 导入
  import {
    getDetail,
    getCredits,
    getVideos,
    getSimilar,
    getImages,
  } from '~/api/detail'
  import { useI18n } from 'vue-i18n'

  // 获取 i18n 实例
  const { t } = useI18n()

  const route = useRoute()
  const mediaType = route.params.type // 'movie' 或 'tv'
  const mediaId = parseInt(route.params.id)

  // 计算属性
  const isTv = computed(() => mediaType === 'tv')
  const mediaTypeText = computed(() => (isTv.value ? '电视剧' : '电影'))

  // 数据获取
  const detail = getDetail(mediaType, mediaId)
  const credits = getCredits(mediaType, mediaId)
  const videos = getVideos(mediaType, mediaId)
  const similar = getSimilar(mediaType, mediaId)
  const images = getImages(mediaType, mediaId)
  console.log('detail', detail)
  console.log('credits', credits)
  console.log('videos', videos)
  console.log('similar', similar)
  console.log('images', images)

  // SEO 配置
  useHead(() => ({
    title: detail.data.value
      ? `${detail.data.value.title || detail.data.value.name} - Nuxt Movie`
      : `${mediaTypeText.value}详情 - Nuxt Movie`,
    meta: [
      {
        name: 'description',
        content:
          detail.data.value?.overview || `发现精彩${mediaTypeText.value}详情`,
      },
    ],
  }))

  // 媒体标签页状态
  const activeMediaTab = ref('backdrops')
  const mediaTabs = [
    { id: 'backdrops', name: t('detail.backdrops') },
    { id: 'posters', name: t('detail.posters') },
    { id: 'videos', name: t('detail.videos') },
  ]

  // 监听数据加载完成，设置默认标签页
  // watch(images, (newImages) => {
  //   if (newImages.data.value && !activeMediaTab.value) {
  //     // 优先显示有内容的标签页
  //     if (newImages.data.value.backdrops?.length > 0) {
  //       activeMediaTab.value = 'backdrops'
  //     } else if (newImages.data.value.posters?.length > 0) {
  //       activeMediaTab.value = 'posters'
  //     } else if (videos.data.value?.results?.length > 0) {
  //       activeMediaTab.value = 'videos'
  //     }
  //   }
  // }, { immediate: true })

  // 获取媒体数量
  const getMediaCount = type => {
    switch (type) {
      case 'backdrops':
        return images.data.value?.backdrops?.length || 0
      case 'posters':
        return images.data.value?.posters?.length || 0
      case 'videos':
        return videos.data.value?.results?.length || 0
      default:
        return 0
    }
  }

  // 是否有更多媒体内容
  const hasMoreMedia = computed(() => {
    switch (activeMediaTab.value) {
      case 'backdrops':
        return (images.data.value?.backdrops?.length || 0) > 6
      case 'posters':
        return (images.data.value?.posters?.length || 0) > 12
      case 'videos':
        return (videos.data.value?.results?.length || 0) > 4
      default:
        return false
    }
  })

  // 打开灯箱
  const openLightbox = (type, index) => {
    // TODO: 实现灯箱功能
    console.log('Open lightbox', type, index)
  }

  // 工具函数
  const getRuntimeOrSeasons = () => {
    if (isTv.value) {
      return `${detail.data.value.number_of_seasons} ${t('detail.seasons')}`
    } else {
      const minutes = detail.data.value.runtime
      if (!minutes) return t('detail.unknown')
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return `${hours}h ${mins}m`
    }
  }

  // 刷新功能
  const refresh = () => {
    detail.refresh()
    credits.refresh()
    videos.refresh()
    similar.refresh()
    images.refresh()
  }
</script>
