# Git Hooks 配置指南

本项目使用 Git hooks 来确保代码质量和提交规范。

## 概述

项目使用以下工具：

- **husky**: Git hooks 管理工具
- **lint-staged**: 只对暂存区的文件运行检查
- **commitlint**: 提交信息格式验证（自定义实现）
- **czg**: 交互式提交工具（可选但推荐）

## Pre-commit Hook

在提交代码前自动运行，检查和修复代码质量问题。

### 执行流程

1. **ESLint 检查和修复** - 对 `.js`, `.ts`, `.vue` 文件
2. **Stylelint 检查和修复** - 对 `.css`, `.scss`, `.vue` 文件
3. **Prettier 格式化** - 对所有支持的文件类型

### 配置文件

- `.lintstagedrc.json` - lint-staged 配置
- `.husky/pre-commit` - pre-commit hook 脚本

## Commit-msg Hook

验证提交信息格式，确保遵循约定式提交规范。

### 提交信息格式

```
<type>(<scope>): <subject>
```

- **type**: 提交类型（必填）
- **scope**: 影响范围（可选）
- **subject**: 简短描述（必填，最多 100 字符）

### 提交类型说明

| 类型       | 说明     | 示例                          |
| ---------- | -------- | ----------------------------- |
| `feat`     | 新功能   | `feat: 添加用户登录功能`      |
| `fix`      | 修复 bug | `fix(auth): 修复登录验证错误` |
| `docs`     | 文档更新 | `docs: 更新 README 文档`      |
| `style`    | 代码格式 | `style: 格式化代码`           |
| `refactor` | 重构     | `refactor: 优化搜索算法`      |
| `perf`     | 性能优化 | `perf: 减少首屏加载时间`      |
| `test`     | 测试相关 | `test: 添加单元测试`          |
| `chore`    | 其他修改 | `chore: 更新依赖版本`         |
| `build`    | 构建相关 | `build: 更新打包配置`         |
| `ci`       | CI 相关  | `ci: 添加 GitHub Actions`     |
| `revert`   | 回滚     | `revert: 回滚上一次提交`      |

### 示例

✅ 正确的提交信息：

```bash
git commit -m "feat: 添加电影搜索功能"
git commit -m "fix(search): 修复搜索结果为空的问题"
git commit -m "docs: 更新 API 文档"
git commit -m "style: 统一代码缩进"
```

❌ 错误的提交信息：

```bash
git commit -m "更新代码"  # 缺少类型
git commit -m "feat 添加功能"  # 格式错误，缺少冒号
git commit -m "feat: "  # 缺少描述
```

## 跳过 Hooks

在特殊情况下，如果需要跳过 hooks：

```bash
# 跳过 pre-commit hook
git commit --no-verify -m "feat: 紧急修复"

# 或使用简写
git commit -n -m "feat: 紧急修复"
```

⚠️ **注意**: 应该尽量避免跳过 hooks，只在紧急情况下使用。

## 使用 czg 进行交互式提交（推荐）

项目配置了 `czg` 工具，提供友好的交互式提交界面。

### 使用方法

```bash
# 1. 添加文件到暂存区
git add .

# 2. 使用交互式提交
pnpm commit
# 或
npx czg
```

### 交互流程

1. **选择提交类型** - 使用方向键选择，回车确认
2. **选择影响范围**（可选） - 选择预定义范围或输入自定义范围
3. **填写简短描述** - 描述本次提交的主要内容
4. **填写详细描述**（可选） - 提供更多上下文信息
5. **确认提交** - 检查生成的提交信息并确认

### 预定义的范围

- `components` - 组件相关
- `pages` - 页面相关
- `utils` - 工具相关
- `styles` - 样式相关
- `deps` - 依赖相关
- `config` - 配置相关
- `other` - 其他修改

### 快捷别名

```bash
# 快速修复文档错别字
pnpm commit fd
# 等同于 git commit -m "docs: fix typos"
```

## 手动提交 vs 交互式提交

### 手动提交（传统方式）

```bash
git commit -m "feat: 添加电影搜索功能"
git commit -m "fix(search): 修复搜索结果为空的问题"
git commit -m "docs: 更新 API 文档"
git commit -m "style: 统一代码缩进"
```

## 故障排除

### 1. Hooks 没有执行

确保 husky 已正确安装：

```

```
