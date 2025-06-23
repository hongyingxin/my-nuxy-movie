// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  
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
