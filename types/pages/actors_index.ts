import type { PersonPaginatedResponse } from '~/types/apiType'
import type { FetchError } from 'ofetch'

export interface ActorsIndexPageProps {
  // 分页相关
  currentPage: number

  // 数据相关
  actors: {
    data: Ref<PersonPaginatedResponse | null>
    pending: Ref<boolean>
    error: Ref<FetchError<PersonPaginatedResponse> | null>
  }
}
