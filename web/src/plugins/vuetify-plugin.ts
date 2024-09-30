/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles"
//import "@/assets/yk-style.css"

// ComposablesF
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import * as labsComponents from "vuetify/labs/components"

import {
  BLUE_THEME,
  AQUA_THEME,
  PURPLE_THEME,
  GREEN_THEME,
  CYAN_THEME,
  ORANGE_THEME,
} from "@/theme/LightTheme"

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    ...components,
    ...labsComponents,
  },
  directives,
  theme: {
    defaultTheme: "BLUE_THEME",
    themes: {
      BLUE_THEME,
      AQUA_THEME,
      PURPLE_THEME,
      GREEN_THEME,
      CYAN_THEME,
      ORANGE_THEME,
      /* light: {
        colors: {
          primary: "#0097a9",
          secondary: "#fff",
          anchor: "#00818f",
          "yg-moss": "#7A9A01",
          "yg-blue": "#0097a9",
          "yg-zinc": "#24405A",
          "yg-twilight": "#512A44",
          "yg-lichen": "#DC4405",
          "yg-sun": "#F2A900",
        },
      },
      dark: {
        colors: {
          "yg-moss": "#7A9A01",
          "yg-blue": "#0097a9",
          "yg-zinc": "#24405A",
          "yg-twilight": "#512A44",
          "yg-lichen": "#DC4405",
          "yg-sun": "#F2A900",
        },
      }, */
    },
  },
  defaults: {
    VCard: {
      rounded: "md",
      //color: "#F2A900"
    },
    VTextField: {
      variant: "outlined",
      density: "comfortable",
      color: "primary",
      /* hideDetails: "auto" */
    },
    VTextarea: {
      variant: "outlined",
      density: "comfortable",
      color: "primary",
    },
    VSelect: {
      variant: "outlined",
      density: "comfortable",
      color: "primary",
    },
    VAutocomplete: {
      variant: "outlined",
      density: "comfortable",
      color: "primary",
    },
    VCombobox: {
      variant: "outlined",
      density: "comfortable",
      color: "primary",
    },
    VListItem: {
      minHeight: "45px",
    },
    VTooltip: {
      location: "top",
    },
    VSwitch: { color: "primary", density: "comfortable" },
    VBtn: { color: "primary" },
  },
})
