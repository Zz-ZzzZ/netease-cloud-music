<template>
  <div class="index-main">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" :key="item.bannerId">
        <img v-lazy="item.pic" class="main-banner" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanner } from "../../../api/banner";

export default {
  name: "Index",
  data() {
    return {
      bannerList: []
    };
  },
  async created() {
    let banner = await getBanner();
    if (banner.status === 200) this.bannerList = banner.data.banners;
  }
};
</script>

<style scoped lang="scss">
.index-main {
  width: $container-width;
  height: 100%;
  margin: 0 auto 0 auto;
  /deep/.van-swipe {
    width: 100%;
    height: 3rem;
    border-radius: $default-radius;
  }
  .main-banner {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
