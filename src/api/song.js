import { get } from "@/api/http";

// 获取推荐歌单列表
export const getPlayList = params => get("/personalized", { limit: params });

// 获取推荐音乐列表
export const getSongSingleList = () => get("/personalized/newsong");

// 根据歌单ID获取歌单详细信息
export const getPlayListDetailById = params =>
  get("/playlist/detail", { id: params });

// 根据歌单ID内中的歌曲ID获取歌曲详细信息
export const getSongDetailById = params => get("/song/detail", { ids: params });

// 根据歌曲ID获取Url
export const getSongUrlById = params => get("/song/url", { id: params });

// 获取歌词
export const getLyricById = params => get("/lyric", { id: params });

// 获取歌单评论
export const getPlayListCommentsById = (
  params,
  limit = 30,
  offset = (1 - 1) * limit
) => get("/comment/playlist", { id: params, limit, offset });

// 获取歌曲评论
export const getSongCommentsById = (
  params,
  limit = 30,
  offset = (1 - 1) * limit
) => get("/comment/music", { id: params, limit, offset });

// 歌单 ( 网友精选碟 )
export const getPlayListFromNetFriend = (
  order = "hot",
  cat,
  limit = 30,
  offset = (1 - 1) * limit
) => get("/top/playlist", { order, cat, limit, offset });

// 热门歌单分类
export const getPlayListFromHot = () => get("/playlist/hot");

// 所有榜单内容摘要
export const getTopList = () => get("/toplist/detail");
