<template>
  <ArchiveItemViewForm :archive-item-id="props.archiveItemId" />
</template>

<script setup lang="ts">
import useBreadcrumbs, { BASE_CRUMB } from "@/use/use-breadcrumbs"
import ArchiveItemViewForm from "@/components/archive-item/ArchiveItemViewForm.vue"

const props = defineProps<{
  archiveItemId: string
}>()

useBreadcrumbs("View Archive Item", [
  BASE_CRUMB,
  {
    title: "Archive Items",
    to: {
      name: "archive-item/ArchiveItemListPage",
    },
  },
])
</script>
