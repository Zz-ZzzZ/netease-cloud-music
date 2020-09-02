<!--发现页-首页-->
<template>
  <div class="index">
    <IndexSwipe />
    <IndexNavGrid />
    <IndexPlayListRecommend />
    <IndexSongSingleRecommend />
  </div>
</template>

<script>
import IndexSwipe from "@/pages/discover-page/child/index/IndexSwipe";
import IndexNavGrid from "@/pages/discover-page/child/index/IndexNavGrid";
import IndexPlayListRecommend from "@/pages/discover-page/child/index/IndexPlayListRecommend";
import IndexSongSingleRecommend from "@/pages/discover-page/child/index/IndexSongSingleRecommend";
export default {
  name: "Index",
  components: {
    IndexSongSingleRecommend,
    IndexPlayListRecommend,
    IndexNavGrid,
    IndexSwipe
  }
};
</script>

<style scoped lang="scss">
.index {
  width: $container-width;
  height: 100%;
  margin: 0 auto 0 auto;
  @include flex-box(column, flex-start, flex-start);
}
</style>
