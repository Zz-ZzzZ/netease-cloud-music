<template>
  <div class="tabs-song" ref="songScroll">
    <div class="scroll-container">
      <BaseSong
        v-for="(item, index) in playList"
        :key="item.id"
        :index="index"
        :maxbr="item.maxbr"
        :ablum="item.al.name"
        :id="item.id"
        :mv="item.mv"
        :fee="item.songFee"
        @playSong="playSong(playList, index)"
      >
        <template v-slot:name>
          <span>{{ item.name }}</span>
        </template>
        <template v-slot:author>
          <span v-for="(ar, index) in item.ar" :key="ar.id">
            {{ item.ar.length - index === 1 ? ar.name : `${ar.name} / ` }}
          </span>
          <span>
            {{ ` - ${item.al.name}` }}
          </span>
        </template>
      </BaseSong>
      <div class="all-song" v-if="more">
        <span>全部歌曲</span>
        <BaseIcon icon="arrow-gray" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseSong from "@/components/BaseSong";
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
  mounted() {},
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
      padding-bottom: 0.2rem;

      @include flex-box(row, center, center);
    }
  }
}
</style>
