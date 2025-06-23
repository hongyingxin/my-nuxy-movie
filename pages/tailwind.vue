<template>
  <div class="min-h-screen bg-gray-900 text-white p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8 text-blue-400">
        Tailwind CSS 测试页面
      </h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- 卡片 1 -->
        <div class="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h2 class="text-xl font-semibold mb-4 text-green-400">成功卡片</h2>
          <p class="text-gray-300">这是一个使用 Tailwind CSS 样式的卡片。</p>
        </div>
        
        <!-- 卡片 2 -->
        <div class="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h2 class="text-xl font-semibold mb-4 text-yellow-400">警告卡片</h2>
          <p class="text-gray-300">Tailwind CSS 应该正常工作！</p>
        </div>
        
        <!-- 卡片 3 -->
        <div class="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h2 class="text-xl font-semibold mb-4 text-red-400">错误卡片</h2>
          <p class="text-gray-300">如果看到这个页面，说明 Tailwind CSS 已经集成成功！</p>
        </div>
      </div>
      
      <!-- 按钮测试 -->
      <div class="mt-8 text-center space-x-4">
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
          蓝色按钮
        </button>
        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors">
          绿色按钮
        </button>
        <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors">
          红色按钮
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 这是一个简单的测试页面
</script> 