<template>
  <div class="player-bottom">
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
      <div class="icon-item" @touchstart="changeMode">
        <BaseIcon :icon="playMode" />
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
import { mapMutations, mapState } from "vuex";
import { Toast } from "vant";
import { playMode, random } from "@/utils/utils";
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
      getProgress: this.progress,
      playMode: "playlist-circulation"
    };
  },
  methods: {
    ...mapMutations("playList", [
      "setNextPlayIndex",
      "setPrevPlayIndex",
      "setNowPlayIndex"
    ]),
    ...mapMutations("playStatus", ["setStatus", "setMode"]),
    // 大播放器的控制音乐播放
    changeStatus() {
      this.$emit("changeStatus");
    },
    // 更改进度条时间
    change(e) {
      this.$emit("changeProgress", e);
    },
    // 更改播放模式
    changeMode() {
      this.mode === 2 ? this.setMode(0) : this.setMode(this.mode + 1);
    },
    prevSong() {
      playMode(
        this.mode,
        () => {
          this.setPrevPlayIndex(this.nowPlayIndex);
        },
        () => {
          this.$parent.$parent.$refs.audio.load();
        },
        () => {
          this.setNowPlayIndex(random.getRandom(this.playList));
        }
      );
    },
    nextSong() {
      playMode(
        this.mode,
        () => {
          this.setNextPlayIndex(this.nowPlayIndex);
        },
        () => {
          this.$parent.$parent.$refs.audio.load();
        },
        () => {
          this.setNowPlayIndex(random.getRandom(this.playList));
        }
      );
    }
  },
  computed: {
    ...mapState("playList", ["nowPlayIndex", "playList"]),
    ...mapState("playStatus", ["mode", "haveUrl"])
  },
  watch: {
    progress(val) {
      this.getProgress = val;
    },
    // 监听播放模式控制Toast提示
    mode(val) {
      switch (val) {
        case 0:
          this.playMode = "playlist-circulation";
          Toast("列表循环");
          break;
        case 1:
          this.playMode = "single-circulation";
          Toast("单曲循环");
          break;
        case 2:
          this.playMode = "random-play";
          Toast("随机播放");
          break;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.player-bottom {
  width: 100%;
  height: 2.5rem;
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
