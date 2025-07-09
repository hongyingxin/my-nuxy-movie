# 常量模块

这个文件夹包含了项目中使用的各种常量定义，用于统一管理和维护重复使用的数据。

## 文件结构

```
constants/
├── index.ts          # 统一导出入口
├── regions.ts        # 地区相关常量
├── releaseTypes.ts   # 上映类型相关常量
├── languages.ts      # 语言相关常量
├── sortOptions.ts    # 排序选项相关常量
└── README.md         # 说明文档
```

## 模块说明

### regions.ts - 地区常量

- `REGION_NAMES`: 地区代码到中文名称的映射
- `REGION_OPTIONS`: 地区选项列表，用于下拉选择框
- `getRegionName(code)`: 获取地区名称的工具函数

### releaseTypes.ts - 上映类型常量

- `RELEASE_TYPE_NAMES`: 上映类型代码到中文名称的映射
- `RELEASE_TYPE_OPTIONS`: 上映类型选项列表，用于下拉选择框
- `getReleaseTypeName(code)`: 获取上映类型名称的工具函数
- `THEATRICAL_RELEASE_TYPES`: 影院上映类型代码数组
- `isTheatricalRelease(code)`: 检查是否为影院上映类型的工具函数

### languages.ts - 语言常量

- `LANGUAGE_NAMES`: 语言代码到中文名称的映射
- `LANGUAGE_OPTIONS`: 语言选项列表，用于下拉选择框
- `getLanguageName(code)`: 获取语言名称的工具函数

### sortOptions.ts - 排序选项常量

- `MOVIE_SORT_OPTIONS`: 电影排序选项列表
- `TV_SORT_OPTIONS`: 电视剧排序选项列表
- `getSortOptions(mediaType)`: 根据媒体类型获取排序选项的工具函数
- `getSortOptionByValue(value, mediaType)`: 根据排序值获取排序选项的工具函数

## 使用方式

```typescript
// 导入所有常量
import {
  REGION_OPTIONS,
  RELEASE_TYPE_OPTIONS,
  LANGUAGE_OPTIONS,
  MOVIE_SORT_OPTIONS,
  TV_SORT_OPTIONS,
} from '~/constants'

// 导入工具函数
import {
  getRegionName,
  getReleaseTypeName,
  isTheatricalRelease,
  getSortOptions,
  getSortOptionByValue,
} from '~/constants'

// 使用示例
const regionName = getRegionName('US') // 返回: '美国'
const releaseTypeName = getReleaseTypeName('2|3') // 返回: '影院上映'
const isTheatrical = isTheatricalRelease('2|3') // 返回: true
const movieSortOptions = getSortOptions('movie') // 返回: 电影排序选项数组
const sortOption = getSortOptionByValue('popularity.desc', 'movie') // 返回: 排序选项对象
```

## 优势

1. **统一管理**: 所有常量集中在一个地方，便于维护
2. **类型安全**: 使用 TypeScript 提供类型检查
3. **可复用**: 避免在多个文件中重复定义相同的常量
4. **易于扩展**: 新增常量只需要在对应文件中添加即可
5. **文档化**: 每个常量都有清晰的注释说明

## 扩展指南

当需要添加新的常量时：

1. 在对应的文件中添加常量定义
2. 在 `index.ts` 中导出新常量
3. 更新此 README 文档
4. 在使用的组件中导入并使用
