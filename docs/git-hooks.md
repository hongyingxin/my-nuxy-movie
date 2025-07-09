# Git Hooks 配置指南

本项目使用 Git hooks 来确保代码质量和提交规范。

## 概述

项目使用以下工具：

- **husky**: Git hooks 管理工具
- **lint-staged**: 只对暂存区的文件运行检查
- **czg + cz-git**: 交互式提交工具
- **自定义 commit-msg hook**: 提交信息格式验证

## 配置文件说明

### Git Hooks 相关

- `.husky/pre-commit` - pre-commit hook 脚本
- `.husky/commit-msg` - commit-msg hook 脚本
- `.lintstagedrc.json` - lint-staged 配置

### 提交工具相关

- `.czrc` - czg 入口配置，指向 cz-git 适配器
- `commitlint.config.cjs` - czg 详细配置和提交规范

## Pre-commit Hook

在提交代码前自动运行，检查和修复代码质量问题。

### 执行流程

1. **ESLint 检查和修复** - 对 `.js`, `.ts`, `.vue` 文件
2. **Stylelint 检查和修复** - 对 `.css`, `.scss`, `.vue` 文件
3. **Prettier 格式化** - 对所有支持的文件类型

## Commit-msg Hook

验证提交信息格式，支持带 emoji 代码和不带 emoji 的两种格式。

### 提交信息格式

```
[:emoji:] <type>(<scope>): <subject>
```

- **emoji**: emoji 代码（可选，如 `:sparkles:`）
- **type**: 提交类型（必填）
- **scope**: 影响范围（可选）
- **subject**: 简短描述（必填，最多 100 字符）

### 提交类型和对应 Emoji

| 类型       | 说明     | Emoji 代码           | 示例                                     |
| ---------- | -------- | -------------------- | ---------------------------------------- |
| `feat`     | 新功能   | `:sparkles:`         | `:sparkles: feat: 添加用户登录功能`      |
| `fix`      | 修复 bug | `:bug:`              | `:bug: fix(auth): 修复登录验证错误`      |
| `docs`     | 文档更新 | `:memo:`             | `:memo: docs: 更新 README 文档`          |
| `style`    | 代码格式 | `:lipstick:`         | `:lipstick: style: 格式化代码`           |
| `refactor` | 重构     | `:recycle:`          | `:recycle: refactor: 优化搜索算法`       |
| `perf`     | 性能优化 | `:zap:`              | `:zap: perf: 减少首屏加载时间`           |
| `test`     | 测试相关 | `:white_check_mark:` | `:white_check_mark: test: 添加单元测试`  |
| `build`    | 构建相关 | `:package:`          | `:package: build: 更新打包配置`          |
| `ci`       | CI 相关  | `:ferris_wheel:`     | `:ferris_wheel: ci: 添加 GitHub Actions` |
| `chore`    | 其他修改 | `:hammer:`           | `:hammer: chore: 更新依赖版本`           |
| `revert`   | 回滚     | `:rewind:`           | `:rewind: revert: 回滚上一次提交`        |

## 使用 czg 进行交互式提交（推荐）

### 安装的工具

- `czg` - 轻量级的 commitizen 替代品
- `cz-git` - czg 的适配器
- `husky` - Git hooks 管理
- `lint-staged` - 暂存文件检查

### 使用方法

```bash
# 1. 添加文件到暂存区
git add .

# 2. 使用交互式提交
pnpm commit
# 或直接使用
npx czg
```

### 交互流程

1. **选择提交类型**
   - 使用方向键选择，支持搜索
   - 显示中文描述和对应的 emoji

2. **选择影响范围**（可选）
   - 选择预定义范围或输入自定义范围
   - 可以跳过此步骤

3. **填写简短描述**
   - 描述本次提交的主要内容
   - 建议使用动词开头，如"添加"、"修复"、"更新"

4. **填写详细描述**（可选）
   - 提供更多上下文信息
   - 使用 "|" 符号换行

5. **列举重大变更**（可选）
   - 仅在有不兼容更改时填写

6. **关联 Issue**（可选）
   - 关联相关的 Issue 号

7. **确认提交**
   - 预览生成的提交信息
   - 确认后自动提交

### 预定义的范围

| 范围         | 描述           | 使用场景                 |
| ------------ | -------------- | ------------------------ |
| `components` | 组件相关       | Vue 组件的修改           |
| `pages`      | 页面相关       | 页面级别的修改           |
| `utils`      | 工具相关       | 工具函数、辅助方法       |
| `styles`     | 样式相关       | CSS、Tailwind 样式修改   |
| `deps`       | 依赖相关       | 依赖包的添加、更新、删除 |
| `config`     | 配置相关       | 配置文件的修改           |
| `hooks`      | Git hooks 相关 | Git hooks 配置修改       |
| `other`      | 其他修改       | 不属于以上分类的修改     |

### 快捷别名

```bash
# 快速修复文档错别字
pnpm commit fd
# 等同于 git commit -m "docs: fix typos"
```

## 手动提交 vs 交互式提交

### 交互式提交（推荐）

✅ **优点：**

- 中文界面，易于理解
- 自动生成规范的提交信息
- 支持 emoji，提交历史更直观
- 防止格式错误

```bash
# 使用交互式界面
pnpm commit
```

### 手动提交

✅ **适用场景：**

- 熟悉提交规范的开发者
- 快速提交简单修改
- CI/CD 环境

```bash
# 不带 emoji
git commit -m "feat: 添加电影搜索功能"
git commit -m "fix(search): 修复搜索结果为空的问题"

# 带 emoji（推荐）
git commit -m ":sparkles: feat: 添加电影搜索功能"
git commit -m ":bug: fix(search): 修复搜索结果为空的问题"
```

## 跳过 Hooks

在特殊情况下，如果需要跳过 hooks：

```bash
# 跳过 pre-commit hook
git commit --no-verify -m ":sparkles: feat: 紧急修复"

# 或使用简写
git commit -n -m ":sparkles: feat: 紧急修复"
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

### 3. czg 运行失败

检查配置文件：

```bash
cat .czrc
cat commitlint.config.cjs
```

确保所有工具都已安装：

```bash
pnpm install
```

### 4. 提交信息格式错误

如果手动提交时格式验证失败，请检查：

- 是否包含必需的 type
- 是否有冒号分隔符
- subject 是否为空
- emoji 代码格式是否正确（如 `:sparkles:`）

## 最佳实践

### 1. 提交频率

- **小而频繁**: 每个功能点一个提交
- **逻辑完整**: 确保提交包含完整的功能

### 2. 提交信息

- **简洁明了**: subject 控制在 50 字符以内
- **动词开头**: 使用"添加"、"修复"、"更新"等动词
- **现在时态**: 描述本次提交"做了什么"

### 3. 使用范围

- **准确分类**: 选择最贴切的范围
- **一致性**: 团队统一使用相同的范围命名

### 4. 团队协作

- **规范统一**: 所有成员使用相同的提交规范
- **工具统一**: 推荐都使用交互式提交
- **代码审查**: Review 时也要检查提交信息质量

## 配置自定义

如果需要修改配置，编辑 `commitlint.config.cjs` 文件：

```javascript
// 添加新的提交类型
types: [
  // ... 现有类型
  {
    value: 'init',
    name: 'init:     🎉  初始化项目',
    emoji: ':tada:',
  },
]

// 添加新的范围
scopes: [
  // ... 现有范围
  { name: 'api', description: 'API 相关' },
]
```

修改后重新运行 `pnpm commit` 即可看到变化。
