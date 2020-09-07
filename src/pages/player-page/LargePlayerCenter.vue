<template>
  <div class="player-center">
    <transition name="player">
      <div class="player-item" v-show="!showLyric" @touchend="showLyric = true">
        <div class="player-img">
          <img src="@/assets/image/disc_default.png" />
          <img
            v-lazy="picUrl"
            :class="status ? 'play-status' : 'pause-status'"
            class="desc"
          />
        </div>
        <img
          src="@/assets/image/play-bar.png"
          class="player-bar"
          :class="status ? '' : 'pause-status'"
        />
        <img src="@/assets/image/play-bar-support.png" class="player-support" />
        <div class="player-bottom-bar">
          <div v-for="item in iconListHeader" :key="item.src" class="icon-item">
            <BaseIcon :icon="item.src" />
          </div>
        </div>
      </div>
    </transition>
    <transition name="lyric">
      <div
        class="scroll-container"
        v-show="showLyric"
        @click="showLyric = false"
      >
        <div class="lyric-item">
          <p
            v-for="(item, index) in lyric"
            :key="index"
            :class="heightLightIndex === index ? 'heightLight' : ''"
          >
            {{ item }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { initScrollY } from "@/utils/scroll";

export default {
  props: ["picUrl", "status", "lyric", "heightLightIndex"],
  name: "PlayerCenter",
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
      showLyric: false
    };
  },
  mounted() {
    initScrollY(".scroll-container");
  }
};
</script>

<style scoped lang="scss">
.player-center {
  width: 100%;
  height: calc(100% - 1rem - 2.5rem);
  overflow: hidden;

  .player-item {
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    @include flex-box(column, space-between, center);

    .player-support {
      width: 0.5rem;
      position: absolute;
      top: 0.1rem;
      left: calc(50% - 0.25rem);
    }

    .player-bar {
      width: 1.8rem;
      position: absolute;
      top: 0.3rem;
      left: calc(50% - 0.14rem);
      transform: rotate(0);
      transform-origin: 0 0;
      transition: transform 0.5s;
    }

    .pause-status {
      transform: rotate(-20deg);
    }

    .player-img {
      width: 5.2rem;
      height: 5.2rem;
      position: relative;
      top: 1.8rem;
      left: 0;
      border: 0.15rem solid rgba(200, 200, 200, 0.2);
      border-radius: 100%;

      .desc {
        position: absolute;
        top: 17.5%;
        left: 17.5%;
        width: 65%;
        height: 65%;
      }

      img {
        width: 5.2rem;
        height: 5.2rem;
        border-radius: 100%;
        transform: rotate(0);
        animation: img-rotate 20s linear infinite;
        -webkit-animation: img-rotate 20s linear infinite;
        animation-play-state: paused;
      }

      .play-status {
        animation-play-state: running;
      }

      .pause-status {
        animation-play-state: paused;
      }

      @keyframes img-rotate {
        to {
          transform: rotate(360deg);
        }
      }
    }

    .player-bottom-bar {
      width: $container-width;
      height: 1rem;
      position: relative;
      bottom: 0;
      left: 0;
      @include flex-box(row, center, center);

      .icon-item {
        width: 20%;
        @include flex-box(row, center, center);
      }
    }
  }

  .scroll-container {
    width: 100%;
    height: 100%;

    .lyric-item {
      width: 90%;
      position: relative;
      top: 0;
      left: 0;
      text-align: center;
      margin: 0 auto;
      color: $content;
      font-size: 0.27rem;
      line-height: 0.7rem;

      .heightLight {
        font-size: 0.3rem;
        color: $white-smoke;
        transition: all 0.5s;
      }
    }
  }
}

.lyric-enter,
.player-enter {
  opacity: 0;
}
.lyric-leave-to {
  display: none;
}

.lyric-enter-active,
.player-enter-active {
  transition: opacity 0.5s;
}
.lyric-enter-to,
.player-enter-to {
  opacity: 1;
}
</style>
