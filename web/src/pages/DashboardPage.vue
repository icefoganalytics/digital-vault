<template>
  <h2>Dashboard</h2>

  <v-card>
    <v-card-text>
      <p>Welcome to the dashboard!</p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import useBreadcrumbs from "@/use/use-breadcrumbs"

useBreadcrumbs([
  {
    title: "Dashboard",
    to: { name: "DashboardPage" },
  },
])
</script>
