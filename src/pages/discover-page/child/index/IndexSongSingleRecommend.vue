<template>
  <TheDiscoverContentCard>
    <template v-slot:top-left>推荐歌曲</template>
    <template v-slot:top-right>
      <BaseButton :show-icon="true" icon="play-black">
        播放全部
      </BaseButton>
    </template>
    <template v-slot:bottom>
      <BaseSongSingle
        v-for="item in songSingleList"
        :key="item.id"
        :img-url="item.picUrl"
        :song-name="item.name"
        :album-name="item.song.album.name"
        :artists="item.song.artists"
      />
    </template>
  </TheDiscoverContentCard>
</template>

<script>
import { getSongSingleList } from "@/api/song";
import TheDiscoverContentCard from "@/components/TheDiscoverContentCard";
import BaseSongSingle from "@/components/BaseSongSingle";
export default {
  name: "IndexSongSingleRecommend",
  data() {
    return {
      songSingleList: []
    };
  },
  components: { BaseSongSingle, TheDiscoverContentCard },
  async created() {
    const { result } = await getSongSingleList();
    this.songSingleList = result;
  }
};
</script>

<style scoped lang="scss">
/deep/ .card-bottom {
  width: 100%;
  height: 4.2rem;
  flex-wrap: wrap;
  @include flex-box(column, flex-start, flex-start);
}
</style>
