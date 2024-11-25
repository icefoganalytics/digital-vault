<template>
  <v-row v-if="item">
    <v-col
      cols="12"
      md="8"
    >
      <v-card>
        <v-card-title>Archive Item Description</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="8"
            >
              <v-text-field
                v-model="item.title"
                label="Title"
                readonly
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <SecurityLevelSelect
                v-model="item.securityLevel"
                label="Security level"
                readonly
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="item.description"
                label="Description"
                readonly
                rows="3"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-title>Retention</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="item.retentionName"
                readonly
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
                readonly
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-title>Categories and Tags</v-card-title>
        <v-card-text>
          <p class="mb-4">
            Categories and Tags are used as filter criteria to find items in the archive as well as
            determine who can see the items. You can select as many of each as are applicable to
            this item. Additional categories potentially increase the number of people that can see
            this information, but also make it more accessible in the future.
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
            readonly
          />
        </v-card-text>

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
                class="bg-secondary fill-height"
                @click="downloadFile(file)"
              >
                <v-card-text>
                  <p>
                    {{ file.originalFileName }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text v-else> No Attachments </v-card-text>
      </v-card>
    </v-col>

    <v-col
      cols="12"
      md="4"
    >
      <v-card variant="tonal">
        <v-card-title>Recorded {{ formatDateTime(item.createdAt) }}</v-card-title>
        <v-card-text>
          <div v-if="item.sourceId"></div>
          <div v-if="item.userId">
            <p class="mb-0 text-subtitle-1">By: {{ item.user?.displayName }}</p>
            <p
              v-if="item.user?.title"
              class="mb-5"
            >
              {{ item.user?.title }}
            </p>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from "vue"

import archiveItemsApi from "@/api/archive-items-api"
import useArchiveItem from "@/use/use-archive-item"
import { formatDate, formatDateTime } from "@/utils/formatters"

import SecurityLevelSelect from "@/components/archive-item/SecurityLevelSelect.vue"
import { ArchiveItemFile } from "@/api/archive-items-api"

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

async function downloadFile(file: ArchiveItemFile) {
  if (!file.archiveItemId) return

  const result = await archiveItemsApi.download(file.archiveItemId, file.id)
  const newBlob = new Blob([result])
  const objUrl = window.URL.createObjectURL(newBlob)
  const link = document.createElement("a")
  link.href = objUrl
  link.download = file.originalFileName || "download"
  link.click()
}
</script>
