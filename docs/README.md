# 项目文档目录

本目录包含项目的所有技术文档，帮助开发者理解项目架构、开发规范和最佳实践。

## 📚 文档分类

### 🔧 开发规范

- [**代码规范**](./code-standards.md) - 代码编写规范、注释标准和命名规范
- [**代码质量工具**](./code-quality-tools.md) - ESLint、Prettier、Stylelint 等工具配置
- [**Git 钩子**](./git-hooks.md) - Git 提交前检查、代码格式化等自动化工具

### 🏗️ 架构设计

- [**通用模式**](./common-patterns.md) - 项目中的最佳实践和通用模式
- [**组件文档**](./components.md) - 组件使用说明和设计规范
- [**语言配置**](./languages.md) - TMDB API 语言配置详解（界面语言 vs 内容筛选语言）

### 🔌 API 和类型

- [**API TypeScript 改进**](./api-typescript-improvements.md) - API 接口类型定义改进方案
- [**页面文档**](./pages/) - 各个页面的实现文档和 API 对比分析

### 🎨 UI/UX

- [**骨架屏设计**](./skeleton-screen.md) - 加载状态的骨架屏实现
- [**无限滚动**](./useInfiniteScroll.md) - 无限滚动组件的实现和使用

### 📝 开发备忘

- [**备忘录**](./memo.md) - 开发任务清单和已完成功能记录

## 🚀 快速开始

### 新开发者必读

1. [代码规范](./code-standards.md) - 了解项目编码规范
2. [通用模式](./common-patterns.md) - 掌握项目最佳实践
3. [语言配置](./languages.md) - 理解 TMDB API 语言配置
4. [组件文档](./components.md) - 学习组件使用方法

### 常见问题解答

#### Q: 如何区分界面语言和内容筛选语言？

A: 详见 [语言配置文档](./languages.md)，其中详细解释了两种语言概念的区别。

#### Q: 如何添加新的组件？

A: 参考 [组件文档](./components.md) 中的组件设计规范和使用说明。

#### Q: 如何处理 API 数据？

A: 查看 [通用模式](./common-patterns.md) 中的 API 请求模式和错误处理方案。

#### Q: 如何实现加载状态？

A: 参考 [骨架屏设计](./skeleton-screen.md) 文档中的加载状态实现方案。

## 📖 文档维护

### 更新原则

- 每次新增功能时，同步更新相关文档
- 重要的架构决策需要记录在对应的文档中
- 代码变更时，确保文档的准确性

### 文档格式

- 使用 Markdown 格式编写
- 代码示例使用语法高亮
- 重要信息使用表格或列表组织
- 适当使用图表和流程图说明

## 🔗 外部参考

- [TMDB API 官方文档](https://developer.themoviedb.org/docs/getting-started)
- [Nuxt 3 官方文档](https://nuxt.com/docs)
- [Vue 3 官方文档](https://vuejs.org/guide/)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)

---

**注意**: 如果发现文档有误或需要补充，请及时更新或联系项目维护者。
