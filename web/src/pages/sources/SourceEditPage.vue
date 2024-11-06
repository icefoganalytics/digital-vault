<template>
  <h1>Source Edit</h1>
  <SourceForm :source-id="props.sourceId" />
</template>

<script setup lang="ts">
import useBreadcrumbs from "@/use/use-breadcrumbs"
import SourceForm from "@/components/sources/SourceForm.vue"

const props = defineProps<{
  sourceId: string
}>()

useBreadcrumbs([
  {
    title: "Sources",
    to: {
      name: "administration/SourceListPage",
    },
  },
  {
    title: "Edit",
    to: {
      name: "administration/SourceEditPage",
    },
  },
])
</script>
