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

// 根据歌曲ID检查音乐是否可用
export const checkSongStatusById = params =>
  get("/check/music", { id: params });

// 获取歌词
export const getLyricById = params => get("/lyric", { id: params });
