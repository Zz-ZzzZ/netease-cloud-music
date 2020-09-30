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
    <van-tabs v-model="active" animated lazy-render swipeable>
      <van-tab title="综合">
        <SearchResultAll :keyword="$route.params.keyword" />
      </van-tab>
      <van-tab title="单曲">
        <SearchResultSongSingle :keyword="$route.params.keyword" />
      </van-tab>
      <van-tab title="视频">
        <SearchResultVideo :keyword="$route.params.keyword" />
      </van-tab>
      <van-tab title="歌手">
        <SearchResultSinger :keyword="$route.params.keyword" />
      </van-tab>
      <van-tab title="专辑">
        <SearchResultAlbum :keyword="$route.params.keyword" />
      </van-tab>
      <van-tab title="歌单">内容 4</van-tab>
      <van-tab title="主播电台">内容 4</van-tab>
      <van-tab title="用户">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import TheSearchBar from "@/components/TheSearchBar";
import { getSearchSuggestByKeyword } from "@/api/search";
import SearchResultAll from "@/pages/search-page/SearchResultAll";
import { throttle, trim } from "@/utils/utils";
import SearchResultSongSingle from "@/pages/search-page/SearchResultSongSingle";
import SearchResultVideo from "@/pages/search-page/SearchResultVideo";
import SearchResultSinger from "@/pages/search-page/SearchResultSinger";
import SearchResultAlbum from "@/pages/search-page/SearchResultAlbum";

export default {
  name: "SearchResult",
  data() {
    return {
      searchValue: this.$route.params.keyword,
      suggestList: [],
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
      // 替换当前路由触发watch
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
    searchClear() {
      this.searchValue = "";
    }
  },
  watch: {
    $route() {
      this.$router.go(0);
    }
  },
  components: {
    SearchResultAlbum,
    SearchResultSinger,
    SearchResultVideo,
    SearchResultSongSingle,
    SearchResultAll,
    TheSearchBar
  }
};
</script>

<style scoped lang="scss">
/deep/.van-tabs {
  height: 100%;
  position: static;
}
/deep/.van-tabs__content {
  height: calc(100% - 88px);
}
/deep/.van-tab--active {
  color: $red;
  font-weight: bold;
}
/deep/.van-tab__pane,
.van-tab__pane-wrapper {
  overflow-y: auto;
}
</style>
