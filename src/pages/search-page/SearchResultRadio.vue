<template>
  <div v-if="searchResult">
    <BaseRadio
      v-for="item in searchResult.djRadios"
      :key="item.id"
      :img-url="item.picUrl"
    >
      <template v-slot:name
        ><BaseHighLight :text="item.name" :high-text="keyword"
      /></template>
      <template v-slot:ar>
        <BaseHighLight :text="item.dj.nickname" :high-text="keyword" />
      </template>
    </BaseRadio>
  </div>
</template>

<script>
import BaseRadio from "@/components/BaseRadio";
import BaseHighLight from "@/components/BaseHighLight";
import SEARCH_MIXIN from "@/utils/search-result-mixin";
export default {
  name: "SearchResultRadio",
  mixins: [SEARCH_MIXIN],
  created() {
    this.getSearchResult(1009);
  },
  components: { BaseHighLight, BaseRadio }
};
</script>

<style scoped lang="scss">
/deep/.base-radio {
  height: 1.2rem !important;
  img {
    width: 1.2rem !important;
  }
}
</style>
