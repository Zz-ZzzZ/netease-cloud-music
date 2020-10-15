<template>
  <video
    v-if="videoUrl"
    ref="video"
    preload="auto"
    controls
    class="video-js"
    id="videoEl"
    webkit-playsinline="true"
    playsinline="true"
    x5-video-player-type="h5-page"
    x5-video-orientation="portraint"
    data-setup="{}"
  >
    <source :src="videoUrl" type="video/mp4" />
  </video>
</template>

<script>
import video from "video.js";
import "video.js/dist/video-js.min.css";
export default {
  props: ["videoUrl"],
  name: "VideoPlayer",
  methods: {
    initVideo(option, onReady) {
      return video(this.$refs.video, option, onReady);
    }
  }
};
</script>

<style scoped lang="scss">
.video-js {
  width: 100%;
  height: 3.5rem;
}

/deep/.vjs-big-play-button {
  font-size: 2em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
