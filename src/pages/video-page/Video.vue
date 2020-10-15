<template>
  <div v-if="videoObj && videoInfo">
    <VideoPlayer :video-url="videoObj.url" ref="videoPlayer" />
    <VideoInformation :video-info="videoInfo" :singer-img="singerImg" />
  </div>
</template>

<script>
import { getVideoInfoById, getVideoSrcById } from "@/api/mv";
import VideoPlayer from "@/pages/video-page/VideoPlayer";
import VideoInformation from "@/pages/video-page/VideoInformation";
import { getSingerDescById } from "@/api/singer";

export default {
  name: "Video",
  components: { VideoInformation, VideoPlayer },
  data() {
    return {
      videoObj: undefined,
      videoPlayer: undefined,
      videoInfo: undefined,
      singerImg: ""
    };
  },
  methods: {},
  mounted() {},
  async created() {
    const resultSrc = await getVideoSrcById(this.$route.params.id);
    const resultInfo = await getVideoInfoById(this.$route.params.id);
    this.videoObj = resultSrc.data;
    this.videoInfo = resultInfo.data;
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
