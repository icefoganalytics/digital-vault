<template>
  <RetentionForm :retention-id="props.retentionId" />
</template>

<script setup lang="ts">
import RetentionForm from "@/components/retentions/RetentionForm.vue"
import useBreadcrumbs from "@/use/use-breadcrumbs"

const props = defineProps<{
  retentionId: string
}>()

useBreadcrumbs([
  {
    title: "Retention",
    to: {
      name: "administration/RetentionListPage",
    },
  },
  {
    title: "Edit Retention",
    to: {
      name: "administration/RetentionNewPage",
    },
  },
])
</script>
