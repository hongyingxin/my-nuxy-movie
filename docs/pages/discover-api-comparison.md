# TMDB Discover API 筛选条件对比

## 概述

TMDB提供了两个discover API端点：
- **电影**: `https://api.themoviedb.org/3/discover/movie`
- **电视剧**: `https://api.themoviedb.org/3/discover/tv`

这两个API都支持超过30种筛选和排序选项，但有一些参数是各自特有的。

## 筛选条件对比

### 🔄 共同支持的筛选条件

| 参数 | 类型 | 描述 | 示例 |
|------|------|------|------|
| `page` | number | 页码 | `1` |
| `sort_by` | string | 排序方式 | `popularity.desc` |
| `with_genres` | string | 包含的分类ID | `28,12` |
| `without_genres` | string | 排除的分类ID | `16,35` |
| `vote_average.gte` | number | 最低评分 | `7.0` |
| `vote_average.lte` | number | 最高评分 | `9.0` |
| `vote_count.gte` | number | 最少投票数 | `100` |
| `with_original_language` | string | 原始语言 | `zh`, `en` |
| `with_keywords` | string | 包含关键词ID | `123,456` |
| `without_keywords` | string | 排除关键词ID | `789` |
| `with_companies` | string | 制作公司ID | `420,19551` |
| `with_people` | string | 演职人员ID | `123,456` |
| `include_adult` | boolean | 包含成人内容 | `false` |

### 🎬 电影专用筛选条件

| 参数 | 类型 | 描述 | 示例 |
|------|------|------|------|
| `primary_release_date.gte` | string | 首映日期开始 | `2023-01-01` |
| `primary_release_date.lte` | string | 首映日期结束 | `2023-12-31` |
| `region` | string | 地区代码 | `US`, `CN` |
| `with_runtime.gte` | number | 最短时长(分钟) | `90` |
| `with_runtime.lte` | number | 最长时长(分钟) | `180` |
| `certification_country` | string | 认证国家 | `US` |
| `certification` | string | 认证等级 | `PG-13` |
| `certification.gte` | string | 最低认证等级 | `PG` |
| `certification.lte` | string | 最高认证等级 | `R` |
| `include_video` | boolean | 包含视频 | `true` |
| `year` | number | 年份 | `2023` |

### 📺 电视剧专用筛选条件

| 参数 | 类型 | 描述 | 示例 |
|------|------|------|------|
| `first_air_date.gte` | string | 首播日期开始 | `2023-01-01` |
| `first_air_date.lte` | string | 首播日期结束 | `2023-12-31` |
| `with_origin_country` | string | 原产国 | `US`, `CN` |
| `with_networks` | string | 播出网络ID | `213,1024` |
| `with_status` | string | 播出状态 | `0` (Returning Series) |
| `with_type` | string | 节目类型 | `0` (Scripted) |
| `air_date.gte` | string | 播出日期开始 | `2023-01-01` |
| `air_date.lte` | string | 播出日期结束 | `2023-12-31` |

## 排序选项对比

### 电影排序选项

| 值 | 描述 |
|----|------|
| `popularity.asc` | 热度升序 |
| `popularity.desc` | 热度降序 |
| `release_date.asc` | 上映日期升序 |
| `release_date.desc` | 上映日期降序 |
| `revenue.asc` | 票房升序 |
| `revenue.desc` | 票房降序 |
| `primary_release_date.asc` | 首映日期升序 |
| `primary_release_date.desc` | 首映日期降序 |
| `original_title.asc` | 标题升序 |
| `original_title.desc` | 标题降序 |
| `vote_average.asc` | 评分升序 |
| `vote_average.desc` | 评分降序 |
| `vote_count.asc` | 投票数升序 |
| `vote_count.desc` | 投票数降序 |

### 电视剧排序选项

| 值 | 描述 |
|----|------|
| `popularity.asc` | 热度升序 |
| `popularity.desc` | 热度降序 |
| `first_air_date.asc` | 首播日期升序 |
| `first_air_date.desc` | 首播日期降序 |
| `name.asc` | 名称升序 |
| `name.desc` | 名称降序 |
| `vote_average.asc` | 评分升序 |
| `vote_average.desc` | 评分降序 |
| `vote_count.asc` | 投票数升序 |
| `vote_count.desc` | 投票数降序 |

## 电视剧状态值

| 值 | 状态 |
|----|------|
| `0` | Returning Series (正在播出) |
| `1` | Planned (计划中) |
| `2` | In Production (制作中) |
| `3` | Ended (已结束) |
| `4` | Cancelled (已取消) |
| `5` | Pilot (试播集) |

## 电视剧类型值

| 值 | 类型 |
|----|------|
| `0` | Scripted (剧本剧) |
| `1` | Documentary (纪录片) |
| `2` | News (新闻) |
| `3` | Reality (真人秀) |
| `4` | Talk Show (脱口秀) |
| `5` | Miniseries (迷你剧) |

## 使用示例

### 获取2023年评分7分以上的动作电影
```javascript
const params = {
  with_genres: '28', // 动作片
  'vote_average.gte': 7.0,
  'primary_release_date.gte': '2023-01-01',
  'primary_release_date.lte': '2023-12-31',
  sort_by: 'vote_average.desc'
}
```

### 获取正在播出的高分电视剧
```javascript
const params = {
  with_status: '0', // 正在播出
  'vote_average.gte': 8.0,
  'vote_count.gte': 100,
  sort_by: 'vote_average.desc'
}
```

### 获取特定语言的电影
```javascript
const params = {
  with_original_language: 'zh',
  sort_by: 'popularity.desc'
}
```

## 注意事项

1. **日期格式**: 所有日期参数使用 `YYYY-MM-DD` 格式
2. **ID列表**: 多个ID用逗号分隔，如 `28,12,16`
3. **AND/OR逻辑**: 某些参数支持逗号(AND)或管道符(OR)分隔
4. **分页**: 每页最多20个结果，最多500页
5. **地区限制**: 某些内容可能因地区限制而不可用

## 实现建议

1. **通用组件**: 可以创建通用的discover组件，根据类型动态调整筛选条件
2. **参数验证**: 在发送请求前验证参数的有效性
3. **缓存策略**: 对分类、公司等静态数据进行缓存
4. **错误处理**: 处理API限制和错误响应
5. **用户体验**: 提供筛选条件的实时预览和结果统计 