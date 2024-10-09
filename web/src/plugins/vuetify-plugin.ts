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
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import * as labsComponents from "vuetify/labs/components"

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    ...components,
    ...labsComponents,
  },
  directives,
  defaults: {
    VCard: {
      rounded: "md",
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
