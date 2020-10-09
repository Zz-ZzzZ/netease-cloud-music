<template>
  <div class="result-song-single" v-if="searchResult">
    <BaseSong
      v-for="(item, index) in searchResult.songs"
      :key="item.id"
      :fee="item.songFee"
      :id="item.id"
      :index="index"
      :mv="item.mvid"
      :maxbr="item.maxbr"
      :hide-index="true"
    >
      <template v-slot:name>
        <BaseHighLight :text="item.name" :high-text="keyword" />
      </template>
      <template v-slot:author>
        <BaseHighLight
          v-for="(ar, index) in item.artists"
          :key="ar.id"
          :text="item.artists.length - index === 1 ? ar.name : `${ar.name} / `"
          :high-text="keyword"
        />
        <BaseHighLight :text="` - ${item.album.name}`" :high-text="keyword" />
      </template>
    </BaseSong>
  </div>
</template>

<script>
import BaseSong from "@/components/BaseSong";
import { getSearchResultByKeyword } from "@/api/search";
import BaseHighLight from "@/components/BaseHighLight";
import { getSongDetailById } from "@/api/song";
import SEARCH_MIXIN from "@/utils/search-result-mixin";
export default {
  mixins: [SEARCH_MIXIN],
  name: "SearchResultSongSingle",
  async created() {
    const { result } = await getSearchResultByKeyword(this.keyword, 30, 0, 1);
    const songIdList = result.songs.map(item => item.id);
    const { privileges } = await getSongDetailById(songIdList.toString());
    this.searchResult = result;
    privileges.forEach((item, index) => {
      this.searchResult.songs[index]["maxbr"] = item.maxbr;
      this.searchResult.songs[index]["songFee"] = item.fee;
    });
  },
  components: { BaseHighLight, BaseSong }
};
</script>

<style scoped lang="scss">
.result-song-single {
}
</style>
