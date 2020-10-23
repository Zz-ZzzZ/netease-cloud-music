import { get } from "@/api/http";
// 根据歌手id获取mv信息
export const getSingerVideoById = params => get("/artist/mv", { id: params });

// 根据mvId获取视频资源信息
export const getVideoSrcById = params => get("/mv/url", { id: params });

// 根据mvId获取视频相关信息
export const getVideoInfoById = params => get("/mv/detail", { mvid: params });

// 根据mvId获取视频的相关视频推送
export const getVideoCorrelationById = params =>
  get("/related/allvideo", { id: params });
