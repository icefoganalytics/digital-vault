<template>
  <v-skeleton-loader v-if="isNil(user)" />
  <v-container v-else>
    <h2 class="d-flex flex-column flex-md-row justify-space-between mb-3">
      <span>
        User Profile:
        <v-chip variant="outlined">
          {{ displayName }}
        </v-chip>
      </span>

      <div class="d-flex justify-space-between mt-4 mb-3 my-md-0">
        <v-btn
          color="primary"
          variant="outlined"
          :to="{ name: 'users/UsersPage' }"
        >
          Back
        </v-btn>
        <v-btn
          class="ml-md-3"
          title="Refresh"
          color="primary"
          append-icon="mdi-sync"
          @click="refresh"
        >
          Sync
        </v-btn>
      </div>
    </h2>

    <UserEditForm
      class="mt-10"
      :user-id="user.id"
      :cancel-button-options="{ to: { name: 'users/UsersPage' } }"
      @saved="refresh"
    />
  </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { isNil } from "lodash"

import useBreadcrumbs from "@/use/use-breadcrumbs"
import useUser from "@/use/use-user"

import UserEditForm from "@/components/users/UserEditForm.vue"

const props = defineProps<{
  userId: string
}>()

const userId = computed(() => parseInt(props.userId))
const { user, refresh } = useUser(userId)

const displayName = computed(() => {
  if (user.value === null) return "loading..."

  return user.value.displayName
})

useBreadcrumbs([
  {
    title: "All Users",
    to: { name: "users/UsersPage" },
  },
  {
    title: "User",
    to: {
      // TODO: set to non-edit user page, once it exists
      name: "users/UserEditPage",
      params: { userId: props.userId },
    },
  },
  {
    title: "Edit",
    to: {
      name: "users/UserEditPage",
      params: { userId: props.userId },
    },
  },
])
</script>
