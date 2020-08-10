<template>
  <PlayListCard
    class="play-list-card"
    :song-list="songList"
    title="歌单推荐"
    text="查看更多"
  />
</template>

<script>
import { getSongList } from "@/api/songList";
import PlayListCard from "@/components/PlayListCard";

export default {
  name: "IndexSongListRecommend",
  data() {
    return {
      songList: []
    };
  },
  components: { PlayListCard },
  async created() {
    let result = await getSongList({ limit: 10 });
    if (result.status === 200) this.songList = result.data.result;
  }
};
</script>

<style scoped lang="scss">
.play-list-card {
  width: 100%;
  height: 3.6rem;
}
</style>
