# My Nuxt Movie

一个基于 Nuxt 3 构建的现代电影发现应用。

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev
```

## 📚 开发指南

**⚠️ 重要提示**: 在编写代码之前，请始终查看 [docs/common-patterns.md](./docs/common-patterns.md) 了解：

- 包管理器使用方式 (pnpm)
- PhotoSwipe 集成模式
- API 请求模式
- UI 组件模式
- 图片处理工具

## 🛠️ 技术栈

- **框架**: Nuxt 3
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **包管理器**: pnpm
- **图片画廊**: PhotoSwipe 5.x

## 🎯 代码质量工具

本项目配置了完整的代码质量工具链，确保代码风格一致和高质量：

### 工具配置

- **Prettier**: 代码格式化
- **ESLint**: JavaScript/TypeScript 代码检查
- **Stylelint**: CSS/SCSS 代码检查

### 快速使用

```bash
# 格式化代码
pnpm format

# 检查并修复代码问题
pnpm lint:fix

# 检查并修复样式问题
pnpm stylelint:fix

# 检查所有代码质量
pnpm format:check && pnpm lint && pnpm stylelint
```

### 编辑器配置

项目包含 VSCode 工作区配置，确保团队成员有一致的开发体验：

- 自动格式化（保存时）
- 实时错误提示
- 自动修复功能

**详细配置说明**: 查看 [docs/code-quality-tools.md](./docs/code-quality-tools.md)

## Git Hooks

项目使用 Git hooks 自动确保代码质量：

- **pre-commit**: 提交前自动运行 ESLint、Stylelint 和 Prettier
- **commit-msg**: 验证提交信息格式

### 提交规范

提交信息必须遵循以下格式：

```
<type>(<scope>): <subject>
```

### 交互式提交（推荐）

使用 `czg` 工具进行交互式提交：

```bash
# 添加文件后使用交互式界面
git add .
pnpm commit
```

### 手动提交

示例：

```bash
git commit -m "feat: 添加电影搜索功能"
git commit -m "fix(search): 修复搜索结果为空的问题"
```

详细说明请查看 [Git Hooks 文档](docs/git-hooks.md)。

## 📁 项目结构

```
my-nuxt-movie/
├── 📁 api/                    # API 函数
│   ├── configuration.ts      # 配置 API
│   ├── detail.ts             # 详情页 API (电影/电视剧)
│   ├── discover.ts           # 发现页 API (筛选搜索)
│   ├── genre.ts              # 分类 API
│   ├── movie.ts              # 电影相关 API
│   ├── person.ts             # 演员相关 API
│   ├── search.ts             # 搜索 API
│   ├── trending.ts           # 趋势内容 API
│   └── tv.ts                 # 电视剧相关 API
├── 📁 assets/                # 静态资源
│   └── css/                  # 样式文件
│       └── tailwind.css      # Tailwind CSS 样式
├── 📁 components/            # Vue 组件
│   ├── 📁 Common/           # 通用组件
│   │   ├── LanguageSwitcher.vue # 语言切换器
│   │   ├── Pagination.vue   # 分页组件
│   │   ├── ThemeSwitcher.vue # 主题切换器
│   │   └── ThemeToggle.vue  # 主题切换按钮
│   ├── 📁 Layout/           # 布局组件
│   │   ├── Header.vue       # 头部导航
│   │   └── Footer.vue       # 底部信息
│   ├── 📁 Media/            # 媒体组件
│   │   ├── Card.vue         # 媒体卡片
│   │   ├── ListItem.vue     # 列表项
│   │   ├── PageHeader.vue   # 页面头部
│   │   ├── PersonCard.vue   # 演员卡片
│   │   ├── PersonListItem.vue # 演员列表项
│   │   └── Rating.vue       # 评分组件
│   ├── 📁 Search/           # 搜索组件
│   │   ├── SearchBox.vue    # 搜索框
│   │   └── SearchSuggestions.vue # 搜索建议
│   ├── 📁 Skeleton/         # 骨架屏组件
│   │   ├── Card.vue         # 卡片骨架屏
│   │   ├── Grid.vue         # 网格骨架屏
│   │   ├── List.vue         # 列表骨架屏
│   │   ├── ListItem.vue     # 列表项骨架屏
│   │   └── LoadingState.vue # 加载状态
│   └── 📁 ui/               # UI 组件 (预留)
├── 📁 composables/          # Vue 组合式函数
│   ├── useHttp.ts           # HTTP 请求封装
│   ├── useInfiniteScroll.ts # 无限滚动
│   └── useScreenSize.ts     # 屏幕尺寸响应
├── 📁 constants/            # 常量定义
│   ├── index.ts             # 常量统一导出
│   ├── languages.ts         # 语言配置常量
│   ├── navigation.ts        # 导航配置常量
│   ├── releaseTypes.ts      # 发布类型常量
│   ├── sortOptions.ts       # 排序选项常量
│   ├── theme.ts             # 主题配置常量
│   └── README.md            # 常量使用说明
├── 📁 docs/                 # 项目文档
│   ├── 📁 pages/           # 页面设计文档
│   │   ├── home.md         # 首页设计文档
│   │   ├── detail.md       # 详情页设计文档
│   │   ├── discover.md     # 发现页设计文档
│   │   ├── discover-api-comparison.md # 发现页 API 对比
│   │   ├── person.md       # 演员页面设计文档
│   │   ├── search.md       # 搜索页面设计文档
│   │   └── README.md       # 页面文档索引
│   ├── api-typescript-improvements.md # API TypeScript 改进
│   ├── code-quality-tools.md # 代码质量工具配置
│   ├── code-standards.md   # 代码规范
│   ├── common-patterns.md  # 通用模式和最佳实践
│   ├── components.md       # 组件文档
│   ├── git-hooks.md        # Git Hooks 配置
│   ├── i18n-guide.md       # 国际化指南
│   ├── languages.md        # 语言配置详解
│   ├── memo.md             # 开发备忘录
│   ├── README.md           # 文档索引
│   ├── skeleton-screen.md  # 骨架屏实现
│   ├── theme-implementation.md # 主题实现
│   ├── typescript-guide.md # TypeScript 指南
│   └── useInfiniteScroll.md # 无限滚动实现
├── 📁 language/             # 多语言文件
│   ├── ar.ts               # 阿拉伯语
│   ├── en.ts               # 英语
│   ├── ja.ts               # 日语
│   ├── ko.ts               # 韩语
│   └── zh.ts               # 中文
├── 📁 pages/                # Nuxt 页面
│   ├── 📁 actors/          # 演员相关页面
│   │   ├── index.vue       # 演员列表页
│   │   └── [id].vue        # 演员详情页
│   ├── 📁 discover/        # 发现页面
│   │   └── [type].vue      # 电影/电视剧发现页
│   ├── 📁 search/          # 搜索页面
│   │   └── index.vue       # 搜索结果页
│   ├── 📁 [type]/          # 动态路由页面
│   │   └── 📁 [id]/        # 详情页子页面
│   │       ├── index.vue   # 主详情页
│   │       ├── credits.vue # 演职员页
│   │       └── gallery.vue # 图片集页
│   └── index.vue           # 首页
├── 📁 plugins/              # Nuxt 插件 (预留)
├── 📁 public/               # 公共静态文件
│   ├── 📁 images/          # 图片资源
│   ├── favicon.ico         # 网站图标
│   └── robots.txt          # 搜索引擎配置
├── 📁 server/               # 服务端代码
│   └── tsconfig.json       # 服务端 TypeScript 配置
├── 📁 stores/               # Pinia 状态管理
│   ├── genre.ts            # 分类状态管理
│   ├── language.ts         # 语言状态管理
│   ├── region.ts           # 地区状态管理
│   └── theme.ts            # 主题状态管理
├── 📁 types/                # TypeScript 类型定义
│   ├── 📁 apiType/         # API 类型定义
│   │   ├── common.ts       # 通用类型
│   │   ├── configuration.ts # 配置类型
│   │   ├── discover.ts     # 发现页类型
│   │   ├── genre.ts        # 分类类型
│   │   ├── http.ts         # HTTP 类型
│   │   ├── index.ts        # 统一导出入口
│   │   ├── movie.ts        # 电影类型
│   │   ├── person.ts       # 演员类型
│   │   ├── search.ts       # 搜索类型
│   │   ├── sortOptions.ts  # 排序选项类型
│   │   ├── trending.ts     # 趋势内容类型
│   │   ├── tv.ts           # 电视剧类型
│   │   └── README.md       # 类型使用说明
│   ├── 📁 pages/           # 页面类型定义
│   │   ├── actors.ts       # 演员页面类型
│   │   ├── details.ts      # 详情页类型
│   │   ├── discover.ts     # 发现页类型
│   │   ├── home.ts         # 首页类型
│   │   └── search.ts       # 搜索页类型
│   ├── language.ts         # 语言类型
│   └── theme.ts            # 主题类型
├── 📁 utils/                # 工具函数
│   ├── common.ts           # 通用工具函数
│   ├── department.ts       # 部门翻译工具
│   ├── image.ts            # 图片处理工具
│   └── theme.ts            # 主题工具函数
├── 📁 .husky/              # Git Hooks 配置
├── 📁 .vscode/             # VSCode 工作区配置
│   └── settings.json       # 编辑器设置
├── 📄 .czgrc.js            # czg 提交工具配置
├── 📄 .czrc                 # commitizen 配置
├── 📄 .cursorrules         # Cursor 编辑器规则
├── 📄 .gitignore           # Git 忽略文件
├── 📄 .lintstagedrc.json   # lint-staged 配置
├── 📄 .prettierignore      # Prettier 忽略文件
├── 📄 .prettierrc          # Prettier 配置
├── 📄 .stylelintignore     # Stylelint 忽略文件
├── 📄 .stylelintrc.json    # Stylelint 配置
├── 📄 app.vue              # 应用根组件
├── 📄 commitlint.config.cjs # commitlint 配置
├── 📄 env.example          # 环境变量示例
├── 📄 error.vue            # 错误页面
├── 📄 eslint.config.mjs    # ESLint 配置
├── 📄 nuxt.config.ts       # Nuxt 配置文件
├── 📄 package.json         # 项目依赖配置
├── 📄 pnpm-lock.yaml       # pnpm 锁定文件
├── 📄 tailwind.config.ts   # Tailwind CSS 配置
├── 📄 tsconfig.json        # TypeScript 配置
└── 📄 README.md            # 项目说明文档
```

## 🔗 有用链接

- [📖 完整文档目录](./docs/README.md) - 所有文档的索引和分类
- [🎯 常用模式和最佳实践](./docs/common-patterns.md) - 必读的开发指南
- [🌐 语言配置详解](./docs/languages.md) - TMDB API 语言配置说明
- [🔧 代码质量工具配置](./docs/code-quality-tools.md) - 工具链配置
- [🧩 组件库](./docs/components.md) - 组件使用文档
- [📝 API 类型定义](./types/apiType/README.md) - TypeScript 类型说明
- [⚡ API TypeScript 改进](./docs/api-typescript-improvements.md) - API 优化方案
