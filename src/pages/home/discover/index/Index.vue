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
import IndexSwipe from "@/pages/home/discover/index/IndexSwipe";
import IndexNavGrid from "@/pages/home/discover/index/IndexNavGrid";
import IndexPlayListRecommend from "@/pages/home/discover/index/IndexPlayListRecommend";
import IndexSongSingleRecommend from "@/pages/home/discover/index/IndexSongSingleRecommend";
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

<style scoped lang="scss"></style>
