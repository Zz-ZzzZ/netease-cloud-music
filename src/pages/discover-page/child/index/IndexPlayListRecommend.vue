<template>
  <TheLayoutCardContainer title="推荐歌单">
    <template v-slot:top-left>
      推荐歌单
    </template>
    <template v-slot:top-right>
      <BaseButton>
        查看更多
      </BaseButton>
    </template>
    <template v-slot:bottom>
      <BasePlayList
        v-for="(item, index) in playList"
        :pic-url="item.picUrl"
        :play-count="item.playCount"
        :name="item.name"
        :key="item.id"
        @setPlayListId="setPlayListId(item.id)"
        :class="playList.length - index !== 1 ? 'play-list-margin' : ''"
      />
    </template>
  </TheLayoutCardContainer>
</template>

<script>
import { getPlayList } from "@/api/song";
import TheLayoutCardContainer from "@/components/TheLayoutCardContainer";
import BasePlayList from "@/components/BasePlayList";

export default {
  name: "IndexPlayListRecommend",
  data() {
    return {
      playList: []
    };
  },
  methods: {
    setPlayListId(id) {
      this.$router.push({ path: `/play-list/${id}` });
    }
  },
  components: { BasePlayList, TheLayoutCardContainer },
  async created() {
    const { result } = await getPlayList(10);
    this.playList = result;
  }
};
</script>

<style scoped lang="scss">
.play-list-margin {
  margin-right: 0.2rem;
}
/deep/.card-bottom {
  height: 2.8rem;
  overflow-x: auto;
  @include flex-box(row, flex-start, center);
}
</style>
