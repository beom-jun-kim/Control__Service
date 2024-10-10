export const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "/home",
        component: () => import("@/pages/dashboard.vue"),
      },
      {
        path: "/user/profile",
        name: "UserProfile",
        component: () => import("@/views/pages/user/profile.vue"),
      },
      {
        path: "account-settings",
        component: () => import("@/pages/account-settings.vue"),
      },
      {
        path: "typography",
        component: () => import("@/pages/typography.vue"),
      },
      {
        path: "icons",
        component: () => import("@/pages/icons.vue"),
      },
      {
        path: "cards",
        component: () => import("@/pages/cards.vue"),
      },
      {
        path: "tables",
        component: () => import("@/pages/tables.vue"),
      },
      {
        path: "form-layouts",
        component: () => import("@/pages/form-layouts.vue"),
      },
      {
        path: "/find-monitor",
        component: () => import("@/views/pages/monitor/find-monitor.vue"),
      },
      {
        path: "/guardian-info",
        component: () =>
          import("@/views/pages/guardian-manage/guardian-info.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/blank.vue"),
    children: [
      {
        path: "login",
        component: () => import("@/pages/login.vue"),
      },
      {
        path: "register",
        component: () => import("@/pages/register.vue"),
      },
      {
        path: "/findId",
        name: "FindId",
        component: () => import("@/pages/findId.vue"),
      },
      {
        path: "/findPassword",
        name: "FindPassword",
        component: () => import("@/pages/findPassword.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        component: () => import("@/pages/[...error].vue"),
      },
    ],
  },
];
