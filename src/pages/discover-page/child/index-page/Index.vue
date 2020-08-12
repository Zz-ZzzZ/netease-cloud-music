<template>
  <div class="index">
    <IndexSwipe />
    <IndexNavGrid />
    <IndexSongListRecommend />
    <IndexSongSingleRecommend />
  </div>
</template>

<script>
import IndexSwipe from "@/pages/discover-page/child/index-page/IndexSwipe";
import IndexNavGrid from "@/pages/discover-page/child/index-page/IndexNavGrid";
import IndexSongListRecommend from "@/pages/discover-page/child/index-page/IndexSongListRecommend";
import IndexSongSingleRecommend from "@/pages/discover-page/child/index-page/IndexSongSingleRecommend";
export default {
  name: "Index",
  components: {
    IndexSongSingleRecommend,
    IndexSongListRecommend,
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
}
</style>
