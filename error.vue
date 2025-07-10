<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4"
  >
    <div class="max-w-md w-full">
      <!-- 错误图标 -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4"
        >
          <svg
            class="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <!-- 错误代码 -->
        <h1 class="text-6xl font-bold text-gray-900 mb-2">
          {{ getErrorCode() }}
        </h1>

        <!-- 错误标题 -->
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          {{ getErrorTitle() }}
        </h2>

        <!-- 错误描述 -->
        <p class="text-gray-600 mb-8">
          {{ getErrorDescription() }}
        </p>
      </div>

      <!-- 操作按钮 -->
      <div class="space-y-4">
        <button
          class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          @click="handleRetry"
        >
          重新尝试
        </button>

        <button
          class="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
          @click="goHome"
        >
          返回首页
        </button>

        <button
          class="w-full text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
          @click="goBack"
        >
          返回上一页
        </button>
      </div>

      <!-- 错误详情（开发环境） -->
      <div
        v-if="isDev && error.stack"
        class="mt-8 p-4 bg-gray-800 text-gray-100 rounded-lg text-sm"
      >
        <details>
          <summary class="cursor-pointer font-medium mb-2">错误详情</summary>
          <pre class="whitespace-pre-wrap text-xs">{{ error.stack }}</pre>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup>
  // 定义错误属性
  const props = defineProps({
    error: {
      type: Object,
      required: true,
    },
  })

  // 检查是否为开发环境
  const isDev = import.meta.dev

  // 获取错误代码
  const getErrorCode = () => {
    return props.error.statusCode || 500
  }

  // 获取错误标题
  const getErrorTitle = () => {
    const statusCode = getErrorCode()

    switch (statusCode) {
      case 404:
        return '页面未找到'
      case 403:
        return '访问被拒绝'
      case 500:
        return '服务器错误'
      case 503:
        return '服务不可用'
      default:
        return '出现错误'
    }
  }

  // 获取错误描述
  const getErrorDescription = () => {
    const statusCode = getErrorCode()

    if (props.error.statusMessage) {
      return props.error.statusMessage
    }

    switch (statusCode) {
      case 404:
        return '抱歉，您访问的页面不存在或已被删除。'
      case 403:
        return '您没有权限访问此页面。'
      case 500:
        return '服务器遇到了一个错误，请稍后再试。'
      case 503:
        return '服务暂时不可用，请稍后再试。'
      default:
        return '应用程序遇到了一个意外错误。'
    }
  }

  // 重新尝试
  const handleRetry = () => {
    // 清除错误状态
    clearError({
      redirect: '/',
    })
  }

  // 返回首页
  const goHome = () => {
    clearError({
      redirect: '/',
    })
  }

  // 返回上一页
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      clearError({
        redirect: '/',
      })
    }
  }

  // 设置页面标题
  useHead({
    title: `${getErrorCode()} - ${getErrorTitle()}`,
    meta: [
      {
        name: 'description',
        content: getErrorDescription(),
      },
    ],
  })
</script>
