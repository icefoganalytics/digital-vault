<template>
  <v-form v-if="item">
    <v-row>
      <v-col
        cols="12"
        md="8"
      >
        <v-text-field
          v-model="item.title"
          label="Title"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <SecurityLevelSelect
          v-model="item.securityLevel"
          label="Security level"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="item.description"
          label="Description"
          rows="3"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-card variant="outlined">
          <v-card-title>Retention</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="item.retentionName"
                  return-object
                  label="Policy"
                />
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  :model-value="formatDate(item.calculatedExpireDate)"
                  label="Expires on"
                  append-inner-icon="mdi-lock"
                  readonly
                />
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  :model-value="item.expireAction"
                  label="When item expires"
                  append-inner-icon="mdi-lock"
                  readonly
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="12"
      >
        <v-card variant="outlined">
          <v-card-title>Categories and Tags</v-card-title>
          <v-card-text>
            <p class="mb-4">
              Categories and Tags are used as filter criteria to find items in the archive as well
              as determine who can see the items. You can select as many of each as are applicable
              to this item. Additional categories potentially increase the number of people that can
              see this information, but also make it more accessible in the future.
            </p>
            <v-select
              v-model="categoryNames"
              :hide-details="false"
              label="Categories"
              multiple
              chips
              readonly
            />
            <v-combobox
              v-model="item.tags"
              label="Tags"
              multiple
              chips
              clearable
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="12"
      >
        <v-card variant="outlined">
          <v-card-title>Attachments</v-card-title>
          <v-card-text v-if="item.files && item.files.length > 0">
            <v-row>
              <v-col
                v-for="file of item.files"
                :key="file.id"
                cols="12"
                md="3"
              >
                <v-card
                  variant="outlined"
                  class="fill-height"
                >
                  <v-card-text>
                    {{ file.originalFileName }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text v-else> No Attachments </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { VForm } from "vuetify/lib/components/index.mjs"

import useArchiveItem from "@/use/use-archive-item"
import { formatDate } from "@/utils/formatters"

import SecurityLevelSelect from "@/components/archive-item/SecurityLevelSelect.vue"

const props = defineProps<{
  archiveItemId: string
}>()

const archiveItemId = computed(() => (props.archiveItemId ? parseInt(props.archiveItemId) : null))

const { item } = useArchiveItem(archiveItemId)

const categoryNames = computed(() => {
  if (item.value && item.value.categories) {
    return item.value.categories.map((c) => c.name)
  }
  return []
})
</script>
