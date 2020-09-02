<template>
  <div class="player-center">
    <div class="player-img">
      <img v-lazy="picUrl" :class="status ? 'play-status' : 'pause-status'" />
    </div>
    <img
      src="@/assets/image/play-bar.png"
      class="player-bar"
      :class="status ? '' : 'pause-status'"
    />
    <img src="@/assets/image/play-bar-support.png" class="player-support" />
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
  width: 100%;
  height: calc(100% - 1rem - 3.5rem);
  position: relative;
  top: 0;
  left: 0;
  @include flex-box(column, flex-start, center);

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
    width: 5.7rem;
    height: 5.7rem;
    margin-top: 1.8rem;

    img {
      width: 3.7rem;
      height: 3.7rem;
      border-radius: 100%;
      background: #000000;
      background: linear-gradient(-45deg, #333540, #070708, #333540);
      padding: 1rem;
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
}
</style>
