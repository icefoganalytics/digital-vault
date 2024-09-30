<script setup lang="ts">
import { RouterView } from "vue-router"
import AdminVerticalSidebar from "./default/vertical/AdminVerticalSidebar.vue"
import VerticalHeader from "./default/vertical/VerticalHeader.vue"
import RightSidebar from "@/components/RightSidebar.vue"

import { useInterfaceStore } from "@/store/interface"

const customizer = useInterfaceStore()
</script>

<template>
  <v-app
    :theme="customizer.actTheme"
    :class="[
      customizer.actTheme,
      false ? 'mini-sidebar' : '',
      false ? 'horizontalLayout' : 'verticalLayout',
      customizer.setBorderCard ? 'cardBordered' : '',
      customizer.inputBg ? 'inputWithbg' : '',
    ]"
  >
    <VerticalHeader />
    <AdminVerticalSidebar />
    <RightSidebar />
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
