import { get } from "@/api/http";

// 热搜列表(详细)
export const getHotSearch = () => get("/search/hot/detail");

// 默认搜索关键词
export const getSearchDefaultKeyword = () => get("/search/default");

// 搜索建议(模糊匹配)
export const getSearchSuggestByKeyword = keywords =>
  get("/search/suggest", { keywords, type: "mobile" });

export const getSearchResultByKeyword = (
  keywords,
  limit = 30,
  offset = (1 - 1) * limit,
  type = 1018
) => get("/search", { keywords, limit, offset, type });
