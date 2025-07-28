<!--
  通用图片画廊组件
  支持响应式网格布局、PhotoSwipe灯箱、懒加载等功能
-->
<template>
  <div class="gallery-container">
    <!-- 图片网格 -->
    <div
      v-if="images.length > 0"
      :class="['grid gap-4 pswp-gallery', gridColsClass]"
    >
      <a
        v-for="(image, index) in images"
        :key="image.id || index"
        class="relative group cursor-zoom-in"
        :href="getFullImageUrl(image.file_path, 'original', imageType)"
        :data-pswp-width="imageType === 'posters' ? 2000 : 1920"
        :data-pswp-height="imageType === 'posters' ? 3000 : 1080"
        @click="handleImageClick(image, index)"
      >
        <!-- 图片容器 -->
        <div
          :class="[
            'overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg',
            aspectRatioClass,
          ]"
        >
          <img
            :src="getFullImageUrl(image.file_path, imageSize, imageType)"
            :alt="imageAlt"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            @error="handleImageError"
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
  </div>
</template>

<script setup lang="ts">
  // ==================== 第三方库导入 ====================
  import PhotoSwipeLightbox from 'photoswipe/lightbox'

  // ==================== 类型定义 ====================
  interface GalleryImage {
    id?: string | number
    file_path: string
    [key: string]: unknown
  }

  interface GalleryProps {
    // 图片数据
    images: GalleryImage[]
    // 图片类型 (posters | backdrops)
    imageType: 'posters' | 'backdrops'
    // 图片尺寸
    imageSize?: 'small' | 'medium' | 'large' | 'original'
    // 网格列数配置
    cols?: {
      sm?: number
      md?: number
      lg?: number
      xl?: number
    }
    // 图片 alt 文本
    imageAlt?: string
    // 是否启用 PhotoSwipe
    enablePhotoSwipe?: boolean
  }

  // ==================== Props 定义 ====================
  const props = withDefaults(defineProps<GalleryProps>(), {
    imageSize: 'medium',
    cols: () => ({ sm: 2, md: 3, lg: 4, xl: 5 }),
    imageAlt: 'Gallery image',
    enablePhotoSwipe: true,
  })

  // ==================== Emits 定义 ====================
  const emit = defineEmits<{
    'image-click': [image: GalleryImage, index: number]
  }>()

  // ==================== 计算属性 ====================
  // 网格列数类名
  const gridColsClass = computed(() => {
    const { sm = 2, md = 3, lg = 4, xl = 5 } = props.cols
    return `grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg} xl:grid-cols-${xl}`
  })

  // 宽高比类名
  const aspectRatioClass = computed(() => {
    return props.imageType === 'posters' ? 'aspect-[2/3]' : 'aspect-[16/9]'
  })

  // ==================== PhotoSwipe 灯箱 ====================
  const lightbox = ref<PhotoSwipeLightbox | null>(null)

  // 初始化 PhotoSwipe
  const initPhotoSwipe = () => {
    if (!props.enablePhotoSwipe) return

    // 清理之前的实例
    if (lightbox.value) {
      lightbox.value.destroy()
      lightbox.value = null
    }

    // 创建新实例
    lightbox.value = new PhotoSwipeLightbox({
      gallery: '.pswp-gallery',
      children: 'a[href]',
      pswpModule: () => import('photoswipe'),
      showHideAnimationType: 'fade',
      showAnimationDuration: 300,
      hideAnimationDuration: 300,
      bgOpacity: 0.9,
      paddingFn: () => ({
        top: 30,
        bottom: 30,
        left: 30,
        right: 30,
      }),
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

  // ==================== 方法 ====================
  // 获取完整图片 URL
  const getFullImageUrl = (
    path: string,
    size: 'small' | 'medium' | 'large' | 'original',
    type: 'backdrops' | 'posters'
  ): string => {
    return type === 'posters'
      ? image.getPosterUrl(path, size)
      : image.getBackdropUrl(path, size)
  }

  // 处理图片点击
  const handleImageClick = (image: GalleryImage, index: number) => {
    emit('image-click', image, index)
  }

  // 处理图片加载错误
  const handleImageError = (event: Event) => {
    image.handleImageError(
      event,
      props.imageType === 'posters' ? 'poster' : 'backdrop'
    )
  }

  // ==================== 生命周期 ====================
  // 组件挂载时初始化灯箱
  onMounted(() => {
    if (props.enablePhotoSwipe) {
      nextTick(() => {
        initPhotoSwipe()
      })
    }
  })

  // 监听图片数据变化，重新初始化灯箱
  watch(
    () => props.images,
    () => {
      if (props.enablePhotoSwipe) {
        nextTick(() => {
          initPhotoSwipe()
        })
      }
    },
    { deep: true }
  )

  // 组件卸载时清理灯箱
  onBeforeUnmount(() => {
    if (lightbox.value) {
      lightbox.value.destroy()
      lightbox.value = null
    }
  })
</script>

<style scoped>
  .gallery-container {
    /* 容器样式 */
  }

  .cursor-zoom-in {
    cursor: zoom-in;
  }

  /* 确保 PhotoSwipe 样式正确加载 */
  :deep(.pswp) {
    z-index: 9999;
  }
</style>
