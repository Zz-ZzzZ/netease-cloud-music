<template>
  <div class="result-singer" v-if="searchResult">
    <BaseSinger
      v-for="item in searchResult.artists"
      :key="item.id"
      :img-url="item.picUrl"
      :account="item.accountId"
      @setSingerId="$router.push({ path: `/singer/${item.id}` })"
    >
      <template>
        <BaseHighLight :text="item.name" :high-text="keyword" />
      </template>
    </BaseSinger>
  </div>
</template>

<script>
import BaseSinger from "@/components/BaseSinger";
import BaseHighLight from "@/components/BaseHighLight";
import SEARCH_MIXIN from "@/utils/search-result-mixin";

export default {
  mixins: [SEARCH_MIXIN],
  name: "SearchResultSinger",
  created() {
    this.getSearchResult(100);
  },
  components: { BaseHighLight, BaseSinger }
};
</script>

<style scoped lang="scss">
.result-singer {
}
</style>
