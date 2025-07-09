// TMDB API 部门字段的中文映射
const departmentMap: Record<string, string> = {
  Directing: '导演',
  Writing: '编剧',
  Production: '制片',
  Sound: '音效',
  Art: '美术',
  Camera: '摄影',
  Editing: '剪辑',
  'Costume & Make-Up': '服装与化妆',
  'Visual Effects': '视觉特效',
  Lighting: '灯光',
  Acting: '演员',
  Crew: '剧组',
  Creator: '创作',
  Actors: '演员',
  'Costume Design': '服装设计',
  'Makeup Artist': '化妆师',
  Executive: '执行制片',
  'Sound Design': '音效设计',
  Music: '音乐',
}

/**
 * 将 TMDB API 返回的部门英文名转换为中文
 * @param department 部门英文名
 * @returns 部门中文名，如果没有对应的翻译则返回原英文名
 */
export const translateDepartment = (department: string): string => {
  return departmentMap[department] || department
}
