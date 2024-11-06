<template>
  <h2>Dashboard</h2>

  <v-card>
    <v-card-text>
      <p>Welcome to the dashboard!</p>
      <ArchiveItemNewButton />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import ArchiveItemNewButton from "@/components/archive-item/ArchiveItemNewButton.vue"
import useBreadcrumbs from "@/use/use-breadcrumbs"

useBreadcrumbs([])
</script>
