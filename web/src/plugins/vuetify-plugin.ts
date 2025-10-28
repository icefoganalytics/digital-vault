/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles - Note that order matters here!
import "@/assets/normalize.css"
import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles"

// Composables
import { createVuetify } from "vuetify"

import darkTheme from "@/theme/DarkTheme"

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "darkTheme",
    themes: { darkTheme },
  },

  defaults: {
    VCard: {
      rounded: "md",
      flat: "true",
      color: "#eee",
    },
    VTextField: {
      variant: "outlined",
      density: "comfortable",
      color: "primary",
      hideDetails: "auto",
      bgColor: "#fff",
    },
    VTextarea: {
      variant: "outlined",
      density: "comfortable",
      color: "primary",
      hideDetails: "auto",
      bgColor: "#fff",
    },
    VSelect: {
      variant: "outlined",
      density: "comfortable",
      color: "primary",
      hideDetails: "auto",
      bgColor: "#fff",
    },
    VAutocomplete: {
      variant: "outlined",
      density: "comfortable",
      color: "primary",
      hideDetails: "auto",
      bgColor: "#fff",
    },
    VCombobox: {
      variant: "outlined",
      density: "comfortable",
      color: "primary",
      hideDetails: "auto",
      bgColor: "#fff",
    },
    VFileInput: {
      variant: "outlined",
      density: "comfortable",
      color: "primary",
      hideDetails: "auto",
      prependIcon: "",
      appendInnerIcon: "mdi-paperclip",
      bgColor: "#fff",
    },
    VListItem: {
      minHeight: "45px",
    },
    VTooltip: {
      location: "top",
    },
    VSwitch: { color: "primary", density: "comfortable", hideDetails: "auto" },
    VBtn: { color: "primary", flat: "true" },
  },
})
