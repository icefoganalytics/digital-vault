<script setup lang="ts">
import { ref, watch } from "vue"
import { RouteLocationRaw } from "vue-router"
import {
  IconClock,
  IconLayoutColumns,
  IconLayoutNavbar,
  IconMail,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-vue"
import { useAuth0 } from "@auth0/auth0-vue"

import router from "@/router"
import { useInterfaceStore } from "@/store/interface"
import useCurrentUser from "@/use/use-current-user"
import useStatus from "@/use/use-status"

const { logout, user } = useAuth0()
const { currentUser, reset: resetCurrentUser } = useCurrentUser()
const customizer = useInterfaceStore()
const ddVisible = ref(false)

const currentLayout = ref(customizer.setHorizontalLayout)

watch(currentLayout, (val: boolean) => {
  customizer.SET_LAYOUT(val)
})

const { releaseTag } = useStatus()

function navigateAndClose(to: RouteLocationRaw) {
  router.push(to)
  ddVisible.value = false
}

function signOut() {
  resetCurrentUser()

  const returnTo = encodeURI(window.location.origin + "/sign-in")
  return logout({ logoutParams: { returnTo } })
}
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
  <v-menu
    v-model="ddVisible"
    :close-on-content-click="false"
    class="profile_popup"
  >
    <template #activator="{ props }">
      <v-btn
        class="custom-hover-primary ml-2"
        variant="text"
        v-bind="props"
        icon
        @click="ddVisible = true"
      >
        <v-avatar size="35">
          <img
            :src="user?.picture"
            width="35"
            alt="Julia"
          />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet
      v-if="currentUser"
      rounded="md"
      width="360"
      elevation="11"
    >
      <div class="px-8 pt-3">
        <!-- <h6 class="text-h5 font-weight-medium">User Profile</h6> -->
        <div class="d-flex align-center mt-4 pb-6">
          <div>
            <h6 class="text-h6 mb-n1">{{ currentUser.displayName }}</h6>
            <span class="text-subtitle-1 font-weight-regular textSecondary">{{
              currentUser.title
            }}</span>
            <div class="d-flex align-center mt-2">
              <IconMail
                :size="18"
                :stroke-width="1.5"
              />

              <span class="text-subtitle-1 font-weight-regular textSecondary ml-2">{{
                user?.email
              }}</span>
            </div>
          </div>
        </div>
        <v-divider></v-divider>
      </div>
      <!--  <perfect-scrollbar style="height: calc(100vh - 240px); max-height: 240px"> -->
      <v-list
        class="py-0 theme-list"
        lines="two"
      >
        <v-list-item
          class="py-4 px-8 custom-text-primary"
          @click="navigateAndClose('/profile')"
        >
          <template #prepend>
            <v-avatar color="info">
              <IconUserCircle></IconUserCircle>
            </v-avatar>
          </template>
          <div>
            <h6 class="text-subtitle-1 font-weight-semibold mb-2 custom-title">My Profile</h6>
          </div>
          <p class="text-subtitle-1 font-weight-regular textSecondary">Manage your information</p>
        </v-list-item>

        <v-list-item
          class="py-4 px-8 custom-text-primary"
          @click="navigateAndClose('/administration')"
        >
          <template #prepend>
            <v-avatar color="warning">
              <IconSettings></IconSettings>
            </v-avatar>
          </template>
          <div>
            <h6 class="text-subtitle-1 font-weight-semibold mb-2 custom-title">
              Vault Administration
            </h6>
          </div>
          <p class="text-subtitle-1 font-weight-regular textSecondary">Manage this application</p>
        </v-list-item>
        <v-list-item
          class="py-4 px-8 custom-text-primary"
          @click="navigateAndClose({ name: 'StatusPage' })"
        >
          <template #prepend>
            <v-avatar color="secondary">
              <IconClock />
            </v-avatar>
          </template>
          <div>
            <h6 class="text-subtitle-1 font-weight-semibold mb-2 custom-title">Version</h6>
          </div>
          <p class="text-subtitle-1 font-weight-regular textSecondary">
            {{ releaseTag || "2024.08.29" }}
          </p>
        </v-list-item>
      </v-list>

      <div class="pa-6 d-none">
        <h6 class="text-h6 mb-2">Layout</h6>
        <v-btn-toggle
          v-model="currentLayout"
          class="my-2 btn-group-custom gap-3"
          rounded="0"
        >
          <v-btn
            :value="false"
            variant="text"
            elevation="9"
            class="rounded-md"
          >
            <IconLayoutColumns
              :stroke-width="1.5"
              :size="21"
              class="mr-2"
            />
            Vertical
          </v-btn>
          <v-btn
            :value="true"
            variant="text"
            elevation="9"
            class="rounded-md"
          >
            <IconLayoutNavbar
              :stroke-width="1.5"
              :size="21"
              class="mr-2"
            />
            Horizontal
          </v-btn>
        </v-btn-toggle>
      </div>

      <div class="pt-4 pb-6 px-8 text-center">
        <v-btn
          color="primary"
          variant="outlined"
          block
          @click="signOut"
          >Logout</v-btn
        >
      </div>
      <!-- </perfect-scrollbar> -->
    </v-sheet>
  </v-menu>
</template>
