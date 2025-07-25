<!--
  视频网格展示组件
  用于展示视频列表，支持点击播放和视频模态框
  支持自定义显示数量和布局
-->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="video in displayVideos"
      :key="video.id"
      class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
    >
      <!-- 视频缩略图 -->
      <div class="aspect-video bg-gray-100 dark:bg-gray-700 relative group">
        <!-- YouTube 视频缩略图 -->
        <div
          v-if="video.site === 'YouTube'"
          class="w-full h-full bg-cover bg-center cursor-pointer relative overflow-hidden"
          :style="{
            backgroundImage: `url(https://img.youtube.com/vi/${video.key}/maxresdefault.jpg)`,
          }"
          @click="playVideo(video)"
        >
          <!-- 播放按钮遮罩 -->
          <div
            class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all duration-300"
          >
            <div
              class="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <!-- 视频时长（如果有） -->
          <div
            v-if="video.size"
            class="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded"
          >
            {{ video.size }}p
          </div>
        </div>

        <!-- 其他平台视频 -->
        <div
          v-else
          class="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 cursor-pointer"
          @click="playVideo(video)"
        >
          <div class="text-center">
            <div
              class="bg-gray-600 dark:bg-gray-500 rounded-full p-4 mb-2 group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p class="text-sm">{{ $t('video.unsupportedPlatform') }}</p>
          </div>
        </div>
      </div>

      <!-- 视频信息 -->
      <div class="p-4">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
          {{ video.name }}
        </h3>
        <div
          class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400"
        >
          <span class="flex items-center">
            <svg
              class="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
              />
            </svg>
            {{ getVideoTypeText(video.type) }}
          </span>
          <span v-if="video.published_at">
            {{ formatDate(video.published_at) }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- 视频播放模态框 -->
  <MediaVideoModal
    :show="showVideoModal"
    :video="currentPlayingVideo"
    @close="closeVideoModal"
  />
</template>

<script setup lang="ts">
  import type { Video } from '~/types/apiType'

  // 获取 i18n 实例
  const { t } = useI18n()

  // ==================== Props 定义 ====================
  interface Props {
    /** 视频列表 */
    videos: Video[]
    /** 最大显示数量，0表示显示全部 */
    maxCount?: number
    /** 是否显示模态框 */
    showModal?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    videos: () => [],
    maxCount: 0,
    showModal: true,
  })

  // ==================== Emits 定义 ====================
  interface Emits {
    /** 播放视频事件 */
    (e: 'play', video: Video): void
  }

  const emit = defineEmits<Emits>()

  // ==================== 计算属性 ====================
  // 计算要显示的视频列表
  const displayVideos = computed(() => {
    if (props.maxCount > 0) {
      return props.videos.slice(0, props.maxCount)
    }
    return props.videos
  })

  // ==================== 视频播放功能 ====================
  // 当前播放的视频
  const currentPlayingVideo = ref<Video | null>(null)
  const showVideoModal = ref(false)

  // 播放视频
  const playVideo = (video: Video) => {
    if (video.site === 'YouTube') {
      if (props.showModal) {
        currentPlayingVideo.value = video
        showVideoModal.value = true
      } else {
        // 如果不显示模态框，则触发事件
        emit('play', video)
      }
    } else {
      // 对于其他平台，显示提示
      alert(t('video.unsupportedPlatform'))
    }
  }

  // 关闭视频模态框
  const closeVideoModal = () => {
    showVideoModal.value = false
    currentPlayingVideo.value = null
  }

  // ==================== 工具函数 ====================
  // 视频类型文本
  const getVideoTypeText = (type: string): string => {
    const typeMap: Record<string, string> = {
      Trailer: t('video.trailer'),
      Teaser: t('video.teaser'),
      Featurette: t('video.featurette'),
      'Behind the Scenes': t('video.behindTheScenes'),
      Bloopers: t('video.bloopers'),
      Clip: t('video.clip'),
      'Opening Credits': t('video.openingCredits'),
      Recap: t('video.recap'),
    }
    return typeMap[type] || type
  }

  // 格式化日期
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }
</script>
