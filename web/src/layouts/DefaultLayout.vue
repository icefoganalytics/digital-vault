<script setup lang="ts">
import { RouterView } from "vue-router"
//import VerticalSidebarVue from "./default/vertical/VerticalSidebar.vue"
import VerticalHeaderVue from "./default/vertical/VerticalHeader.vue"
//import HorizontalHeader from "./default/horizontal/HorizontalHeader.vue"
//import HorizontalSidebar from "./default/horizontal/HorizontalSidebar.vue"

import { useInterfaceStore } from "@/store/interface"

const customizer = useInterfaceStore()
</script>

<template>
  <v-app
    :theme="customizer.actTheme"
    :class="[
      customizer.actTheme,
      customizer.mini_sidebar ? 'mini-sidebar' : '',
      customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
      customizer.setBorderCard ? 'cardBordered' : '',
      customizer.inputBg ? 'inputWithbg' : '',
    ]"
  >
    <VerticalHeaderVue />
    <!-- <VerticalSidebarVue /> -->
    <!-- <HorizontalHeader v-if="customizer.setHorizontalLayout" /> -->
    <!--   <HorizontalSidebar v-if="customizer.setHorizontalLayout" /> -->

    <v-main>
      <v-container
        fluid
        class="page-wrapper pb-sm-15 pb-10"
      >
        <div :class="customizer.boxed ? 'maxWidth' : ''">
          <RouterView />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
