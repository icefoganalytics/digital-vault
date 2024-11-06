<template>
  <SourceNewButton />

  <v-text-field v-model="search" />

  <v-data-table-server
    v-model:items-per-page="perPage"
    :search="search"
    :items="items"
    :items-length="totalCount"
    :page="page"
    :loading="isLoading"
    :headers="headers"
    @update:options="loadItems"
    @click:row="openItem"
  ></v-data-table-server>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useRouteQuery } from "@vueuse/router"

import useBreadcrumbs from "@/use/use-breadcrumbs"
import useSources from "@/use/use-sources"
import { Source } from "@/api/sources-api"

import SourceNewButton from "@/components/sources/SourceNewButton.vue"

const router = useRouter()
const { isLoading, items, list, totalCount } = useSources()

onMounted(async () => {
  await loadItems()
})

const search = ref()
const page = useRouteQuery("page", "1", { transform: Number })
const perPage = useRouteQuery("perPage", "10", { transform: Number })

const headers = [
  { title: "Name", value: "name" },
  { title: "Contact", value: "contactEmail" },
  { title: "Redirects", value: "redirects.length" },
  { title: "Referrers", value: "referrers.length" },
]

useBreadcrumbs([
  {
    title: "Sources",
    to: {
      name: "administration/SourceListPage",
    },
  },
])

async function loadItems() {
  list({ filters: { search: search.value }, page: page.value, perPage: perPage.value })
}
function openItem(_event: PointerEvent, { item }: { item: Source }) {
  router.push({ name: "administration/SourceEditPage", params: { sourceId: item.id } })
}
</script>
