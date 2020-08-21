<template>
  <div>
    <div class="player" v-if="a">
      <div></div>
    </div>
    <div class="mini-player" v-if="!a && JSON.stringify(songInfo) !== '{}'">
      <div class="mini-img">
        <img v-lazy="songInfo.al.picUrl" />
      </div>
      <div class="mini-info">
        <div class="info-name">{{ songInfo.name }}</div>
        <div class="info-singer">
          <span v-for="item in songInfo.ar" :key="item.id">{{
            item.name
          }}</span>
        </div>
      </div>
      <div class="mini-play-status" @touchstart="changeStatus">
        <BaseIcon icon="playstatus-play" class="icon-play" v-show="!status" />
        <BaseIcon icon="playstatus-pause" class="icon-play" v-show="status" />
      </div>
      <audio :src="url" ref="audio" autoplay />
    </div>
  </div>
</template>

<script>
import { checkSongStatus, getSongDetailById, getSongUrlById } from "@/api/song";
import { Toast } from "vant";
export default {
  name: "Player",
  data() {
    return {
      a: false,
      status: false,
      url: "",
      songInfo: {}
    };
  },
  methods: {
    async getSongUrlById(id) {
      let statusResult = await checkSongStatus(id);
      let songInfoResult = await getSongDetailById(id);
      if (songInfoResult.status === 200) {
        this.songInfo = songInfoResult.data.songs[0];
        console.log(this.songInfo);
      }
      if (statusResult.data.success) {
        let songUrlResult = await getSongUrlById(id);
        if (songUrlResult.status === 200) {
          this.url = songUrlResult.data.data[0].url;
          this.$refs.audio.play();
          this.status = true;
        }
      } else {
        Toast.fail(statusResult.data.message);
        this.$refs.audio.pause();
        this.status = false;
      }
    },
    changeStatus() {
      this.status = !this.status;
      !this.status ? this.$refs.audio.pause() : this.$refs.audio.play();
    }
  },
  computed: {
    songId() {
      console.log(this.$store.getters["songId/getSongId"]);
      return this.$store.getters["songId/getSongId"].songId;
    }
  },
  watch: {
    songId: {
      handler(id) {
        this.getSongUrlById(id);
      },
      deep: true
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
  background: #747d8c;
  display: none;
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
    flex: 1;
    margin-left: 0.2rem;
    .info-name {
      font-size: 0.25rem;
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
    margin-right: 0.07rem;
  }
}
</style>
