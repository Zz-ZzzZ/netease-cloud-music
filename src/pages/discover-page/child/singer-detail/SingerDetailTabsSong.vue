<template>
  <div class="tabs-song" ref="songScroll">
    <div class="scroll-container">
      <BaseSong
        v-for="(item, index) in songList"
        :key="item.id"
        :index="index + 1"
        :name="item.name"
        :maxbr="item.maxbr"
        :ablum="item.al.name"
        :author="item.ar"
        :id="item.id"
        :mv="item.mv"
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
    songList: {
      type: Array,
      default: () => []
    },
    more: {
      type: Boolean,
      default: false
    }
  },
  name: "SingerDetailTabsSong",
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
      @include flex-box(row, center, center);
    }
  }
}
</style>
