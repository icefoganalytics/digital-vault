<template>
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

import useArchiveItems from "@/use/use-archive-items"
import useBreadcrumbs from "@/use/use-breadcrumbs"
import { ArchiveItem } from "@/api/archive-items-api"

const router = useRouter()
const { isLoading, items, totalCount, list } = useArchiveItems()

onMounted(async () => {
  await loadItems()
})

const search = ref()
const page = useRouteQuery("page", "1", { transform: Number })
const perPage = useRouteQuery("perPage", "10", { transform: Number })

const headers = [
  { title: "Title", value: "title" },
  { title: "Description", value: "description" },
]

useBreadcrumbs([
  {
    title: "Archive Items",
    to: {
      name: "administration/CategoryListPage",
    },
  },
])

async function loadItems() {
  list({ filters: { search: search.value }, page: page.value, perPage: perPage.value })
}
function openItem(_event: PointerEvent, { item }: { item: ArchiveItem }) {
  router.push({ name: "archive-item/ArchiveItemViewPage", params: { archiveItemId: item.id } })
}
</script>
