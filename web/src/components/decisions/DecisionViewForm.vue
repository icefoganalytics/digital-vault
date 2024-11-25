<template>
  <v-row v-if="item">
    <v-col
      cols="12"
      md="8"
    >
      <h2 class="mb-3">Background Information</h2>
      <v-card class="mb-5">
        <v-card-title>Description</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="item.title"
                label="Title"
                readonly
              ></v-text-field>
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
          <v-row>
            <v-col cols="12">
              <v-text-field :value="categoryText" />
            </v-col>
            <v-col cols="12">
              <v-combobox
                v-model="item.tags"
                label="Tags"
                readonly
                multiple
                chips
              />
            </v-col>
          </v-row>
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
              <v-card class="bg-secondary fill-height">
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
      <h2 class="mb-3">Decision</h2>
      <v-card
        variant="tonal"
        class="mb-5"
      >
        <v-card-title>Recorded {{ formatDateTime(item.createdAt) }}</v-card-title>
        <v-card-text>
          <p class="mb-0 text-subtitle-1">By: {{ item.user?.displayName }}</p>
          <p
            v-if="item.user?.title"
            class="mb-5"
          >
            {{ item.user?.title }}
          </p>
          <v-row>
            <v-col cols="12">
              <v-btn
                color="info"
                readonly
                block
                >{{ item.decisionText }}</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from "vue"

import useBreadcrumbs, { BASE_CRUMB } from "@/use/use-breadcrumbs"
import useDecision from "@/use/use-decision"
import { formatDate, formatDateTime } from "@/utils/formatters"

const props = defineProps<{
  decisionId: string
}>()

const decisionId = computed(() => (props.decisionId ? parseInt(props.decisionId) : null))
const { item } = useDecision(decisionId)

const categoryText = computed(() => {
  if (item.value) {
    const category = item.value.categories[0].name
    return `${category}`
  }

  return ""
})

useBreadcrumbs("Record a Decision", [
  BASE_CRUMB,
  { title: "Decisions", to: { name: "decisions/DecisionListPage" } },
])
</script>
