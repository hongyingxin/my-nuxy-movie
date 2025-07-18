// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    ignores: [
      'node_modules/**',
      '.nuxt/**',
      '.output/**',
      'dist/**',
      '.cache/**',
      '.temp/**',
      '*.log',
      '.env',
      '.env.*',
      '.DS_Store',
      '*.local',
      'public/**',
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'no-unused-vars': 'off',
    },
  }
)
