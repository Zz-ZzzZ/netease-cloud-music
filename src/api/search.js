import { get } from "@/api/http";

// 热搜列表(详细)
export const getHotSearch = () => get("/search/hot/detail");

// 默认搜索关键词
export const getDefaultSearchKeyword = () => get("/search/default");

// 搜索建议(模糊匹配)
export const getSuggestByKeyword = keywords =>
  get("/search/suggest", { keywords, type: "mobile" });

// 搜索
export const getSearchResultByKeyword = (
  keywords,
  limit = 30,
  offset = 1,
  type
) => get("/search", { keywords, limit, offset: (offset - 1) * limit, type });
