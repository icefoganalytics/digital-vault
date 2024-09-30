<template>
  <Breadcrumbs
    title="Users"
    :breadcrumbs="breadcrumbs"
  />

  <v-card>
    <v-tabs
      color="primary"
      bg-color="#1e88e544"
    >
      <v-tab
        text="User Details"
        :to="{
          name: 'administration/users/UserDetailsPage',
          params: { userId },
        }"
        color="primary"
        slider-color="primary"
      >
      </v-tab>
      <v-tab
        :text="positionsTabText"
        :to="{
          name: 'administration/users/UserPositionsPage',
          params: { userId },
        }"
      />
      <v-tab
        :text="teamsTabText"
        :to="{
          name: 'administration/users/UserTeamsPage',
          params: { userId },
        }"
      />
      <v-tab
        text="Actions"
        :to="{
          name: 'administration/users/UserActionsPage',
          params: { userId },
        }"
      />
      <v-tab
        text="Grants"
        :to="{
          name: 'administration/users/UserGrantsPage',
          params: { userId },
        }"
      />
      <v-tab
        text="Authorities"
        :to="{
          name: 'administration/users/UserAuthoritiesPage',
          params: { userId },
        }"
      />
    </v-tabs>

    <router-view class="pa-5" />
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { isEmpty, isNil } from "lodash"

import useUser from "@/use/use-user"

import Breadcrumbs from "@/components/Breadcrumbs.vue"

const props = defineProps<{
  userId: string
}>()

const userId = computed(() => parseInt(props.userId))
const { user } = useUser(userId)

const positionsTabText = computed(() => {
  if (isNil(user.value) || isNil(user.value.positions) || isEmpty(user.value.positions)) {
    return "Positions"
  }

  return `Positions (${user.value.positions.length})`
})

const teamsTabText = computed(() => {
  if (isNil(user.value) || isNil(user.value.teams) || isEmpty(user.value.teams)) {
    return "Teams"
  }

  return `Teams (${user.value.teams.length})`
})

const breadcrumbs = computed(() => {
  const baseCrumbs = [
    { title: "Dashboard", to: { name: "AdministrationDashboard" } },
    { title: "Users", to: { name: "UsersPage" } },
  ]

  if (isNil(user.value))
    return [
      ...baseCrumbs,
      {
        title: "loading...",
        to: "",
        disabled: true,
      },
    ]

  return [
    ...baseCrumbs,
    {
      title: user.value.displayName || "Unknown",
      to: {
        name: "administration/users/UserDetailsPage",
        params: { userId: userId.value },
      },
    },
  ]
})
</script>

<style scoped>
.tab-windows .v-window-item {
  padding: 20px;
}
</style>
