<template>
  <div class="header">
    <van-nav-bar left-arrow @click-left="onClickLeft">
      <template #title>
        <p>{{ songName }}</p>
        <span v-for="(item, index) in songAr" :key="item.id">
          {{ songAr.length - index === 1 ? item.name : `${item.name}/` }}
        </span>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  props: ["songName", "songAr"],
  name: "PlayerHeader",
  methods: {
    onClickLeft() {
      this.$emit("closePlayer");
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 1rem;
  position: relative;
  top: 0;
  left: 0;

  p {
    font-size: 0.3rem;
    line-height: 0.35rem;
    font-weight: bold;
    color: #ffffff;
    @include text-one-ellipsis;
  }

  span {
    font-size: 0.21rem;
    color: $border;
    @include text-one-ellipsis;
  }
}
/deep/.van-nav-bar {
  background-color: transparent;
  line-height: 1;
}
/deep/.van-nav-bar .van-icon {
  color: #ffffff;
}
/deep/.van-nav-bar__arrow {
  font-size: 0.35rem;
}
/deep/.van-hairline--bottom::after {
  border: 0;
}
</style>
