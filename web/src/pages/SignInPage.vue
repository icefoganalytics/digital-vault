<template>
  <div class="pa-3">
    <v-row class="h-100vh mh-100 auth">
      <v-col
        cols="12"
        lg="7"
        xl="8"
        class="d-lg-flex align-center justify-center authentication position-relative"
      >
        <img
          src="@/assets/SplashImage.png"
          class="position-relative d-none d-lg-flex"
          alt="login-background"
        />
      </v-col>
      <v-col
        cols="12"
        class="d-flex d-lg-none align-center text-center justify-center bg-surface"
      >
        <img
          src="@/assets/SplashImage.png"
          style="width: 50%; max-width: 200px"
          alt="login-background"
        />
      </v-col>
      <v-col
        cols="12"
        lg="5"
        xl="4"
        class="d-flex align-center justify-center bg-surface"
      >
        <div
          class="mt-xl-0 mt-5 mw-100 text-center"
          text-center
        >
          <h2 class="text-h3 font-weight-semibold mb-2">{{ APPLICATION_NAME }}</h2>
          <div class="text-subtitle-1 mb-6 mt-3 font-weight-bold">Yukon Government</div>
          <div class="my-6 text-center">
            <v-btn
              color="primary"
              @click="loginWithRedirect"
            >
              Sign in
            </v-btn>
            <div class="text-subtitle-1 mt-2">Using your YNET Credentials</div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import { useAuth0 } from "@auth0/auth0-vue"

import { APPLICATION_NAME } from "@/config"
import useCurrentUser from "@/use/use-current-user"

const { reset: resetCurrentUser } = useCurrentUser()

const { loginWithRedirect } = useAuth0()

onMounted(() => {
  resetCurrentUser()
})
</script>
