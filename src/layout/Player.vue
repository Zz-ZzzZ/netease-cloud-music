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
      @changeStatus="changeStatus"
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
import { getLyricById, getSongDetailById, getSongUrlById } from "@/api/song";
import { Toast } from "vant";
import { secondToMs, random, playMode } from "@/utils/utils";
import LargePlayer from "@/pages/player-page/LargePlayer";
import MiniPlayer from "@/pages/player-page/MiniPlayer";
import { mapMutations, mapGetters, mapState } from "vuex";
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
      lyricObj: {},
      playLyricBtnActivate: Boolean,
      heightLightIndex: 0
    };
  },
  methods: {
    async getSongUrlById(id) {
      const { songs } = await getSongDetailById(id);
      this.songInfo = songs[0];

      const { lrc } = await getLyricById(id);
      this.setLyric(lrc.lyric);

      if (JSON.stringify(this.lyricObj) !== "{}") {
        this.lyricObj.seek(0);
        this.lyricObj.stop();
      }

      const { data } = await getSongUrlById(id);
      if (data[0].url) {
        this.url = data[0].url;
        this.lyricObj = new Lyric(lrc.lyric, this.handler);
        this.lyricObj.play();
        this.playLyricBtnActivate = false;
        this.setHaveUrl(true);
        this.setStatus(true);
      } else {
        Toast({
          type: "fail",
          message: "未能获取到资源,请先开通VIP"
        });
        this.url = "";
        this.duration = this.progress = this.heightLightIndex = 0;
        this.setHaveUrl(false);
        this.setStatus(false);
      }
    },
    setLyric(lyric) {
      const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;
      const lines = lyric.split("\n");
      let lyricArray = [];
      for (let i = 0; i < lyric.length; i++) {
        if (lines[i] && lines[i].replace(timeExp, "").trim() !== "") {
          lyricArray.push(lines[i].replace(timeExp, "").trim());
        }
      }
      this.lyricArray = lyricArray;
    },

    changeStatus() {
      if (this.haveUrl) {
        this.status ? this.setStatus(false) : this.setStatus(true);
      }
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
      this.lyricObj.seek(e * this.duration * 10);
    },
    // 当歌曲结束的时候根据播放模式判断
    ended() {
      playMode(
        this.mode,
        () => {
          this.setNextPlayIndex(this.getPlayList.nowPlayIndex);
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
    },
    ...mapMutations("playStatus", ["setStatus", "setHaveUrl"]),
    ...mapMutations("playList", [
      "setPlayList",
      "setNextPlayIndex",
      "setNowPlayIndex"
    ])
  },
  computed: {
    ...mapGetters("playList", ["getPlayList"]),
    ...mapState("playStatus", ["status", "mode", "haveUrl"]),
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
      if (this.haveUrl) {
        if (status) {
          this.$refs.audio.play();
          // 歌词开始滚动需要由Play()来控制，若在此定义Play()方法则暂停歌曲在继续播放后歌词滚动会重新开始，
          // 因此需要使用togglePlay来继续/暂停歌词滚动，等待歌词出现暂停后，才可以激活歌词继续滚动，Play方法将在得到Url的时候开始，
          // 防止Play和togglePlay冲突
          if (this.playLyricBtnActivate) {
            this.lyricObj.togglePlay();
          }
        } else {
          this.$refs.audio.pause();
          this.lyricObj.togglePlay();
          // 激活继续歌词滚动
          this.playLyricBtnActivate = true;
        }
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
