<template>
  <CategoryForm :category-id="props.categoryId" />
</template>

<script setup lang="ts">
import useBreadcrumbs from "@/use/use-breadcrumbs"
import CategoryForm from "@/components/categories/CategoryForm.vue";

const props = defineProps<{
  categoryId: string
}>()

useBreadcrumbs([
  {
    title: "Categories",
    to: {
      name: "administration/CategoryListPage",
    },
  },
  {
    title: "Edit",
    to: {
      name: "administration/CategoryEditPage",
    },
  },
])
</script>
