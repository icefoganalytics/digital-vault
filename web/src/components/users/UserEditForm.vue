<template>
  <v-skeleton-loader
    v-if="isNil(user)"
    type="card"
  />
  <v-form
    v-else
    ref="form"
    @submit.prevent="saveWrapper"
  >
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="user.firstName"
          label="First name *"
          :rules="[required]"
          variant="outlined"
          required
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="user.lastName"
          label="Last name *"
          :rules="[required]"
          variant="outlined"
          required
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="user.displayName"
          label="Display Name *"
          :rules="[required]"
          variant="outlined"
          required
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="user.title"
          label="Title"
          variant="outlined"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="user.email"
          label="Email *"
          :rules="[required]"
          variant="outlined"
          required
        />
      </v-col>
    </v-row>

    <v-divider class="mb-6"></v-divider>

    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="user.department"
          label="Department"
          variant="outlined"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="user.division"
          label="Division"
          variant="outlined"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="user.branch"
          label="Branch"
          variant="outlined"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="user.unit"
          label="Unit"
          variant="outlined"
        />
      </v-col>
    </v-row>

    <v-divider class="my-6"></v-divider>

    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <h3 class="mb-1">Roles</h3>

        <v-chip
          v-for="(role, index) in user.roles"
          :key="index"
          class="ma-2"
          color="info"
          size="large"
        >
          {{ formatRole(role) }}
        </v-chip>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer />
      <v-col class="d-flex justify-end">
        <v-btn
          :loading="isLoading"
          color="error"
          variant="outlined"
          v-bind="cancelButtonOptions"
        >
          Cancel
        </v-btn>
        <v-btn
          class="ml-3"
          :loading="isLoading"
          type="submit"
          color="success"
        >
          Save
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { isNil } from "lodash"
import { ref, toRefs } from "vue"
import { useI18n } from "vue-i18n"

import { type VBtn, type VForm } from "vuetify/lib/components/index.mjs"

import { required } from "@/utils/validators"
import useSnack from "@/use/use-snack"
import useUser from "@/use/use-user"

type CancelButtonOptions = VBtn["$props"]

const props = withDefaults(
  defineProps<{
    userId: number
    cancelButtonOptions?: CancelButtonOptions
  }>(),
  {
    cancelButtonOptions: ({ userId }) => ({
      to: {
        name: "UserPage",
        params: { userId },
      },
    }),
  }
)

const emit = defineEmits<{
  saved: [userId: number]
}>()

const { userId } = toRefs(props)
const { user, save, isLoading } = useUser(userId)

const snack = useSnack()

const form = ref<InstanceType<typeof VForm> | null>(null)

async function saveWrapper() {
  if (isNil(form.value)) return

  const { valid } = await form.value.validate()
  if (!valid) return

  if (isNil(user.value)) return

  await save()
  snack.success("User saved!")
  emit("saved", user.value.id)
}

const { t } = useI18n()

function formatRole(role: string) {
  return t(`user.roles.${role}`, role)
}
</script>
