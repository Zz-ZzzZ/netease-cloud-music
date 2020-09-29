<template>
  <div>
    <TheSearchBar
      :search-value="searchValue"
      :suggest-list="suggestList"
      @searchInput="searchInput"
      @searchConfirm="searchConfirm"
      @setKeyword="setKeyword"
      @searchClear="searchClear"
    />
    <van-tabs v-model="active">
      <van-tab title="综合">
        <SearchResultAll :all-data-obj="searchResult" :keyword="highText" />
      </van-tab>
      <van-tab title="单曲">内容 2</van-tab>
      <van-tab title="云村">内容 3</van-tab>
      <van-tab title="视频">内容 4</van-tab>
      <van-tab title="歌手">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import TheSearchBar from "@/components/TheSearchBar";
import {
  getSearchResultByKeyword,
  getSearchSuggestByKeyword
} from "@/api/search";
import SearchResultAll from "@/pages/search-page/SearchResultAll";
import { throttle, trim } from "@/utils/utils";

export default {
  name: "SearchResult",
  data() {
    return {
      searchValue: "",
      searchResult: {},
      suggestList: [],
      highText: "",
      active: 0
    };
  },
  methods: {
    searchInput(keyword) {
      this.searchValue = keyword;
      throttle(async function() {
        let str = trim(keyword);
        if (str) {
          const {
            result: { allMatch }
          } = await getSearchSuggestByKeyword(str);
          this.suggestList = allMatch;
        }
      }, 500).call(this);
    },
    searchConfirm(keyword) {
      if (trim(keyword)) {
        this.setKeyword(keyword);
      }
    },
    setKeyword(keyword) {
      this.addLocalStorage(keyword);
      this.navToResult(keyword);
    },
    navToResult(keyword) {
      this.$router.replace({ path: `/search/result/${keyword}` });
    },
    addLocalStorage(keyword) {
      let keywordArr = JSON.parse(localStorage.getItem("keyword"));
      if (keywordArr) {
        // 检查关键词是否已存在历史中，若存在则先移除此关键词
        const haveKeywordIndex = keywordArr.indexOf(keyword);
        if (haveKeywordIndex > -1) {
          keywordArr.splice(haveKeywordIndex, 1);
        }
        keywordArr.unshift(keyword);
        localStorage.setItem("keyword", JSON.stringify(keywordArr));
      } else {
        localStorage.setItem("keyword", JSON.stringify([keyword]));
      }
    },
    async getSearchResult(keyword) {
      this.searchValue = keyword;
      this.highText = keyword;
      const { result } = await getSearchResultByKeyword(this.searchValue);
      this.searchResult = result;
    },
    searchClear() {
      this.searchValue = "";
    }
  },
  created() {
    this.getSearchResult(this.$route.params.keyword);
  },
  watch: {
    $route() {
      console.log(this.$router);
      this.$router.go(0);
    }
  },
  components: { SearchResultAll, TheSearchBar }
};
</script>

<style scoped lang="scss">
/deep/.van-tabs {
  height: 100%;
  position: static;
}
/deep/.van-tabs__content {
  height: calc(100% - 88px);
  overflow-y: auto;
}
/deep/.van-tab--active {
  color: $red;
  font-weight: bold;
}
</style>
