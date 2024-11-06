import { type RouteRecordRaw } from "vue-router"

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
        path: "dashboard",
        name: "DashboardPage",
        component: () => import("@/pages/DashboardPage.vue"),
        meta: { title: "Dashboard" },
      },
      {
        path: "profile",
        name: "ProfilePage",
        component: () => import("@/pages/ProfilePage.vue"),
      },
      {
        path: "administration",
        name: "administration",
        children: [
          {
            path: "dashboard",
            name: "administration/DashboardPage",
            component: () => import("@/pages/administration/DashboardPage.vue"),
          },
          {
            path: "sources",
            name: "administration/SourceListPage",
            component: () => import("@/pages/sources/SourceListPage.vue"),
          },
          {
            path: "sources/new",
            name: "administration/SourceNewPage",
            component: () => import("@/pages/sources/SourceNewPage.vue"),
          },
          {
            path: "sources/:sourceId/edit",
            name: "administration/SourceEditPage",
            component: () => import("@/pages/sources/SourceEditPage.vue"),
            props: true,
          },
          {
            path: "retentions",
            name: "administration/RetentionListPage",
            component: () => import("@/pages/retentions/RetentionListPage.vue"),
          },
          {
            path: "retentions/new",
            name: "administration/RetentionNewPage",
            component: () => import("@/pages/retentions/RetentionNewPage.vue"),
          },
          {
            path: "retentions/:retentionId/edit",
            name: "administration/RetentionEditPage",
            component: () => import("@/pages/retentions/RetentionEditPage.vue"),
            props: true,
          },
          {
            path: "categories",
            name: "administration/CategoryListPage",
            component: () => import("@/pages/categories/CategoryListPage.vue"),
          },
          {
            path: "categories/new",
            name: "administration/CategoryNewPage",
            component: () => import("@/pages/categories/CategoryNewPage.vue"),
          },
          {
            path: "categories/:categoryId/edit",
            name: "administration/CategoryEditPage",
            component: () => import("@/pages/categories/CategoryEditPage.vue"),
            props: true,
          },
        ],
      },
      {
        path: "users",
        name: "users/UsersPage",
        component: () => import("@/pages/users/UsersPage.vue"),
      },
      {
        path: "users/new",
        name: "users/UserNewPage",
        component: () => import("@/pages/users/UserNewPage.vue"),
      },
      {
        path: "users/:userId/edit",
        name: "users/UserEditPage",
        component: () => import("@/pages/users/UserEditPage.vue"),
        props: true,
      },

      {
        path: "archive-item/new",
        name: "archive-item/ArchiveItemNewPage",
        component: () => import("@/pages/archive-item/ArchiveItemNewPage.vue"),
        props: true,
      },
      {
        path: "archive-item/:archiveItemId/view",
        name: "archive-item/ArchiveItemViewPage",
        component: () => import("@/pages/archive-item/ArchiveItemViewPage.vue"),
        props: true,
      },
      {
        path: "archive-item",
        name: "archive-item/ArchiveItemListPage",
        component: () => import("@/pages/archive-item/ArchiveItemListPage.vue"),
      },
      {
        path: "decisions/record",
        name: "decisions/DecisionNewPage",
        component: () => import("@/pages/decisions/DecisionNewPage.vue"),
      },
      {
        path: "decisions",
        name: "decisions/DecisionListPage",
        component: () => import("@/pages/decisions/DecisionNewPage.vue"),
      },
    ],
  },
  {
    path: "/sign-in",
    name: "SignInPage",
    component: () => import("@/pages/SignInPage.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/status",
    name: "StatusPage",
    component: () => import("@/pages/StatusPage.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/errors/unauthorized",
    name: "UnauthorizedPage",
    component: () => import("@/pages/UnauthorizedPage.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFoundPage",
    component: () => import("@/pages/NotFoundPage.vue"),
    meta: { requiresAuth: false },
  },
]

export default routes
