<script setup lang="ts">
import { ref, watch, computed } from "vue"

import { useInterfaceStore } from "@/store/interface"

/* import { GridDotsIcon, LanguageIcon, SearchIcon, Menu2Icon, BellRingingIcon, ShoppingCartIcon } from 'vue-tabler-icons'; */
import Logo from "../../logo/Logo.vue"
// dropdown imports
import NotificationMenu from "@/layouts/default/NotificationMenu.vue"
import ProfileDD from "../ProfileDD.vue"
/* import Navigations from "../Navigations.vue" */
import Searchbar from "../Searchbar.vue"

const customizer = useInterfaceStore()

const showSearch = ref(false)
const drawer = ref(false)
const appsdrawer = ref(false)
const priority = ref(customizer.setHorizontalLayout ? 0 : 0)

import { IconMenu2 } from "@tabler/icons-vue"

function searchbox() {
  showSearch.value = !showSearch.value
}
watch(priority, (newPriority) => {
  // yes, console.log() is a side effect
  priority.value = newPriority
})
</script>

<template>
  <v-app-bar
    elevation="10"
    :priority="priority"
    height="64"
    class="horizontal-header"
    color="primary"
  >
    <div
      :class="
        customizer.boxed ? 'maxWidth v-toolbar__content px-lg-0 px-4' : 'v-toolbar__content px-6'
      "
    >
      <div>
        <Logo />
      </div>

      <v-btn
        class="hidden-md-and-up"
        icon
        variant="text"
        @click.stop="customizer.SET_SIDEBAR_DRAWER"
        size="small"
      >
        <IconMenu2 :aria-setsize="25" />
      </v-btn>

      <!-- search mobile -->
      <!-- <v-btn
        class="hidden-lg-and-up ml-3"
        icon
        rounded="sm"
        variant="flat"
        size="small"
        @click="searchbox"
      >
        <IconSearch :size="25" />
      </v-btn> -->

      <!-- ------------------------------------------------>
      <!-- Search part -->
      <!-- ------------------------------------------------>

      <Searchbar />

      <!---/Search part -->
      <v-spacer />
      <!-- ---------------------------------------------- -->
      <!---right part -->
      <!-- ---------------------------------------------- -->

      <!-- ---------------------------------------------- -->
      <!-- Notification -->
      <!-- ---------------------------------------------- -->

      <NotificationMenu />

      <!-- ---------------------------------------------- -->
      <!-- User Profile -->
      <!-- ---------------------------------------------- -->
      <div class="ml-3">
        <ProfileDD />
      </div>
    </div>
  </v-app-bar>

  <v-navigation-drawer
    v-model="appsdrawer"
    location="right"
    temporary
  >
  </v-navigation-drawer>
</template>
