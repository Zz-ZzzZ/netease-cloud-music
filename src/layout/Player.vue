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
      :lyric="lyricArray"
      :height-light-index="heightLightIndex"
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
import {
  checkSongStatusById,
  getLyricById,
  getSongDetailById,
  getSongUrlById
} from "@/api/song";
import { Toast } from "vant";
import { secondToMs, random, playMode } from "@/utils/utils";
import LargePlayer from "@/pages/player-page/LargePlayer";
import MiniPlayer from "@/pages/player-page/MiniPlayer";
import { mapMutations, mapGetters, mapState } from "vuex";
// eslint-disable-next-line no-unused-vars
import Lyric from "lyric-parser";

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
      nowTime: 0,
      lyricArray: [],
      lyricString: "",
      heightLightIndex: 0
    };
  },
  methods: {
    async getSongUrlById(id) {
      const result = await checkSongStatusById(id);
      try {
        const { songs } = await getSongDetailById(id);
        this.songInfo = songs[0];
        const { lrc } = await getLyricById(id);
        this.lyricString = new Lyric(lrc.lyric, this.handler);
        const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;
        const lines = lrc.lyric.split("\n");
        let arr = [];
        for (let i = 0; i < lrc.lyric.length; i++) {
          if (lines[i]) {
            arr.push(lines[i].replace(timeExp, "").trim());
          }
        }
        this.lyricArray = arr;
        const { data } = await getSongUrlById(id);
        this.url = data[0].url;
        this.setStatus(true);
      } catch (e) {
        Toast.fail(result.message);
        this.setStatus(false);
      }
    },
    // 更改播放状态 播放/暂停
    changeStatus() {
      this.status ? this.setStatus(false) : this.setStatus(true);
    },
    // 获取当前播放时间
    timeUpdate(e) {
      this.nowTime = Math.floor(e.target.currentTime);
      this.progress = Math.floor((this.nowTime / this.duration) * 100);
    },
    // 获取总时长
    durationChange(e) {
      this.duration = Math.floor(e.target.duration);
    },
    // 更改进度时间
    changeProgress(e) {
      this.$refs.audio.currentTime = e * (this.duration / 100);
    },
    // 当歌曲结束的时候根据播放模式判断
    ended() {
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
    },
    // eslint-disable-next-line no-unused-vars
    handler({ lineNum, txt }) {
      this.heightLightIndex = lineNum;
      console.log(txt);
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
    // 监听VUEX中的歌单列表和索引，只要其中一个改变将播放该歌曲
    getPlayList: {
      handler(val) {
        let { playList, nowPlayIndex } = val;
        this.getSongUrlById(playList[nowPlayIndex].id);
      },
      deep: true
    },
    // 监听VUEX中的状态来控制音频播放/暂停
    status(status) {
      if (status) {
        this.$refs.audio.play();
        this.lyricString.play();
      } else {
        this.$refs.audio.pause();
        this.lyricString.stop();
      }
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
