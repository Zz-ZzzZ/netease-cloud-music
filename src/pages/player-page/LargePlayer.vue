<template>
  <div
    class="large-player"
    :class="!showMiniPlayer ? 'up-translate' : 'down-translate'"
  >
    <div class="player-bg">
      <img v-lazy="picUrl" />
      <div class="bg-mask"></div>
    </div>
    <LargePlayerHeader
      :song-name="songName"
      :song-ar="songAr"
      @closePlayer="closePlayer"
    />
    <LargePlayerCenter
      :pic-url="picUrl"
      :status="status"
      :lyric="lyric"
      :height-light-index="heightLightIndex"
      :song-id="songId"
      @closePlayer="closePlayer"
    />
    <LargePlayerFooter
      :start-time="startTime"
      :end-time="endTime"
      :progress="progress"
      :status="status"
      @changeProgress="changeProgress"
      @changeStatus="changeStatus"
    />
  </div>
</template>

<script>
import LargePlayerHeader from "@/pages/player-page/LargePlayerHeader";
import LargePlayerCenter from "@/pages/player-page/LargePlayerCenter";
import LargePlayerFooter from "@/pages/player-page/LargePlayerFooter";
export default {
  props: [
    "songName",
    "songAr",
    "picUrl",
    "status",
    "startTime",
    "endTime",
    "progress",
    "showMiniPlayer",
    "lyric",
    "heightLightIndex",
    "songId"
  ],
  name: "LargePlayer",
  methods: {
    closePlayer() {
      this.$emit("closePlayer");
    },
    changeProgress(e) {
      this.$emit("changeProgress", e);
    },
    changeStatus() {
      this.$emit("changeStatus");
    }
  },
  components: { LargePlayerFooter, LargePlayerCenter, LargePlayerHeader }
};
</script>

<style scoped lang="scss">
.large-player {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background: $content;
  transform: translateY(100%);
  transition: transform 0.3s linear;
  z-index: 999;

  .player-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-filter: blur(20px);
    -moz-filter: blur(20px);
    -ms-filter: blur(20px);
    filter: blur(40px);
    transform: scale(3);

    img {
      width: 100%;
      height: 100%;
    }

    .bg-mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
    }
  }

  .player-button {
    width: 80%;
    height: 1.2rem;
    margin-top: 1.2rem;
  }
}

.up-translate {
  transform: translateY(0%);
}
</style>
