<script setup lang="ts">
import { ref, shallowRef } from "vue"
import sidebarItems from "../sidebarItem"

import { IconPower } from "@tabler/icons-vue"

import NavGroup from "./NavGroup.vue"
import NavItem from "./NavItem.vue"
import NavCollapse from "./NavCollapse.vue"
import Logo from "../../logo/Logo.vue"

const sidebarMenu = shallowRef(sidebarItems)

import { useInterfaceStore } from "@/store/interface"
const customizer = useInterfaceStore()

import { useAuth0 } from "@auth0/auth0-vue"
const auth = useAuth0()
</script>

<template>
  <v-navigation-drawer
    left
    v-model="customizer.Sidebar_drawer"
    elevation="0"
    rail-width="75"
    :mobile-breakpoint="960"
    app
    class="leftSidebar"
    :rail="customizer.mini_sidebar"
    expand-on-hover
    width="256"
    :temporary="customizer.setHorizontalLayout"
    :disable-resize-watcher="true"
  >
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">
      <v-list class="py-6 px-4">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenu">
          <!---Item Sub Header -->
          <NavGroup
            :item="item"
            v-if="item.header"
            :key="item.title"
          />
          <!---If Has Child -->
          <NavCollapse
            class="leftPadding"
            :item="item"
            :level="0"
            v-else-if="item.children"
          />
          <!---Single Item-->
          <NavItem
            :item="item"
            v-else
            class="leftPadding"
          />
          <!---End Single Item-->
        </template>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
