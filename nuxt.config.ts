// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  
  // 运行时配置
  runtimeConfig: {
    public: {
      tmdbApiUrl: process.env.TMDB_API_URL,
      tmdbApiKey: process.env.TMDB_API_KEY,
      tmdbApiToken: process.env.TMDB_API_TOKEN,
      tmdbImageBaseUrl: process.env.TMDB_IMAGE_BASE_URL,
      appName: 'My Nuxt Movie',
      appDescription: 'A modern movie discovery app built with Nuxt 3',
    }
  },
  
  // 模块
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],
  
  // CSS
  css: [
    '~/assets/css/tailwind.css',
    'photoswipe/style.css',
    // 'photoswipe/dist/photoswipe.css'
  ],
  
  devtools: { enabled: true },
  
  // 图片配置
  image: {
    // ipx 处理器 需要 domains 配合，但 tmdb 可能限制了域名
    // tmdb 图片提供了不同尺寸的图片，所以 nuxtImg 意义不大，此处主要是学习 nuxtImg 的用法
    // nuxt image 文档 https://image.nuxtjs.org.cn/
    provider: 'ipx',
    // domains: ['image.tmdb.org'],
    format: ['webp', 'avif', 'jpeg','jpg'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    }
  }
})
