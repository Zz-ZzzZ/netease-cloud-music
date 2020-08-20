import { get } from "@/api/http";
// 根据歌手id获取mv信息
export const getSingerMvById = params => get("/artist/mv", { id: params });
