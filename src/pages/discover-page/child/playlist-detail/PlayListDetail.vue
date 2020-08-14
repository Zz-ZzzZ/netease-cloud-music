<!--歌单详情页-->
<template>
  <div class="play-list-detail">
    <PlayListDetailInfo />
  </div>
</template>

<script>
import PlayListDetailInfo from "@/pages/discover-page/child/playlist-detail/PlayListDetailInfo";
export default {
  name: "PlayListDetail",
  components: { PlayListDetailInfo }
};
</script>

<style scoped>
.play-list-detail {
  width: 100%;
  height: 100%;
}
</style>
