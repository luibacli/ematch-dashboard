const routes = [
  {
    path: "/login",
    component: () => import("pages/AuthPage.vue"),
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/users", component: () => import("pages/UsersPage.vue") },
      { path: "/cashin", component: () => import("pages/CashinPage.vue") },
      { path: "/cashout", component: () => import("pages/CashoutPage.vue") },
      { path: "/matches", component: () => import("pages/MatchesPage.vue") },
      { path: "/trades", component: () => import("pages/TradesPage.vue") },
      { path: "/admin", component: () => import("pages/AdminPage.vue") },
    ],
    meta: { requiresAuth: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
