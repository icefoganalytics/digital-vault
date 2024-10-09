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
        path: "administration/dashboard",
        name: "administration/DashboardPage",
        component: () => import("@/pages/administration/DashboardPage.vue"),
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
