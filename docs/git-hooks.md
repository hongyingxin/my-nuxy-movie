# Git Hooks 配置指南

本项目使用 Git hooks 来确保代码质量和提交规范。

## 概述

项目使用以下工具：

- **husky**: Git hooks 管理工具
- **lint-staged**: 只对暂存区的文件运行检查
- **commitlint**: 提交信息格式验证（自定义实现）

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

## 故障排除

### 1. Hooks 没有执行

确保 husky 已正确安装：

```bash
pnpm prepare
```

### 2. 权限问题

如果遇到权限错误：

```bash
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

### 3. lint-staged 运行失败

检查配置文件：

```bash
cat .lintstagedrc.json
```

确保所有工具都已安装：

```bash
pnpm install
```

## 最佳实践

1. **频繁提交**: 小而频繁的提交更容易管理
2. **有意义的提交信息**: 清晰描述做了什么改动
3. **运行测试**: 在提交前本地运行 `pnpm check`
4. **不要跳过 hooks**: 除非真的有紧急情况

## 团队协作

1. 所有团队成员都应该了解提交规范
2. Code Review 时检查提交信息质量
3. 定期更新 hooks 配置以适应项目需求
