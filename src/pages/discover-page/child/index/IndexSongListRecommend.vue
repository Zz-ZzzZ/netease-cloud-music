<template>
  <SongListCard
    class="index-song-list"
    :song-list="songList"
    title="发现好歌单"
  >
    <BaseButton>
      查看更多
    </BaseButton>
  </SongListCard>
</template>

<script>
import { getSongList } from "@/api/songList";
import SongListCard from "@/components/SongListCard";

export default {
  name: "IndexSongListRecommend",
  data() {
    return {
      songList: []
    };
  },
  components: { SongListCard },
  async created() {
    let result = await getSongList({ limit: 10 });
    if (result.status === 200) this.songList = result.data.result;
  }
};
</script>

<style scoped lang="scss">
.index-song-list {
  width: 100%;
  height: 3.6rem;
}
</style>
