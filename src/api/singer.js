import { get } from "@/api/http";

// 获取歌手个人信息
export const getSingerDescById = params => get("/artists", { id: params });
