<template>
  <TheSongSingleCard
    :song-single-list="songSingleList"
    class="index-song-single"
    title="发现新音乐"
  >
    <BaseButton :show-icon="true" icon="play">
      播放全部
    </BaseButton>
  </TheSongSingleCard>
</template>

<script>
import TheSongSingleCard from "@/components/TheSongSingleCard";
import { getSongSingleList } from "@/api/song";
export default {
  name: "IndexSongSingleRecommend",
  data() {
    return {
      songSingleList: []
    };
  },
  components: { TheSongSingleCard },
  async created() {
    let result = await getSongSingleList();
    if (result.status === 200) this.songSingleList = result.data.result;
  }
};
</script>

<style scoped>
.index-song-single {
  width: 100%;
  height: 7.5rem;
}
</style>
