<template>
  <div v-if="videoObj && videoInfo">
    <VideoPlayer :video-url="videoObj.url" ref="videoPlayer" />
    <div class="video-main">
      <VideoInformation :video-info="videoInfo" :singer-img="singerImg" />
      <VideoCorrelation :correlation-list="correlationList" />
    </div>
  </div>
</template>

<script>
import {
  getVideoCorrelationById,
  getVideoInfoById,
  getVideoSrcById
} from "@/api/video";
import VideoPlayer from "@/pages/video-page/VideoPlayer";
import VideoInformation from "@/pages/video-page/VideoInformation";
import { getSingerDescById } from "@/api/singer";
import VideoCorrelation from "@/pages/video-page/VideoCorrelation";

export default {
  name: "Video",
  components: { VideoCorrelation, VideoInformation, VideoPlayer },
  data() {
    return {
      videoObj: undefined,
      videoPlayer: undefined,
      videoInfo: undefined,
      correlationList: [],
      singerImg: ""
    };
  },
  methods: {},
  mounted() {},
  async created() {
    const resultSrc = await getVideoSrcById(this.$route.params.id);
    const resultInfo = await getVideoInfoById(this.$route.params.id);
    const resultCorrelation = await getVideoCorrelationById(
      this.$route.params.id
    );
    this.videoObj = resultSrc.data;
    this.videoInfo = resultInfo.data;
    this.correlationList = resultCorrelation.data;
    const {
      artist: { picUrl }
    } = await getSingerDescById(this.videoInfo.artistId);
    this.singerImg = picUrl;
    this.$nextTick(() => {
      this.videoPlayer = this.$refs.videoPlayer.initVideo();
      // this.videoPlayer.play();
    });
  }
};
</script>
<style scoped lang="scss">
.video-main {
  height: calc(100% - 3.5rem);
  overflow-y: auto;
}
</style>
