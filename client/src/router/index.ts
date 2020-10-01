import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/login/Register.vue")
  },
  {
    path: "/editor",
    name: "article-new",
    component: () => import("@/views/article/ArticleCreate.vue")
  },
  {
    path: "/article/:id",
    name: "article",
    component: () => import("@/views/article/Article.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name === "article-new" && !store.state.auth.isAuthenticated)
    next({ name: "home" });
  else next();
});

export default router;
