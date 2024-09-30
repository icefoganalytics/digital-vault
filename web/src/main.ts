import { createApp } from "vue"
import { createPinia } from "pinia" // TODO: move to plugins?

// Plugins
import vuetify from "@/plugins/vuetify-plugin"
import auth0 from "@/plugins/auth0-plugin"

import "@/scss/style.scss"
import VueScrollTo from "vue-scrollto"
import { PerfectScrollbarPlugin } from "vue3-perfect-scrollbar"
import router from "@/router"

import App from "@/App.vue"

const pinia = createPinia()
const app = createApp(App)
app.use(pinia).use(router).use(vuetify).use(auth0)

app.use(PerfectScrollbarPlugin)

app.mount("#app")

app.use(VueScrollTo, {
  duration: 1000,
  easing: "ease",
})
