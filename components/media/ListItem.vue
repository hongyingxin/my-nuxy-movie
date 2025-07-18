<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow cursor-pointer"
    @click="navigateToDetail"
  >
    <!-- 卡片内容布局 - 左侧海报，右侧信息 -->
    <div class="flex space-x-4">
      <!-- 海报图片 -->
      <img
        :src="image.getPosterUrl(item.poster_path)"
        :alt="item.title || item.name"
        class="w-16 h-24 object-cover rounded-lg"
        @error="event => image.handleImageError(event, 'poster')"
      />
      <!-- 媒体信息区域 -->
      <div class="flex-1">
        <!-- 标题 -->
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
          {{ item.title || item.name }}
        </h3>
        <!-- 简介 - 限制为2行显示 -->
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
          {{ item.overview || $t('common.noOverview') }}
        </p>
        <!-- 元信息 - 年份、评分、时长 -->
        <div
          class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400"
        >
          <span>{{
            common.getYear(item.release_date || item.first_air_date)
          }}</span>
          <span v-if="item.vote_average"
            >★ {{ item.vote_average.toFixed(1) }}</span
          >
          <span v-if="isMovie && item.runtime"
            >{{ item.runtime }}{{ $t('common.minutes') }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // ==================== Props 定义 ====================
  const props = defineProps({
    // 媒体项目数据对象
    item: {
      type: Object,
      required: true,
    },
    // 是否为电影类型 - 用于显示不同的信息（如时长）
    isMovie: {
      type: Boolean,
      default: true,
    },
  })

  // ==================== 方法 ====================
  /**
   * 跳转到详情页
   */
  const navigateToDetail = () => {
    const mediaType = props.isMovie ? 'movie' : 'tv'
    navigateTo(`/${mediaType}/${props.item.id}`)
  }
</script>

<style scoped>
  /* 文本截断样式 - 限制为2行显示 */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
