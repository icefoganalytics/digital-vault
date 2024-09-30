import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import { authGuard } from "@auth0/auth0-vue"

import { APPLICATION_NAME } from "@/config"
import { adminRoutes } from "@/modules/administration/routes"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        redirect: "dashboard",
      },
      {
        name: "DashboardPage",
        path: "dashboard",
        component: () => import("@/pages/DashboardPage.vue"),
        meta: { title: "Dashboard" },
      },
      {
        name: "ProfilePage",
        path: "profile",
        component: () => import("@/pages/ProfilePage.vue"),
      },
      {
        name: "WelcomePage",
        path: "welcome",
        component: () => import("@/pages/WelcomePage.vue"),
        meta: { requiresAuth: false },
      },
      {
        name: "NotificationPage",
        path: "notifications",
        component: () => import("@/pages/NotificationPage.vue"),
      },
      {
        name: "NewWorkflowPage",
        path: "workflows/new",
        component: () => import("@/pages/workflows/NewWorkflowPage.vue"),
        meta: { title: "Workflows - New" },
      },
      {
        name: "DraftWorkflowPage",
        path: "workflows/:workflowId/draft",
        component: () => import("@/pages/workflows/DraftWorkflowPage.vue"),
        props: true,
        meta: { title: "Workflows - <ID> - Draft" },
      },
      {
        name: "workflows/EditWorkflowPage",
        path: "workflows/:workflowId/edit",
        component: () => import("@/pages/workflows/EditWorkflowPage.vue"),
        props: true,
        meta: { title: "Workflows - <ID> - Edit" },
      },
      {
        path: "workflows/:workflowId/act",
        component: () => import("@/pages/workflows/ActWorkflowPage.vue"),
        props: true,
        meta: { title: "Workflows - <ID>" },
        children: [
          {
            path: "",
            name: "ActWorkflowPage",
            redirect: { name: "StepsActPage" },
          },
          {
            path: "steps",
            name: "StepsActPage",
            component: () => import("@/pages/workflows/act/StepsActPage.vue"),
            props: true,
          },
          {
            path: "activity",
            name: "ActivityActPage",
            component: () => import("@/pages/workflows/act/ActivityActPage.vue"),
            props: true,
          },
          {
            path: "players",
            name: "PlayersActPage",
            component: () => import("@/pages/workflows/act/PlayersActPage.vue"),
            props: true,
          },
        ],
      },
      {
        path: "workflows/:workflowId",
        // TODO: consider if I should control the redirect based on the workflow status here?
        redirect: { name: "ActWorkflowPage" },
      },
    ],
  },
  ...adminRoutes,
  {
    name: "SignInPage",
    path: "/sign-in",
    component: () => import("@/pages/SignInPage.vue"),
    meta: { requiresAuth: false },
  },
  {
    name: "StatusPage",
    path: "/status",
    component: () => import("@/pages/StatusPage.vue"),
    meta: { requiresAuth: false },
  },
  {
    name: "UnauthorizedPage",
    path: "/errors/unauthorized",
    component: () => import("@/pages/UnauthorizedPage.vue"),
    meta: { requiresAuth: false },
  },
  {
    name: "NotFoundPage",
    path: "/:pathMatch(.*)*",
    component: () => import("@/pages/NotFoundPage.vue"),
    meta: { requiresAuth: false },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  document.title = `${APPLICATION_NAME} ${to.meta.title ? " - " + to.meta.title : ""}`

  if (to.meta.requiresAuth === false) return true

  const isAuthenticated = await authGuard(to)
  if (isAuthenticated) return true

  return false
})

export default router
