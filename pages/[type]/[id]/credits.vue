<!-- 
  演职员页面
  type: movie, tv
  id: 电影或者电视剧的id
  url: /movie/1234567890、/tv/1234567890
-->
<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <MediaPageHeader 
        :backdrop_path="detail.data.value?.backdrop_path" 
        :title="`${detail.data.value?.title || detail.data.value?.name} 的演职员`"
        :back-to="`/${mediaType}/${mediaId}`"
      />

      <div v-if="credits.pending.value" class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- 左侧：演员列表骨架屏 -->
        <div class="lg:col-span-3">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">演员</h2>
          <SkeletonList 
            :count="15"
            variant="actor"
          />
        </div>

        <!-- 右侧：剧组成员骨架屏 -->
        <div class="lg:col-span-1">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">剧组</h2>
          <div class="space-y-6">
            <div v-for="n in 3" :key="n" class="animate-pulse">
              <div class="bg-gray-300 h-5 rounded w-20 mb-3"></div>
              <div class="bg-white rounded-lg shadow-sm">
                <div v-for="m in 4" :key="m" class="p-3" :class="{'border-b': m !== 4}">
                  <div class="bg-gray-300 h-4 rounded w-3/4 mb-1"></div>
                  <div class="bg-gray-300 h-3 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="credits.data.value" class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- 左侧：演员列表 -->
        <div class="lg:col-span-3">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">演员 ({{ credits.data.value.cast?.length || 0 }})</h2>
          <div class="bg-white rounded-lg shadow-sm">
            <div v-for="(actor, index) in credits.data.value.cast" :key="actor.id" 
              class="flex items-center p-4 cursor-pointer hover:bg-gray-100 hover:shadow-md transition-all duration-200 rounded-lg"
              :class="{'border-b': index !== credits.data.value.cast.length - 1}"
              @click="navigateTo(`/actors/${actor.id}`)"
            >
              <div class="flex-shrink-0">
                <img 
                  :src="image.getProfileUrl(actor.profile_path, 'medium')"
                  :alt="actor.name"
                  class="w-16 h-16 rounded-lg object-cover"
                  @error="handleImageError"
                />
              </div>
              <div class="ml-4 flex-1">
                <h3 class="font-medium text-gray-900">{{ actor.name }}</h3>
                <p class="text-gray-600">{{ actor.character }}</p>
              </div>
              <div class="text-sm text-gray-500">
                {{ actor.known_for_department }}
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：剧组成员 -->
        <div class="lg:col-span-1">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">剧组 ({{ credits.data.value.crew?.length || 0 }})</h2>
          
          <!-- 按部门分组显示 -->
          <div v-for="(group, department) in groupedCrew" :key="department" class="mb-6">
            <h3 class="font-semibold text-gray-700 mb-3">{{ translateDepartment(department) }}</h3>
            <div class="bg-white rounded-lg shadow-sm">
              <div v-for="(member, index) in group" :key="member.credit_id"
                class="p-3"
                :class="{'border-b': index !== group.length - 1}"
              >
                <div class="font-medium text-gray-900">{{ member.name }}</div>
                <div class="text-sm text-gray-600">{{ member.job }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="credits.error.value" class="text-center py-12">
        <div class="text-red-600 text-6xl mb-4">😞</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">加载失败</h2>
        <p class="text-gray-600 mb-4">无法获取演职员信息，请稍后重试</p>
        <button 
          @click="credits.refresh"
          class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          重新加载
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
// 从路由参数中提取 type 和 id
const [mediaType, mediaId] = [route.params.type, parseInt(route.params.id)]

// Debug logs
console.log('Route params:', route.params)
console.log('Media type:', mediaType)
console.log('Media ID:', mediaId)

// API 导入
import { getDetail, getCredits } from '~/api/detail'

// 获取数据
// 这里获取电影详情是为了电影/电视名字
const detail = getDetail(mediaType, mediaId)
console.log('detail---------------', detail)
const credits = getCredits(mediaType, mediaId)
console.log('credits---------------', credits)

// SEO 配置
useHead(() => ({
  title: detail.data.value 
    ? `${detail.data.value.title || detail.data.value.name} 的演职员 - Nuxt Movie` 
    : '演职员 - Nuxt Movie',
  meta: [
    { 
      name: 'description', 
      content: detail.data.value 
        ? `${detail.data.value.title || detail.data.value.name} 的完整演职员名单` 
        : '查看完整的演职员名单'
    }
  ]
}))

// 处理图片加载错误
const handleImageError = (event) => {
  const img = event.target
  img.src = '/images/profile-placeholder.png' // 需要添加一个默认的占位图
}

// 按部门对剧组成员进行分组
const groupedCrew = computed(() => {
  if (!credits.data.value?.crew) return {}
  
  return credits.data.value.crew.reduce((acc, member) => {
    const department = member.department
    if (!acc[department]) {
      acc[department] = []
    }
    acc[department].push(member)
    return acc
  }, {})
})

// 翻译部门名称
const translateDepartment = (department) => {
  const departmentMap = {
    'Production': '制作',
    'Directing': '导演',
    'Writing': '编剧',
    'Sound': '音效',
    'Camera': '摄影',
    'Editing': '剪辑',
    'Art': '美术',
    'Costume & Make-Up': '服装化妆',
    'Visual Effects': '视觉效果',
    'Lighting': '灯光',
    'Creator': '创作',
    'Actors': '演员'
  }
  return departmentMap[department] || department
}
</script> 