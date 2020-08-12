<template>
  <ThePlayListCard
    class="index-song-list"
    :play-list="playList"
    title="发现好歌单"
    @touchstart="getPlayListId"
  >
    <BaseButton>
      查看更多
    </BaseButton>
  </ThePlayListCard>
</template>

<script>
import { getPlayList } from "@/api/song";
import ThePlayListCard from "@/components/ThePlayListCard";

export default {
  name: "IndexPlayListRecommend",
  data() {
    return {
      playList: []
    };
  },
  methods: {
    getPlayListId(id) {
      this.$router.push({ path: "/play-list", query: { id } });
    }
  },
  components: { ThePlayListCard },
  async created() {
    let result = await getPlayList(10);
    if (result.status === 200) this.playList = result.data.result;
  }
};
</script>

<style scoped lang="scss">
.index-song-list {
  width: 100%;
  height: 3.6rem;
}
</style>
