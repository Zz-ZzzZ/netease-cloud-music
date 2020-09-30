<template>
  <div class="search-video" v-if="searchResult">
    <BaseVideo
      v-for="item in searchResult.videos"
      :key="item.vid"
      :img-url="item.coverUrl"
      :play-count="item.playTime"
    >
      <template v-slot:name>
        <BaseSongTag v-if="!item.type">MV</BaseSongTag>
        <BaseHighLight :text="item.title" :high-text="keyword" />
      </template>
      <template v-slot:other>
        <span>{{ secondToMs(item.durationms / 1000) }} </span>
        <span v-if="item.type"> by </span>
        <BaseHighLight
          v-for="(user, index) in item.creator"
          :key="user.userId"
          :text="
            item.creator.length - index === 1
              ? user.userName
              : `${user.userName} / `
          "
          :high-text="keyword"
        />
      </template>
    </BaseVideo>
  </div>
</template>

<script>
import BaseVideo from "@/components/BaseVideo";
import BaseHighLight from "@/components/BaseHighLight";
import { secondToMs } from "@/utils/utils";
import BaseSongTag from "@/components/BaseSongTag";
import SEARCH_MIXIN from "@/utils/search-result-mixin";

export default {
  mixins: [SEARCH_MIXIN],
  methods: {
    secondToMs(second) {
      return secondToMs(second);
    }
  },
  name: "SearchResultVideo",
  created() {
    this.getSearchResult(1014);
  },
  components: { BaseSongTag, BaseHighLight, BaseVideo }
};
</script>

<style scoped lang="scss">
.search-video {
  width: $container-width;
  margin: $margin-center;
  padding: 0.2rem 0;
}
</style>
