import archiveItemsApi, {
  ArchiveItem,
  ArchiveItemFiltersOptions,
  ArchiveItemWhereOptions,
} from "@/api/archive-items-api"
import { reactive, toRefs } from "vue"

// Global state for breadcrumbs
const state = reactive<{
  items: ArchiveItem[]
  totalCount: number
  isLoading: boolean
  isErrored: boolean
}>({
  items: [],
  totalCount: 0,
  isLoading: false,
  isErrored: false,
})

export function useArchiveItems() {
  // state.breadcrumbs = [BASE_CRUMB, ...breadcrumbs]

  async function list(
    params: {
      where?: ArchiveItemWhereOptions
      filters?: ArchiveItemFiltersOptions
      page?: number
      perPage?: number
    } = {}
  ): Promise<void> {
    state.isLoading = true
    try {
      const { archiveItems, totalCount } = await archiveItemsApi.list(params)
      state.isErrored = false
      state.items = archiveItems
      state.totalCount = totalCount
    } catch (error) {
      console.error("Failed to fetch status:", error)
      state.isErrored = true
      throw error
    } finally {
      state.isLoading = false
    }
  }

  return {
    ...toRefs(state),
    list,
  }
}

export default useArchiveItems
