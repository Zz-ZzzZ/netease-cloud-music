<template>
  <SongSingleCard
    :song-single-list="songSingleList"
    class="index-song-single"
    title="发现新音乐"
  >
    <BaseButton :show-icon="true" icon="playAll">
      播放全部
    </BaseButton>
  </SongSingleCard>
</template>

<script>
import SongSingleCard from "@/components/SongSingleCard";
import { getSongSingleList } from "@/api/songList";
export default {
  name: "IndexSongSingleRecommend",
  data() {
    return {
      songSingleList: []
    };
  },
  components: { SongSingleCard },
  async created() {
    let result = await getSongSingleList();
    if (result.status === 200) this.songSingleList = result.data.result;
    console.log(this.songSingleList[0].song.artists[0].name);
  }
};
</script>

<style scoped>
.index-song-single {
  width: 100%;
  height: 4.7rem;
}
</style>
