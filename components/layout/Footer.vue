<template>
  <footer
    class="bg-gray-900 dark:bg-gray-950 text-gray-300 border-t border-gray-800 dark:border-gray-700"
  >
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-6 py-12">
      <div class="flex flex-col md:flex-row justify-between gap-8">
        <!-- 品牌信息 -->
        <div class="space-y-4 flex-1">
          <div class="flex items-center space-x-3">
            <div
              class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
                />
              </svg>
            </div>
            <span class="text-xl font-bold text-white">Nuxt Movie</span>
          </div>
          <p class="text-sm leading-relaxed text-gray-400 dark:text-gray-300">
            发现最新最热门的电影和电视剧，获取详细的演员信息、评分和评论。您的影视娱乐指南。
          </p>
        </div>

        <!-- 项目相关链接 -->
        <div class="space-y-4 flex-1">
          <h3 class="text-white font-semibold text-lg">项目相关</h3>
          <ul class="space-y-2">
            <li v-for="link in projectLinks" :key="link.url">
              <a
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 底部版权信息 -->
    <div
      class="border-t border-gray-800 dark:border-gray-700 bg-gray-950 dark:bg-black"
    >
      <div class="container mx-auto px-6 py-6">
        <div
          class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div class="text-sm text-gray-400 dark:text-gray-500">
            © 2024 Nuxt Movie. 保留所有权利。
          </div>
          <div
            class="flex items-center space-x-6 text-sm text-gray-400 dark:text-gray-500"
          >
            <span>数据来源：</span>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              TMDB
            </a>
            <span>|</span>
            <span>Made with</span>
            <svg
              class="w-4 h-4 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
            <span>by Nuxt 3</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
  // Footer 组件不需要特殊的逻辑

  // 项目相关链接数据
  const projectLinks = [
    {
      label: 'GitHub 仓库',
      url: 'https://github.com/hongyingxin/my-nuxy-movie',
    },
    {
      label: 'TMDB 官网',
      url: 'https://www.themoviedb.org/',
    },
    {
      label: '开发文档',
      url: 'https://developer.themoviedb.org/docs/getting-started',
    },
    {
      label: 'Nuxt.js 官网',
      url: 'https://nuxt.com/',
    },
  ]
</script>
