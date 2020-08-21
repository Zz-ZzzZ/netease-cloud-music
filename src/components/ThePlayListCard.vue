<template>
  <div class="song-list-card">
    <div class="card-top">
      <div class="top-title">{{ title }}</div>
      <div class="top-more">
        <slot></slot>
      </div>
    </div>

    <div class="card-bottom play-list-scroll" ref="playListScroll">
      <div class="bottom-scroll">
        <BasePlayList
          v-for="(item, index) in playList"
          :pic-url="item.picUrl"
          :play-count="item.playCount"
          :name="item.name"
          :key="item.id"
          @click="setPlayListId(item.id)"
          :class="playList.length - index !== 1 ? 'play-list-margin' : ''"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { playCountFormat } from "@/utils/utils";
import BasePlayList from "@/components/BasePlayList";
import { initScrollX } from "@/utils/scroll";
export default {
  components: { BasePlayList },
  props: {
    title: {
      type: String,
      default: ""
    },
    playList: {
      type: Array,
      default: () => []
    }
  },
  name: "ThePlayListCard",
  data() {
    return {
      scrollWidth: 0
    };
  },
  methods: {
    playCountFormat(playCount) {
      return playCountFormat(playCount);
    },
    setPlayListId(id) {
      this.$emit("click", id);
    }
  },
  mounted() {
    initScrollX(this.$refs.playListScroll);
  }
};
</script>

<style scoped lang="scss">
.song-list-card {
  margin: 0.3rem 0;
  font-size: 0.22rem;

  .card-top {
    width: 100%;
    @include flex-box(row, space-between, center);

    .top-title {
      font-size: 0.32rem;
      font-weight: 700;
      color: $title;
    }
  }

  .card-bottom {
    width: 100%;
    height: 2.8rem;
    overflow: hidden;
    position: relative;
    top: 0;
    left: 0;
    margin-top: 0.2rem;

    .bottom-scroll {
      position: absolute;
      top: 0;
      left: 0;
      @include flex-box(row);
      .play-list-margin {
        margin-right: 0.2rem;
      }
    }
  }
}
</style>
