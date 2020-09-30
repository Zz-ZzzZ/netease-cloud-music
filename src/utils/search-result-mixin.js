import { getSearchResultByKeyword } from "@/api/search";

const SEARCH_MIXIN = {
  props: {
    keyword: String
  },
  data() {
    return {
      searchResult: undefined
    };
  },
  methods: {
    async getSearchResult(type) {
      const { result } = await getSearchResultByKeyword(
        this.keyword,
        30,
        0,
        type
      );
      this.searchResult = result;
    }
  }
};
export default SEARCH_MIXIN;
