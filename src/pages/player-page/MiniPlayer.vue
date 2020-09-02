<template>
  <div class="mini-player">
    <div class="mini-img">
      <img v-lazy="picUrl" />
    </div>
    <div class="mini-info" @touchstart="changeShowVideo">
      <div class="info-name">{{ name }}</div>
      <div class="info-singer">
        <span v-for="(item, index) in songInfo" :key="item.id">
          {{ songInfo.length - index === 1 ? item.name : `${item.name}/` }}
        </span>
      </div>
    </div>
    <div class="mini-play-status" @touchstart="changeStatus">
      <BaseIcon icon="playstatus-play-red" class="icon-play" v-show="!status" />
      <BaseIcon icon="playstatus-pause-red" class="icon-play" v-show="status" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["picUrl", "name", "songInfo", "status"],
  name: "MiniPlayer",
  methods: {
    changeStatus() {
      this.$emit("changeStatus");
    },
    changeShowVideo() {
      this.$emit("changeShowVideo");
    }
  }
};
</script>

<style scoped lang="scss">
.mini-player {
  width: $container-width;
  height: 100%;
  margin: 0 auto;
  background: #ffffff;
  border-top: 1px solid $divider;
  @include flex-box(row, flex-start, center);

  .mini-img {
    width: 0.8rem;
    height: 0.8rem;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .mini-info {
    width: calc(100% - 1.6rem);
    margin-left: 0.2rem;

    .info-name {
      color: $title;
      font-size: 0.27rem;
      font-weight: bold;
      @include text-one-ellipsis;
    }

    .info-singer {
      margin-top: 0.05rem;
      color: $content;
      @include text-one-ellipsis;
    }
  }

  .mini-play-status {
    margin-right: 0.05rem;
  }
}
</style>
