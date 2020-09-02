<template>
  <div class="player" v-if="JSON.stringify(songInfo) !== '{}'">
    <LargePlayer
      :show-mini-player="showMiniPlayer"
      :pic-url="songInfo.al.picUrl"
      :song-name="songInfo.name"
      :song-ar="songInfo.ar"
      :status="status"
      :start-time="startTime"
      :end-time="endTime"
      :progress="progress"
      @closePlayer="showMiniPlayer = true"
    />
    <MiniPlayer
      :pic-url="songInfo.al.picUrl"
      :status="status"
      :name="songInfo.name"
      :song-info="songInfo.ar"
      @changeShowVideo="showMiniPlayer = false"
      @changeStatus="changeStatus"
    />
    <audio
      :src="url"
      ref="audio"
      autoplay
      @durationchange="durationChange"
      @timeupdate="timeUpdate"
      @play="play"
      @pause="pause"
    />
  </div>
  <div class="mini-player-empty" v-else-if="JSON.stringify(songInfo) === '{}'">
    请选择音乐播放
  </div>
</template>

<script>
import { checkSongStatus, getSongDetailById, getSongUrlById } from "@/api/song";
import { Toast } from "vant";
import { secondToMs } from "@/utils/utils";
import LargePlayer from "@/pages/player-page/LargePlayer";
import MiniPlayer from "@/pages/player-page/MiniPlayer";
export default {
  name: "Player",
  components: { MiniPlayer, LargePlayer },
  data() {
    return {
      showMiniPlayer: true,
      url: "",
      songInfo: {},
      progress: 0,
      duration: 0,
      nowTime: 0
    };
  },
  methods: {
    async getSongUrlById(id) {
      // 获取歌曲可否播放
      let statusResult = await checkSongStatus(id);
      // 根据id获取歌曲信息
      let songInfoResult = await getSongDetailById(id);
      if (songInfoResult.status === 200) {
        this.songInfo = songInfoResult.data.songs[0];
      }
      if (statusResult.data.success) {
        let songUrlResult = await getSongUrlById(id);
        if (songUrlResult.status === 200) {
          this.url = songUrlResult.data.data[0].url;
          this.$store.commit("playStatus/setStatus", true);
        }
      } else {
        Toast.fail(statusResult.data.message);
        this.$store.commit("playStatus/setStatus", false);
      }
    },
    // 更改播放状态 播放/暂停
    changeStatus() {
      this.status
        ? this.$store.commit("playStatus/setStatus", false)
        : this.$store.commit("playStatus/setStatus", true);
    },
    timeUpdate(e) {
      this.nowTime = Math.floor(e.target.currentTime);
      this.progress = Math.floor((this.nowTime / this.duration) * 100);
    },
    durationChange(e) {
      this.duration = Math.floor(e.target.duration);
    },
    play() {
      this.$store.commit("playStatus/setStatus", true);
    },
    pause() {
      this.$store.commit("playStatus/setStatus", false);
    }
  },
  computed: {
    songId() {
      return this.$store.getters["songId/getSongId"].songId;
    },

    status() {
      return this.$store.getters["playStatus/getStatus"].status;
    },
    endTime() {
      return secondToMs(this.duration);
    },
    startTime() {
      return secondToMs(this.nowTime);
    }
  },
  watch: {
    songId: {
      handler(id) {
        this.getSongUrlById(id);
      },
      deep: true
    },
    status(status) {
      !status ? this.$refs.audio.pause() : this.$refs.audio.play();
    }
  }
};
</script>

<style scoped lang="scss">
.player {
  width: 100%;
  height: 1rem;
  overflow: hidden;
  background: #ffffff;
}
.mini-player-empty {
  width: $container-width;
  position: absolute;
  bottom: 0;
  left: 3%;
  height: 1rem;
  background: #ffffff;
  border-top: 1px solid $divider;
  color: $content;
  font-size: 0.3rem;
  @include flex-box(row, center, center);
}
</style>
