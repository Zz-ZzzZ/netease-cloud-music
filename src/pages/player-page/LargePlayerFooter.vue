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
        inactive-color="#9295a1"
        active-color="#e1e1e1"
        button-size="6px"
        bar-height="3px"
        class="progress"
        @change="change"
      ></van-slider>
      <span>{{ endTime }}</span>
    </div>
    <div class="button-footer">
      <div class="icon-item">
        <BaseIcon icon="random-play" />
      </div>
      <div class="icon-item" @touchstart="prevSong">
        <BaseIcon icon="prev-song" />
      </div>
      <div class="icon-item" @touchstart="changeStatus">
        <BaseIcon
          :icon="status ? 'playstatus-pause-white' : 'playstatus-play-white'"
          class="icon"
        />
      </div>
      <div class="icon-item" @touchstart="nextSong">
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
      getProgress: this.progress,
      index: this.nowPlayIndex
    };
  },
  methods: {
    changeStatus() {
      this.status
        ? this.$store.commit("playStatus/setStatus", false)
        : this.$store.commit("playStatus/setStatus", true);
    },
    change(e) {
      this.$emit("changeProgress", e);
    },
    prevSong() {
      this.$emit("prevSong");
    },
    nextSong() {
      let index = this.nowPlayIndex;
      this.$store.commit("playList/setNewPlayIndex", {
        nowPlayIndex: index + 1
      });
    }
  },
  computed: {
    nowPlayIndex() {
      return this.$store.getters["playList/getPlayList"].nowPlayIndex;
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
      font-size: 0.21rem;
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
