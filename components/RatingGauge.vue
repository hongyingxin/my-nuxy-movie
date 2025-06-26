<template>
  <div class="relative inline-flex items-center justify-center">
    <!-- 圆形进度条 -->
    <svg 
      class="transform -rotate-90 w-8 h-8" 
      viewBox="0 0 36 36"
    >
      <!-- 背景圆环 -->
      <path
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-dasharray="100, 100"
        class="text-gray-800"
      />
      
      <!-- 进度圆环 -->
      <path
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-dasharray="100, 100"
        :stroke-dashoffset="strokeDashoffset"
        :class="progressColor"
        class="transition-all duration-1000 ease-out"
        stroke-linecap="round"
      />
    </svg>
    
    <!-- 中心评分显示 -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="text-center">
        <div class="text-xs font-bold text-white leading-none">
          {{ displayScore }}
        </div>
      </div>
    </div>
    
    <!-- 评分等级标签 -->
    <div 
      v-if="showLabel"
      class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-30"
    >
      <span 
        class="text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm"
        :class="labelColor"
      >
        {{ ratingLabel }}
      </span>
    </div>
  </div>
</template>

<script setup>
// 定义组件属性
const props = defineProps({
  // 评分值 (0-10)
  score: {
    type: Number,
    required: true,
    default: 0
  },
  // 总分 (默认10分制)
  totalScore: {
    type: Number,
    default: 10
  },
  // 是否显示评分等级标签
  showLabel: {
    type: Boolean,
    default: true
  },
  // 组件尺寸 (sm, md, lg, xl)
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  }
})

// 计算显示的评分 (保留一位小数)
const displayScore = computed(() => {
  return props.score.toFixed(1)
})

// 计算进度条偏移量 (100 - 进度百分比)
const strokeDashoffset = computed(() => {
  const percentage = (props.score / props.totalScore) * 100
  return 100 - Math.min(percentage, 100)
})

// 根据评分计算进度条颜色 (TMDB consensus tight 风格)
const progressColor = computed(() => {
  const percentage = (props.score / props.totalScore) * 100
  
  if (percentage >= 60) return 'text-green-500' // 正面评价
  if (percentage >= 40) return 'text-yellow-500' // 混合评价
  return 'text-red-500' // 负面评价
})

// 根据评分计算分数颜色
const scoreColor = computed(() => {
  const percentage = (props.score / props.totalScore) * 100
  
  if (percentage >= 80) return 'text-green-300'
  if (percentage >= 60) return 'text-yellow-300'
  if (percentage >= 40) return 'text-orange-300'
  return 'text-red-300'
})

// 根据评分计算标签颜色
const labelColor = computed(() => {
  const percentage = (props.score / props.totalScore) * 100
  
  if (percentage >= 80) return 'bg-green-100 text-green-800'
  if (percentage >= 60) return 'bg-yellow-100 text-yellow-800'
  if (percentage >= 40) return 'bg-orange-100 text-orange-800'
  return 'bg-red-100 text-red-800'
})

// 根据评分计算等级标签
const ratingLabel = computed(() => {
  const percentage = (props.score / props.totalScore) * 100
  
  if (percentage >= 90) return '神作'
  if (percentage >= 80) return '优秀'
  if (percentage >= 70) return '良好'
  if (percentage >= 60) return '一般'
  if (percentage >= 50) return '及格'
  if (percentage >= 40) return '较差'
  return '很差'
})

// 组件尺寸映射
const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
  xl: 'w-12 h-12'
}

// 计算百分比显示
const percentageDisplay = computed(() => {
  const percentage = (props.score / props.totalScore) * 100
  return percentage.toFixed(1) + '%'
})
</script>

<style scoped>
/* 确保 SVG 元素正确渲染 */
svg {
  overflow: visible;
}
</style> 