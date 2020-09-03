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
      @changeProgress="changeProgress"
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
      @ended="ended"
      @durationchange="durationChange"
      @timeupdate="timeUpdate"
    />
  </div>
  <div class="mini-player-empty" v-else-if="JSON.stringify(songInfo) === '{}'">
    请选择音乐播放
  </div>
</template>

<script>
import { checkSongStatus, getSongDetailById, getSongUrlById } from "@/api/song";
import { Toast } from "vant";
// eslint-disable-next-line no-unused-vars
import { secondToMs, random } from "@/utils/utils";
import LargePlayer from "@/pages/player-page/LargePlayer";
import MiniPlayer from "@/pages/player-page/MiniPlayer";
import { mapMutations, mapGetters, mapState } from "vuex";

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
          this.setStatus(true);
        }
      } else {
        this.setStatus(false);
        Toast.fail(statusResult.data.message);
      }
    },
    // 更改播放状态 播放/暂停
    changeStatus() {
      this.status ? this.setStatus(false) : this.setStatus(true);
    },
    timeUpdate(e) {
      this.nowTime = Math.floor(e.target.currentTime);
      this.progress = Math.floor((this.nowTime / this.duration) * 100);
    },
    durationChange(e) {
      this.duration = Math.floor(e.target.duration);
    },
    changeProgress(e) {
      this.$refs.audio.currentTime = e * (this.duration / 100);
    },
    ended() {
      switch (this.mode) {
        case 0:
          this.setNextPlayIndex(this.getPlayList.nowPlayIndex);
          break;
        case 1:
          this.$refs.audio.load();
          break;
        case 2:
          this.setNowPlayIndex(random.getRandom(this.getPlayList.playList));
          break;
      }
    },
    ...mapMutations("playStatus", ["setStatus"]),
    ...mapMutations("playList", [
      "setPlayList",
      "setNextPlayIndex",
      "setNowPlayIndex"
    ])
  },
  computed: {
    ...mapGetters("playList", ["getPlayList"]),
    ...mapState("playStatus", ["status", "mode"]),
    endTime() {
      return secondToMs(this.duration);
    },
    startTime() {
      return secondToMs(this.nowTime);
    }
  },
  watch: {
    getPlayList: {
      handler(val) {
        let { playList, nowPlayIndex } = val;
        this.getSongUrlById(playList[nowPlayIndex].id);
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
