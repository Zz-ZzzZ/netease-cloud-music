<template>
  <div>
    <TheSearchBar :search-value="searchValue" />
    <van-tabs v-model="active">
      <van-tab title="综合">
        <SearchResultAll :all-data-obj="searchResult" />
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
import { getSearchResultByKeyword } from "@/api/search";
import SearchResultAll from "@/pages/search-page/SearchResultAll";

export default {
  name: "SearchResult",
  data() {
    return {
      searchValue: "",
      searchResult: {},
      active: 0
    };
  },
  async created() {
    this.searchValue = this.$route.params.keyword;
    const { result } = await getSearchResultByKeyword(this.searchValue);
    this.searchResult = result;
  },
  components: { SearchResultAll, TheSearchBar }
};
</script>

<style scoped lang="scss">
/deep/.van-tabs {
  height: 100%;
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
