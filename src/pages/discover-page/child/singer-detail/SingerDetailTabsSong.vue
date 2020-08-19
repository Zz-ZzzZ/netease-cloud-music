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
        :mv="item.mv"
      />
    </div>
  </div>
</template>

<script>
import BaseSong from "@/components/BaseSong";
import BScroll from "better-scroll";
export default {
  props: {
    songList: {
      type: Array,
      default: () => []
    }
  },
  name: "SingerDetailTabsSong",
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const scroll = new BScroll(this.$refs.songScroll, {
      scrollY: true,
      eventPassthrough: "horizontal",
      click: true,
      bounce: {
        top: false,
        bottom: false
      }
    });
  },
  components: { BaseSong }
};
</script>

<style scoped lang="scss">
.tabs-song {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  top: 0;
  left: 0;
  .scroll-container {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
