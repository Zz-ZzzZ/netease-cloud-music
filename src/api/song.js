import { get } from "@/api/http";

// 获取推荐歌单列表
export const getPlayList = params => get("/personalized", { limit: params });

// 获取推荐音乐列表
export const getSongSingleList = () => get("/personalized/newsong");

// 根据歌单ID获取歌单详细信息
export const getPlayListDetailById = params =>
  get("/playlist/detail", { id: params });

// 根据歌单ID内中的歌曲ID获取歌曲详细信息
export const getSongDetailByPlayListSongId = params =>
  get("/song/detail", { ids: params });
