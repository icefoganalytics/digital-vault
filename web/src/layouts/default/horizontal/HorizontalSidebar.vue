<script setup>
import { shallowRef } from "vue"
import { useDisplay } from "vuetify"
import { useInterfaceStore } from "@/store/interface"

import HorizontalItems from "@/layouts/default/horizontal/horizontalItems"

import NavCollapse from "@/layouts/default/horizontal/NavCollapse.vue"
import NavItem from "@/layouts/default/horizontal/NavItem.vue"
import VerticalSidebar from "@/layouts/default/vertical/VerticalSidebar.vue"

const customizer = useInterfaceStore()
const sidebarMenu = shallowRef(HorizontalItems)
const { mdAndUp } = useDisplay()
// function subIsActive(input: any) {
//     const paths = Array.isArray(input) ? input : [input];
//     return paths.some((path) => {
//         return; //$route.path.indexOf(path) === 0; // current path starts with this path string
//     });
// }
</script>

<template>
  <template v-if="mdAndUp">
    <div class="horizontalMenu border-bottom bg-surface position-relative">
      <div :class="customizer.boxed ? 'maxWidth' : 'px-6'">
        <ul class="gap-1 horizontal-navbar mx-lg-0 mx-3">
          <!---Menu Loop -->
          <li
            v-for="(item, i) in sidebarMenu"
            :key="i"
            class="navItem"
          >
            <!---If Has Child -->
            <NavCollapse
              v-if="item.children"
              :item="item"
              :level="0"
            />
            <!---Single Item-->
            <NavItem
              v-else
              :item="item"
            />
            <!---End Single Item-->
          </li>
        </ul>
      </div>
    </div>
  </template>
  <div
    v-else
    class="mobile-menu"
  >
    <VerticalSidebar />
  </div>
</template>
