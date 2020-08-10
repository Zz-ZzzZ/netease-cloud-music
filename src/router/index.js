import Vue from "vue";
import VueRouter from "vue-router";
import Discover from "../pages/discover-page/Discover";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Discover,
    children: [
      {
        path: "/",
        name: "发现",
        component: () => import("@/pages/discover-page/child/index/Index")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
