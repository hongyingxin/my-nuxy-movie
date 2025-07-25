// https://nuxt.com/docs/api/configuration/nuxt-config
import { UI_LOCALES, DEFAULT_UI_LANGUAGE } from './constants/languages'
import type { UILanguageCode } from './types/language'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',

  // 运行时配置
  runtimeConfig: {
    public: {
      tmdbApiUrl: process.env.TMDB_API_URL,
      tmdbApiKey: process.env.TMDB_API_KEY,
      tmdbApiToken: process.env.TMDB_API_TOKEN,
      tmdbImageBaseUrl: process.env.TMDB_IMAGE_BASE_URL,
      defaultUiLanguage: process.env.DEFAULT_UI_LANGUAGE,
      appName: 'My Nuxt Movie',
      appDescription: 'A modern movie discovery app built with Nuxt 3',
    },
  },

  // 模块
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/i18n',
  ],
  // pinia 配置过期时间
  piniaPluginPersistedstate: {
    storage: 'cookies',
    cookieOptions: {
      maxAge: 1 * 24 * 60 * 60, // 1 天，单位：秒
    },
  },

  // i18n 模块配置
  i18n: {
    // 语言列表
    locales: UI_LOCALES.map(locale => ({
      code: locale.code,
      name: locale.name,
      iso: locale.iso,
      file: locale.code.split('-')[0] + '.ts',
    })),
    // 默认语言
    defaultLocale: DEFAULT_UI_LANGUAGE as UILanguageCode,
    // 懒加载
    lazy: true,
    // 这是一个相对路径，指向包含翻译文件的目录。可以与懒加载选项（lazy option）配合使用，也可以不使用懒加载。路径解析规则：这个路径是相对于项目根目录下的 restructureDir 目录来解析的（restructureDir 默认值是 'i18n'）。
    langDir: '../language',
    // 策略
    strategy: 'no_prefix',
    // 检测浏览器语言
    detectBrowserLanguage: {
      // 使用 cookie
      useCookie: true,
      // 重定向的 cookie 键名
      cookieKey: 'i18n_redirected',
      // 重定向
      alwaysRedirect: true,
      // 回退语言
      fallbackLocale: 'zh-CN',
    },
  },

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
    // provider: 'ipx',
    // domains: ['image.tmdb.org'],
    format: ['webp', 'avif', 'jpeg', 'jpg'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // Vercel 部署优化
  nitro: {
    preset: 'vercel',
  },
  // 第三方包自动导入
  imports: {
    presets: [
      {
        from: 'vue-i18n',
        imports: ['useI18n'],
      },
    ],
  },
})
