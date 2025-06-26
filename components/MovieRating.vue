<template>
  <div class="movie-rating">
    <div class="rating-circle">
      <svg class="rating-svg" viewBox="0 0 36 36">
        <!-- 背景圆环 -->
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="#2a2a2a"
          stroke-width="3"
        />
        <!-- 进度圆环 -->
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          :stroke="progressColor"
          stroke-width="3"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          transform="rotate(-90 18 18)"
        />
      </svg>
      <!-- 评分文字 -->
      <div class="rating-text">
        <span class="percentage-number">{{ percentageNumber }}</span>
        <span class="percentage-symbol">%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  score: {
    type: Number,
    required: true,
    default: 0
  },
  totalScore: {
    type: Number,
    default: 10
  }
})

// 计算显示的评分
const displayScore = computed(() => {
  return props.score.toFixed(1)
})

// 计算进度百分比
const percentage = computed(() => {
  return Math.min((props.score / props.totalScore) * 100, 100)
})

// 圆环周长
const circumference = 2 * Math.PI * 16

// 计算进度条偏移量
const strokeDashoffset = computed(() => {
  return circumference - (percentage.value / 100) * circumference
})

// 根据评分计算颜色
const progressColor = computed(() => {
  const percent = percentage.value
  if (percent >= 70) return '#21d07a' // 绿色 - 优秀
  if (percent >= 50) return '#d2d531' // 黄色 - 良好
  return '#db2360' // 红色 - 较差
})

// 格式化百分比显示
const percentageDisplay = computed(() => {
  return `${percentage.value.toFixed(0)}%`
})

// 分离数字和符号
const percentageNumber = computed(() => {
  return percentage.value.toFixed(0)
})
</script>

<style scoped>
.movie-rating {
  position: relative;
  display: inline-block;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  padding: 2px;
}

.rating-circle {
  position: relative;
  width: 32px;
  height: 32px;
}

.rating-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.rating-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  font-weight: bold;
  color: white;
  line-height: 1;
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.percentage-number {
  font-size: 11px;
  font-weight: 700;
}

.percentage-symbol {
  font-size: 6px;
  font-weight: 400;
  opacity: 0.7;
  margin-top: -1px;
}

/* 平滑动画 */
circle {
  transition: stroke-dashoffset 0.5s ease-in-out;
}
</style> 