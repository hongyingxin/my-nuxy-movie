<!--
  演职员页面
  type: movie, tv
  id: 电影或者电视剧的id
  url: /movie/1234567890、/tv/1234567890
-->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <MediaPageHeader
        :backdrop_path="detail.data.value?.backdrop_path ?? undefined"
        :title="`${detail.data.value?.title || detail.data.value?.name} ${$t('detail.cast')}`"
        :back-to="`/${mediaType}/${mediaId}`"
      />

      <div
        v-if="credits.pending.value"
        class="grid grid-cols-1 lg:grid-cols-4 gap-8"
      >
        <!-- 左侧：演员列表骨架屏 -->
        <div class="lg:col-span-3">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            {{ $t('detail.cast') }}
          </h2>
          <SkeletonList :count="15" variant="actor" />
        </div>
        <!-- 右侧：剧组成员骨架屏 -->
        <div class="lg:col-span-1">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            {{ $t('detail.crew') }}
          </h2>
          <div class="space-y-6">
            <div v-for="n in 3" :key="n" class="animate-pulse">
              <div class="bg-gray-300 dark:bg-gray-600 h-5 rounded w-20 mb-3" />
              <div
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div
                  v-for="m in 4"
                  :key="m"
                  class="p-3"
                  :class="{
                    'border-b border-gray-200 dark:border-gray-700': m !== 4,
                  }"
                >
                  <div
                    class="bg-gray-300 dark:bg-gray-600 h-4 rounded w-3/4 mb-1"
                  />
                  <div class="bg-gray-300 dark:bg-gray-600 h-3 rounded w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="credits.data.value"
        class="grid grid-cols-1 lg:grid-cols-4 gap-8"
      >
        <!-- 左侧：演员列表 -->
        <div class="lg:col-span-3">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            {{ $t('detail.cast') }} ({{ credits.data.value.cast?.length || 0 }})
          </h2>
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div
              v-for="(actor, index) in credits.data.value.cast"
              :key="actor.id"
              class="flex items-center p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md transition-all duration-200 rounded-lg"
              :class="{
                'border-b border-gray-200 dark:border-gray-700':
                  index !== credits.data.value.cast.length - 1,
              }"
              @click="navigateTo(`/actors/${actor.id}`)"
            >
              <div class="flex-shrink-0">
                <img
                  :src="image.getProfileUrl(actor.profile_path, 'medium')"
                  :alt="actor.name"
                  class="w-16 h-16 rounded-lg object-cover"
                  @error="event => image.handleImageError(event, 'profile')"
                />
              </div>
              <div class="ml-4 flex-1">
                <h3 class="font-medium text-gray-900 dark:text-white">
                  {{ actor.name }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ actor.character }}
                </p>
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ actor.known_for_department }}
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧：剧组成员 -->
        <div class="lg:col-span-1">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            {{ $t('detail.crew') }} ({{ credits.data.value.crew?.length || 0 }})
          </h2>
          <!-- 按部门分组显示 -->
          <div
            v-for="(group, department) in groupedCrew"
            :key="String(department)"
            class="mb-6"
          >
            <h3 class="font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {{ translateDepartment(String(department)) }}
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div
                v-for="(member, index) in group"
                :key="member.credit_id"
                class="p-3"
                :class="{
                  'border-b border-gray-200 dark:border-gray-700':
                    index !== group.length - 1,
                }"
              >
                <div class="font-medium text-gray-900 dark:text-white">
                  {{ member.name }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  {{ member.job }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="credits.error.value" class="text-center py-12">
        <div class="text-red-600 text-6xl mb-4">😞</div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {{ $t('detail.loadingFailed') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          {{ $t('detail.loadingFailedMessage') }}
        </p>
        <button
          class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          @click="() => credits.refresh()"
        >
          {{ $t('detail.reload') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // ==================== API 导入 ====================
  import { getDetail, getCredits } from '~/api/detail'

  // ==================== 类型导入 ====================
  import type { MediaType } from '~/types/pages/details'
  import type { CrewMember } from '~/types/apiType'

  // 获取 i18n 实例
  const { t } = useI18n()

  // ==================== 路由参数处理 ====================
  const route = useRoute()
  // 从路由参数中提取 type 和 id，确保类型安全
  const mediaType = (
    Array.isArray(route.params.type) ? route.params.type[0] : route.params.type
  ) as MediaType
  const mediaId = parseInt(
    Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  )

  // ==================== 调试日志 ====================
  console.log('Route params:', route.params)
  console.log('Media type:', mediaType)
  console.log('Media ID:', mediaId)

  // ==================== 数据获取 ====================
  // 获取详情数据（用于显示标题）
  const detail = getDetail(mediaType, mediaId)
  console.log('detail---------------', detail)
  // 获取演职员数据
  const credits = getCredits(mediaType, mediaId)
  console.log('credits---------------', credits)

  // ==================== SEO 配置 ====================
  useHead(() => ({
    title: detail.data.value
      ? `${detail.data.value.title || detail.data.value.name} ${t('detail.cast')}`
      : t('detail.cast'),
    meta: [
      {
        name: 'description',
        content: detail.data.value
          ? `${detail.data.value.title || detail.data.value.name} ${t('detail.cast')}`
          : t('detail.cast'),
      },
    ],
  }))

  // ==================== 数据处理 ====================
  // 按部门对剧组成员进行分组
  const groupedCrew = computed(() => {
    if (!credits.data.value?.crew) return {} as { [key: string]: CrewMember[] }
    return credits.data.value.crew.reduce(
      (acc: { [key: string]: CrewMember[] }, member: CrewMember) => {
        const department = member.department
        // 如果部门不存在，创建新数组
        if (!acc[department]) {
          acc[department] = []
        }
        // 将成员添加到对应部门
        acc[department].push(member)
        return acc
      },
      {} as { [key: string]: CrewMember[] }
    )
  })

  // ==================== 工具函数 ====================
  // 翻译部门名称（多语言支持）
  const translateDepartment = (department: string) => {
    const departmentMap: Record<string, string> = {
      Production: t('department.Production'),
      Directing: t('department.Directing'),
      Writing: t('department.Writing'),
      Sound: t('department.Sound'),
      Camera: t('department.Camera'),
      Editing: t('department.Editing'),
      Art: t('department.Art'),
      'Costume & Make-Up': t('department.CostumeMakeUp'),
      'Visual Effects': t('department.VisualEffects'),
      Lighting: t('department.Lighting'),
      Creator: t('department.Creator'),
      Actors: t('department.Actors'),
    }
    // 返回翻译后的部门名称，如果没有翻译则返回原名称
    return departmentMap[department] || department
  }
</script>
