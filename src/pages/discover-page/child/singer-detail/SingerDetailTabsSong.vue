<template>
  <div class="tabs-song" ref="songScroll">
    <div class="scroll-container">
      <BaseSong
        v-for="(item, index) in playList"
        :key="item.id"
        :index="index + 1"
        :name="item.name"
        :maxbr="item.maxbr"
        :ablum="item.al.name"
        :author="item.ar"
        :id="item.id"
        :mv="item.mv"
        @playSong="playSong(playList, index)"
      />
      <div class="all-song" v-if="more">
        <span>全部歌曲</span>
        <BaseIcon icon="arrow-gray" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseSong from "@/components/BaseSong";
import { initScrollY } from "@/utils/scroll";
export default {
  props: {
    playList: {
      type: Array,
      default: () => []
    },
    more: {
      type: Boolean,
      default: false
    }
  },
  name: "SingerDetailTabsSong",
  methods: {
    playSong(playList, index) {
      this.$store.commit("playList/setPlayList", {
        playList,
        nowPlayIndex: index
      });
    }
  },
  mounted() {
    initScrollY(this.$refs.songScroll);
  },
  components: { BaseSong }
};
</script>

<style scoped lang="scss">
.tabs-song {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .scroll-container {
    .all-song {
      color: $content;
      font-size: 0.3rem;
      line-height: 0.3rem;
      padding-bottom: 0.1rem;

      @include flex-box(row, center, center);
    }
  }
}
</style>
