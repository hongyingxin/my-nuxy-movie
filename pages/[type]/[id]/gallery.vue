<!--
  图片集页面
  type: movie, tv
  id: 电影或者电视剧的id
  url: /movie/1234567890/gallery、/tv/1234567890/gallery
  使用到的插件 https://photoswipe.com/
-->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <MediaPageHeader
        :backdrop_path="detail.data.value?.backdrop_path ?? undefined"
        :title="`${detail.data.value?.title || detail.data.value?.name} ${$t('detail.galleryPageTitle', { type: $t(`detail.${activeTab}`) })}`"
        :back-to="`/${mediaType}/${mediaId}`"
      />

      <!-- 加载状态 -->
      <div v-if="images.pending.value" class="text-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"
        />
        <p class="text-gray-600 dark:text-gray-300">
          {{ $t('detail.loadingDetails', { type: $t(`detail.${activeTab}`) }) }}
        </p>
      </div>

      <div v-else-if="images.data.value" class="space-y-8">
        <!-- 分类标签页 -->
        <div class="border-b border-gray-200 dark:border-gray-700">
          <nav class="flex space-x-8" aria-label="Tabs">
            <button
              v-for="tab in mediaTabs"
              :key="tab.id"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap',
                activeTab === tab.id
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600',
              ]"
              @click="activeTab = tab.id"
            >
              {{ tab.name }}
              <span
                :class="[
                  'ml-2 rounded-full text-xs px-2 py-0.5',
                  activeTab === tab.id
                    ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
                ]"
              >
                {{ getMediaCount(tab.id) }}
              </span>
            </button>
          </nav>
        </div>

        <!-- 图片展示 -->
        <div
          v-if="activeTab !== 'videos'"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pswp-gallery"
        >
          <a
            v-for="(image, index) in currentImages"
            :key="index"
            class="relative group cursor-zoom-in"
            :href="getFullImageUrl(image.file_path, 'original', activeTab)"
            :data-pswp-width="activeTab === 'posters' ? 2000 : 1920"
            :data-pswp-height="activeTab === 'posters' ? 3000 : 1080"
          >
            <!-- 图片 -->
            <div
              :class="[
                'overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg',
                activeTab === 'posters' ? 'aspect-[2/3]' : 'aspect-[16/9]',
              ]"
            >
              <img
                :src="
                  getFullImageUrl(
                    image.file_path,
                    activeTab === 'posters' ? 'medium' : 'large',
                    activeTab
                  )
                "
                :alt="detail.data.value?.title || detail.data.value?.name"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>

            <!-- 悬停遮罩 -->
            <div
              class="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            >
              <div class="text-white">
                <svg
                  class="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>

        <!-- 视频展示 -->
        <div v-if="activeTab === 'videos'">
          <MediaVideoGrid
            :videos="currentVideos"
            :max-count="0"
            :show-modal="true"
          />
        </div>

        <!-- 无限滚动加载指示器 -->
        <div v-if="hasMore" ref="observerTarget" class="text-center py-8">
          <div
            v-if="isLoading"
            class="flex items-center justify-center space-x-2"
          >
            <div
              class="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"
            />
            <span class="text-gray-600 dark:text-gray-300">{{
              $t('detail.loadingMore', { type: $t(`detail.${activeTab}`) })
            }}</span>
          </div>
          <div v-else class="text-gray-500 dark:text-gray-400 text-sm">
            {{ $t('detail.scrollToLoadMore') }}
          </div>
        </div>

        <!-- 已加载完所有媒体 -->
        <div v-else class="text-center py-8">
          <div class="text-gray-500 dark:text-gray-400 text-sm">
            🎉 {{ $t('detail.allLoaded', { type: $t(`detail.${activeTab}`) }) }}
          </div>
        </div>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="images.error.value" class="text-center py-12">
        <div class="text-red-600 text-6xl mb-4">😞</div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {{ $t('detail.loadingFailed') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          {{ $t('detail.failedToLoad', { type: $t(`detail.${activeTab}`) }) }}
        </p>
        <button
          class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          @click="() => images.refresh()"
        >
          {{ $t('detail.reload') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // ==================== 第三方库导入 ====================
  import PhotoSwipeLightbox from 'photoswipe/lightbox'

  // ==================== API 导入 ====================
  import { getDetail, getImages, getVideos } from '~/api/detail'
  import type { MediaType } from '~/types/pages/details'
  import type { Image, Video } from '~/types/apiType'

  // 获取 i18n 实例
  const { t } = useI18n()

  // ==================== 路由参数处理 ====================
  const route = useRoute()
  // 从路由参数中提取媒体类型和ID，确保类型安全
  const mediaType = (
    Array.isArray(route.params.type) ? route.params.type[0] : route.params.type
  ) as MediaType
  const mediaId = parseInt(
    Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  )

  // ==================== 数据获取 ====================
  // 获取详情数据（用于显示标题）
  const detail = getDetail(mediaType, mediaId)
  // 获取图片数据
  const images = getImages(mediaType, mediaId)
  // 获取视频数据
  const videos = getVideos(mediaType, mediaId)

  // ==================== 媒体分类标签配置 ====================
  // 从路由查询参数获取初始标签页
  const initialTab = route.query.tab as string
  const defaultTab =
    initialTab === 'videos'
      ? 'videos'
      : initialTab === 'backdrops'
        ? 'backdrops'
        : 'posters'

  // 媒体分类标签
  const mediaTabs = [
    { id: 'backdrops' as const, name: t('detail.backdrops') },
    { id: 'posters' as const, name: t('detail.posters') },
    { id: 'videos' as const, name: t('detail.videos') },
  ]

  // 当前激活的标签
  const activeTab = ref<'posters' | 'backdrops' | 'videos'>(defaultTab)

  // ==================== 无限滚动配置 ====================
  // 使用无限滚动组合式函数
  const { currentPage, isLoading, hasMore, observerTarget, reset } =
    useInfiniteScroll(
      async () => {
        // 模拟加载延迟，让用户看到加载状态
        await new Promise(resolve => setTimeout(resolve, 300))

        // 重新初始化 PhotoSwipe 以包含新加载的图片
        nextTick(() => {
          if (lightbox.value) {
            lightbox.value.destroy()
            lightbox.value = null
          }
          initPhotoSwipe()
        })
      },
      // 计算当前标签页的媒体总数
      computed(() => {
        if (activeTab.value === 'videos') {
          return (
            (videos.data.value?.results as Video[] | undefined)?.length || 0
          )
        }
        return (
          (images.data.value?.[activeTab.value] as Image[] | undefined)
            ?.length || 0
        )
      }),
      {
        pageSize: 20,
        rootMargin: () => {
          // 根据设备类型和网络状况动态调整 rootMargin
          const isMobile = window.innerWidth <= 768

          // 检测网络状况（如果支持）
          const connection =
            (
              navigator as Navigator & {
                connection?: { effectiveType?: string }
                mozConnection?: { effectiveType?: string }
                webkitConnection?: { effectiveType?: string }
              }
            ).connection ||
            (
              navigator as Navigator & {
                mozConnection?: { effectiveType?: string }
              }
            ).mozConnection ||
            (
              navigator as Navigator & {
                webkitConnection?: { effectiveType?: string }
              }
            ).webkitConnection

          const isSlowNetwork =
            connection &&
            (connection.effectiveType === 'slow-2g' ||
              connection.effectiveType === '2g')
          // 根据设备和网络状况返回不同的 rootMargin
          if (isMobile) {
            return isSlowNetwork ? '100px' : '50px'
          } else {
            return isSlowNetwork ? '200px' : '100px'
          }
        },
        loadDelay: 0, // 已经在回调中处理延迟
        debounceDelay: 50, // 快速响应的防抖延迟
        enableScrollListener: true, // 启用滚动监听作为备用
        scrollThreshold: 150, // 距离底部 150px 时触发
        threshold: [0, 0.1, 0.3, 0.5, 1.0], // 更敏感的阈值设置
      }
    )

  // ==================== 计算属性 ====================
  // 计算当前显示的图片
  const currentImages = computed(() => {
    if (activeTab.value === 'videos') return []
    const allImages =
      (images.data.value?.[activeTab.value] as Image[] | undefined) || []
    return allImages.slice(0, currentPage.value * 20)
  })

  // 计算当前显示的视频
  const currentVideos = computed(() => {
    if (activeTab.value !== 'videos') return []
    return (videos.data.value?.results as Video[] | undefined) || []
  })

  // ==================== 工具函数 ====================
  // 获取媒体数量
  const getMediaCount = (type: 'posters' | 'backdrops' | 'videos'): number => {
    if (type === 'videos') {
      return (videos.data.value?.results as Video[] | undefined)?.length || 0
    }
    return (images.data.value?.[type] as Image[] | undefined)?.length || 0
  }

  // 监听标签切换，重置分页
  watch(activeTab, () => {
    reset() // 重置无限滚动
    nextTick(() => {
      if (lightbox.value) {
        lightbox.value.destroy()
        lightbox.value = null
      }
      initPhotoSwipe()
    })
  })

  // 图片链接生成
  const getFullImageUrl = (
    path: string,
    size: 'small' | 'medium' | 'large' | 'original',
    type: 'backdrops' | 'posters'
  ): string => {
    return type === 'posters'
      ? image.getPosterUrl(path, size)
      : image.getBackdropUrl(path, size)
  }

  // ==================== PhotoSwipe 灯箱功能 ====================
  // PhotoSwipe 实例
  const lightbox = ref<PhotoSwipeLightbox | null>(null)

  // 组件挂载时初始化灯箱
  onMounted(() => {
    initPhotoSwipe()
  })

  // 初始化 PhotoSwipe 灯箱
  const initPhotoSwipe = () => {
    // 确保先清理之前的实例
    if (lightbox.value) {
      lightbox.value.destroy()
      lightbox.value = null
    }

    // 创建新的 PhotoSwipe 实例
    lightbox.value = new PhotoSwipeLightbox({
      gallery: '.pswp-gallery',
      children: 'a[href]', // 只选择有 href 属性的 a 标签
      pswpModule: () => import('photoswipe'),
      showHideAnimationType: 'fade',
      showAnimationDuration: 300,
      hideAnimationDuration: 300,
      bgOpacity: 0.9,
      paddingFn: () => {
        return {
          top: 30,
          bottom: 30,
          left: 30,
          right: 30,
        }
      },
    })

    // 灯箱打开前隐藏页面滚动
    lightbox.value.on('beforeOpen', () => {
      document.body.style.overflow = 'hidden'
    })

    // 灯箱关闭后恢复页面滚动
    lightbox.value.on('close', () => {
      document.body.style.overflow = ''
    })

    // 初始化灯箱
    lightbox.value.init()
  }

  // ==================== 生命周期清理 ====================
  // 页面卸载时清理灯箱
  onBeforeUnmount(() => {
    if (lightbox.value) {
      lightbox.value.destroy()
      lightbox.value = null
    }
  })

  // 路由变化时清理
  onBeforeRouteLeave(() => {
    if (lightbox.value) {
      lightbox.value.destroy()
      lightbox.value = null
    }

    // 额外的清理：移除可能残留的 PhotoSwipe 元素
    const pswpElements = document.querySelectorAll('.pswp')
    pswpElements.forEach(el => el.remove())

    // 恢复 body 样式
    document.body.style.overflow = ''
    // 移除可能残留的事件监听器
    // 不再传 null，避免类型报错
    // document.removeEventListener('keydown', null)
  })

  // ==================== SEO 配置 ====================
  useHead(() => ({
    title: detail.data.value
      ? `${detail.data.value.title || detail.data.value.name} ${t('detail.photos')} - Nuxt Movie`
      : `${t('detail.photos')} - Nuxt Movie`,
    meta: [
      {
        name: 'description',
        content: detail.data.value
          ? `${t('detail.viewPhotos')} ${detail.data.value.title || detail.data.value.name}`
          : t('detail.browsePhotos'),
      },
    ],
  }))
</script>
