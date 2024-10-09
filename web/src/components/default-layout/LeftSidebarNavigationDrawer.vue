<template>
  <v-navigation-drawer v-model="showDrawer">
    <v-list v-model:opened="open">
      <v-list-item title="Digital Vault"></v-list-item>
      <v-divider></v-divider>
      <v-list-item
        :to="{ name: 'DashboardPage' }"
        title="Home"
        prepend-icon="mdi-home"
      />
      <v-list-item
        :to="{ name: 'ProfilePage' }"
        :title="username"
        prepend-icon="mdi-account"
      />

      <v-list-group
        v-if="isSystemAdmin"
        value="Administration"
      >
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            title="Administration"
            prepend-icon="mdi-cog-outline"
          />
        </template>

        <v-list-item
          title="Dashboard"
          :to="{ name: 'administration/DashboardPage' }"
          prepend-icon="mdi-home"
        />
        <v-list-item
          :to="{ name: 'users/UsersPage' }"
          title="All Users"
          prepend-icon="mdi-account-circle"
        />
        <v-list-item
          :to="{ name: 'users/UserNewPage' }"
          title="Add User"
          prepend-icon="mdi-account-plus"
        />
      </v-list-group>

      <v-list-item
        :title="releaseTag || 'loading...'"
        :to="{ name: 'StatusPage' }"
        prepend-icon="mdi-clock"
      />
      <v-list-item
        title="Sign out"
        prepend-icon="mdi-exit-run"
        @click="logoutWrapper"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useAuth0 } from "@auth0/auth0-vue"

import useCurrentUser from "@/use/use-current-user"
import useStatus from "@/use/use-status"

const showDrawer = defineModel<boolean>({
  default: false,
})
const open = ref([])

const { logout } = useAuth0()

const { currentUser, isSystemAdmin } = useCurrentUser()

const username = computed(() => {
  if (currentUser.value === null) return "loading..."

  const { displayName } = currentUser.value
  return displayName
})

const { releaseTag } = useStatus()

async function logoutWrapper() {
  await logout({
    logoutParams: {
      // I would prefer to redirect to /sign-in here, but that doesn't seem to work?
      returnTo: window.location.origin,
    },
  })
}
</script>
