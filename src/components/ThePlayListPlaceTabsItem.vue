<template>
  <div class="tabs-item" ref="scroll">
    <div class="item-container">
      <BasePlayList
        v-for="(item, index) in playList"
        :pic-url="item.coverImgUrl"
        :name="item.name"
        :play-count="item.playCount"
        :key="index"
        class="base-playlist"
        @setPlayListId="$router.push({ path: `play-list/${item.id}` })"
      />
    </div>
  </div>
</template>

<script>
import { getPlayListFromNetFriend } from "@/api/song";
import BasePlayList from "@/components/BasePlayList";
import { initScrollY } from "@/utils/scroll";

export default {
  props: {
    tag: {
      type: String,
      default: ""
    }
  },
  name: "ThePlayListPlaceTabsItem",
  components: { BasePlayList },
  data() {
    return {
      playList: [],
      offset: 0
    };
  },
  async created() {
    const { playlists } = await getPlayListFromNetFriend("hot", this.tag);
    this.playList = playlists;
  },
  mounted() {
    const scroll = initScrollY(this.$refs.scroll, true);
    scroll.on("pullingUp", async () => {
      this.offset += 30;
      const { playlists } = await getPlayListFromNetFriend(
        "hot",
        this.tag,
        30,
        this.offset
      );
      if (playlists.length > 0) {
        this.playList.push(...playlists);
      }
      scroll.finishPullUp();
    });
  }
};
</script>

<style scoped lang="scss">
.tabs-item {
  width: 96%;
  height: 100%;
  overflow: hidden;
  margin: 0 auto;

  .item-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    .base-playlist {
      margin: 0.15rem auto;
    }
  }
}
</style>
