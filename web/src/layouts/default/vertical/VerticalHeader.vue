<script setup lang="ts">
import { ref, watch } from "vue"

import NotificationMenu from "@/layouts/default/NotificationMenu.vue"
import ProfileDD from "../ProfileDD.vue"
import Searchbar from "../Searchbar.vue"
import Logo from "../../logo/Logo.vue"

const priority = ref(0)

watch(priority, (newPriority) => {
  priority.value = newPriority
})
</script>

<template>
  <v-app-bar
    id="top"
    elevation="5"
    :priority="priority"
    height="64"
    color="primary"
  >
    <div class="pt2">
      <Logo />
    </div>
    <!-- 
    <v-btn
      class="hidden-md-and-down"
      icon
      color="primary"
      variant="text"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
    >
      <IconMenu2 :size="25" />
    </v-btn>
    <v-btn
      class="hidden-lg-and-up"
      icon
      variant="text"
      size="small"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
    >
      <IconMenu2 :size="25" />
    </v-btn> -->

    <v-spacer />

    <Searchbar />

    <NotificationMenu />
    
    <ProfileDD />
  </v-app-bar>
</template>
