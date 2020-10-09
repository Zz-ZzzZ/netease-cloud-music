<template>
  <div class="result-album" v-if="searchResult">
    <BaseAlbum
      v-for="item in searchResult.albums"
      :key="item.id"
      :img-url="item.picUrl"
    >
      <template v-slot:name>
        <BaseHighLight :text="item.name" :high-text="keyword" />
      </template>
      <template v-slot:other>
        <BaseHighLight
          v-for="(ar, index) in item.artists"
          :key="ar.id"
          :text="item.artists.length - index === 1 ? ar.name : `${ar.name} / `"
          :high-text="keyword"
        />
        <span class="date">{{ dateFormat(item.publishTime, 2) }}</span>
      </template>
    </BaseAlbum>
  </div>
</template>

<script>
import BaseAlbum from "@/components/BaseAlbum";
import BaseHighLight from "@/components/BaseHighLight";
import { dateFormat } from "@/utils/utils";
import SEARCH_MIXIN from "@/utils/search-result-mixin";
export default {
  mixins: [SEARCH_MIXIN],
  name: "SearchResultAlbum",
  methods: {
    dateFormat(date, type) {
      return dateFormat(date, type);
    }
  },
  created() {
    this.getSearchResult(10);
  },
  components: { BaseHighLight, BaseAlbum }
};
</script>

<style scoped lang="scss">
.result-album {
}
/deep/.album-img {
  width: 1.5rem !important;
  height: 1.25rem !important;
  background-size: 1.5rem 1.25rem !important;

  img {
    width: 1.25rem !important;
    height: 1.25rem !important;
  }
}
</style>
