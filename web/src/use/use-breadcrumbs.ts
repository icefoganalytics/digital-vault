import { isUndefined } from "lodash"
import { reactive, toRefs } from "vue"
import { RouteLocationRaw } from "vue-router"

export type Breadcrumb = {
  title: string
  disabled?: boolean
  exact?: boolean
  to: RouteLocationRaw
}

const BASE_CRUMB = {
  title: "Dashboard",
  disabled: false,
  to: {
    name: "DashboardPage",
  },
}

// Global state for breadcrumbs
const state = reactive<{
  breadcrumbs: Breadcrumb[]
}>({
  breadcrumbs: [],
})

export function useBreadcrumbs(breadcrumbs?: Breadcrumb[]) {
  if (!isUndefined(breadcrumbs)) {
    state.breadcrumbs = [BASE_CRUMB, ...breadcrumbs]
  }

  return {
    ...toRefs(state),
    update: useBreadcrumbs,
  }
}

export default useBreadcrumbs
