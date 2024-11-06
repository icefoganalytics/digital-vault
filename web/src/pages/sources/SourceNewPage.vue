<template>
  <h1>Add a Source</h1>
  <SourceForm :source-id="sourceId" />
</template>

<script setup lang="ts">
import useBreadcrumbs from "@/use/use-breadcrumbs"
import SourceForm from "@/components/sources/SourceForm.vue"
import { ref } from "vue"

const sourceId = ref(null)

useBreadcrumbs([
  {
    title: "Sources",
    to: {
      name: "administration/SourceListPage",
    },
  },
  {
    title: "New Source",
    to: {
      name: "administration/SourceNewPage",
    },
  },
])
</script>
