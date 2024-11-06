<template>
  <CategoryForm :category-id="categoryId" />
</template>

<script setup lang="ts">
import { ref } from "vue"

import useBreadcrumbs from "@/use/use-breadcrumbs"

import CategoryForm from "@/components/categories/CategoryForm.vue"

const categoryId = ref(null)

useBreadcrumbs([
  {
    title: "Categories",
    to: {
      name: "administration/CategoryListPage",
    },
  },
  {
    title: "New",
    to: {
      name: "administration/CategoryNewPage",
    },
  },
])
</script>
