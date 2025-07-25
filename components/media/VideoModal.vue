<!--
  视频播放模态框组件
  用于播放YouTube等平台的视频
  支持键盘ESC键关闭和点击遮罩关闭
-->
<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
    @click="handleBackdropClick"
  >
    <div
      class="relative w-full max-w-4xl mx-4 aspect-video bg-black rounded-lg overflow-hidden"
      @click.stop
    >
      <!-- 关闭按钮 -->
      <button
        class="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors"
        :aria-label="$t('video.closeModal')"
        @click="handleClose"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- YouTube 播放器 -->
      <iframe
        v-if="video?.site === 'YouTube'"
        :src="`https://www.youtube.com/embed/${video.key}?autoplay=1&rel=0`"
        class="w-full h-full"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />

      <!-- 不支持的平台提示 -->
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-white"
      >
        <div class="text-center">
          <div class="text-6xl mb-4">🎬</div>
          <p class="text-lg mb-2">{{ $t('video.unsupportedPlatform') }}</p>
          <p class="text-sm opacity-75">
            {{ $t('video.onlyYouTubeSupported') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Video } from '~/types/apiType'

  // ==================== Props 定义 ====================
  interface Props {
    /** 是否显示模态框 */
    show: boolean
    /** 要播放的视频对象 */
    video: Video | null
  }

  const props = withDefaults(defineProps<Props>(), {
    show: false,
    video: null,
  })

  // ==================== Emits 定义 ====================
  interface Emits {
    /** 关闭模态框事件 */
    (e: 'close'): void
  }

  const emit = defineEmits<Emits>()

  // ==================== 事件处理 ====================
  // 处理关闭事件
  const handleClose = () => {
    emit('close')
  }

  // 处理背景点击
  const handleBackdropClick = () => {
    emit('close')
  }

  // ==================== 键盘事件处理 ====================
  // 监听 ESC 键关闭模态框
  onMounted(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && props.show) {
        emit('close')
      }
    }

    document.addEventListener('keydown', handleKeydown)

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeydown)
    })
  })

  // ==================== 生命周期处理 ====================
  // 模态框打开时禁用页面滚动
  watch(
    () => props.show,
    newShow => {
      if (newShow) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  )

  // 组件卸载时恢复页面滚动
  onBeforeUnmount(() => {
    document.body.style.overflow = ''
  })
</script>
