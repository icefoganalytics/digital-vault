<template>
  <ArchiveItemViewForm :archive-item-id="props.archiveItemId" />
</template>

<script setup lang="ts">
import useBreadcrumbs from "@/use/use-breadcrumbs"
import ArchiveItemViewForm from "@/components/archive-item/ArchiveItemViewForm.vue"

const props = defineProps<{
  archiveItemId: string
}>()

useBreadcrumbs([
  {
    title: "Archive Items",
    to: {
      name: "archive-item/ArchiveItemListPage",
    },
  },
  {
    title: "View Archive Item",
    to: {
      name: "archive-item/ArchiveItemViewPage",
    },
  },
])
</script>
