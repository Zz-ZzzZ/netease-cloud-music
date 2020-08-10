<template>
  <div class="index">
    <IndexSwipe />
    <IndexNavGrid />
    <IndexSongListRecommend />
  </div>
</template>

<script>
import IndexSwipe from "@/pages/discover-page/child/index/IndexSwipe";
import IndexNavGrid from "@/pages/discover-page/child/index/IndexNavGrid";
import IndexSongListRecommend from "@/pages/discover-page/child/index/IndexSongListRecommend";
export default {
  name: "Index",
  components: { IndexSongListRecommend, IndexNavGrid, IndexSwipe }
};
</script>

<style scoped lang="scss">
.index {
  width: $container-width;
  height: 100%;
  margin: 0 auto 0 auto;
}
</style>
