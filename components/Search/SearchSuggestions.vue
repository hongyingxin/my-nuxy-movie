<template>
  <div
    v-if="showSuggestions && suggestions.length > 0"
    class="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 mt-2 overflow-hidden"
  >
    <div class="max-h-80 overflow-y-auto">
      <div
        v-for="suggestion in suggestions"
        :key="`${suggestion.media_type}-${suggestion.id}`"
        class="flex items-center space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors duration-150 group"
        @click="selectSuggestion(suggestion)"
      >
        <!-- 图片 -->
        <div class="flex-shrink-0">
          <img
            v-if="
              suggestion.poster_path ||
              (suggestion.media_type === 'person' &&
                (suggestion as PersonSearchResult).profile_path)
            "
            :src="getImageUrl(suggestion)"
            :alt="suggestion.title || suggestion.name"
            class="w-12 h-16 object-cover rounded-lg shadow-sm"
            @error="
              event =>
                image.handleImageError(
                  event,
                  suggestion.media_type === 'person' ? 'profile' : 'poster'
                )
            "
          />
          <div
            v-else
            class="w-12 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-sm"
          >
            <svg
              class="w-6 h-6 text-gray-400 dark:text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                v-if="suggestion.media_type === 'person'"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              />
              <path
                v-else
                d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              />
            </svg>
          </div>
        </div>

        <!-- 信息 -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center space-x-2 mb-1">
            <h4 class="font-semibold text-gray-900 dark:text-gray-100 truncate">
              {{ suggestion.title || suggestion.name }}
            </h4>
            <span
              class="text-xs px-2 py-1 rounded-full font-medium"
              :class="getTypeClass(suggestion.media_type)"
            >
              {{ getTypeLabel(suggestion.media_type) }}
            </span>
          </div>

          <p
            v-if="suggestion.overview"
            class="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2"
          >
            {{ suggestion.overview }}
          </p>

          <div
            class="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400"
          >
            <span
              v-if="suggestion.release_date || suggestion.first_air_date"
              class="flex items-center"
            >
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              {{
                getYear(suggestion.release_date || suggestion.first_air_date)
              }}
            </span>
            <span v-if="suggestion.vote_average" class="flex items-center">
              <svg
                class="w-3 h-3 mr-1 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              {{ suggestion.vote_average.toFixed(1) }}
            </span>
            <span
              v-if="
                suggestion.media_type === 'person' &&
                (suggestion as PersonSearchResult).known_for_department
              "
              class="flex items-center"
            >
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
                />
              </svg>
              {{ (suggestion as PersonSearchResult).known_for_department }}
            </span>
          </div>
        </div>

        <!-- 箭头 -->
        <div
          class="flex-shrink-0 text-gray-300 dark:text-gray-500 group-hover:text-gray-400 dark:group-hover:text-gray-400 transition-colors"
        >
          <svg
            class="w-4 h-4"
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

    <!-- 查看更多结果 -->
    <div
      class="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600"
    >
      <button
        class="w-full text-center text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-150"
        @click="viewAllResults"
      >
        查看所有结果 ({{ totalResults }})
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  // ==================== 导入 ====================
  import type { SearchResultItem } from '~/types/pages/search'
  import type { PersonSearchResult } from '~/types/apiType/search'

  // ==================== Props 定义 ====================
  defineProps({
    // 是否显示建议
    showSuggestions: {
      type: Boolean,
      default: false,
    },
    // 搜索建议数据
    suggestions: {
      type: Array as () => SearchResultItem[],
      default: () => [],
    },
    // 总结果数
    totalResults: {
      type: Number,
      default: 0,
    },
  })

  // ==================== Emits 定义 ====================
  const emit = defineEmits(['select-suggestion', 'view-all-results'])

  // ==================== 方法 ====================
  /**
   * 获取图片 URL
   */
  const getImageUrl = (suggestion: SearchResultItem) => {
    if (suggestion.media_type === 'person') {
      return image.getProfileUrl(
        (suggestion as PersonSearchResult).profile_path
      )
    }
    return image.getPosterUrl(suggestion.poster_path)
  }

  /**
   * 获取类型样式类
   */
  const getTypeClass = (mediaType: SearchResultItem['media_type']) => {
    switch (mediaType) {
      case 'movie':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
      case 'tv':
        return 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700'
      case 'person':
        return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700'
      default:
        return 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
    }
  }

  /**
   * 获取类型标签
   */
  const getTypeLabel = (mediaType: SearchResultItem['media_type']) => {
    switch (mediaType) {
      case 'movie':
        return '电影'
      case 'tv':
        return '电视剧'
      case 'person':
        return '演员'
      default:
        return '未知'
    }
  }

  /**
   * 获取年份
   */
  const getYear = (dateString: string | null | undefined) => {
    if (!dateString) return ''
    return dateString.split('-')[0]
  }

  /**
   * 选择建议
   */
  const selectSuggestion = (suggestion: SearchResultItem) => {
    emit('select-suggestion', suggestion)
  }

  /**
   * 查看所有结果
   */
  const viewAllResults = () => {
    emit('view-all-results')
  }
</script>

<style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
