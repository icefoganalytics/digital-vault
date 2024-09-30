<template>
  <v-menu
    v-model="showMenu"
    :close-on-content-click="false"
    class="notification_popup"
  >
    <template #activator="{ props }">
      <v-btn
        icon
        class="mx-1"
        color="primary"
        variant="flat"
        v-bind="props"
        @click="refresh"
      >
        <v-badge
          :color="hasUnreadNotifications ? 'error' : 'success'"
          :content="totalCountUnreadNotifications"
        >
          <v-icon size="24">mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-sheet
      rounded="md"
      width="390"
      elevation="11"
    >
      <div class="px-8 pb-4 pt-6">
        <div class="d-flex align-center justify-space-between">
          <h6 class="text-h5">Notifications</h6>

          <div>
            <v-chip
              :color="hasUnreadNotifications ? 'error' : 'success'"
              variant="flat"
              size="small"
              class="text-white mr-2"
            >
              {{ totalCountUnreadNotifications }} Unread</v-chip
            >
            <v-chip
              color="info"
              variant="flat"
              size="small"
              class="text-white"
              >{{ totalCountTodaysNotifications }} Today</v-chip
            >
          </div>
        </div>
        <p class="text-subtitle-2 font-weight-regular">
          {{ latestNotifications.length }} Most Recent
        </p>
        <v-divider />
      </div>
      <!-- <perfect-scrollbar"> -->
      <div style="max-height: 400px; overflow-y: scroll">
        <v-list
          class="py-0"
          lines="two"
        >
          <v-list-item
            v-for="notification in latestNotifications"
            :key="notification.title"
            :value="notification"
            class="py-4 px-8"
            :base-color="notification.isRead ? '' : 'error'"
            @click="markAsReadAndRefresh(notification)"
          >
            <template #append>
              <v-btn
                v-if="notification.href"
                variant="flat"
                size="x-small"
                class="mt-0 ml-2 align-top"
                icon="mdi-link-variant"
                :color="!notification.isRead ? 'error' : 'success'"
                @click.stop="openNotification(notification)"
              ></v-btn>
            </template>
            <p class="text-subtitle-1 font-weight-retular font-italic textSecondary">
              {{ formatDate(notification.createdAt) }}
            </p>
            <div>
              <h6 class="text-subtitle-1 font-weight-semibold mb-1">{{ notification.title }}</h6>
            </div>
            <p class="text-subtitle-1 font-weight-regular textSecondary">
              {{ notification.subtitle }}
            </p>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
      </div>
      <!-- </perfect-scrollbar> -->
      <div class="py-4 px-6 text-center">
        <v-btn
          color="primary"
          variant="outlined"
          block
          :to="{ name: 'NotificationPage' }"
          @click="showMenu = false"
          >See all Notifications</v-btn
        >
      </div>
    </v-sheet>
  </v-menu>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue"
import { useRouter } from "vue-router"
import { DateTime } from "luxon"

import notificationsApi from "@/api/notifications-api"
import { CURRENT_USERS_TIMEZONE } from "@/use/use-current-user"
import useNotifications, { Notification } from "@/use/use-notifications"

const latestNotificationsQuery = computed(() => ({
  perPage: 5,
}))
const { notifications: latestNotifications, refresh: refreshLatestNotifications } =
  useNotifications(latestNotificationsQuery)

const unreadNotificationsQuery = computed(() => ({
  where: {
    isRead: false,
  },
  perPage: 1, // we only care about the total count
}))
const { totalCount: totalCountUnreadNotifications, refresh: refreshUnreadNotifications } =
  useNotifications(unreadNotificationsQuery)
const hasUnreadNotifications = computed(() => totalCountUnreadNotifications.value > 0)

const todaysNotificationsQuery = computed(() => ({
  filters: {
    createdTodayInUserTimezone: CURRENT_USERS_TIMEZONE,
  },
  perPage: 1, // we only care about the total count
}))
const { totalCount: totalCountTodaysNotifications, refresh: refreshTodaysNotifications } =
  useNotifications(todaysNotificationsQuery)

async function refresh() {
  await refreshLatestNotifications()
  await refreshUnreadNotifications()
  await refreshTodaysNotifications()
}

// TODO: switch to using a web socket
// auto-refresh notifications every 2.5 minutes
const notificationInterval = 1000 * 60 * 2.5
const showMenu = ref(false)
let interval = undefined as number | undefined

onMounted(async () => {
  interval = setInterval(async () => {
    await refresh()
  }, notificationInterval)
})

onUnmounted(() => {
  clearInterval(interval)
})

async function markAsRead(notification: Notification) {
  if (notification.isRead) return

  try {
    const { notification: updatedNotification } = await notificationsApi.update(notification.id, {
      isRead: true,
    })
    notification.isRead = updatedNotification.isRead
    refresh()
  } catch (error) {
    console.error(error)
  }
}

async function markAsReadAndRefresh(notification: Notification) {
  await markAsRead(notification)
  await refresh()
}

const router = useRouter()

async function openNotification(notification: Notification) {
  await markAsRead(notification)
  // non-blocking refresh, because this is a layout component
  // the refresh will not be aborted by the redirect
  refresh()

  if (notification.href) {
    showMenu.value = false
    await router.push(notification.href)
  }
}

function formatDate(input: string | Date) {
  if (typeof input == "string") return DateTime.fromISO(input).toLocal().toRelative()
  return DateTime.fromJSDate(input).toLocal().toRelative()
}
</script>
