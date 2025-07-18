<template>
  <div class="group cursor-pointer" @click="navigateToDetail">
    <div
      class="relative overflow-hidden rounded-lg mb-3 aspect-[2/3] bg-gray-200"
    >
      <NuxtImg
        v-if="person.profile_path"
        :src="image.getProfileUrl(person.profile_path)"
        :alt="person.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        sizes="sm:100vw md:50vw lg:400px"
        format="webp"
        quality="80"
        @error="event => image.handleImageError(event, 'profile')"
      />

      <!-- 悬停遮罩 -->
      <div
        class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center"
      >
        <div
          class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <svg
            class="w-12 h-12 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- 姓名 -->
    <h3
      class="font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 mb-1 group-hover:text-red-600 transition-colors"
    >
      {{ person.name }}
    </h3>

    <!-- 职业 -->
    <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">
      {{ person.known_for_department || '演员' }}
    </div>

    <!-- 代表作品 -->
    <div
      v-if="knownFor.length"
      class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2"
    >
      {{ knownFor.join(' · ') }}
    </div>
  </div>
</template>

<script setup>
  // Props
  const props = defineProps({
    // 演员数据对象
    person: {
      type: Object,
      required: true,
    },
  })

  // 获取代表作品
  const knownFor = computed(() => {
    if (!props.person.known_for || !props.person.known_for.length) return []

    return props.person.known_for
      .slice(0, 2) // 只显示前2个作品
      .map(item => item.title || item.name)
      .filter(Boolean)
  })

  // 跳转到演员详情页
  const navigateToDetail = () => {
    navigateTo(`/actors/${props.person.id}`)
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
