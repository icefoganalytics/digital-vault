<template>
  <ArchiveItemNewForm />
</template>

<script setup lang="ts">
import useBreadcrumbs from "@/use/use-breadcrumbs"
import ArchiveItemNewForm from "../../components/archive-item/ArchiveItemNewForm.vue"

useBreadcrumbs([
  {
    title: "Archive Items",
    to: {
      name: "archive-item/ArchiveItemListPage",
    },
  },
  {
    title: "New Archive Item",
    to: {
      name: "archive-item/ArchiveItemNewPage",
    },
  },
])
</script>
