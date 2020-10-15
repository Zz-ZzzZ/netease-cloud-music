import Vue from "vue";
import VueRouter from "vue-router";
import Discover from "../pages/discover-page/Discover";
import Myself from "@/pages/myself-page/Myself";

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
        path: "play-list/:id",
        name: "歌单",
        component: () =>
          import("@/pages/discover-page/child/detail/PlayListDetail")
      },
      {
        path: "singer/:id",
        name: "",
        component: () =>
          import("@/pages/discover-page/child/singer-detail/SingerDetail")
      },
      {
        path: "playlist-comments/:id",
        name: "歌单评论",
        component: () =>
          import("@/pages/discover-page/child/comments/PlayListComments")
      },
      {
        path: "song-comments/:id",
        name: "歌曲评论",
        component: () =>
          import("@/pages/discover-page/child/comments/SongComments")
      },
      {
        path: "playlist-place",
        name: "歌单广场",
        component: () =>
          import("@/pages/discover-page/child/playlist-place/PlayListPlace")
      },
      {
        path: "top-list",
        name: "排行榜",
        component: () => import("@/pages/discover-page/child/top-list/TopList")
      }
    ]
  },
  {
    path: "/myself",
    component: Myself,
    children: [
      {
        path: "/myself",
        name: "我的",
        component: () => import("@/pages/myself-page/child/index/Index"),
        meta: {
          showBackBar: false
        }
      }
    ]
  },
  {
    path: "/search",
    name: "",
    component: () => import("@/pages/search-page/SearchHot")
  },
  {
    path: "/search/result/:keyword",
    name: "",
    component: () => import("@/pages/search-page/SearchResult")
  },
  {
    path: "/video/:id",
    name: "",
    component: () => import("@/pages/video-page/Video")
  }
];

const router = new VueRouter({
  routes
});

export default router;
