<template>
  <van-tabs v-model="active" sticky swipeable animated>
    <van-tab :title="item" v-for="(item, index) in tabList" :key="index">
      <PlayListPlaceTabsItem :tag="item" />
    </van-tab>
  </van-tabs>
</template>

<script>
import { getPlayListFromHot } from "@/api/song";
import PlayListPlaceTabsItem from "@/pages/discover-page/child/playlist-place/PlayListPlaceTabsItem";

export default {
  name: "PlayListPlace",
  components: { PlayListPlaceTabsItem },
  data() {
    return {
      active: 0,
      tabList: []
    };
  },
  async created() {
    const { tags } = await getPlayListFromHot();
    this.tabList = this.tabList.concat(
      ["全部"],
      tags.map(item => item.name)
    );
  }
};
</script>

<style scoped lang="scss">
/deep/.van-tab--active {
  color: $red;
  font-weight: bold;
}
/deep/.van-tabs__line {
  background-color: $red;
  z-index: 0;
}
/deep/.van-tabs__content {
  height: calc(100% - 44px);
}
/deep/.van-tab__pane,
.van-tabs {
  height: 100%;
}
/deep/.van-hairline--top-bottom::after {
  border: 0;
}
</style>
