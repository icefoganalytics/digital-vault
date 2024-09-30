<script setup lang="ts">
import { shallowRef } from "vue"
import { adminSidebarItems } from "../sidebarItem"

import NavGroup from "./NavGroup.vue"
import NavItem from "./NavItem.vue"

const sidebarMenu = shallowRef(adminSidebarItems)

import { useInterfaceStore } from "@/store/interface"
const customizer = useInterfaceStore()
</script>

<template>
  <v-navigation-drawer
    v-model="customizer.Sidebar_drawer"
    left
    elevation="0"
    rail-width="75"
    :mobile-breakpoint="960"
    app
    class="leftSidebar"
    :rail="customizer.mini_sidebar"
    expand-on-hover
    width="256"
  >
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">
      <v-list class="py-6 px-4">
        <!---Menu Loop -->
        <template
          v-for="(item, i) in sidebarMenu"
          :key="i"
        >
          <!---Item Sub Header -->
          <NavGroup
            v-if="item.header"
            :key="item.title"
            :item="item"
          />
          <!---Single Item-->
          <NavItem
            v-else
            :item="item"
            class="leftPadding"
          />
          <!---End Single Item-->
        </template>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
