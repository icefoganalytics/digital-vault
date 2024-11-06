<template>
  <LeftSidebarNavigationDrawer v-model="showDrawer" />

  <v-app-bar>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

    <v-app-bar-title
      ><span
        class="cursor-pointer"
        @click="goToDashboard"
        >Digital Vault</span
      ></v-app-bar-title
    >

    <KebabMenu />
  </v-app-bar>

  <v-main>
    <div style="background-color: #00000011;">
      <v-container class="py-0">
        <SimpleBreadcrumbs />
      </v-container>
    </div>

    <v-container>
      <router-view />
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useDisplay } from "vuetify"

import SimpleBreadcrumbs from "@/components/common/SimpleBreadcrumbs.vue"
import KebabMenu from "@/components/default-layout/KebabMenu.vue"
import LeftSidebarNavigationDrawer from "@/components/default-layout/LeftSidebarNavigationDrawer.vue"

const { lgAndUp } = useDisplay()

const showDrawer = ref(lgAndUp.value)

function toggleDrawer() {
  showDrawer.value = !showDrawer.value
}

const router = useRouter()

function goToDashboard() {
  return router.push({ name: "DashboardPage" })
}
</script>
