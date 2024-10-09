<template>
  <v-breadcrumbs
    :items="breadcrumbsWithExactTrueByDefault"
    large
  >
    <template #divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts">
export { type Breadcrumb } from "@/use/use-breadcrumbs"
</script>

<script lang="ts" setup>
import { computed } from "vue"

import useBreadcrumbs from "@/use/use-breadcrumbs"

const { breadcrumbs } = useBreadcrumbs()

// Changes https://vuetifyjs.com/en/components/breadcrumbs/ default behavior.
// By default v-breadcrumbs will disable all crumbs up to the current page in a nested paths.
// You can prevent this behavior by using exact: true on each applicable breadcrumb in the items array.
const breadcrumbsWithExactTrueByDefault = computed(() =>
  breadcrumbs.value.map((item) => ({
    ...item,
    exact: item.exact ?? true,
  }))
)
</script>
