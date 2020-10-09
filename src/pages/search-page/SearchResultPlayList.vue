<template>
  <div class="result-playlist" v-if="searchResult">
    <div
      class="play-list"
      v-for="item in searchResult.playlists"
      :key="item.id"
    >
      <img :src="item.coverImgUrl" />
      <div class="play-list-container">
        <div class="name">
          <BaseHighLight :text="item.name" :high-text="keyword" />
        </div>
        <div class="other">
          <span>{{ item.trackCount }}首 </span>
          <span> by {{ item.creator.nickname }} , </span>
          <span>{{ playCountFormat(item.playCount) }}次</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SEARCH_MIXIN from "@/utils/search-result-mixin";
import BaseHighLight from "@/components/BaseHighLight";
import { playCountFormat } from "@/utils/utils";

export default {
  components: { BaseHighLight },
  mixins: [SEARCH_MIXIN],
  name: "SearchResultPlayList",
  methods: {
    filterIndex(array, filterIndex) {
      return array.filter((item, index) => index < filterIndex);
    },
    playCountFormat(count) {
      return playCountFormat(count);
    }
  },
  created() {
    this.getSearchResult(1000);
  }
};
</script>

<style scoped lang="scss">
.result-playlist {
  .play-list {
    height: 1.2rem;
    margin-bottom: 0.15rem;
    @include flex-box(row, flex-start, center);

    img {
      width: 1.2rem;
      border-radius: $default-radius;
      margin-right: 0.2rem;
    }

    &-container {
      flex: 1;

      * {
        @include text-one-ellipsis;
      }
      .name {
        font-size: 0.27rem;
      }

      .other {
        margin-top: 0.13rem;
        color: $content;
      }

      .tag {
        font-size: 0.19rem;
        color: $red;
        background-color: #ffe2e4;
        display: inline-block;
        padding: 0 0.05rem;
      }
    }
  }
}
</style>
