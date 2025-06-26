<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-6">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">评分组件演示</h1>
        <p class="text-lg text-gray-600">酷炫的仪表盘式评分组件</p>
      </div>

      <!-- 不同评分的展示 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div class="bg-white rounded-lg p-6 shadow-md text-center">
          <h3 class="text-lg font-semibold mb-4">神作级别</h3>
          <div class="flex justify-center mb-4">
            <RatingGauge :score="9.5" :total-score="10" />
          </div>
          <p class="text-sm text-gray-600">评分: 9.5/10</p>
        </div>

        <div class="bg-white rounded-lg p-6 shadow-md text-center">
          <h3 class="text-lg font-semibold mb-4">优秀作品</h3>
          <div class="flex justify-center mb-4">
            <RatingGauge :score="8.2" :total-score="10" />
          </div>
          <p class="text-sm text-gray-600">评分: 8.2/10</p>
        </div>

        <div class="bg-white rounded-lg p-6 shadow-md text-center">
          <h3 class="text-lg font-semibold mb-4">一般水平</h3>
          <div class="flex justify-center mb-4">
            <RatingGauge :score="6.5" :total-score="10" />
          </div>
          <p class="text-sm text-gray-600">评分: 6.5/10</p>
        </div>

        <div class="bg-white rounded-lg p-6 shadow-md text-center">
          <h3 class="text-lg font-semibold mb-4">较差作品</h3>
          <div class="flex justify-center mb-4">
            <RatingGauge :score="3.8" :total-score="10" />
          </div>
          <p class="text-sm text-gray-600">评分: 3.8/10</p>
        </div>
      </div>

      <!-- 不同尺寸的展示 -->
      <div class="bg-white rounded-lg p-8 shadow-md mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">不同尺寸</h2>
        <div class="flex items-center justify-center space-x-8">
          <div class="text-center">
            <RatingGauge :score="8.5" size="sm" />
            <p class="text-sm text-gray-600 mt-2">小尺寸 (sm)</p>
          </div>
          <div class="text-center">
            <RatingGauge :score="8.5" size="md" />
            <p class="text-sm text-gray-600 mt-2">中等尺寸 (md)</p>
          </div>
          <div class="text-center">
            <RatingGauge :score="8.5" size="lg" />
            <p class="text-sm text-gray-600 mt-2">大尺寸 (lg)</p>
          </div>
          <div class="text-center">
            <RatingGauge :score="8.5" size="xl" />
            <p class="text-sm text-gray-600 mt-2">超大尺寸 (xl)</p>
          </div>
        </div>
      </div>

      <!-- 不同配置的展示 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white rounded-lg p-6 shadow-md">
          <h3 class="text-xl font-semibold mb-4">带标签显示</h3>
          <div class="flex justify-center">
            <RatingGauge :score="7.8" :show-label="true" />
          </div>
        </div>

        <div class="bg-white rounded-lg p-6 shadow-md">
          <h3 class="text-xl font-semibold mb-4">隐藏标签</h3>
          <div class="flex justify-center">
            <RatingGauge :score="7.8" :show-label="false" />
          </div>
        </div>
      </div>

      <!-- 使用说明 -->
      <div class="bg-blue-50 rounded-lg p-6 mt-12">
        <h3 class="text-xl font-semibold text-blue-900 mb-4">使用说明</h3>
        <div class="space-y-2 text-blue-800">
          <p><strong>Props:</strong></p>
          <ul class="list-disc list-inside space-y-1 ml-4">
            <li><code>score</code>: 评分值 (0-10)</li>
            <li><code>totalScore</code>: 总分 (默认10)</li>
            <li><code>showLabel</code>: 是否显示等级标签 (默认true)</li>
            <li><code>size</code>: 尺寸 (sm, md, lg, xl)</li>
          </ul>
          <p class="mt-4"><strong>颜色规则:</strong></p>
          <ul class="list-disc list-inside space-y-1 ml-4">
            <li>≥8.0: 绿色 (优秀/神作)</li>
            <li>≥6.0: 黄色 (良好)</li>
            <li>≥4.0: 橙色 (一般)</li>
            <li>&lt;4.0: 红色 (较差)</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 设置页面标题
useHead({
  title: '评分组件演示 - Nuxt Movie'
})
</script> 