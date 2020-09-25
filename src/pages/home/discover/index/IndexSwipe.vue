<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in banners" :key="item.bannerId">
      <img :src="item.pic" class="swipe-banner" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { getBanner } from "@/api/banner";

export default {
  name: "IndexSwipe",
  data() {
    return {
      banners: []
    };
  },
  async created() {
    const { banners } = await getBanner();
    this.banners = banners;
  }
};
</script>

<style scoped lang="scss">
.van-swipe {
  width: 100%;
  height: 2.5rem;
  border-radius: $default-radius;
}
.swipe-banner {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
