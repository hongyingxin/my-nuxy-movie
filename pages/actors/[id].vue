<!--
  演员详情页面
  id: 演员的id
  url: /actors/1234567890
-->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 加载状态 -->
    <SkeletonLoadingState
      v-if="detail.pending.value"
      :message="$t('actors.loadingActors')"
    />

    <!-- 演员详情内容 -->
    <div v-else-if="detail.data.value" class="relative">
      <!-- 主要内容区域 -->
      <div class="container mx-auto px-6 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- 左侧 - 演员头像和基本信息 -->
          <div class="lg:col-span-1">
            <!-- 演员头像卡片 -->
            <div
              class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 mb-6 border border-gray-200 dark:border-gray-700"
            >
              <div class="text-center">
                <div class="relative group mb-6">
                  <img
                    :src="
                      image.getProfileUrl(
                        detail.data.value.profile_path,
                        'large'
                      )
                    "
                    :alt="detail.data.value.name"
                    class="w-full max-w-80 mx-auto rounded-xl shadow-lg"
                  />
                  <!-- 悬停效果 -->
                  <div
                    class="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center"
                  >
                    <div
                      class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg
                        class="w-12 h-12 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- 基本信息 -->
                <h1
                  class="text-3xl font-bold text-gray-800 dark:text-white mb-3"
                >
                  {{ detail.data.value.name }}
                </h1>

                <div
                  v-if="detail.data.value.birthday"
                  class="text-gray-600 dark:text-gray-300 mb-2"
                >
                  {{ common.formatDate(detail.data.value.birthday) }}
                  <span
                    v-if="detail.data.value.deathday"
                    class="text-gray-400 dark:text-gray-500"
                  >
                    - {{ common.formatDate(detail.data.value.deathday) }}
                  </span>
                </div>

                <div
                  v-if="detail.data.value.place_of_birth"
                  class="text-gray-600 dark:text-gray-300 mb-4"
                >
                  📍 {{ detail.data.value.place_of_birth }}
                </div>

                <!-- 性别和作品数量 -->
                <div class="flex items-center justify-center gap-6 mb-6">
                  <div class="text-center">
                    <div
                      class="text-2xl font-bold text-gray-800 dark:text-white"
                    >
                      {{ common.getGenderText(detail.data.value.gender) }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ $t('actors.gender') }}
                    </div>
                  </div>
                  <div class="w-px h-8 bg-gray-300 dark:bg-gray-600" />
                  <div class="text-center">
                    <div
                      class="text-2xl font-bold text-gray-800 dark:text-white"
                    >
                      {{ credits.data.value?.cast?.length || 0 }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ $t('actors.filmography') }}
                    </div>
                  </div>
                </div>

                <!-- 人气指数 -->
                <div
                  class="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-4 mb-6"
                >
                  <div class="text-center">
                    <div class="text-3xl font-bold mb-1">
                      {{ detail.data.value.popularity.toFixed(0) }}
                    </div>
                    <p class="text-red-100 text-sm">
                      {{ $t('actors.popularity') }}
                    </p>
                  </div>
                </div>

                <!-- 操作按钮 -->
                <div class="space-y-3">
                  <button
                    class="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
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
                    {{ $t('actors.addToFavorites') }}
                  </button>
                  <button
                    class="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
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
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                    {{ $t('common.share') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- 详细信息卡片 -->
            <div
              class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3
                class="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"
              >
                <svg
                  class="w-6 h-6 text-red-600"
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
                {{ $t('actors.title') }}
              </h3>
              <div class="space-y-4">
                <div
                  v-if="detail.data.value.birthday"
                  class="flex items-start gap-3"
                >
                  <svg
                    class="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <span class="text-gray-600 dark:text-gray-400 text-sm">{{
                      $t('actors.birthDate')
                    }}</span>
                    <p class="text-gray-800 dark:text-white font-medium">
                      {{ common.formatDate(detail.data.value.birthday) }}
                    </p>
                  </div>
                </div>
                <div
                  v-if="detail.data.value.place_of_birth"
                  class="flex items-start gap-3"
                >
                  <svg
                    class="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <span class="text-gray-600 dark:text-gray-400 text-sm">{{
                      $t('actors.birthPlace')
                    }}</span>
                    <p class="text-gray-800 dark:text-white font-medium">
                      {{ detail.data.value.place_of_birth }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg
                    class="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                    />
                  </svg>
                  <div>
                    <span class="text-gray-600 dark:text-gray-400 text-sm">{{
                      $t('actors.occupation')
                    }}</span>
                    <p class="text-gray-800 dark:text-white font-medium">
                      {{ detail.data.value.known_for_department }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg
                    class="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <div>
                    <span class="text-gray-600 dark:text-gray-400 text-sm">{{
                      $t('actors.gender')
                    }}</span>
                    <p class="text-gray-800 dark:text-white font-medium">
                      {{ common.getGenderText(detail.data.value.gender) }}
                    </p>
                  </div>
                </div>
                <div
                  v-if="detail.data.value.imdb_id"
                  class="flex items-start gap-3"
                >
                  <svg
                    class="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    />
                  </svg>
                  <div>
                    <span class="text-gray-600 dark:text-gray-400 text-sm">{{
                      $t('actors.imdb')
                    }}</span>
                    <a
                      :href="`https://www.imdb.com/name/${detail.data.value.imdb_id}`"
                      target="_blank"
                      class="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
                    >
                      查看 IMDb 页面
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧 - 简介和作品 -->
          <div class="lg:col-span-2">
            <!-- 简介 -->
            <section class="mb-8">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-1 h-8 bg-red-600 rounded-full" />
                <h2 class="text-3xl font-bold text-gray-800 dark:text-white">
                  {{ $t('actors.biography') }}
                </h2>
              </div>
              <div
                class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-8 border border-gray-200 dark:border-gray-700"
              >
                <p
                  class="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
                >
                  {{ detail.data.value.biography || '暂无简介信息' }}
                </p>
              </div>
            </section>

            <!-- 作品列表 -->
            <section v-if="credits.data.value">
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-3">
                  <div class="w-1 h-8 bg-red-600 rounded-full" />
                  <h2 class="text-3xl font-bold text-gray-800 dark:text-white">
                    {{ $t('actors.filmography') }}
                  </h2>
                </div>
                <div class="flex gap-2">
                  <button
                    class="px-4 py-2 rounded-lg font-medium transition-colors"
                    :class="
                      activeTab === 'all'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    "
                    @click="activeTab = 'all'"
                  >
                    全部
                  </button>
                  <button
                    class="px-4 py-2 rounded-lg font-medium transition-colors"
                    :class="
                      activeTab === 'movie'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    "
                    @click="activeTab = 'movie'"
                  >
                    电影
                  </button>
                  <button
                    class="px-4 py-2 rounded-lg font-medium transition-colors"
                    :class="
                      activeTab === 'tv'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    "
                    @click="activeTab = 'tv'"
                  >
                    电视剧
                  </button>
                </div>
              </div>

              <!-- 作品滚动容器 -->
              <div class="relative">
                <!-- 滚动控制按钮 -->
                <div class="flex items-center gap-2 mb-4">
                  <button
                    :disabled="scrollPosition <= 0"
                    class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    @click="scrollLeft"
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    :disabled="scrollPosition >= maxScroll"
                    class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    @click="scrollRight"
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                <!-- 滚动容器 -->
                <div
                  ref="scrollContainer"
                  class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
                  @scroll="handleScroll"
                >
                  <div
                    v-for="work in filteredWorks"
                    :key="`${work.media_type}-${work.id}`"
                    class="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex-shrink-0 border border-gray-200 dark:border-gray-700"
                    style="width: 200px"
                    @click="navigateToWork(work)"
                  >
                    <!-- 作品海报 -->
                    <div class="relative aspect-[2/3] overflow-hidden">
                      <img
                        :src="image.getPosterUrl(work.poster_path, 'medium')"
                        :alt="work.title || work.name"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <!-- 媒体类型标签 -->
                      <div
                        class="absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium text-white"
                        :class="
                          work.media_type === 'movie'
                            ? 'bg-blue-600'
                            : 'bg-purple-600'
                        "
                      >
                        {{ work.media_type === 'movie' ? '电影' : '电视剧' }}
                      </div>
                      <!-- 评分 -->
                      <div
                        class="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium"
                      >
                        ★ {{ work.vote_average?.toFixed(1) || 'N/A' }}
                      </div>
                      <!-- 悬停遮罩 -->
                      <div
                        class="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center"
                      >
                        <div
                          class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center"
                        >
                          <svg
                            class="w-8 h-8 text-white mx-auto mb-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
                            />
                          </svg>
                          <span class="text-white text-sm font-medium">{{
                            $t('actors.viewDetails')
                          }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- 作品信息 -->
                    <div class="p-3">
                      <h3
                        class="font-semibold text-gray-800 dark:text-white text-sm line-clamp-2 mb-2 group-hover:text-red-600 transition-colors"
                      >
                        {{ work.title || work.name }}
                      </h3>
                      <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {{ work.character }}
                      </p>
                      <div
                        class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400"
                      >
                        <span>{{
                          (work.release_date || work.first_air_date)?.split(
                            '-'
                          )[0] || '未知'
                        }}</span>
                        <span class="text-red-500"
                          >🔥
                          {{ common.formatPopularity(work.popularity) }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 滚动指示器 -->
                <div class="flex justify-center mt-4">
                  <div class="flex gap-2">
                    <div
                      v-for="(_, index) in Math.ceil(filteredWorks.length / 5)"
                      :key="index"
                      class="w-3 h-3 rounded-full cursor-pointer transition-colors"
                      :class="getIndicatorClass(index)"
                      @click="scrollToIndex(index)"
                    />
                  </div>
                </div>

                <!-- 滚动进度条 -->
                <div
                  class="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden"
                >
                  <div
                    class="bg-red-600 h-full rounded-full transition-all duration-300"
                    :style="{ width: `${scrollProgress}%` }"
                  />
                </div>
              </div>

              <!-- 查看更多按钮 -->
              <div v-if="filteredWorks.length > 10" class="text-center mt-6">
                <button
                  class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                >
                  查看更多作品
                </button>
              </div>
            </section>

            <!-- 职业生涯时间轴 -->
            <section
              v-if="credits.data.value && timelineData.length > 0"
              class="mt-12"
            >
              <div class="flex items-center gap-3 mb-8">
                <div class="w-1 h-8 bg-red-600 rounded-full" />
                <h2 class="text-3xl font-bold text-gray-800 dark:text-white">
                  {{ $t('actors.careerTimeline') }}
                </h2>
              </div>

              <div
                class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-8 border border-gray-200 dark:border-gray-700"
              >
                <div class="relative">
                  <!-- 时间轴中心线 -->
                  <div
                    class="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-600"
                  />

                  <!-- 时间轴项目 -->
                  <div class="space-y-8">
                    <div
                      v-for="yearGroup in timelineData"
                      :key="yearGroup.year"
                      class="relative"
                    >
                      <!-- 年份标记 -->
                      <div class="flex items-center mb-6">
                        <div
                          class="absolute left-6 w-4 h-4 bg-red-600 rounded-full border-4 border-white dark:border-gray-800 shadow-lg transform -translate-x-2"
                        />
                        <h3
                          class="text-2xl font-bold text-gray-800 dark:text-white ml-12"
                        >
                          {{ yearGroup.year }} 年
                        </h3>
                        <div class="ml-4 text-gray-500 dark:text-gray-400">
                          {{ yearGroup.works.length }} 部作品
                        </div>
                      </div>

                      <!-- 该年份的作品 -->
                      <div class="ml-12 space-y-4">
                        <div
                          v-for="work in yearGroup.works"
                          :key="`${work.media_type}-${work.id}`"
                          class="group cursor-pointer bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
                          @click="navigateToWork(work)"
                        >
                          <div class="flex items-start gap-4">
                            <!-- 作品海报 -->
                            <div class="flex-shrink-0">
                              <img
                                :src="
                                  image.getPosterUrl(work.poster_path, 'small')
                                "
                                :alt="work.title || work.name"
                                class="w-16 h-16 rounded-lg object-cover shadow-sm"
                                loading="lazy"
                              />
                            </div>

                            <!-- 作品信息 -->
                            <div class="flex-1 min-w-0">
                              <div class="flex items-center gap-2 mb-1">
                                <h4
                                  class="font-semibold text-gray-800 dark:text-white group-hover:text-red-600 transition-colors"
                                >
                                  {{ work.title || work.name }}
                                </h4>
                                <span
                                  class="px-2 py-1 rounded text-xs font-medium text-white"
                                  :class="
                                    work.media_type === 'movie'
                                      ? 'bg-blue-600'
                                      : 'bg-purple-600'
                                  "
                                >
                                  {{
                                    work.media_type === 'movie'
                                      ? '电影'
                                      : '电视剧'
                                  }}
                                </span>
                              </div>

                              <p
                                class="text-sm text-gray-600 dark:text-gray-400 mb-2"
                              >
                                {{ work.character }}
                              </p>

                              <div
                                class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400"
                              >
                                <span>{{
                                  common.formatDate(
                                    work.release_date || work.first_air_date
                                  )
                                }}</span>
                                <div class="flex items-center">
                                  <span class="text-yellow-500 mr-1">★</span>
                                  <span>{{
                                    work.vote_average?.toFixed(1) || 'N/A'
                                  }}</span>
                                </div>
                                <span class="text-red-500"
                                  >🔥
                                  {{
                                    common.formatPopularity(work.popularity)
                                  }}</span
                                >
                              </div>
                            </div>

                            <!-- 箭头图标 -->
                            <div
                              class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg
                                class="w-5 h-5 text-gray-400 dark:text-gray-500"
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {{ $t('actors.loadFailed') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          {{ $t('actors.failedToLoadActorDetails') }}
        </p>
        <button
          class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          @click="() => detail?.refresh()"
        >
          {{ $t('actors.reload') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // API 导入
  import { getPersonDetail, getPersonCredits } from '~/api/person'

  // 类型导入
  import type { UseHttpReturn } from '~/types/apiType/http'
  import type {
    PersonDetail,
    PersonCreditsResponse,
    PersonCreditItem,
  } from '~/types/apiType/person'
  import type { WorkFilterType, TimelineYearGroup } from '~/types/pages/actors'

  // 路由实例
  const route = useRoute()

  // 从路由参数获取演员ID
  const actorId = parseInt(route.params.id as string)

  // 获取演员详情数据
  const detail = getPersonDetail(actorId) as UseHttpReturn<PersonDetail>

  // 获取演员作品数据
  const credits = getPersonCredits(
    actorId
  ) as UseHttpReturn<PersonCreditsResponse>

  // 当前激活的作品过滤标签
  const activeTab = ref<WorkFilterType>('all')

  // 滚动容器引用
  const scrollContainer = ref<HTMLDivElement | null>(null)

  // 滚动位置状态
  const scrollPosition = ref<number>(0)
  const maxScroll = ref<number>(0)
  const scrollProgress = ref<number>(0)

  // 根据当前标签过滤的作品列表
  const filteredWorks = computed<PersonCreditItem[]>(() => {
    if (!credits.data.value?.cast) return []
    const works = credits.data.value.cast
    switch (activeTab.value) {
      case 'movie':
        return works.filter(work => work.media_type === 'movie').slice(0, 20)
      case 'tv':
        return works.filter(work => work.media_type === 'tv').slice(0, 20)
      default:
        return works.slice(0, 20)
    }
  })

  // 按年份分组的时间轴数据
  const timelineData = computed<TimelineYearGroup[]>(() => {
    if (!credits.data.value?.cast) return []
    const works = credits.data.value.cast
    const yearGroups: Record<string, PersonCreditItem[]> = {}

    // 按年份分组作品
    works.forEach(work => {
      const date = work.release_date || work.first_air_date
      if (date) {
        const year = date.split('-')[0]
        if (!yearGroups[year]) {
          yearGroups[year] = []
        }
        yearGroups[year].push(work)
      }
    })

    // 转换为数组并按年份排序（从新到旧）
    return Object.entries(yearGroups)
      .map(([year, works]) => ({
        year: parseInt(year),
        works: works.sort((a, b) => {
          const dateA = a.release_date || a.first_air_date || ''
          const dateB = b.release_date || b.first_air_date || ''
          return new Date(dateB).getTime() - new Date(dateA).getTime()
        }),
      }))
      .sort((a, b) => b.year - a.year)
  })

  // SEO 配置
  useHead(() => ({
    title: detail.data.value
      ? `${detail.data.value.name} - 演员详情 - Nuxt Movie`
      : '演员详情 - Nuxt Movie',
    meta: [
      {
        name: 'description',
        content: detail.data.value?.biography || '查看演员详细信息和作品',
      },
    ],
  }))

  // 导航到作品详情页
  const navigateToWork = (work: PersonCreditItem): void => {
    const mediaType = work.media_type || 'movie'
    navigateTo(`/${mediaType}/${work.id}`)
  }

  // 处理滚动事件
  const handleScroll = (): void => {
    if (!scrollContainer.value) return
    const container = scrollContainer.value
    scrollPosition.value = container.scrollLeft
    maxScroll.value = container.scrollWidth - container.clientWidth

    // 计算滚动进度百分比
    if (maxScroll.value > 0) {
      scrollProgress.value = (scrollPosition.value / maxScroll.value) * 100
    } else {
      scrollProgress.value = 0
    }
  }

  // 向左滚动
  const scrollLeft = (): void => {
    if (!scrollContainer.value) return
    const container = scrollContainer.value
    container.scrollBy({ left: -400, behavior: 'smooth' })
  }

  // 向右滚动
  const scrollRight = (): void => {
    if (!scrollContainer.value) return
    const container = scrollContainer.value
    container.scrollBy({ left: 400, behavior: 'smooth' })
  }

  // 滚动到指定索引位置
  const scrollToIndex = (index: number): void => {
    if (!scrollContainer.value) return
    const container = scrollContainer.value
    const itemWidth = 200 + 16 // 200 宽度 + 16p
    const scrollTo = index * 5 * itemWidth // 每页显示5目
    container.scrollTo({ left: scrollTo, behavior: 'smooth' })
  }

  // 获取滚动指示器样式类
  const getIndicatorClass = (index: number): string => {
    if (!scrollContainer.value) return 'bg-gray-300 dark:bg-gray-600'
    const itemWidth = 200 + 16
    const currentIndex = Math.floor(scrollPosition.value / (5 * itemWidth))
    return index === currentIndex
      ? 'bg-red-600'
      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
  }

  // 监听标签切换，重置滚动位置
  watch(activeTab, () => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollLeft = 0
      scrollPosition.value = 0
      scrollProgress.value = 0
    }
  })

  // 组件挂载后初始化滚动状态
  onMounted(() => {
    nextTick(() => {
      handleScroll()
    })
  })
</script>

<style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* 隐藏滚动条 */
  .scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }
</style>
