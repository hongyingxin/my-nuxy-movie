<!-- 
  图片集页面
  type: movie, tv
  id: 电影或者电视剧的id
  url: /movie/1234567890/gallery、/tv/1234567890/gallery
  使用到的插件 https://photoswipe.com/
-->
<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <MediaPageHeader 
        :backdrop_path="detail.data.value?.backdrop_path" 
        :title="`${detail.data.value?.title || detail.data.value?.name} 的图片集`"
        :back-to="`/${mediaType}/${mediaId}`"
      />

      <!-- 加载状态 -->
      <div v-if="images.pending.value" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p class="text-gray-600">加载图片中...</p>
      </div>

      <div v-else-if="images.data.value" class="space-y-8">
        <!-- 分类标签页 -->
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8" aria-label="Tabs">
            <button
              v-for="tab in imageTabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap',
                activeTab === tab.id
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ tab.name }}
              <span 
                :class="[
                  'ml-2 rounded-full text-xs px-2 py-0.5',
                  activeTab === tab.id
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600'
                ]"
              >
                {{ getImageCount(tab.id) }}
              </span>
            </button>
          </nav>
        </div>

        <!-- 瀑布流图片展示 -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pswp-gallery">
          <a 
            v-for="(image, index) in currentImages" 
            :key="index"
            class="relative group cursor-zoom-in"
            :href="getFullImageUrl(image.file_path, 'original', activeTab)"
            :data-pswp-width="activeTab === 'posters' ? 2000 : 1920"
            :data-pswp-height="activeTab === 'posters' ? 3000 : 1080"
          >
            <!-- 图片 -->
            <div :class="[
              'overflow-hidden bg-gray-100 rounded-lg',
              activeTab === 'posters' ? 'aspect-[2/3]' : 'aspect-[16/9]'
            ]">
              <img 
                :src="getFullImageUrl(image.file_path, activeTab === 'posters' ? 'medium' : 'large', activeTab)"
                :alt="detail.data.value?.title || detail.data.value?.name"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            
            <!-- 悬停遮罩 -->
            <div class="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div class="text-white">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                </svg>
              </div>
            </div>
          </a>
        </div>

        <!-- 无限滚动加载指示器 -->
        <div 
          v-if="hasMoreImages" 
          ref="observerTarget"
          class="text-center py-8"
        >
          <div v-if="isLoading" class="flex items-center justify-center space-x-2">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
            <span class="text-gray-600">加载更多图片中...</span>
          </div>
          <div v-else class="text-gray-500 text-sm">
            滚动到底部加载更多
          </div>
        </div>

        <!-- 已加载完所有图片 -->
        <div v-else class="text-center py-8">
          <div class="text-gray-500 text-sm">
            🎉 已加载完所有图片
          </div>
        </div>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="images.error.value" class="text-center py-12">
        <div class="text-red-600 text-6xl mb-4">😞</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">加载失败</h2>
        <p class="text-gray-600 mb-4">无法获取图片信息，请稍后重试</p>
        <button 
          @click="images.refresh"
          class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          重新加载
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

const route = useRoute()
const [mediaType, mediaId] = [route.params.type, parseInt(route.params.id)]

// API 导入
import { getDetail, getImages } from '~/api/detail'
import { getPosterUrl, getBackdropUrl } from '~/utils/image'

// 获取数据
const detail = getDetail(mediaType, mediaId)
const images = getImages(mediaType, mediaId)

// 图片分类标签
const imageTabs = [
  { id: 'posters', name: '海报' },
  { id: 'backdrops', name: '剧照' },
]

// 当前激活的标签
const activeTab = ref('posters')

// 每页显示数量
const PAGE_SIZE = 20
const currentPage = ref(1)

// 无限滚动相关
const isLoading = ref(false)
const observerTarget = ref(null)

// 计算当前显示的图片
const currentImages = computed(() => {
  const allImages = images.data.value?.[activeTab.value] || []
  return allImages.slice(0, currentPage.value * PAGE_SIZE)
})

// 是否还有更多图片
const hasMoreImages = computed(() => {
  const allImages = images.data.value?.[activeTab.value] || []
  return currentPage.value * PAGE_SIZE < allImages.length
})

// 获取图片数量
const getImageCount = (type) => {
  return images.data.value?.[type]?.length || 0
}

// 加载更多
const loadMore = async () => {
  if (isLoading.value || !hasMoreImages.value) return
  
  isLoading.value = true
  
  // 模拟加载延迟，让用户看到加载状态
  await new Promise(resolve => setTimeout(resolve, 300))
  
  currentPage.value++
  isLoading.value = false
  
  // 重新初始化 PhotoSwipe 以包含新加载的图片
  nextTick(() => {
    if (lightbox) {
      lightbox.destroy()
      lightbox = null
    }
    initPhotoSwipe()
  })
}

// 无限滚动观察器 通过监听“加载更多指示器”和“距离底部”的相交情况，来加载更多图片
const setupInfiniteScroll = () => {
  if (!observerTarget.value) return
  
  // 根据设备类型和网络状况动态调整 rootMargin
  const getRootMargin = () => {
    // 检测是否为移动设备
    const isMobile = window.innerWidth <= 768
    
    // 检测网络状况（如果支持）
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    const isSlowNetwork = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
    
    if (isMobile) {
      return isSlowNetwork ? '100px' : '50px'
    } else {
      return isSlowNetwork ? '200px' : '100px'
    }
  }
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasMoreImages.value && !isLoading.value) {
          loadMore()
        }
      })
    },
    {
      rootMargin: getRootMargin(), // 动态调整提前加载距离
      threshold: 0.1
    }
  )
  
  observer.observe(observerTarget.value)
  
  // 清理观察器
  onBeforeUnmount(() => {
    observer.disconnect()
  })
}

// 监听标签切换，重置分页
watch(activeTab, () => {
  currentPage.value = 1
  nextTick(() => {
    if (lightbox) {
      lightbox.destroy()
      lightbox = null
    }
    initPhotoSwipe()
    setupInfiniteScroll()
  })
})

// 图片链接生成
const getFullImageUrl = (path, size, type) => {
  return type === 'posters' ? getPosterUrl(path, size) : getBackdropUrl(path, size)
}

// PhotoSwipe 初始化
let lightbox = null

onMounted(() => {
  initPhotoSwipe()
  setupInfiniteScroll()
})

watch(activeTab, () => {
  nextTick(() => {
    if (lightbox) {
      lightbox.destroy()
      lightbox = null
    }
    initPhotoSwipe()
  })
})

const initPhotoSwipe = () => {
  // 确保先清理之前的实例
  if (lightbox) {
    lightbox.destroy()
    lightbox = null
  }

  lightbox = new PhotoSwipeLightbox({
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
        right: 30
      }
    }
  })

  lightbox.on('beforeOpen', () => {
    document.body.style.overflow = 'hidden'
  })

  lightbox.on('close', () => {
    document.body.style.overflow = ''
  })

  lightbox.init()
}

// 页面卸载时清理
onBeforeUnmount(() => {
  if (lightbox) {
    lightbox.destroy()
    lightbox = null
  }
})

// 路由变化时清理
onBeforeRouteLeave(() => {
  if (lightbox) {
    lightbox.destroy()
    lightbox = null
  }
  // TODO: 因为是针对body，这里以后可能影响到别的页面，产生一些排查不出来的问题。
  // 额外的清理：移除可能残留的 PhotoSwipe 元素
  const pswpElements = document.querySelectorAll('.pswp')
  pswpElements.forEach(el => el.remove())
  
  // 恢复 body 样式
  document.body.style.overflow = ''
  
  // 移除可能残留的事件监听器
  document.removeEventListener('keydown', null)
})

// SEO 配置
useHead(() => ({
  title: detail.data.value 
    ? `${detail.data.value.title || detail.data.value.name} 的图片集 - Nuxt Movie` 
    : '图片集 - Nuxt Movie',
  meta: [
    { 
      name: 'description', 
      content: detail.data.value 
        ? `查看 ${detail.data.value.title || detail.data.value.name} 的海报和剧照` 
        : '浏览电影和电视剧的海报和剧照'
    }
  ]
}))
</script>