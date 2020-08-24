<template>
  <div>
    <div
      class="player"
      v-if="JSON.stringify(songInfo) !== '{}'"
      v-show="player"
    >
      <div class="player-bg">
        <img v-lazy="songInfo.al.picUrl" />
        <div class="bg-mask"></div>
      </div>
      <div class="player-song">
        <div class="song-name">{{ songInfo.name }}</div>
        <div class="singer">
          <span v-for="(item, index) in songInfo.ar" :key="item.id">
            {{ songInfo.ar.length - index === 1 ? item.name : `${item.name}/` }}
          </span>
        </div>
      </div>
      <div class="player-img">
        <img
          v-lazy="songInfo.al.picUrl"
          :class="status ? 'play-status' : 'pause-status'"
        />
      </div>
      <div class="player-progress">
        <span>{{ startTime }}</span>
        <van-slider
          v-model="progress"
          inactive-color="#d7dde4"
          active-color="#ffffff"
          button-size="8px"
          bar-height="4px"
          class="progress"
        ></van-slider>
        <span>{{ endTime }}</span>
      </div>
      <div class="player-button"></div>
    </div>
    <div
      class="mini-player"
      v-if="JSON.stringify(songInfo) !== '{}'"
      v-show="!player"
    >
      <div class="mini-img">
        <img v-lazy="songInfo.al.picUrl" />
      </div>
      <div class="mini-info" @touchstart="player = true">
        <div class="info-name">{{ songInfo.name }}</div>
        <div class="info-singer">
          <span v-for="(item, index) in songInfo.ar" :key="item.id">
            {{ songInfo.ar.length - index === 1 ? item.name : `${item.name}/` }}
          </span>
        </div>
      </div>
      <div class="mini-play-status" @touchstart="changeStatus">
        <BaseIcon icon="playstatus-play" class="icon-play" v-show="!status" />
        <BaseIcon icon="playstatus-pause" class="icon-play" v-show="status" />
      </div>
    </div>
    <div
      class="mini-player-empty"
      v-if="!player && JSON.stringify(songInfo) === '{}'"
    >
      请选择音乐播放
    </div>
    <audio
      :src="url"
      ref="audio"
      autoplay
      @durationchange="durationChange"
      @timeupdate="timeUpdate"
      @canplay="status = true"
      @play="status = true"
      @pause="status = false"
    />
  </div>
</template>

<script>
import { checkSongStatus, getSongDetailById, getSongUrlById } from "@/api/song";
import { Toast } from "vant";
import { secondToMs } from "@/utils/utils";
export default {
  name: "Player",
  data() {
    return {
      player: false,
      status: false,
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
          this.status = true;
        }
      } else {
        Toast.fail(statusResult.data.message);
        this.status = false;
      }
    },
    // 更改播放状态 播放/暂停
    changeStatus() {
      this.status = !this.status;
      // !this.status ? this.$refs.audio.pause() : this.$refs.audio.play();
    },
    timeUpdate(e) {
      this.nowTime = Math.floor(e.target.currentTime);
      this.progress = Math.floor((this.nowTime / this.duration) * 100);
    },
    durationChange(e) {
      this.duration = Math.floor(e.target.duration);
    }
  },
  computed: {
    songId() {
      return this.$store.getters["songId/getSongId"].songId;
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
    status() {
      !this.status ? this.$refs.audio.pause() : this.$refs.audio.play();
    }
  }
};
</script>

<style scoped lang="scss">
.player {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background: #ffffff;
  transform: translateY(100%);
  animation: player-translate 0.3s linear forwards;
  -webkit-animation: player-translate 0.3s linear forwards;
  @include flex-box(column, center, center);

  @keyframes player-translate {
    to {
      transform: translateY(0);
    }
  }

  .player-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-filter: blur(20px);
    -moz-filter: blur(20px);
    -ms-filter: blur(20px);
    filter: blur(50px);
    transform: scale(3);
    z-index: -1;

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
      background: rgba(0, 0, 0, 0.2);
    }
  }

  .player-song {
    width: 85%;
    margin-bottom: 1.2rem;

    .song-name,
    .singer {
      width: 100%;
      text-align: center;
      @include text-one-ellipsis;
    }

    .song-name {
      color: #ffffff;
      font-size: 0.35rem;
      font-weight: bold;
    }

    .singer {
      margin-top: 0.2rem;
      color: $white-smoke;
      font-size: 0.25rem;
    }
  }

  .player-img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 100%;
    border: 0.8rem solid #000000;

    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      animation: img-rotate 20s linear infinite;
      -webkit-animation: img-rotate 20s linear infinite;
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

  .player-progress {
    width: 85%;
    margin-top: 1.2rem;
    @include flex-box(row, flex-start, center);

    span {
      color: $white-smoke;
    }

    .progress {
      margin-left: 0.2rem;
      margin-right: 0.2rem;
    }
  }

  .player-button {
    width: 80%;
    height: 1.2rem;
    margin-top: 1.2rem;
  }
}

.mini-player {
  position: absolute;
  bottom: 0;
  left: 3%;
  width: $container-width;
  height: 1rem;
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
