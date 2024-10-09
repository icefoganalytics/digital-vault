<template>
  <h2>Administration Dashboard</h2>

  <v-card>
    <v-card-text>
      <p>Welcome to the Administration Dashboard!</p>

      <v-list>
        <v-list-item
          title="All Users"
          :to="{ name: 'users/UsersPage' }"
          prepend-icon="mdi-account-group"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import useBreadcrumbs from "@/use/use-breadcrumbs"

useBreadcrumbs([
  {
    title: "Administration Dashboard",
    to: { name: "administration/DashboardPage" },
  },
])
</script>
