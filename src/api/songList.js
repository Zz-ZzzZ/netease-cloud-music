import { get } from "@/api/http";

// 获取推荐歌单列表
export const getSongList = limit => get("/personalized", limit);

// 获取推荐音乐列表
export const getSongSingleList = () => get("/personalized/newsong");
