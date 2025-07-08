<template>
  <footer class="bg-gray-900 text-gray-300">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- 品牌信息 -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
              </svg>
            </div>
            <span class="text-xl font-bold text-white">Nuxt Movie</span>
          </div>
          <p class="text-sm leading-relaxed">
            发现最新最热门的电影和电视剧，获取详细的演员信息、评分和评论。您的影视娱乐指南。
          </p>
          <!-- 社交媒体链接 -->
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-red-500 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-red-500 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-red-500 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.878-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-red-500 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- 快速链接 -->
        <div class="space-y-4">
          <h3 class="text-white font-semibold text-lg">快速链接</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-red-500 transition-colors">
                首页
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/movies" class="text-gray-400 hover:text-red-500 transition-colors">
                电影
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tv" class="text-gray-400 hover:text-red-500 transition-colors">
                电视剧
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/people" class="text-gray-400 hover:text-red-500 transition-colors">
                演员
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/search" class="text-gray-400 hover:text-red-500 transition-colors">
                搜索
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- 热门分类 -->
        <div class="space-y-4">
          <h3 class="text-white font-semibold text-lg">热门分类</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/discover/movie?sort_by=popularity.desc" class="text-gray-400 hover:text-red-500 transition-colors">
                热门电影
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/discover/movie?sort_by=release_date.asc" class="text-gray-400 hover:text-red-500 transition-colors">
                即将上映
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/discover/tv?sort_by=popularity.desc" class="text-gray-400 hover:text-red-500 transition-colors">
                热门剧集
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/discover/tv?with_status=0" class="text-gray-400 hover:text-red-500 transition-colors">
                正在播出
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/discover/movie?sort_by=vote_average.desc&vote_average.gte=7" class="text-gray-400 hover:text-red-500 transition-colors">
                高分推荐
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- 关于我们 -->
        <div class="space-y-4">
          <h3 class="text-white font-semibold text-lg">关于我们</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-gray-400 hover:text-red-500 transition-colors">
                关于 Nuxt Movie
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-red-500 transition-colors">
                联系我们
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-red-500 transition-colors">
                隐私政策
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-red-500 transition-colors">
                使用条款
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-red-500 transition-colors">
                帮助中心
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 底部版权信息 -->
    <div class="border-t border-gray-800">
      <div class="container mx-auto px-6 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="text-sm text-gray-400">
            © 2024 Nuxt Movie. 保留所有权利。
          </div>
          <div class="flex items-center space-x-6 text-sm text-gray-400">
            <span>数据来源：</span>
            <a 
              href="https://www.themoviedb.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="hover:text-red-500 transition-colors"
            >
              TMDB
            </a>
            <span>|</span>
            <span>Made with</span>
            <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
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
</script> 