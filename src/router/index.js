import Vue from "vue";
import VueRouter from "vue-router";
import Discover from "../pages/discover-page/Discover";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Discover,
    redirect: "/discover",
    children: [
      {
        path: "/",
        name: "发现",
        component: () => import("@/pages/discover-page/child/index/Index"),
        meta: {
          showBackBar: false
        }
      },
      {
        path: "play-list",
        name: "歌单",
        component: () =>
          import("@/pages/discover-page/child/playlist-detail/PlayListDetail")
      },
      {
        path: "singer",
        name: "歌手详情",
        component: () =>
          import("@/pages/discover-page/child/singer-detail/SingerDetail")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
