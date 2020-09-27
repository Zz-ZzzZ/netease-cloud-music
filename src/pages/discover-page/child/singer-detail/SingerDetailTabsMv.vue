<template>
  <div class="tabs-mv" ref="mvScroll" v-if="mvList.length > 0">
    <div class="mv-scroll">
      <BaseMv
        v-for="item in mvList"
        :key="item.id"
        :imgUrl="item.imgurl"
        :name="item.name"
        :publish-time="item.publishTime"
        :play-count="item.playCount"
      />
    </div>
  </div>
  <div v-else class="no-mv">暂无视频</div>
</template>

<script>
import BaseMv from "@/components/BaseMv";
export default {
  components: { BaseMv },
  props: {
    mvList: {
      type: Array,
      default: () => []
    }
  },
  name: "SingerDetailTabsMv",
  mounted() {}
};
</script>

<style scoped lang="scss">
.tabs-mv {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .mv-scroll {
    padding-top: 0.2rem;

    .all-album {
      margin-top: 0.1rem;
      margin-bottom: 0.2rem;
      color: $content;
      font-size: 0.3rem;
      line-height: 0.3rem;
      @include flex-box(row, center, center);
    }
  }
}

.no-mv {
  margin-top: 0.2rem;
  font-size: 0.3rem;
  color: $content;
  text-align: center;
}
</style>
