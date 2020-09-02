<template>
  <div class="player-bottom">
    <div class="bottom-header">
      <div v-for="item in iconListHeader" :key="item.src" class="icon-item">
        <BaseIcon :icon="item.src" />
      </div>
    </div>
    <div class="bottom-center">
      <span>{{ startTime }}</span>
      <van-slider
        v-model="getProgress"
        inactive-color="#d7dde4"
        active-color="#ffffff"
        button-size="8px"
        bar-height="4px"
        class="progress"
      ></van-slider>
      <span>{{ endTime }}</span>
    </div>
    <div class="button-footer">
      <div class="icon-item">
        <BaseIcon icon="random-play" />
      </div>
      <div class="icon-item">
        <BaseIcon icon="prev-song" />
      </div>
      <div class="icon-item" @touchstart="changeStatus">
        <BaseIcon
          :icon="status ? 'playstatus-pause-white' : 'playstatus-play-white'"
          class="icon"
        />
      </div>
      <div class="icon-item">
        <BaseIcon icon="next-song" />
      </div>
      <div class="icon-item">
        <BaseIcon icon="random-play" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["startTime", "endTime", "progress", "status"],
  name: "PlayerFooter",
  data() {
    return {
      iconListHeader: [
        {
          src: "like"
        },
        {
          src: "download"
        },
        {
          src: "microphone"
        },
        {
          src: "comment"
        },
        {
          src: "more-white"
        }
      ],
      iconListFooter: [],
      getProgress: this.progress
    };
  },
  methods: {
    changeStatus() {
      this.status
        ? this.$store.commit("playStatus/setStatus", false)
        : this.$store.commit("playStatus/setStatus", true);
    }
  },
  watch: {
    progress(val) {
      this.getProgress = val;
    }
  }
};
</script>

<style scoped lang="scss">
.player-bottom {
  width: 100%;
  height: 3.5rem;
  position: relative;

  top: 0;
  left: 0;
  @include flex-box(column, flex-start, center);

  .bottom-header {
    width: $container-width;
    height: 1rem;
    @include flex-box(row, flex-start, center);

    .icon-item {
      width: 20%;
      @include flex-box(row, center, center);
    }
  }

  .bottom-center {
    width: $container-width;
    height: 1rem;
    @include flex-box(row, flex-start, center);

    span {
      color: $white-smoke;
    }

    .progress {
      margin-left: 0.2rem;
      margin-right: 0.2rem;
    }
  }

  .button-footer {
    @extend .bottom-header;

    .icon {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
}
</style>
