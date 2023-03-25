import { createRouter, createWebHistory } from "vue-router";

import { useLoginStore } from "@/stores/login";
const requireAuth = (to, from, next) => {
  const store = useLoginStore();
  if (!store.user) {
    next({ name: "login" });
  } else {
    next();
  }
};

// import SearchView from "../views/SearchView.vue";
// import NotFoundView from "../views/NotFoundView.vue";
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      beforeEnter: requireAuth,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});
