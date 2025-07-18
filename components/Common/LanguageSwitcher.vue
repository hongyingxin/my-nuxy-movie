<template>
  <div class="relative">
    <!-- 下拉菜单样式 -->
    <div v-if="variant === 'dropdown'" class="relative">
      <button
        type="button"
        class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
        :class="buttonClass"
        @click="toggleDropdown"
      >
        <span class="text-lg">{{ currentLocaleInfo?.flag }}</span>
        <span class="hidden sm:inline">{{ currentLocaleInfo?.name }}</span>
        <span class="sm:hidden">{{
          currentLocaleInfo?.code.toUpperCase()
        }}</span>
        <svg
          class="w-4 h-4 transition-transform"
          :class="{ 'rotate-180': isDropdownOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <!-- 下拉选项 -->
      <div
        v-if="isDropdownOpen"
        class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50"
        @click.stop
      >
        <div class="py-1">
          <button
            v-for="locale in availableLocales"
            :key="locale.code"
            type="button"
            class="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :class="{
              'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300':
                locale.code === currentLocale,
            }"
            @click="switchLanguage(locale.code)"
          >
            <span class="text-lg">{{ locale.flag }}</span>
            <div class="flex flex-col items-start">
              <span class="font-medium">{{ locale.name }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">{{
                locale.iso
              }}</span>
            </div>
            <svg
              v-if="locale.code === currentLocale"
              class="w-4 h-4 text-red-600 ml-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 按钮组样式 -->
    <div v-else-if="variant === 'buttons'" class="flex space-x-2">
      <button
        v-for="locale in availableLocales"
        :key="locale.code"
        type="button"
        class="flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-colors"
        :class="[
          locale.code === currentLocale
            ? 'bg-red-600 text-white'
            : 'text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-100',
          buttonClass,
        ]"
        @click="switchLanguage(locale.code)"
      >
        <span class="text-base">{{ locale.flag }}</span>
        <span class="hidden sm:inline">{{ locale.name }}</span>
        <span class="sm:hidden">{{ locale.code.toUpperCase() }}</span>
      </button>
    </div>

    <!-- 简洁下拉样式 -->
    <div v-else class="relative">
      <button
        type="button"
        class="flex items-center space-x-1 px-2 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
        :class="buttonClass"
        @click="toggleDropdown"
      >
        <span class="text-base">{{ currentLocaleInfo?.flag }}</span>
        <span class="hidden xl:inline text-xs">{{
          currentLocaleInfo?.name
        }}</span>
        <svg
          class="w-3 h-3 transition-transform"
          :class="{ 'rotate-180': isDropdownOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <!-- 下拉选项 -->
      <div
        v-if="isDropdownOpen"
        class="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50"
        @click.stop
      >
        <div class="py-1">
          <button
            v-for="locale in availableLocales"
            :key="locale.code"
            type="button"
            class="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :class="{
              'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300':
                locale.code === currentLocale,
            }"
            @click="switchLanguage(locale.code)"
          >
            <span class="text-base">{{ locale.flag }}</span>
            <span class="font-medium">{{ locale.name }}</span>
            <svg
              v-if="locale.code === currentLocale"
              class="w-3 h-3 text-red-600 ml-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 点击外部关闭下拉菜单 -->
  <div
    v-if="isDropdownOpen"
    class="fixed inset-0 z-40"
    @click="closeDropdown"
  />
</template>

<script setup>
  // 导入语言 store
  import { useLanguageStore } from '~/stores/language'

  /**
   * 语言切换组件 Props
   */
  const props = defineProps({
    /** 显示样式 */
    variant: {
      type: String,
      default: 'dropdown',
      validator: value => ['dropdown', 'buttons', 'simple'].includes(value),
    },
    /** 自定义按钮样式类 */
    buttonClass: {
      type: String,
      default: '',
    },
    /** 是否在切换后自动关闭下拉菜单 */
    autoClose: {
      type: Boolean,
      default: true,
    },
  })

  /**
   * 事件定义
   */
  const emit = defineEmits(['language-changed'])

  // 语言 store
  const languageStore = useLanguageStore()

  // 下拉菜单状态
  const isDropdownOpen = ref(false)

  // 计算属性
  const currentLocale = computed(() => languageStore.getCurrentLocale)
  const currentLocaleInfo = computed(() => languageStore.getCurrentLocaleInfo)
  const availableLocales = computed(() => languageStore.getAvailableLocales)

  /**
   * 切换语言
   */
  const switchLanguage = async localeCode => {
    try {
      await languageStore.switchLanguage(localeCode)

      if (props.autoClose && isDropdownOpen.value) {
        closeDropdown()
      }

      emit('language-changed', localeCode)
    } catch (error) {
      console.error('Failed to switch language:', error)
    }
  }

  /**
   * 切换下拉菜单状态
   */
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
  }

  /**
   * 关闭下拉菜单
   */
  const closeDropdown = () => {
    isDropdownOpen.value = false
  }
</script>
