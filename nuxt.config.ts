// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  
  // 运行时配置
  runtimeConfig: {
    public: {
      tmdbApiUrl: process.env.TMDB_API_URL,
      tmdbApiKey: process.env.TMDB_API_KEY,
      tmdbApiToken: process.env.TMDB_API_TOKEN,
      appName: 'My Nuxt Movie',
      appDescription: 'A modern movie discovery app built with Nuxt 3',
    }
  },
  
  // 模块
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  
  // CSS
  css: [
    '~/assets/css/tailwind.css'
  ],
  
  devtools: { enabled: true }
})
