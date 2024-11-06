<template>
  <h1>Add a Retention</h1>
  <RetentionForm :retention-id="retentionId" />
</template>

<script setup lang="ts">
import useBreadcrumbs from "@/use/use-breadcrumbs"
import { ref } from "vue"
import RetentionForm from "@/components/retentions/RetentionForm.vue"

const retentionId = ref(null)

useBreadcrumbs([
  {
    title: "Retentions",
    to: {
      name: "administration/RetentionListPage",
    },
  },
  {
    title: "New Retention",
    to: {
      name: "administration/RetentionNewPage",
    },
  },
])
</script>
