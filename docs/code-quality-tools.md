# 代码质量工具配置指南

本指南介绍如何在 Nuxt 3 项目中配置和使用代码质量工具，包括 Prettier、ESLint 和 Stylelint。

## 目录

- [概述](#概述)
- [Prettier 配置](#prettier-配置)
- [ESLint 配置](#eslint-配置)
- [Stylelint 配置](#stylelint-配置)
- [编辑器集成](#编辑器集成)
- [最佳实践](#最佳实践)
- [已知问题](#已知问题)

## 概述

代码质量工具帮助团队保持一致的代码风格，提高代码可读性和可维护性。本项目使用以下工具：

- **Prettier**: 代码格式化工具
- **ESLint**: JavaScript/TypeScript 代码检查工具
- **Stylelint**: CSS/SCSS 代码检查工具

## Prettier 配置

### 1. 安装依赖

```bash
pnpm add -D prettier
```

### 2. 创建配置文件

创建 `.prettierrc` 文件：

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### 3. 创建忽略文件

创建 `.prettierignore` 文件：

```
# 依赖
node_modules
.pnpm-store

# 构建输出
.nuxt
.output
dist

# 缓存
.cache
.temp

# 日志
*.log

# 环境变量
.env
.env.*

# 其他
.DS_Store
*.local

# ESLint
.eslintrc.js
.eslintrc.cjs

# Stylelint
.stylelintrc.js
.stylelintrc.cjs
.stylelintrc.json
.stylelintcache
```

### 4. 添加 npm 脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

### 5. 使用方法

```bash
# 格式化所有文件
pnpm format

# 检查格式化
pnpm format:check
```

## ESLint 配置

### 1. 使用 Nuxt 官方 ESLint 模块（推荐）

#### 安装模块

```bash
pnpm add -D @nuxt/eslint
```

#### 配置 nuxt.config.ts

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    // ... 其他模块
  ],
})
```

#### 添加 npm 脚本

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### 2. 自动生成配置

首次运行 `pnpm dev` 或 `pnpm prepare` 时，Nuxt 会自动生成 `eslint.config.mjs` 配置文件。

### 3. 自定义配置

如果需要自定义规则，可以修改自动生成的 `eslint.config.mjs` 文件：

```javascript
export default [
  {
    files: ['**/*.{js,ts,vue}'],
    rules: {
      // 自定义规则
      'vue/no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
]
```

### 4. 使用方法

```bash
# 检查代码
pnpm lint

# 自动修复
pnpm lint:fix
```

## Stylelint 配置

### 1. 使用 Nuxt 官方 Stylelint 模块（推荐）

#### 安装模块和依赖

```bash
pnpm add -D @nuxtjs/stylelint-module stylelint@15.11.0 stylelint-config-standard@34.0.0 stylelint-config-recommended-vue@1.5.0 stylelint-config-tailwindcss@0.0.7 stylelint-config-prettier@9.0.5
```

#### 配置 nuxt.config.ts

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/stylelint-module',
    // ... 其他模块
  ],
})
```

### 2. 创建配置文件

创建 `.stylelintrc.json` 文件：

```json
{
  "extends": ["stylelint-config-standard"],
  "rules": {
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "layer"
        ]
      }
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
    "selector-pseudo-element-no-unknown": [
      true,
      {
        "ignorePseudoElements": ["v-deep", "v-global", "v-slotted"]
      }
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": ["deep", "global"]
      }
    ],
    "property-no-vendor-prefix": null,
    "value-no-vendor-prefix": null,
    "selector-class-pattern": null,
    "keyframes-name-pattern": null,
    "custom-property-pattern": null,
    "alpha-value-notation": null,
    "color-function-notation": null,
    "color-hex-length": null,
    "font-family-name-quotes": null,
    "font-weight-notation": null,
    "function-url-quotes": null,
    "import-notation": null,
    "media-feature-range-notation": null,
    "selector-attribute-quotes": null,
    "string-quotes": null,
    "value-keyword-case": null
  },
  "overrides": [
    {
      "files": ["**/*.vue"],
      "customSyntax": "postcss-html"
    }
  ]
}
```

### 3. 添加 npm 脚本

```json
{
  "scripts": {
    "stylelint": "stylelint \"**/*.{css,vue,scss}\"",
    "stylelint:fix": "stylelint \"**/*.{css,vue,scss}\" --fix"
  }
}
```

### 4. 使用方法

```bash
# 检查样式
pnpm stylelint

# 自动修复样式
pnpm stylelint:fix
```

### 5. 错误解决

```bash
Using Tailwind CSS from ~/assets/css/tailwind.css

ERROR  Cannot start nuxt:  Could not load @nuxtjs/stylelint-module. Is it installed?
```

原因是`vite-plugin-stylelint`的兼容性问题，需要降级到`vite-plugin-stylelint@5.0.0`

## 编辑器集成

### VSCode 配置

#### 1. 安装扩展

- Prettier - Code formatter
- ESLint
- Stylelint

#### 2. 配置 settings.json

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

#### 3. 工作区配置

在项目根目录创建 `.vscode/settings.json`：

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit"
  },
  "eslint.validate": ["javascript", "typescript", "vue"],
  "stylelint.validate": ["css", "scss", "vue"]
}
```

## 最佳实践

### 1. 版本兼容性

- **Stylelint**: 使用 15.x 版本，与配置包兼容性最好
- **ESLint**: 使用 Nuxt 官方模块，自动处理版本兼容性
- **Prettier**: 使用最新稳定版本

### 2. 配置文件优先级

1. **Prettier**: `.prettierrc` 或 `prettier.config.js`
2. **ESLint**: `eslint.config.mjs`（Nuxt 自动生成）
3. **Stylelint**: `.stylelintrc.json`

### 3. 忽略文件

- **Prettier**: `.prettierignore`
- **ESLint**: `.eslintignore`
- **Stylelint**: `.stylelintignore`

### 4. 工作流程

#### 开发时

1. 保存文件时自动格式化（VSCode 配置）
2. 实时显示错误和警告
3. 自动修复可修复的问题

#### 提交前

```bash
# 格式化代码
pnpm format

# 检查并修复 ESLint 问题
pnpm lint:fix

# 检查并修复 Stylelint 问题
pnpm stylelint:fix
```

#### CI/CD 集成

```bash
# 检查格式化
pnpm format:check

# 检查代码质量
pnpm lint

# 检查样式质量
pnpm stylelint
```

### 5. 团队协作

1. **统一配置**: 所有配置文件提交到版本控制
2. **编辑器配置**: 使用 `.vscode/settings.json` 确保团队一致
3. **Git Hooks**: 考虑使用 husky 在提交前自动检查
4. **文档**: 维护本指南，确保团队成员了解工具使用

## 已知问题

### 1. VSCode 中的 TypeScript 错误

在 VSCode 中，Tailwind CSS 类名可能会被错误地识别为 TypeScript 类型断言，显示错误："类型断言表达式只能在 TypeScript 文件中使用"。

**临时解决方案**：

- 这个错误只在编辑器中出现，不影响实际的代码运行和构建
- 运行 `pnpm lint` 不会报告此错误
- 可以忽略这个编辑器提示

### 2. ESLint 警告

项目中存在一些 ESLint 警告：

- `vue/prop-name-casing`: prop 命名应使用 camelCase
- `vue/html-self-closing`: HTML void 元素不应使用自闭合标签

这些警告可以通过运行 `pnpm lint:fix` 自动修复大部分问题。

### 3. Stylelint 版本兼容性

由于版本兼容性问题，当前配置使用：

- Stylelint 15.11.0（而不是最新的 16.x）
- 只使用基础配置，未包含 Vue 和 Tailwind CSS 的专门配置

## 快速命令

```bash
# 检查所有代码质量
pnpm check

# 修复所有可自动修复的问题
pnpm fix

# 单独运行各工具
pnpm format        # 格式化代码
pnpm lint         # 检查 ESLint
pnpm stylelint    # 检查样式
```

## 故障排除

### 常见问题

#### 1. Stylelint 版本冲突

```bash
# 降级到兼容版本
pnpm remove stylelint
pnpm add -D stylelint@15.11.0
```

#### 2. ESLint 配置错误

```bash
# 重新生成配置
rm eslint.config.mjs
pnpm dev
```

#### 3. Prettier 与 ESLint 冲突

确保在 ESLint 配置中禁用与 Prettier 冲突的规则。

### 验证配置

```bash
# 验证 Prettier 配置
npx prettier --check .

# 验证 ESLint 配置
npx eslint --print-config .

# 验证 Stylelint 配置
npx stylelint --print-config assets/css/tailwind.css
```

## 总结

通过正确配置 Prettier、ESLint 和 Stylelint，可以：

1. **提高代码质量**: 自动发现和修复问题
2. **保持代码风格一致**: 统一的格式化规则
3. **提升开发效率**: 编辑器集成，实时反馈
4. **减少代码审查负担**: 自动化格式化检查

这些工具配合使用，能够显著提升项目的代码质量和开发体验。

另外有一部分报错是因为编辑器的插件问题，排查问题的时候需要注意下。
