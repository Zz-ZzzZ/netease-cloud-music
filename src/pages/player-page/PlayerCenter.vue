<template>
  <div class="player-center">
    <div class="player-disc-needle">
      <img
        src="@/assets/image/play-bar.png"
        class="player-bar"
        :class="status ? '' : 'pause-status'"
      />
      <img src="@/assets/image/play-bar-support.png" class="player-support" />
    </div>
    <div class="player-img">
      <img v-lazy="picUrl" :class="status ? 'play-status' : 'pause-status'" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["picUrl", "status"],
  name: "PlayerCenter"
};
</script>

<style scoped lang="scss">
.player-center {
  @include flex-box(column, flex-start, center);

  .player-disc-needle {
    width: 100%;
    height: 2.1rem;
    @include flex-box(row, center, flex-start);

    .player-support {
      width: 0.5rem;
      position: absolute;
      top: 0.1rem;
      left: calc(50% - 0.25rem);
    }

    .player-bar {
      width: 2rem;
      position: absolute;
      top: 0.3rem;
      left: calc(50% - 0.15rem);
      transform: rotate(0);
      //transform-origin: 0.05rem 0.05rem;
      transform-origin: 0 0;
      transition: transform 0.5s;
    }

    .pause-status {
      transform: rotate(-15deg);
    }
  }

  .player-img {
    width: 5.7rem;
    height: 5.7rem;
    //border-radius: 100%;
    //border: 1rem solid #262626;

    img {
      width: 3.7rem;
      height: 3.7rem;
      border-radius: 100%;
      background: #000000;
      background: linear-gradient(-45deg, #333540, #070708, #333540);
      padding: 1rem;
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
}
</style>
