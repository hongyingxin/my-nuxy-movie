<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow cursor-pointer"
    @click="navigateToDetail"
  >
    <!-- 卡片内容布局 - 左侧头像，右侧信息 -->
    <div class="flex space-x-4">
      <!-- 头像图片 -->
      <img
        :src="image.getProfileUrl(person.profile_path)"
        :alt="person.name"
        class="w-16 h-24 object-cover rounded-lg"
        @error="event => image.handleImageError(event, 'profile')"
      />
      <!-- 演员信息区域 -->
      <div class="flex-1">
        <!-- 姓名 -->
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
          {{ person.name }}
        </h3>
        <!-- 职业 -->
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {{ person.known_for_department || '演员' }}
        </p>
        <!-- 代表作品 -->
        <div
          v-if="knownFor.length"
          class="text-sm text-gray-500 dark:text-gray-400 mb-2"
        >
          <span class="font-medium">代表作品:</span> {{ knownFor.join('、') }}
        </div>
        <!-- 性别 -->
        <div class="text-sm text-gray-500 dark:text-gray-400">
          <span v-if="person.gender === 1">女</span>
          <span v-else-if="person.gender === 2">男</span>
          <span v-else>未知</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // ==================== Props 定义 ====================
  const props = defineProps({
    // 演员数据对象
    person: {
      type: Object,
      required: true,
    },
  })

  // ==================== 计算属性 ====================
  /**
   * 获取代表作品
   */
  const knownFor = computed(() => {
    if (!props.person.known_for || !props.person.known_for.length) return []

    return props.person.known_for
      .slice(0, 3) // 显示前3个作品
      .map(item => item.title || item.name)
      .filter(Boolean)
  })

  // ==================== 方法 ====================
  /**
   * 跳转到演员详情页
   */
  const navigateToDetail = () => {
    navigateTo(`/actors/${props.person.id}`)
  }
</script>
