<template>
  <div class="player" v-if="JSON.stringify(songInfo) !== '{}'">
    <div
      class="large-player"
      :class="!showMiniPlayer ? 'up-translate' : 'down-translate'"
    >
      <div class="player-bg">
        <img v-lazy="songInfo.al.picUrl" />
        <div class="bg-mask"></div>
      </div>
      <PlayerHeader
        :song-name="songInfo.name"
        :song-ar="songInfo.ar"
        @closePlayer="showMiniPlayer = true"
      />
      <PlayerCenter
        :pic-url="songInfo.al.picUrl"
        :status="status"
        class="player-center"
      />
      <PlayerFooter
        :start-time="startTime"
        :end-time="endTime"
        :progress="progress"
        :status="status"
      />
    </div>
    <div class="mini-player">
      <div class="mini-img">
        <img v-lazy="songInfo.al.picUrl" />
      </div>
      <div class="mini-info" @touchstart="showMiniPlayer = false">
        <div class="info-name">{{ songInfo.name }}</div>
        <div class="info-singer">
          <span v-for="(item, index) in songInfo.ar" :key="item.id">
            {{ songInfo.ar.length - index === 1 ? item.name : `${item.name}/` }}
          </span>
        </div>
      </div>
      <div class="mini-play-status" @touchstart="changeStatus">
        <BaseIcon
          icon="playstatus-play-red"
          class="icon-play"
          v-show="!status"
        />
        <BaseIcon
          icon="playstatus-pause-red"
          class="icon-play"
          v-show="status"
        />
      </div>
    </div>
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
import PlayerHeader from "@/pages/player-page/PlayerHeader";
import PlayerCenter from "@/pages/player-page/PlayerCenter";
import PlayerFooter from "@/pages/player-page/PlayerFooter";
export default {
  name: "Player",
  components: { PlayerFooter, PlayerCenter, PlayerHeader },
  data() {
    return {
      showMiniPlayer: true,
      url: "",
      playStatus: Boolean,
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
    closePlayer() {
      this.showMiniPlayer = true;
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
    status: {
      get() {
        return this.$store.getters["playStatus/getStatus"].status;
      },
      set(status) {
        this.playStatus = status;
      }
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
        background: rgba(0, 0, 0, 0.4);
      }
    }

    .player-button {
      width: 80%;
      height: 1.2rem;
      margin-top: 1.2rem;
    }
  }

  .up-translate {
    //opacity: 1;
    transform: translateY(0%);
  }

  .mini-player {
    width: $container-width;
    height: 100%;
    margin: 0 auto;
    background: #ffffff;
    border-top: 1px solid $divider;
    @include flex-box(row, flex-start, center);

    .mini-img {
      width: 0.8rem;
      height: 0.8rem;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .mini-info {
      width: calc(100% - 1.6rem);
      margin-left: 0.2rem;

      .info-name {
        color: $title;
        font-size: 0.27rem;
        font-weight: bold;
        @include text-one-ellipsis;
      }

      .info-singer {
        margin-top: 0.05rem;
        color: $content;
        @include text-one-ellipsis;
      }
    }

    .mini-play-status {
      margin-right: 0.05rem;
    }
  }
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
